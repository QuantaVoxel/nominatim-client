import { describe, it, expect, beforeAll, afterAll, afterEach, vi } from "vitest";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";
import { NominatimClient } from "../src/client.js";

const handlers = [
  http.get("https://nominatim.openstreetmap.org/search", ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const format = url.searchParams.get("format");
    const json_callback = url.searchParams.get("json_callback");

    let data: any = [{ place_id: 1, display_name: "Mock Search Result" }];

    if (format === "geojson") {
      data = {
        type: "FeatureCollection",
        features: [{ type: "Feature", properties: { place_id: 1 } }],
      };
    }

    if (json_callback) {
      return HttpResponse.text(`${json_callback}(${JSON.stringify(data)});`);
    }

    return HttpResponse.json(data);
  }),

  http.get("https://nominatim.openstreetmap.org/reverse", () => {
    return HttpResponse.json({ place_id: 1, display_name: "Mock Reverse Result" });
  }),

  http.get("https://nominatim.openstreetmap.org/lookup", () => {
    return HttpResponse.json([{ place_id: 1, display_name: "Mock Lookup Result" }]);
  }),

  http.get("https://nominatim.openstreetmap.org/details", () => {
    return HttpResponse.json({ place_id: 1, category: "boundary" });
  }),

  http.get("https://nominatim.openstreetmap.org/status", () => {
    return HttpResponse.json({ status: 0, message: "OK" });
  }),
];

const server = setupServer(...handlers);

describe("NominatimClient", () => {
  const client = new NominatimClient({ userAgent: "test-agent" });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should throw error if userAgent is missing", () => {
    expect(() => new NominatimClient({ userAgent: "" })).toThrow("Nominatim policy");
  });

  describe("search", () => {
    it("should perform a basic search", async () => {
      const results = await client.search({ q: "test" });
      expect(results).toBeInstanceOf(Array);
      expect(results[0].display_name).toBe("Mock Search Result");
    });

    it("should handle geojson format", async () => {
      const results = await client.search({ q: "test", format: "geojson" });
      expect(results.type).toBe("FeatureCollection");
    });

    it("should handle json_callback as string", async () => {
      const results = await client.search({
        q: "test",
        format: "json",
        json_callback: "myCallback",
      });
      expect(results[0].display_name).toBe("Mock Search Result");
    });

    it("should handle json_callback as function", async () => {
      const callback = vi.fn();
      const results = await client.search({
        q: "test",
        format: "geojson",
        json_callback: callback,
      });
      expect(callback).toHaveBeenCalledWith(results);
      expect(results.type).toBe("FeatureCollection");
    });
  });

  describe("reverse", () => {
    it("should perform reverse geocoding", async () => {
      const result = await client.reverse({ lat: 0, lon: 0 });
      expect(result.display_name).toBe("Mock Reverse Result");
    });
  });

  describe("lookup", () => {
    it("should perform lookup", async () => {
      const results = await client.lookup({ osm_ids: "R123" });
      expect(results[0].display_name).toBe("Mock Lookup Result");
    });
  });

  describe("details", () => {
    it("should get details", async () => {
      const result = await client.details({ place_id: 1 });
      expect(result.category).toBe("boundary");
    });
  });

  describe("status", () => {
    it("should get status", async () => {
      const result = await client.status();
      expect(result.status).toBe(0);
      expect(result.message).toBe("OK");
    });
  });

  describe("json_callback", () => {
    it("should handle callback names with dots", async () => {
      const results = await client.search({
        q: "test",
        json_callback: "jQuery.fn.callback",
      });
      expect(results[0].display_name).toBe("Mock Search Result");
    });

    it("should handle JSONP without trailing semicolon", async () => {
      server.use(
        http.get("https://nominatim.openstreetmap.org/search", () => {
          return HttpResponse.text('cb({"foo":"bar"})');
        })
      );
      const results = await client.search({ q: "test", json_callback: "cb" });
      expect(results.foo).toBe("bar");
    });

    it("should handle JSONP with whitespace", async () => {
      server.use(
        http.get("https://nominatim.openstreetmap.org/search", () => {
          return HttpResponse.text('  cb({"foo":"bar"});  ');
        })
      );
      const results = await client.search({ q: "test", json_callback: "cb" });
      expect(results.foo).toBe("bar");
    });

    it("should fallback to raw text if unwrapping fails", async () => {
      server.use(
        http.get("https://nominatim.openstreetmap.org/search", () => {
          return HttpResponse.text("Invalid JSONP wrapper");
        })
      );
      const results = await client.search({ q: "test", json_callback: "cb" });
      expect(results).toBe("Invalid JSONP wrapper");
    });

    it("should force JSON parsing if json_callback is present even if format is missing", async () => {
      server.use(
        http.get("https://nominatim.openstreetmap.org/search", ({ request }) => {
          const url = new URL(request.url);
          const cb = url.searchParams.get("json_callback");
          return HttpResponse.text(`${cb}({"status":"ok"});`);
        })
      );
      // search defaults to jsonv2, but let's test a case where format might be explicitly undefined
      const results = await client.search({ q: "test", json_callback: "cb" } as any);
      expect(results.status).toBe("ok");
    });
  });

  it("should transform booleans to 1/0", async () => {
    let capturedUrl: URL | undefined;
    server.use(
      http.get("https://nominatim.openstreetmap.org/search", ({ request }) => {
        capturedUrl = new URL(request.url);
        return HttpResponse.json([]);
      })
    );

    await client.search({ q: "test", addressdetails: true, extratags: false });
    expect(capturedUrl?.searchParams.get("addressdetails")).toBe("1");
    expect(capturedUrl?.searchParams.get("extratags")).toBe("0");
  });

  it("should handle HTTP errors", async () => {
    server.use(
      http.get("https://nominatim.openstreetmap.org/status", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    await expect(client.status()).rejects.toThrow("Nominatim API HTTP Error: [500]");
  });
});
