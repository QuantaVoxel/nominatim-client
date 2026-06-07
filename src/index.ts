import { NominatimClient } from "./client.js";

export { NominatimClient } from "./client.js";
export * from "./types/index.js";


const client = new NominatimClient({
  userAgent: "quanta-voxel",
});

console.log(
  await client.details({
    osmid: 11243159,
    osmtype: "W",
    format: "json",
  }),
);