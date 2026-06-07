import { OutputFormat, SearchAndLookupResponse, Layer, JsonCallback } from "./common.js";
/**
 * Feature type granular filter constraints for the address layer.
 */
export type FeatureType = "country" | "state" | "city" | "settlement";
export interface SearchRequest {
    /**
     * Free-form query string to search for.
     * Can be unstructured and contains special phrases (e.g., 'pub').
     * * @attention Cannot be combined with structured parameters (e.g., `street`, `city`).
     * @example '1600 Amphitheatre Parkway, Mountain View, CA'
     */
    q?: string;
    /**
     * Name and/or type of Point of Interest (POI). Part of a structured search.
     * @example 'bakery'
     */
    amenity?: string;
    /**
     * House number and street name. Part of a structured search.
     * @example 'Unter den Linden 1'
     */
    street?: string;
    /**
     * City name. Part of a structured search.
     * @example 'Berlin'
     */
    city?: string;
    /**
     * County name. Part of a structured search.
     */
    county?: string;
    /**
     * State name. Part of a structured search.
     * @example 'California'
     */
    state?: string;
    /**
     * Country name. Part of a structured search.
     * @example 'Germany'
     */
    country?: string;
    /**
     * Postal code / ZIP code. Part of a structured search.
     * @example '10117'
     */
    postalcode?: string;
    /**
     * The output format for the results.
     * @default 'jsonv2'
     */
    format?: OutputFormat;
    /**
     * Wrap JSON output in a dynamic JavaScript callback function (JSONP setup).
     * Only has an effect for JSON output formats.
     * @default 'unset'
     */
    json_callback?: JsonCallback;
    /**
     * Limit the maximum number of returned results.
     * @minimum 1
     * @maximum 40
     * @default 10
     */
    limit?: number;
    /**
     * Include a breakdown of the address into elements in the results.
     * @default false
     */
    addressdetails?: boolean;
    /**
     * Include additional metadata available in the database (e.g., website, opening hours).
     * @default false
     */
    extratags?: boolean;
    /**
     * Include a full list of alternative names (language variants, brand variations, etc.).
     * @default false
     */
    namedetails?: boolean;
    /**
     * Include tagged entrance points in the result payload.
     * @default false
     */
    entrances?: boolean;
    /**
     * Preferred language order for showing search results.
     * Accepts a simple comma-separated list of language codes or an HTTP "Accept-Language" header.
     * @example 'en,fr-FR;q=0.9,ja;q=0.8'
     */
    accept_language?: string;
    /**
     * Hard filter limiting search results strictly to one or more countries.
     * Must be a comma-separated list of two-letter ISO 3166-1 alpha-2 codes.
     * @example 'us,ca,gb'
     * @default 'unset' (Searches globally)
     */
    countrycodes?: string;
    /**
     * Filter that selects places by explicit thematic layers.
     * Accepts a comma-separated list of multiple layer names.
     * @example 'address,poi'
     * @default 'unset' (No restriction)
     */
    layer?: Layer | string;
    /**
     * Fine-grained selection for explicit places derived from the address layer.
     * Automatically restricts results strictly to the address layer.
     * See {@link FeatureType} for variations.
     * @default 'unset'
     */
    featureType?: FeatureType;
    /**
     * A comma-separated list of identifiers to bypass and skip in the results.
     * Entries can be internal `place_ids`, standard OSM entries (`N123`), or postcodes (`Pus:94110`).
     * @default 'unset'
     */
    exclude_place_ids?: string;
    /**
     * Focuses and boosts search parameters around the given rectangular geographic coordinates boundary.
     * Format: `<x1>,<y1>,<x2>,<y2>` where x is longitude and y is latitude.
     * @example '-0.1,51.5,0.0,51.6'
     */
    viewbox?: string;
    /**
     * When true, turns the `viewbox` parameter into a strict filter, excluding any results outside it.
     * @default false
     */
    bounded?: boolean;
    /**
     * Include geometry of the place as a GeoJSON Polygon or MultiPolygon in the response.
     * Only one polygon format can be requested at a time.
     * @default false
     */
    polygon_geojson?: boolean;
    /**
     * Include geometry of the place as a KML Polygon in the response.
     * Only one polygon format can be requested at a time.
     * @default false
     */
    polygon_kml?: boolean;
    /**
     * Include geometry of the place as an SVG path string in the response.
     * Only one polygon format can be requested at a time.
     * @default false
     */
    polygon_svg?: boolean;
    /**
     * Include geometry of the place as a plain text Well-Known Text (WKT) string in the response.
     * Only one polygon format can be requested at a time.
     * @default false
     */
    polygon_text?: boolean;
    /**
     * Describes a tolerance threshold constraint in degrees to return a simplified version of the polygon geometry.
     * Topology is strictly preserved.
     * @default 0.0
     */
    polygon_threshold?: number;
    /**
     * Valid email address to identify your client stack if making a high volume of requests.
     * @example 'developer@quantavoxel.digital'
     */
    email?: string;
    /**
     * Deduplicate output records to group overlapping OSM components identifying the exact same location.
     * @default true
     */
    dedupe?: boolean;
    /**
     * Output assorted developer debug information in HTML format overriding machine-readable formats.
     * @default false
     */
    debug?: boolean;
}
/**
 * Poly-typed search response mapping object matching your chosen configuration format.
 * Defaults to evaluating arrays of standard `JsonV2Response` elements.
 */
export type SearchResponse<F extends OutputFormat = "jsonv2"> = SearchAndLookupResponse<F>;
