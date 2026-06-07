export type OutputFormat =
  | "xml"
  | "json"
  | "jsonv2"
  | "geojson"
  | "geocodejson";

/**
 * Type definition for JSONP callback parameters.
 * Can be a string matching a global function name or a direct function reference.
 */
export type JsonCallback = string | ((data: any) => void);

/**
 * Bounding box representation array tracking geographic boundaries.
 * Format: `[minLat, maxLat, minLon, maxLon]`
 * @example ["51.3473219", "51.6673219", "-0.2876474", "0.0323526"]
 */
export type BoundingBox = [
  minLat: string,
  maxLat: string,
  minLon: string,
  maxLon: string,
];

export interface NominatimAddress {
  continent?: string;
  country?: string;
  country_code?: string;
  region?: string;
  state?: string;
  state_district?: string;
  county?: string;
  municipality?: string;
  city?: string;
  town?: string;
  village?: string;
  city_district?: string;
  district?: string;
  borough?: string;
  suburb?: string;
  subdivision?: string;
  hamlet?: string;
  croft?: string;
  isolated_dwelling?: string;
  neighbourhood?: string;
  allotments?: string;
  quarter?: string;
  city_block?: string;
  residential?: string;
  farm?: string;
  farmyard?: string;
  industrial?: string;
  commercial?: string;
  retail?: string;
  road?: string;
  house_number?: string;
  house_name?: string;
  postcode?: string;
  [key: string]: string | undefined; // Fallback for highly localized OSM tagging mappings
}

export interface NominatimEntrance {
  /** The original internal Node classification key tracking tracking values inside OpenStreetMap. */
  osm_id: number;
  /** Explicit classification category assignment for the given asset gate entryway. */
  type: string;
  /** Floating-point precision string matching spatial latitude values. */
  lat: string;
  /** Floating-point precision string matching spatial longitude values. */
  lon: string;
  /** Extra dynamic key-value string records descriptive payloads explicitly bound to this ingress unit. */
  extratags?: Record<string, string>;
}

export interface SharedResponseFields {
  /** Sequential identifier index generated during native system setup tasks. Not persistent globally across mirrors. */
  place_id: number;
  /** OpenStreetMap attribution parameter verification text notice tracking data usage rules. */
  licence: string;
  /** Spatial node entity classification category type identifier. */
  osm_type: "node" | "way" | "relation" | string;
  /** Original sequence tracking key referencing the source item mapped inside OpenStreetMap database logs. */
  osm_id: string | number;
  /** Calculated coordinate centroid latitude value. */
  lat: string;
  /** Calculated coordinate centroid longitude value. */
  lon: string;
  /** Formal combined textual description output tracking full location parameters. */
  display_name: string;
  /** Bounding box boundary container matching coordinate extremities. */
  boundingbox: BoundingBox;
  /** Object wrapper tracking components mapping descriptive locations. Active when requested via addressdetails. */
  address?: NominatimAddress;
  /** Dynamic metadata payload tracking secondary features. Active when requested via extratags. */
  extratags?: Record<string, string>;
  /** Dictionary grouping full array naming variant entries. Active when requested via namedetails. */
  namedetails?: Record<string, string>;
  /** Dynamic array listing structural door, checkpoint or pathway ingress entries. Active when requested via entrances. */
  entrances?: NominatimEntrance[] | null;
}

/**
 * Standard Legacy Plain JSON output representation payload.
 */
export interface StandardJsonResponse extends SharedResponseFields {
  /** The primary core classification feature taxonomy label. */
  class: string;
  /** Explicit value assignment defining specific target behaviors. */
  type: string;
  /** Evaluation significance score float parameters tracking item layout priority scales. */
  importance: number;
  /** Optional visual layout icon string link pointing to graphical map markers. */
  icon?: string;
}

/**
 * Standard Contemporary JSONv2 output structural entity model payload format.
 */
export interface JsonV2Response extends SharedResponseFields {
  /** The primary feature category structural assignment taxonomy string (Replaces legacy `class`). */
  category: string;
  /** Explicit secondary property tag value describing localized attributes. */
  type: string;
  /** Internal indexing reference lookup hierarchy step assignment code integer. */
  place_rank: number;
  /** Calculated evaluation priority multiplier floating weight parameters. */
  importance: number;
  /** Fallback address element type tag key categorization matching context. */
  addresstype?: string;
  /** Isolated core assignment property title matching regional names. */
  name?: string;
  /** Optional imagery asset tracking reference pointing to icon designs. */
  icon?: string;
}

