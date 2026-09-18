import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // OpenNext's bundle. Not in eslint-config-next's defaults, and it is
    // ~187 generated files — linting it buries the src findings under
    // fourteen thousand problems.
    ".open-next/**",
  ]),
]);

export default eslintConfig;
