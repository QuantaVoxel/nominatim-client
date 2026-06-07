export type OutputFormat =
  | "xml"
  | "json"
  | "jsonv2"
  | "geojson"
  | "geocodejson";

export type BoundingBox = [string, string, string, string]; // [minLat, maxLat, minLon, maxLon]

export interface NominatimAddress {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  city?: string;
  county?: string;
  state_district?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
  [key: string]: string | undefined; // Fallback for dynamic localized fields
}

export interface BaseResponse {
  place_id: number;
  licence: string;
  osm_type: "node" | "way" | "relation";
  osm_id: number;
  lat: string;
  lon: string;
  category: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  boundingbox: BoundingBox;
  address?: NominatimAddress;
  extratags?: Record<string, string>;
  namedetails?: Record<string, string>;
}
/**
 * Layer filter for selecting places by themes.
 * 
 * @description The layer filter allows to select places by themes.
 * @address The address layer contains all places that make up an address: address points with house numbers, streets, inhabited places (suburbs, villages, cities, states etc.) and administrative boundaries.
 * @poi The poi layer selects all point of interest. This includes classic POIs like restaurants, shops, hotels but also less obvious features like recycling bins, guideposts or benches.
 * @railway The railway layer includes railway infrastructure like tracks. Note that in Nominatim's standard configuration, only very few railway features are imported into the database.  
 * @natural The natural layer collects features like rivers, lakes and mountains while the manmade layer functions as a catch-all for features not covered by the other layers.
 * @manmade The manmade layer functions as a catch-all for features not covered by the other layers.
 */

export type Layer = "address" | "poi" | "railway" | "natural" | "manmade";
