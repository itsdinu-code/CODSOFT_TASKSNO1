import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      /**
       * The prototype serves its own photographs, which are already
       * optimised JPEGs cut to the size they are displayed at, and the
       * campaign artwork has to be letterboxed rather than cropped. Switching
       * to next/image would change the layout, so the rule is off and the
       * images carry explicit width, height and alt attributes instead.
       */
      "@next/next/no-img-element": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
