import { OutputFormat, BaseResponse } from "./common.js";

export interface LookupRequest {
  /**
   * A comma-separated list of OpenStreetMap IDs.
   * Format requires a prefix matching the OSM entity type: `N` (node), `W` (way), or `R` (relation).
   * @example 'N123,W456,R789'
   * @maximum 50 IDs per request
   */
  osm_ids: string;

  /**
   * The output format for the results.
   * @default 'jsonv2'
   */
  format?: OutputFormat;

  /**
   * Include structural address field mappings in the response payload.
   * @default true
   */
  addressdetails?: boolean;

  /**
   * Include any extra key-value tag metadata associated with the entity.
   * @default false
   */
  extratags?: boolean;

  /**
   * Include full alternative name variations in the metadata.
   * @default false
   */
  namedetails?: boolean;

  /**
   * Preferred language order configuration for properties.
   * @example 'es,pt'
   * @default 'unset'
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
   * Include geometry of the place as a plain text coordinate string in the response.
   * Only one polygon format can be requested at a time.
   * @default false
   */
  polygon_text?: boolean;
}

export interface LookupResponse extends BaseResponse {}
