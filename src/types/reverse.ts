import { OutputFormat, BaseResponse, Layer } from "./common.js";

export interface ReverseRequest {
  /**
   * The latitude of the coordinate to reverse geocode.
   * @example 52.5200
   */
  lat: number | string;

  /**
   * The longitude of the coordinate to reverse geocode.
   * @example 13.4050
   */
  lon: number | string;

  /**
   * Level of detail required for the address. Maps to OSM zoom levels.
   * Valid values range from 0 to 18, with corresponding address detail levels:
   * 3: Country
   * 5: State
   * 8: County
   * 10: City
   * 12: Town / Borough
   * 13: Village / Suburb
   * 14: Neighbourhood
   * 15: Any settlement
   * 16: Major streets
   * 17: Major and minor streets
   * 18: Building
   * @minimum 0
   * @maximum 18
   * @default 18
   */
  zoom?: number;

  /**
   * The output format for the results.
   * @default 'jsonv2'
   */
  format?: OutputFormat;

  /**
   * Include a breakdown of the address elements in the response.
   * @default true
   */
  addressdetails?: boolean;

  /**
   * Include extra metadata available for the place (e.g., telephone, operator).
   * @default false
   */
  extratags?: boolean;

  /**
   * Include alternative dynamic or localized names in the response.
   * @default false
   */
  namedetails?: boolean;

  /**
   * Preferred language order for the localized responses.
   * @example 'de,en'
   * @default 'unset'
   */
  accept_language?: string;

  /**
   * Select which geometry layer to prioritize for features if multiple match.
   * see {@link Layer}
   * @default 'unset'
   */
  layer?: Layer;
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

export interface ReverseResponse extends BaseResponse {}
