# nominatim-client

A type-safe JavaScript/TypeScript client for the [Nominatim API](https://nominatim.org/release-docs/latest/api/Overview/) (OpenStreetMap geocoding service).

## Project Overview

This library provides a high-level, strongly typed interface for geocoding, reverse geocoding, and administrative lookup operations using Nominatim. It is designed for modern Node.js environments (v18+) and leverages native `fetch`.

### Key Features
- **Type-Safe Endpoints**: Supports `search`, `reverse`, `lookup`, `details`, and `status`.
- **Format Flexibility**: Handles multiple output formats including JSON, JSONv2, GeoJSON, and GeocodeJSON with corresponding TypeScript interfaces.
- **Strict Policy Compliance**: Enforces the requirement for a custom `User-Agent` as per Nominatim's usage policy.
- **Ease of Use**: Automatically transforms boolean parameters and handles URL encoding.

## Building and Running

### Prerequisites
- **Node.js**: >= 18.0.0
- **Package Manager**: npm (or yarn/pnpm)

### Commands
- **Build**: `npm run build` - Compiles TypeScript to JavaScript in the `dist/` directory.
- **Run Example**: `npm start` - Executes the demonstration client in `src/index.ts` using `tsx`.
- **Lint/Format**: (TODO: Standard linting/formatting tools are not yet configured in `package.json`).
- **Test**: (TODO: Testing framework is not yet configured).

## Development Conventions

### Architecture
- **Main Client**: The `NominatimClient` class in `src/client.ts` is the primary entry point.
- **Type Definitions**: All API request and response models are located in `src/types/`. The client uses overloads to ensure the returned promise resolves to the correct type based on the `format` parameter.
- **ESM**: The project uses ECMAScript Modules (`type: "module"`). Always use `.js` extensions in import statements.

### Coding Style
- **Strict Typing**: Avoid `any` where possible. Use the provided generics and overloads to maintain type safety.
- **Documentation**: Use JSDoc comments to document types, especially for complex API fields.
- **User-Agent**: Every instance of `NominatimClient` MUST be initialized with a descriptive `userAgent`.

### Implementation Details
- **Boolean Transformation**: The client automatically converts boolean values to `1` or `0` for API compatibility.
- **Improved JSONP Handling**: The `json_callback` parameter now supports both string names and direct callback functions. When a function is provided, the client automatically unwraps the JSONP response, parses the data, and executes the callback. String-based callbacks also benefit from automatic unwrapping for easier use with `fetch`.
