export interface DetailsRequest {
  /**
   * The internal Nominatim database identifier for a specific place.
   * If provided, `osmtype`, `osmid`, and `postcode` are ignored.
   * @example 85993608
   */
  place_id?: number;

  /**
   * The OpenStreetMap structural item code type. Must be combined with `osmid`.
   * `N` = Node, `W` = Way, `R` = Relation.
   */
  osmtype?: "N" | "W" | "R";

  /**
   * The numeric ID of the OpenStreetMap feature. Must be combined with `osmtype`.
   * @example 38210407
   */
  osmid?: number;

  /**
   * Optional optimization filter to distinguish between multiple entries when an OSM object
   * has more than one main tag (e.g. tourism=hotel and amenity=restaurant).
   * @example 'tourism'
   */
  class?: string;

  /**
   * Look up artificial postcodes that do not have an OSM object reference.
   * Format: `<country_code>:<postcode_id>`. Spaces are replaced with underscores.
   * @example 'us:94110' or 'gb:EH4_7EA'
   */
  postcode?: string;

  /**
   * Output formatting constraint. The Details endpoint primarily utilizes JSON output structures.
   * @default 'json'
   */
  format?: "json";

  /**
   * Wrap JSON output in a callback function with the given name (JSONP format handling).
   * @default 'unset'
   */
  json_callback?: string;

  /**
   * Include a structured breakdown of the address into structural elements.
   * @default false
   */
  addressdetails?: boolean;

  /**
   * Include a list of name keywords and address keywords in the result used for indexing search loops.
   * @default false
   */
  keywords?: boolean;

  /**
   * Include details of places that are linked with this one (e.g. nodes linked with administrative boundaries).
   * @default true
   */
  linkedplaces?: boolean;

  /**
   * Include details of Points of Interest (POIs) and addresses that depend structurally on the place.
   * @default false
   */
  hierarchy?: boolean;

  /**
   * When set to true, the output of the address hierarchy structural array list will be grouped by type.
   * @default false
   */
  group_hierarchy?: boolean;

  /**
   * Include full high-fidelity geometry boundaries of the result.
   * @default false
   */
  polygon_geojson?: boolean;

  /**
   * Include tagged entry and access point markers inside the result payload.
   * @default false
   */
  entrances?: boolean;

  /**
   * Preferred language fallback constraints list string or HTTP Accept-Language structure header.
   * @example 'fr,en-US;q=0.9'
   */
  accept_language?: string;
}

export interface DetailsResponse {
  /** The internal unique sequentially assigned identifier integer assigned by Nominatim. */
  place_id: number;

  /** The internal unique identifier of the administrative parent territory. */
  parent_place_id?: number;

  /** The structural OpenStreetMap classification type code identifier matching the asset source record. */
  osm_type?: "N" | "W" | "R" | string;

  /** The original tracking identification number inside the OpenStreetMap database. */
  osm_id?: number;

  /** Main underlying taxonomy class catalog tracking label. */
  category: string;

  /** The sub-type classification key matching the main OSM feature designation tags. */
  type: string;

  /** The specific administrative boundary level assignment depth configuration code. */
  admin_level?: string;

  /** Localized native default presentation label name text. */
  localname?: string;

  /** Dynamic multi-language dictionary mapping localized naming variants directly from OpenStreetMap tags. */
  names: Record<string, string>;

  /** Fallback inline address level assignment tags attached to the object (e.g., postcode data fields). */
  addresstags?: Record<string, string>;

  /** House number reference tracking label if attached directly to the place record location. */
  housenumber?: string | null;

  /** The calculated evaluation fallback postcode index value. */
  calculated_postcode?: string;

  /** Two-letter ISO 3166-1 alpha-2 lower-case country code configuration identifier. */
  country_code: string;

  /** Timestamp string tracking when this specific target item was evaluated and indexed. */
  indexed_date: string;

  /** Raw global calculated weight parameter floating point tracking relative value parameters. */
  importance: number;

  /** Corrected evaluation priority coefficient floating point tracking constraints. */
  calculated_importance: number;

  /** Extratags structure metadata records mapping key values like wikipedia or wikidata items. */
  extratags?: Record<string, string>;

  /** Specific target cross-reference string pointing to the matching Wikipedia portal entry layout. */
  calculated_wikipedia?: string;

  /** Evaluation rank numerical level assigned for address generation tasks. */
  rank_address: number;

  /** Evaluation rank numerical target assigned for active indexing lookup behaviors. */
  rank_search: number;

  /** Flag noting whether the place represents a spatial geometric polygon region instead of a clean point coordinate. */
  isarea: boolean;

  /** Mid-point coordinates array geolocation point wrapping parameters. */
  centroid: {
    type: "Point";
    coordinates: [longitude: number, latitude: number];
  };

  /** Spatial tracking coordinates mapping representation records structure. */
  geometry?: {
    type: string;
    coordinates: any;
  };

  /** Structural details array containing structural dictionary blocks mapping address breakdown parameters. */
  address?: Array<{
    localname: string;
    place_id: number;
    osm_id: number;
    osm_type: "N" | "W" | "R" | string;
    category: string;
    type: string;
    admin_level: number;
    [key: string]: any;
  }>;

  /** Dynamic catch-all signature for variable metadata structural variations returned via helper flags. */
  [key: string]: any;
}
