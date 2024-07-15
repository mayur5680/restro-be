import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@modules/config/config.service';
import { firstValueFrom } from 'rxjs';

type OktaUserApiResponse = {
  id: string;
  status: string;
  created: string;
  activated: string;
  statusChanged: string;
  lastLogin: string;
  lastUpdated: string;
  passwordChanged: string;
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    displayName: string;
    organization: string;
  };
};

@Injectable()
export class OktaUserService {
  private oktaApiUrl: string;
  private oktaApiToken: string;
  private oktaAppId: string;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    ({
      oktaApiUrl: this.oktaApiUrl,
      oktaApiToken: this.oktaApiToken,
      oktaAppId: this.oktaAppId,
    } = this.configService.oktaConfig);
  }

  async findByEmail(email: string): Promise<OktaUserApiResponse[] | null> {
    const { data } = await firstValueFrom(
      this.httpService.get<OktaUserApiResponse[]>(
        `${this.oktaApiUrl}/users?search=profile.email sw \"${encodeURIComponent(email)}\"`,
        {
          headers: {
            Authorization: `SSWS ${this.oktaApiToken}`,
          },
        },
      ),
    );
    return data;
  }

  async assignUserToOktaApp(oktaUserId: string) {
    const url = `${this.oktaApiUrl}/apps/${this.oktaAppId}/users/${oktaUserId}`;
    const data = await this.httpService.axiosRef.post(url, null, {
      headers: {
        Authorization: `SSWS ${this.oktaApiToken}`,
        'Content-Type': 'application/json',
      },
    });

    return data;
  }
}
