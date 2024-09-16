/* eslint-disable @typescript-eslint/no-explicit-any */
interface CustomFetchOptions {
  baseUrl?: string;
  timeout?: number;
}

export default class CustomFetch {
  public baseUrl: string;

  public timeout: number;

  constructor({ baseUrl = "", timeout = 5000 }: CustomFetchOptions = {}) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  private async request(url: string, config: RequestInit): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, { ...config });

      return response.ok
        ? await response.json()
        : await Promise.reject(response);
    } catch (error) {
      throw error;
    }
  }

  get(url: string, config: Omit<RequestInit, "method">) {
    return this.request(url, { ...config, method: "GET" });
  }

  post(url: string, config: Omit<RequestInit, "method"> = {}) {
    const isFormData = config.body instanceof FormData;

    return this.request(url, {
      ...config,
      method: "POST",
      headers: isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          },
    });
  }

  patch(url: string, config: Omit<RequestInit, "method">) {
    const isFormData = config.body instanceof FormData;

    return this.request(url, {
      ...config,
      method: "PATCH",
      headers: isFormData
        ? {}
        : {
            "Content-Type": "application/json",
          },
    });
  }

  delete(url: string, config: Omit<RequestInit, "method">) {
    return this.request(url, { ...config, method: "DELETE" });
  }
}
