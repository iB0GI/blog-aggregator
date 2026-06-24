import { readConfig } from "./src/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/schema.ts",
  out: "src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: readConfig().dbUrl,
  },
});