/**
 * Formal GeoJSON Feature Data Representation complying strictly with RFC 7946 specifications.
 */
export interface GeoJsonResponse {
  type: "FeatureCollection";
  licence: string;
  features: Array<{
    type: "Feature";
    properties: {
      place_id: number;
      osm_type: string;
      osm_id: string | number;
      category: string;
      type: string;
      place_rank: number;
      importance: number;
      display_name: string;
      address?: NominatimAddress;
      extratags?: Record<string, string>;
      namedetails?: Record<string, string>;
      entrances?: NominatimEntrance[] | null;
      icon?: string;
    };
    /** Spatial bounding container sequence: `[minLon, minLat, maxLon, maxLat]` matching standard GeoJSON layouts. */
    bbox: [number, number, number, number];
    /** High-fidelity vector spatial elements included when polygon format switches are active. */
    geometry: {
      type: "Point" | "Polygon" | "MultiPolygon" | string;
      coordinates: any;
    };
  }>;
}

/**
 * Formal GeocodeJSON Feature Representation conforming with Spec 0.1.0 standards.
 */
export interface GeocodeJsonResponse {
  type: "FeatureCollection";
  geocoding: {
    version: string;
    attribution: string;
    licence: string;
    query: string;
  };
  features: Array<{
    type: "Feature";
    properties: {
      geocoding: {
        place_id?: string | number;
        osm_type?: string;
        osm_id?: string | number;
        /** The administrative address level hierarchy ranking tag. */
        type:
          | "house"
          | "street"
          | "district"
          | "city"
          | "county"
          | "state"
          | "country"
          | "locality"
          | string;
        /** The original main taxonomy key derived from core database tags. */
        osm_key?: string;
        /** The matching target item tag mapping descriptor values. */
        osm_value?: string;
        /** Formatted full location address reference text. */
        label: string;
        /** Extracted default native local identifier identifier name string. */
        name?: string;
        housenumber?: string;
        street?: string;
        locality?: string;
        district?: string;
        postcode?: string;
        city?: string;
        county?: string;
        state?: string;
        country?: string;
        /** Explicit list container gathering dynamic administrative area titles. Active when requested via addressdetails. */
        admin?: Record<string, string>;
        /** Dictionary collection capturing secondary structural details. Active when requested via extratags. */
        extra?: Record<string, string>;
        entrances?: NominatimEntrance[] | null;
      };
    };
    geometry: {
      type: "Point" | "Polygon" | "MultiPolygon" | string;
      coordinates: any;
    };
  }>;
}

/**
 * Universal Unified Response mapper type selecting strict data outputs matching requested config options.
 */
export type SearchAndLookupResponse<F extends OutputFormat = "jsonv2"> =
  F extends "json"
    ? StandardJsonResponse[]
    : F extends "jsonv2"
      ? JsonV2Response[]
      : F extends "geojson"
        ? GeoJsonResponse
        : F extends "geocodejson"
          ? GeocodeJsonResponse
          : string; // XML uses a raw string template layer processing mechanism

export type ReverseResponsePayload<F extends OutputFormat = "jsonv2"> =
  F extends "json"
    ? StandardJsonResponse
    : F extends "jsonv2"
      ? JsonV2Response
      : F extends "geojson"
        ? GeoJsonResponse
        : F extends "geocodejson"
          ? GeocodeJsonResponse
          : string;

/**
 * Layer filter for selecting places by themes.
 */
export type Layer = "address" | "poi" | "railway" | "natural" | "manmade";

/**
 * Registry interface for dynamic Search and Lookup return signatures
 */
export interface SearchLookupFormatMap {
  json: StandardJsonResponse[];
  jsonv2: JsonV2Response[];
  geojson: GeoJsonResponse;
  geocodejson: GeocodeJsonResponse;
  xml: string;
}

/**
 * Registry interface for dynamic Reverse return signatures
 */
export interface ReverseFormatMap {
  json: StandardJsonResponse;
  jsonv2: JsonV2Response;
  geojson: GeoJsonResponse;
  geocodejson: GeocodeJsonResponse;
  xml: string;
}