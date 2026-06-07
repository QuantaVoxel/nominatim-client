export class NominatimClient {
    baseUrl;
    userAgent;
    constructor(options) {
        this.baseUrl = options.baseUrl || "https://nominatim.openstreetmap.org";
        this.userAgent = options.userAgent;
        if (!this.userAgent) {
            throw new Error("Nominatim policy requires you to set a custom User-Agent identifying your application client.");
        }
    }
    /**
     * Internal request orchestrator that translates booleans to 1/0, formats URLs,
     * and conditionally handles JSON parsing vs raw text processing.
     */
    async request(endpoint, params) {
        const urlParams = new URLSearchParams();
        let callbackFn;
        Object.entries(params).forEach(([key, val]) => {
            if (val === undefined || val === null)
                return;
            // Handle json_callback as a function
            if (key === "json_callback" && typeof val === "function") {
                callbackFn = val;
                urlParams.append(key, "callback");
            }
            else if (typeof val === "boolean") {
                // Transform booleans to numerical 1 or 0 flags to protect Nominatim's URL parser
                urlParams.append(key, val ? "1" : "0");
            }
            else {
                urlParams.append(key, String(val));
            }
        });
        const url = `${this.baseUrl}${endpoint}?${urlParams.toString()}`;
        const response = await fetch(url, {
            headers: { "User-Agent": this.userAgent },
        });
        if (!response.ok) {
            throw new Error(`Nominatim API HTTP Error: [${response.status}] ${response.statusText}`);
        }
        const textPayload = await response.text();
        const currentFormat = params.format;
        // Detect if the format is a variant of JSON or if a JSONP callback is requested
        const isJsonExpected = (typeof currentFormat === "string" && currentFormat.includes("json")) ||
            !!params.json_callback;
        if (isJsonExpected) {
            try {
                let data;
                const trimmedPayload = textPayload.trim();
                // Automatically unwrap JSONP if a callback was requested
                if (params.json_callback) {
                    // Supports alphanumeric, underscores, and dots in callback names
                    const jsonMatch = trimmedPayload.match(/^[a-zA-Z0-9_.]+\((.*)\);?$/s);
                    if (jsonMatch) {
                        data = JSON.parse(jsonMatch[1]);
                    }
                    else {
                        data = JSON.parse(trimmedPayload);
                    }
                }
                else {
                    data = JSON.parse(trimmedPayload);
                }
                // Execute function callback if provided
                if (callbackFn) {
                    callbackFn(data);
                }
                return data;
            }
            catch {
                return textPayload;
            }
        }
        return textPayload;
    }
    search(params) {
        const requestParams = { format: "jsonv2", ...params };
        return this.request("/search", requestParams);
    }
    reverse(params) {
        const requestParams = { format: "jsonv2", ...params };
        return this.request("/reverse", requestParams);
    }
    lookup(params) {
        const requestParams = { format: "jsonv2", ...params };
        return this.request("/lookup", requestParams);
    }
    // ==========================================
    // DETAILS ENDPOINT
    // ==========================================
    details(params) {
        const requestParams = { format: "json", ...params };
        return this.request("/details", requestParams);
    }
    // ==========================================
    // STATUS ENDPOINT
    // ==========================================
    status(params = {}) {
        const requestParams = { format: "json", ...params };
        return this.request("/status", requestParams);
    }
}
