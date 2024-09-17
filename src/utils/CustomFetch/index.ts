/* eslint-disable @typescript-eslint/no-explicit-any */
interface CustomFetchOptions {
  baseUrl?: string;
  timeout?: number;
}

interface RequestInterceptor {
  onRequest?: (config: RequestInit) => RequestInit;
}

interface ResponseInterceptor {
  onResponse?: (response: Response) => Promise<Response>;
  onError?: (error: any) => Promise<any>;
}

export default class CustomFetch {
  public baseUrl: string;
  public timeout: number;
  private requestInterceptor: RequestInterceptor = {};
  private responseInterceptor: ResponseInterceptor = {};

  constructor({ baseUrl = "", timeout = 5000 }: CustomFetchOptions = {}) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  setRequestInterceptor(onRequest: RequestInterceptor["onRequest"]) {
    this.requestInterceptor.onRequest = onRequest;
  }

  setResponseInterceptor(
    onResponse: ResponseInterceptor["onResponse"],
    onError?: ResponseInterceptor["onError"],
  ) {
    this.responseInterceptor.onResponse = onResponse;
    this.responseInterceptor.onError = onError;
  }

  private async request(url: string, config: RequestInit): Promise<any> {
    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      let updatedConfig = { ...config };

      if (this.requestInterceptor.onRequest) {
        updatedConfig = this.requestInterceptor.onRequest(updatedConfig);
      }

      const response = await fetch(`${this.baseUrl}${url}`, {
        ...updatedConfig,
        signal,
      });

      const finalResponse = this.responseInterceptor.onResponse
        ? await this.responseInterceptor.onResponse(response)
        : response;

      return finalResponse.ok
        ? await finalResponse.json()
        : await Promise.reject(finalResponse);
    } catch (error: any) {
      if (this.responseInterceptor.onError) {
        return await this.responseInterceptor.onError(error);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  get(url: string, config: Omit<RequestInit, "method"> = {}) {
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

  patch(url: string, config: Omit<RequestInit, "method"> = {}) {
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

  delete(url: string, config: Omit<RequestInit, "method"> = {}) {
    return this.request(url, { ...config, method: "DELETE" });
  }
}
