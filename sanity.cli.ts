import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_PROJECT_ID ?? "xb9y90ht",
    dataset: process.env.SANITY_DATASET ?? "production",
  },
  studioHost: "aorte",
});
