/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpError from "./HTTPError";

interface HTTPClientOptions {
  baseUrl?: string;
  timeout?: number;
}

interface RequestInterceptor {
  onRequest?: (config: RequestInit) => RequestInit;
}

interface ResponseInterceptor {
  onResponse?: (response: Response) => Promise<Response>;
  onError?: ({
    response,
    originalRequest,
  }: {
    response: Response;
    originalRequest?: RequestInit;
  }) => Promise<any>;
}

export default class HTTPClient {
  public baseUrl: string;
  public timeout: number;
  private requestInterceptor: RequestInterceptor = {};
  private responseInterceptor: ResponseInterceptor = {};

  constructor({ baseUrl = "", timeout = 5000 }: HTTPClientOptions = {}) {
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  setRequestInterceptor(onRequest: RequestInterceptor["onRequest"]) {
    this.requestInterceptor.onRequest = onRequest;
  }

  setResponseInterceptor({
    onResponse,
    onError,
  }: {
    onResponse?: ResponseInterceptor["onResponse"];
    onError?: ResponseInterceptor["onError"];
  }) {
    this.responseInterceptor.onResponse = onResponse;
    this.responseInterceptor.onError = onError;
  }

  private async request<T>(url: string, config: RequestInit): Promise<T> {
    const controller = new AbortController();
    const { signal } = controller;

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        controller.abort();
        reject(new Error("Timeout Error"));
      }, this.timeout);
    });

    let updatedConfig = { ...config };

    try {
      if (this.requestInterceptor.onRequest) {
        updatedConfig = this.requestInterceptor.onRequest(updatedConfig);
      }

      const fetchPromise = fetch(`${this.baseUrl}${url}`, {
        ...updatedConfig,
        signal,
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      const finalResponse = this.responseInterceptor.onResponse
        ? await this.responseInterceptor.onResponse(response as Response)
        : (response as Response);

      if (!finalResponse.ok) {
        throw new HttpError(
          `Network Error: ${finalResponse.status}`,
          finalResponse,
        );
      }

      return await finalResponse.json();
    } catch (error: unknown) {
      if (error instanceof HttpError && this.responseInterceptor.onError) {
        return await this.responseInterceptor.onError({
          response: error.response,
          originalRequest: updatedConfig,
        });
      }

      throw error;
    }
  }

  get<T>(url: string, config: Omit<RequestInit, "method"> = {}) {
    return this.request<T>(url, { ...config, method: "GET" });
  }

  post<T>(url: string, config: Omit<RequestInit, "method"> = {}) {
    const isFormData = config.body instanceof FormData;

    return this.request<T>(url, {
      ...config,
      method: "POST",
      headers: isFormData
        ? { ...config.headers }
        : {
            ...config.headers,
            "Content-Type": "application/json",
          },
    });
  }

  patch<T>(url: string, config: Omit<RequestInit, "method"> = {}) {
    const isFormData = config.body instanceof FormData;

    return this.request<T>(url, {
      ...config,
      method: "PATCH",
      headers: isFormData
        ? { ...config.headers }
        : {
            ...config.headers,
            "Content-Type": "application/json",
          },
    });
  }

  delete<T>(url: string, config: Omit<RequestInit, "method"> = {}) {
    return this.request<T>(url, { ...config, method: "DELETE" });
  }
}
