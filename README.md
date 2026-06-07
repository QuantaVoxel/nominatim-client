# @quantavoxel/nominatim-client

[![npm version](https://img.shields.io/npm/v/@quantavoxel/nominatim-client.svg)](https://www.npmjs.com/package/@quantavoxel/nominatim-client)
[![license](https://img.shields.io/npm/l/@quantavoxel/nominatim-client.svg)](https://github.com/Quantavoxel/nominatim-client/blob/main/LICENSE)

A type-safe, high-performance JavaScript/TypeScript client for the [Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/) (OpenStreetMap geocoding service).

## 🚀 Features

- **Type-Safe**: Fully typed request and response models for all Nominatim endpoints.
- **Modern**: Built for Node.js 18+ using native `fetch`.
- **Comprehensive**: Supports `search`, `reverse`, `lookup`, `details`, and `status`.
- **Format Flexibility**: Handles JSON, JSONv2, GeoJSON, and GeocodeJSON with automatic type switching.
- **Smart Parameters**: Automatically transforms boolean flags to API-compliant numerical values (`1`/`0`).
- **Improved JSONP**: Seamless support for `json_callback` using either strings or direct function references with automatic unwrapping.
- **Policy Compliant**: Ensures mandatory `User-Agent` identification as per Nominatim's usage policy.

## 📦 Installation

```bash
npm install @quantavoxel/nominatim-client
```

## 🛠 Quick Start

```typescript
import { NominatimClient } from '@quantavoxel/nominatim-client';

const client = new NominatimClient({
  userAgent: 'MyAwesomeApp/1.0 (contact@example.com)'
});

// Search for a location
const results = await client.search({
  q: 'Berlin',
  limit: 1
});

console.log(results[0].display_name); // "Berlin, Deutschland"
```

## 📖 API Documentation

### Search
Geocoding by address or query string.

```typescript
const results = await client.search({
  q: '1600 Amphitheatre Parkway, Mountain View, CA',
  format: 'geojson',
  addressdetails: true
});
```

### Reverse
Find an address from coordinates.

```typescript
const result = await client.reverse({
  lat: 52.5200,
  lon: 13.4050,
  zoom: 18
});
```

### Lookup
Retrieve details for multiple OpenStreetMap objects.

```typescript
const results = await client.lookup({
  osm_ids: 'R146656,W50637691,N240109189'
});
```

### Details
Get technical details for a single place.

```typescript
const details = await client.details({
  place_id: 12345678,
  addressdetails: true
});
```

### Status
Check the health and synchronization status of the Nominatim server.

```typescript
const status = await client.status();
console.log(status.message); // "OK"
```

## 🏠 Custom Base URL (Local Nominatim)

If you are running your own [local Nominatim instance](https://nominatim.org/release-docs/latest/admin/Installation/), you can point the client to your custom server by providing the `baseUrl` option.

```typescript
const client = new NominatimClient({
  userAgent: 'MyLocalApp/1.0',
  baseUrl: 'https://my-local-nominatim.example.com'
});
```

This is ideal for high-volume geocoding where you want to bypass the usage limits of the public OSM instance.

## ⚡️ Advanced Usage

### Automatic JSONP Unwrapping

The client includes advanced handling for `json_callback`. If you provide a function, the client will automatically unwrap the response and execute your function while still returning the parsed data.

```typescript
const data = await client.search({
  q: 'Makassar',
  json_callback: (data) => console.log('Callback executed!', data)
});
```

Even with string-based callbacks, the client automatically strips the wrapper so you get a clean object back:

```typescript
const data = await client.search({
  q: 'Jakarta',
  json_callback: 'myGlobalCallback'
});
// 'data' is already a parsed JSON object, not a string!
```

## ⚖️ Policy Compliance

Nominatim requires all clients to provide a descriptive `User-Agent`. The `NominatimClient` will throw an error if initialized without one.

```typescript
// ✅ Good
const client = new NominatimClient({ userAgent: 'MyGeocoderApp/1.1' });

// ❌ Bad
const client = new NominatimClient({ userAgent: '' }); // Throws Error
```

## 🧪 Testing

The project uses [Vitest](https://vitest.dev/) for unit testing.

```bash
npm test
npm run test:coverage
```

## 📄 License

MIT © [Quantavoxel](https://github.com/Quantavoxel)
