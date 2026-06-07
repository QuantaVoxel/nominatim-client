export interface StatusRequest {
  /**
   * Output structure configuration. Text returns a plain format string, JSON returns a structured payload.
   * @default 'json'
   */
  format?: "text" | "json";
}

export interface StatusResponse {
  /**
   * Status code integer. `0` indicates the server and database are healthy.
   * Any other code indicates a service or synchronization error.
   */
  status: number;

  /**
   * Health message description corresponding to the status code.
   * @example 'OK'
   */
  message: string;

  /**
   * Timestamp string denoting when the underlying OpenStreetMap database was last synced.
   * @example '2026-06-07T12:00:00+00:00'
   */
  data_updated_string?: string;

  /**
   * The software version configuration currently executing on the host environment.
   * @example '4.4.0'
   */
  software_version?: string;

  /**
   * The version metadata matching the database schema initialization layout.
   * @example '0.4.4'
   */
  database_version?: string;
}
