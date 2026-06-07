import * as T from "./types/index.js";
import { SearchLookupFormatMap, ReverseFormatMap, OutputFormat } from "./types/common.js";
export declare class NominatimClient {
    private baseUrl;
    private userAgent;
    constructor(options: {
        baseUrl?: string;
        userAgent: string;
    });
    /**
     * Internal request orchestrator that translates booleans to 1/0, formats URLs,
     * and conditionally handles JSON parsing vs raw text processing.
     */
    private request;
    search<F extends OutputFormat>(params: Omit<T.SearchRequest, "format"> & {
        format: F;
    }): Promise<SearchLookupFormatMap[F]>;
    search(params: Omit<T.SearchRequest, "format"> & {
        format?: undefined;
    }): Promise<SearchLookupFormatMap["jsonv2"]>;
    reverse<F extends OutputFormat>(params: Omit<T.ReverseRequest, "format"> & {
        format: F;
    }): Promise<ReverseFormatMap[F]>;
    reverse(params: Omit<T.ReverseRequest, "format"> & {
        format?: undefined;
    }): Promise<ReverseFormatMap["jsonv2"]>;
    lookup<F extends OutputFormat>(params: Omit<T.LookupRequest, "format"> & {
        format: F;
    }): Promise<SearchLookupFormatMap[F]>;
    lookup(params: Omit<T.LookupRequest, "format"> & {
        format?: undefined;
    }): Promise<SearchLookupFormatMap["jsonv2"]>;
    details(params: Omit<T.DetailsRequest, "format"> & {
        format?: "json";
    }): Promise<T.DetailsResponse>;
    status(params?: Omit<T.StatusRequest, "format"> & {
        format?: "json";
    }): Promise<T.StatusResponse>;
}
