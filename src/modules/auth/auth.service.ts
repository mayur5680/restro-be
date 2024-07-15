import { Resto365User } from '@modules/resto365-user/entities/resto365-user.entity';
import { Resto365UserService } from '@modules/resto365-user/resto365-user.service';
import { Injectable } from '@nestjs/common';
import { decode, verify, JwtPayload } from 'jsonwebtoken';
import { Resto365RoleService } from '@modules/resto365-role/resto365-role.service';
import { ConfigService } from '@modules/config/config.service';
import { GygLog } from 'src/shared';
import jwksClient from 'jwks-rsa';
import { Cron, CronExpression } from '@nestjs/schedule';
export type OktaUser = {
  email: string;
};

export type OktaToken = {
  ver: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  iat: number;
  exp: number;
  cid: string;
  uid: string;
  scp: string[];
  auth_time: number;
};

@Injectable()
export class AuthService {
  private jwksClient: jwksClient.JwksClient;
  constructor(
    private userService: Resto365UserService,
    private roleService: Resto365RoleService,
    private configService: ConfigService,
  ) {
    const { oktaJwksUri } = this.configService.oktaConfig;
    this.jwksClient = jwksClient({
      jwksUri: oktaJwksUri,
      requestHeaders: {},
      timeout: 30000,
      cache: true,
    });
  }

  private logger = new GygLog(AuthService.name);
  private resto365UserCache = new Map<string, Resto365User>();

  getCachedUser(token: string): Resto365User | undefined {
    return this.resto365UserCache.get(token);
  }

  setCachedUser(token: string, user: Resto365User) {
    this.resto365UserCache.set(token, user);
  }

  clearCachedRole(roleId: number) {
    const tokensToDelete: string[] = [];
    for (const [token, user] of this.resto365UserCache.entries()) {
      if (user.roleId === roleId) {
        tokensToDelete.push(token);
      }
    }
    for (const token of tokensToDelete) {
      this.resto365UserCache.delete(token);
    }
  }

  clearCachedUser(userId: number) {
    const tokensToDelete: string[] = [];
    for (const [token, user] of this.resto365UserCache.entries()) {
      if (user.id === userId) {
        tokensToDelete.push(token);
      }
    }
    for (const token of tokensToDelete) {
      this.resto365UserCache.delete(token);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  clearExpiredTokens() {
    this.logger.info(
      this.clearExpiredTokens.name,
      'Start clear expired tokens',
      '',
    );
    const now = Date.now();
    let count = 0;
    for (const token of this.resto365UserCache.keys()) {
      const oktaToken = this.getOktaToken(token);
      if (oktaToken.exp * 1000 < now) {
        this.resto365UserCache.delete(token);
        count++;
      }
    }
    this.logger.info(
      this.clearExpiredTokens.name,
      `${count} tokens were cleared`,
      '',
    );
  }

  /**
   * @throws {Error} if the user is not found in Resto365
   * @throws {Error} if the user is not found in Okta
   */
  async authenticate(token: string): Promise<Resto365User> {
    const oktaToken = this.getOktaToken(token);
    const oktaUser = await this.getOktaUserInfo(token);
    if (!oktaUser) {
      throw new Error(`Verification failed for Okta user ${oktaToken.sub}`);
    }
    let r365User = this.getCachedUser(token);
    if (!r365User) {
      r365User = await this.userService.findByEmail(oktaUser.email);
      if (!r365User) {
        throw new Error(`User ${oktaUser.email} is not assigned to Resto365`);
      }
      const r365Role = await this.roleService.findOne(r365User.roleId);
      if (!r365Role) {
        throw new Error(
          `Role ${r365User.roleId} not found for user ${r365User.id}`,
        );
      }
      r365User.permissions = r365Role.permissions;
      this.setCachedUser(token, r365User);
    }

    return r365User;
  }

  getOktaToken(token: string) {
    const oktaToken: OktaToken = decode(token) as OktaToken;
    return oktaToken;
  }

  async getOktaUserInfo(token: string): Promise<OktaUser | null> {
    const decodedToken = decode(token, { complete: true });
    const signingKey = await this.jwksClient.getSigningKey(
      decodedToken.header.kid,
    );
    const publicKey = signingKey.getPublicKey();
    try {
      const verifiedToken = verify(token, publicKey, { algorithms: ['RS256'] });
      const payload = verifiedToken as JwtPayload;
      const oktaUser = { email: payload.sub };
      return oktaUser;
    } catch (e) {
      const payload = decodedToken.payload as JwtPayload;
      this.logger.error(this.getOktaUserInfo.name, e.message, payload.sub);
      return null;
    }
  }
}
