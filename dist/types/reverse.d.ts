import { OutputFormat, ReverseResponsePayload, Layer, JsonCallback } from "./common.js";
export interface ReverseRequest {
    /**
     * The latitude of the coordinate to reverse geocode in WGS84 projection.
     * @example 52.5200
     */
    lat: number | string;
    /**
     * The longitude of the coordinate to reverse geocode in WGS84 projection.
     * @example 13.4050
     */
    lon: number | string;
    /**
     * Level of detail required for the address. Maps roughly to XYZ tile zoom levels.
     * * Valid values map to specific address classifications:
     * - `3`: Country
     * - `5`: State
     * - `8`: County
     * - `10`: City
     * - `12`: Town / Borough
     * - `13`: Village / Suburb
     * - `14`: Neighbourhood
     * - `15`: Any settlement
     * - `16`: Major streets
     * - `17`: Major and minor streets
     * - `18`: Building
     * * @minimum 0
     * @maximum 18
     * @default 18
     */
    zoom?: number;
    /**
     * The output format for the results.
     * @default 'xml'
     */
    format?: OutputFormat;
    /**
     * Wrap JSON output in a callback function with the specified name (JSONP).
     * Only has an effect when a JSON output format is selected.
     * @default 'unset'
     */
    json_callback?: JsonCallback;
    /**
     * Include a structural breakdown of the address into discrete element keys.
     * @default true
     */
    addressdetails?: boolean;
    /**
     * Include extra metadata tags available for the place (e.g. website, phone, operator).
     * @default false
     */
    extratags?: boolean;
    /**
     * Include a full array of alternative names (e.g., localized variants, historical names).
     * @default false
     */
    namedetails?: boolean;
    /**
     * Include the explicit tagged entrance items inside the result geometry tracking.
     * @default false
     */
    entrances?: boolean;
    /**
     * Preferred language fallback configuration string for localized values.
     * Accepts a standard "Accept-Language" HTTP header format or comma-separated language codes.
     * @example 'en,fr;q=0.9'
     */
    accept_language?: string;
    /**
     * Selects places by explicit thematic layers.
     * Accepts a comma-separated list of multiple layer names.
     * @example 'address,poi'
     * @default 'address,poi'
     */
    layer?: Layer | string;
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
     * Simplifies output geometries (`polygon_*`) using a floating-point degree variance tolerance value.
     * Spatial topology is strictly preserved.
     * @default 0.0
     */
    polygon_threshold?: number;
    /**
     * Valid email address string to identify your application client if executing massive batch loops.
     * @example 'developer@quantavoxel.digital'
     */
    email?: string;
    /**
     * Output native developer debug metadata details in raw HTML format.
     * Overrides machine-readable responses.
     * @default false
     */
    debug?: boolean;
}
/**
 * Poly-typed reverse response mapping wrapper matching your specified configuration layout format.
 * Defaults to evaluating a single matching standard `JsonV2Response` record dictionary.
 */
export type ReverseResponse<F extends OutputFormat = "jsonv2"> = ReverseResponsePayload<F>;
