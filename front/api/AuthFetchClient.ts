type StatusCode = number;

interface ServerResponse {
  statusCode: StatusCode;
  data: any;
}

interface IUserCredentials {
  email: string;
  username: string;
  password: string;
}

export default class AuthFetchClient {
  constructor(
    readonly API_URL: string,
    readonly API_SIGNUP_PATH: string,
    readonly API_SIGNIN_PATH: string,
    readonly VK_AUTH_PATH: string,
    readonly GOOGLE_AUTH_PATH: string
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

  async authWithGoogle(
    googleRedirectUrl: string,
    googleCode?: string
  ): Promise<StatusCode> {
    const res = await fetch(this.API_URL + this.GOOGLE_AUTH_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        google_redirect_url: googleRedirectUrl,
        google_code: googleCode || "",
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
  ): Promise<ServerResponse> {
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

    let data = {};

    if (res.status !== 204) {
      data = await res.json();
    }

    return { statusCode: res.status, data: data };
  }

  async signIn(
    userData: Pick<IUserCredentials, "email" | "password">
  ): Promise<ServerResponse> {
    const res = await fetch(this.API_URL + this.API_SIGNIN_PATH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    let data = {};

    if (res.status !== 204) {
      data = await res.json();
    }

    return { statusCode: res.status, data: data };
  }
}
