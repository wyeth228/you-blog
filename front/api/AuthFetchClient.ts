type StatusCode = number;

export default class AuthFetchClient {
  constructor(readonly API_URL: string, readonly VK_AUTH_PATH: string) {}

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

    const data = await res.json();

    if (res.status === 302) {
      window.open(data.redirect_url, "_self");

      return 302;
    } else {
      return res.status;
    }
  }
}
