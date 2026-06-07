import { OutputFormat, SearchAndLookupResponse } from "./common.js";

export interface LookupRequest {
  /**
   * A comma-separated list of OpenStreetMap IDs.
   * Each ID must be prefixed with its type: `N` (node), `W` (way), or `R` (relation).
   * @maximum 50 IDs per request.
   * @example 'R146656,W50637691,N240109189'
   */
  osm_ids: string;

  /**
   * The output format for the results.
   * @default 'jsonv2'
   */
  format?: OutputFormat;

  /**
   * Wrap JSON output in a callback function with the specified name (JSONP).
   * Only has an effect when a JSON output format is selected.
   * @default 'unset'
   */
  json_callback?: string;

  /**
   * Include a structural breakdown of the address into discrete element keys.
   * @default true
   */
  addressdetails?: boolean;

  /**
   * Include any additional information available in the database (e.g. website, wikipedia link, opening hours).
   * @default false
   */
  extratags?: boolean;

  /**
   * Include a full list of name variants for the result (e.g. language variants, older names, references, brands).
   * @default false
   */
  namedetails?: boolean;

  /**
   * Include tagged entrance nodes in the result payload.
   * @default false
   */
  entrances?: boolean;

  /**
   * Preferred language order for showing search results.
   * Accepts a standard "Accept-Language" HTTP header string or comma-separated language codes.
   * @example 'en,fr-FR;q=0.9,ja;q=0.8'
   */
  accept_language?: string;

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
   * Valid email address string to identify your application client if making a high volume of requests.
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
 * Poly-typed lookup response mapping wrapper matching your target configuration format.
 * Defaults to evaluating arrays of standard `JsonV2Response` element rows.
 */
export type LookupResponse<F extends OutputFormat = "jsonv2"> =
  SearchAndLookupResponse<F>;
