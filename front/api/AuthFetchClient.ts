type StatusCode = number;

interface IUserCredentials {
  email: string;
  username: string;
  password: string;
}

export default class AuthFetchClient {
  constructor(
    readonly API_URL: string,
    readonly API_SIGNUP_PATH: string,
    readonly VK_AUTH_PATH: string
  ) {}

  async authWithVK(
    vkRedirectUrl: string,
    vkCode?: string
  ): Promise<StatusCode> {
    const res = await fetch(this.API_URL + this.VK_AUTH_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vk_redirect_url: vkRedirectUrl,
        vk_code: vkCode || "",
      }),
    });

    if (res.status === 302) {
      const data = await res.json();

      window.open(data.redirect_url, "_self");

      return 302;
    } else {
      return res.status;
    }
  }

  async signUp(
    userData: IUserCredentials,
    type: "simple" | "vk" | "google"
  ): Promise<StatusCode> {
    const res = await fetch(this.API_URL + this.API_SIGNUP_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        username: userData.username,
        password: userData.password,
        type: type,
      }),
    });

    return res.status;
  }
}
