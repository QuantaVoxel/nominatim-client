import { OutputFormat, BaseResponse, Layer } from "./common.js";

export interface SearchRequest {
  /**
   * Free-form query string to search for.
   * Do not combine with structured search parameters like `street` or `city`.
   * @example '1600 Amphitheatre Parkway, Mountain View, CA'
   */
  q?: string;

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
   * The preferred area to find search results.
   * Given as a bounding box in the format: `<xmin>,<ymin>,<xmax>,<ymax>` (Left, Top, Right, Bottom).
   * @example '-0.1,51.5,0.0,51.6'
   */
  viewbox?: string;

  /**
   * Restrict search results strictly to the given `viewbox` area.
   * @default false
   */
  bounded?: boolean;

  /**
   * Include a breakdown of the address into structural elements in the results.
   * @default false
   */
  addressdetails?: boolean;

  /**
   * Include additional information available for the place (e.g. website, Wikipedia link, opening hours).
   * @default false
   */
  extratags?: boolean;

  /**
   * Include localized alternative names for the place in the response.
   * @default false
   */
  namedetails?: boolean;

  /**
   * Limit the number of returned results.
   * @minimum 1
   * @maximum 50
   * @default 10
   */
  limit?: number;

  /**
   * Preferred language order for the results. Accepts standard HTTP Accept-Language headers
   * or a simple comma-separated list of language codes.
   * @example 'en,fr-FR;q=0.9,ja;q=0.8'
   * @default 'unset' (Uses system/browser default locale)
   */
  accept_language?: string;

  /**
   * Limit search results to a specific country or list of countries.
   * Must be a comma-separated list of two-letter ISO 3166-1 alpha-2 codes.
   * @example 'us,ca,gb'
   * @default 'unset' (Searches globally)
   */
  countrycodes?: string;

  /**
   * Deduplicate the output results to prevent showing structurally identical locations.
   * @default true
   */
  dedupe?: boolean;
  /**
   * Layer filter for selecting places by explicit structural themes.
   * * See {@link Layer} for all available layer classifications.
   * @default 'unset'
   */
  layer?: Layer;
  /**
   * Exclude place_ids from the results.
   * comma-separated list of ids (OSM IDs where possible, otherwise place_ids or stable postcode refs)
   * @default 'unset'
   */
  exclude_place_ids?: string;
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
   * Include geometry of the place as a plain text coordinate string in the response.
   * Only one polygon format can be requested at a time.
   * @default false
   */
  polygon_text?: boolean;
}

export interface SearchResponse extends BaseResponse {}
