export default class FetchClient {
  constructor(readonly headers: {}) {}

  get(url: string): Promise<Response> {
    return fetch(url, {
      method: "GET",
      headers: this.headers,
      credentials: "include",
    });
  }

  post(url: string, stringifiedBody: string): Promise<Response> {
    return fetch(url, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: stringifiedBody,
    });
  }
}
