import * as T from "./types/index.js";
import {
  SearchLookupFormatMap,
  ReverseFormatMap,
  OutputFormat,
} from "./types/common.js";

export class NominatimClient {
  private baseUrl: string;
  private userAgent: string;

  constructor(options: { baseUrl?: string; userAgent: string }) {
    this.baseUrl = options.baseUrl || "https://nominatim.openstreetmap.org";
    this.userAgent = options.userAgent;

    if (!this.userAgent) {
      throw new Error(
        "Nominatim policy requires you to set a custom User-Agent identifying your application client.",
      );
    }
  }

  /**
   * Internal request orchestrator that translates booleans to 1/0, formats URLs,
   * and conditionally handles JSON parsing vs raw text processing.
   */
  private async request<TResponse>(
    endpoint: string,
    params: Record<string, any>,
  ): Promise<TResponse> {
    const urlParams = new URLSearchParams();
    let callbackFn: ((data: any) => void) | undefined;

    Object.entries(params).forEach(([key, val]) => {
      if (val === undefined || val === null) return;

      // Handle json_callback as a function
      if (key === "json_callback" && typeof val === "function") {
        callbackFn = val as (data: any) => void;
        urlParams.append(key, "callback");
      } else if (typeof val === "boolean") {
        // Transform booleans to numerical 1 or 0 flags to protect Nominatim's URL parser
        urlParams.append(key, val ? "1" : "0");
      } else {
        urlParams.append(key, String(val));
      }
    });

    const url = `${this.baseUrl}${endpoint}?${urlParams.toString()}`;
    const response = await fetch(url, {
      headers: { "User-Agent": this.userAgent },
    });

    if (!response.ok) {
      throw new Error(
        `Nominatim API HTTP Error: [${response.status}] ${response.statusText}`,
      );
    }

    const textPayload = await response.text();
    const currentFormat = params.format;

    // Detect if the format is a variant of JSON or if a JSONP callback is requested
    const isJsonExpected =
      (typeof currentFormat === "string" && currentFormat.includes("json")) ||
      !!params.json_callback;

    if (isJsonExpected) {
      try {
        let data: any;
        const trimmedPayload = textPayload.trim();

        // Automatically unwrap JSONP if a callback was requested
        if (params.json_callback) {
          // Supports alphanumeric, underscores, and dots in callback names
          const jsonMatch = trimmedPayload.match(
            /^[a-zA-Z0-9_.]+\((.*)\);?$/s,
          );
          if (jsonMatch) {
            data = JSON.parse(jsonMatch[1]);
          } else {
            data = JSON.parse(trimmedPayload);
          }
        } else {
          data = JSON.parse(trimmedPayload);
        }

        // Execute function callback if provided
        if (callbackFn) {
          callbackFn(data);
        }

        return data as TResponse;
      } catch {
        return textPayload as unknown as TResponse;
      }
    }

    return textPayload as unknown as TResponse;
  }

  // ==========================================
  // SEARCH ENDPOINT OVERLOADS
  // ==========================================
  public search<F extends OutputFormat>(
    params: Omit<T.SearchRequest, "format"> & { format: F },
  ): Promise<SearchLookupFormatMap[F]>;
  public search(
    params: Omit<T.SearchRequest, "format"> & { format?: undefined },
  ): Promise<SearchLookupFormatMap["jsonv2"]>;
  public search(params: any): Promise<any> {
    const requestParams = { format: "jsonv2", ...params };
    return this.request("/search", requestParams);
  }

  // ==========================================
  // REVERSE ENDPOINT OVERLOADS
  // ==========================================
  public reverse<F extends OutputFormat>(
    params: Omit<T.ReverseRequest, "format"> & { format: F },
  ): Promise<ReverseFormatMap[F]>;
  public reverse(
    params: Omit<T.ReverseRequest, "format"> & { format?: undefined },
  ): Promise<ReverseFormatMap["jsonv2"]>;
  public reverse(params: any): Promise<any> {
    const requestParams = { format: "jsonv2", ...params };
    return this.request("/reverse", requestParams);
  }

  // ==========================================
  // LOOKUP ENDPOINT OVERLOADS
  // ==========================================
  public lookup<F extends OutputFormat>(
    params: Omit<T.LookupRequest, "format"> & { format: F },
  ): Promise<SearchLookupFormatMap[F]>;
  public lookup(
    params: Omit<T.LookupRequest, "format"> & { format?: undefined },
  ): Promise<SearchLookupFormatMap["jsonv2"]>;
  public lookup(params: any): Promise<any> {
    const requestParams = { format: "jsonv2", ...params };
    return this.request("/lookup", requestParams);
  }

  // ==========================================
  // DETAILS ENDPOINT
  // ==========================================
  public details(
    params: Omit<T.DetailsRequest, "format"> & { format?: "json" },
  ): Promise<T.DetailsResponse> {
    const requestParams = { format: "json", ...params };
    return this.request<T.DetailsResponse>("/details", requestParams);
  }

  // ==========================================
  // STATUS ENDPOINT
  // ==========================================
  public status(
    params: Omit<T.StatusRequest, "format"> & { format?: "json" } = {},
  ): Promise<T.StatusResponse> {
    const requestParams = { format: "json", ...params };
    return this.request<T.StatusResponse>("/status", requestParams);
  }
}
