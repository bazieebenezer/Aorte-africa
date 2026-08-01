import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schema";

const projectId = process.env.SANITY_PROJECT_ID ?? "xb9y90ht";
const dataset = process.env.SANITY_DATASET ?? "production";

export default defineConfig({
  name: "aorte",
  title: "Aorte Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
