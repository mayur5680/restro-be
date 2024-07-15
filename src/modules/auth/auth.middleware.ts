import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { AuthService } from './auth.service';
import { GygLog } from 'src/shared';

const AUTH_HEADER = 'authorization';
const scheme = 'Bearer ';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private logger = new GygLog(AuthMiddleware.name);

  constructor(private authService: AuthService) {}

  async use(req: Request, _: Response, next: NextFunction) {
    const authHeader: string = req.headers[AUTH_HEADER];
    if (authHeader && authHeader.startsWith(scheme)) {
      const token = authHeader.slice(scheme.length);
      try {
        await this.setCurrentUser(token, req);
      } catch (e) {
        this.logger.error(this.setCurrentUser.name, e.message, '');
        next(new UnauthorizedException(e.message));
      }
    }
    next();
  }

  async setCurrentUser(token: string, request) {
    const user = await this.authService.authenticate(token);
    request.user = user;
    request.isAuthenticated = true;
    this.logger.info(
      this.setCurrentUser.name,
      'User authenticated',
      user.email,
    );
  }
}
