import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ---------------------------------------------------------------------
// IMPORTANT for GitHub Pages:
// If you deploy to https://<username>.github.io/<repo-name>/
// set `base` below to "/<repo-name>/" (with leading and trailing slash).
//
// If you deploy to a user/organization root site
// (https://<username>.github.io/) or use a custom domain, set base to "/".
// ---------------------------------------------------------------------
export default defineConfig({
  plugins: [react()],
  base: "/smart-neck/",
});
