import { Axios } from "axios";
import { Buffer } from "buffer";

export interface IGoogleUserAccessData {
  accessToken: string;
  refreshToken: string;
}

export interface IGoogleConfig {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export interface IGoogleUserCredentials {
  userId: number;
}

export class GoogleOAuth {
  constructor(
    private readonly _googleConfig: IGoogleConfig,
    private readonly _axios: Axios,
    private readonly _buffer: typeof Buffer
  ) {}

  private _decodeURIComponentGoogleCode(googleCode: string): string {
    return this._buffer.from(googleCode).toString("utf-8");
  }

  async getUserAccessData(
    googleCode: string,
    redirectUrl: string
  ): Promise<IGoogleUserAccessData | false> {
    const { data } = await this._axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: this._googleConfig.CLIENT_ID,
        client_secret: this._googleConfig.CLIENT_SECRET,
        redirect_uri: redirectUrl,
        grant_type: "authorization_code",
        code: this._decodeURIComponentGoogleCode(googleCode),
      }
    );

    if (data.access_token && data.refresh_token) {
      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      };
    } else {
      return false;
    }
  }

  async getUserCredentials(
    accessToken: string
  ): Promise<IGoogleUserCredentials | false> {
    const { data } = await this._axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
        accessToken
    );

    if (data.id) {
      return { userId: data.id };
    } else {
      return false;
    }
  }

  async validAccessToken(accessToken: string): Promise<boolean> {
    const { data } = await this._axios.get(
      "https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken
    );

    if (data.error) {
      return false;
    }

    return true;
  }

  async getAccessTokenUsingRefresh(
    refreshToken: string
  ): Promise<string | false> {
    const { data } = await this._axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: this._googleConfig.CLIENT_ID,
        client_secret: this._googleConfig.CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }
    );

    return data.accessToken || false;
  }
}
