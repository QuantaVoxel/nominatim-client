import * as T from "./types/index.js";

export class NominatimClient {
  private baseUrl: string;
  private userAgent: string;

  constructor(options: { baseUrl?: string; userAgent: string }) {
    this.baseUrl = options.baseUrl || "https://nominatim.openstreetmap.org";
    this.userAgent = options.userAgent;

    if (!this.userAgent) {
      throw new Error(
        "Nominatim policy requires you to set a custom User-Agent identifying your app.",
      );
    }
  }

  private async request<TResponse>(
    endpoint: string,
    params: Record<string, any>,
  ): Promise<TResponse> {
    // Inject json format by default if missing
    if (!params.format) params.format = "jsonv2";

    const urlParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined) urlParams.append(key, String(val));
    });

    const response = await fetch(
      `${this.baseUrl}${endpoint}?${urlParams.toString()}`,
      {
        headers: { "User-Agent": this.userAgent },
      },
    );

    if (!response.ok) {
      throw new Error(`Nominatim API HTTP Error: ${response.statusText}`);
    }

    return response.json() as Promise<TResponse>;
  }

  public search(params: T.SearchRequest): Promise<T.SearchResponse[]> {
    return this.request<T.SearchResponse[]>("/search", params);
  }

  public reverse(params: T.ReverseRequest): Promise<T.ReverseResponse> {
    return this.request<T.ReverseResponse>("/reverse", params);
  }

  public lookup(params: T.LookupRequest): Promise<T.LookupResponse[]> {
    return this.request<T.LookupResponse[]>("/lookup", params);
  }

  public status(params: T.StatusRequest = {}): Promise<T.StatusResponse> {
    return this.request<T.StatusResponse>("/status", params);
  }

  public details(params: T.DetailsRequest): Promise<T.DetailsResponse> {
    return this.request<T.DetailsResponse>("/details", params);
  }
}
