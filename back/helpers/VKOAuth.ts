import { Axios } from "axios";

export interface IVKUserAccessData {
  accessToken: string;
  userId: number;
}

export interface IVKConfig {
  CLIENT_ID: string;
  CLIENT_SECRET: string;
}

export class VKOAuth {
  constructor(
    private readonly _vkConfig: IVKConfig,
    private readonly _axios: Axios
  ) {}

  async getVKUserAccessData(
    vkCode: string,
    redirectUrl: string
  ): Promise<IVKUserAccessData> {
    const { data } = await this._axios.get(
      `https://oauth.vk.com/access_token?client_id=${this._vkConfig.CLIENT_ID}&client_secret=${this._vkConfig.CLIENT_SECRET}&redirect_uri=${redirectUrl}&code=${vkCode}`
    );

    return { accessToken: data.access_token, userId: data.user_id };
  }

  async validVKUser(accessToken: string, vkUserId: number): Promise<boolean> {
    const { data } = await this._axios.get(
      "https://api.vk.com/method/users.get?v=5.131&access_token=" + accessToken
    );

    if (data.error) {
      return false;
    }

    if (vkUserId !== data.response[0].id) {
      return false;
    }

    return true;
  }
}
