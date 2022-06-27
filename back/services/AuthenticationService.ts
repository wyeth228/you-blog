import { UsersMySQLRepository } from "../repositories/UsersMySQLRepository";
import ValidUserCredentials from "../helpers/ValidUserCredentials";
import { VKOAuth } from "../helpers/VKOAuth";
import { GoogleOAuth } from "../helpers/GoogleOAuth";

export class AuthenticationService {
  constructor(
    private readonly _usersMySQLRepository: UsersMySQLRepository,
    private readonly _validUserCredentials: ValidUserCredentials,
    private readonly _vkOAuth: VKOAuth,
    private readonly _googleOAuth: GoogleOAuth
  ) {}

  async authenticateVK(
    accessToken: string,
    vkUserId: number
  ): Promise<boolean> {
    return await this._vkOAuth.validVKUser(accessToken, vkUserId);
  }

  async authenticateGoogle(
    accessToken: string,
    refreshToken: string,
    googleUserId: number
  ): Promise<string | boolean> {
    const validAccessToken = await this._googleOAuth.validAccessToken(
      accessToken
    );

    if (!validAccessToken) {
      const newAccessToken = await this._googleOAuth.getAccessTokenUsingRefresh(
        refreshToken
      );

      if (!newAccessToken) {
        return false;
      }
    }
  }

  async authenticateSimple(): Promise<void> {}
}
