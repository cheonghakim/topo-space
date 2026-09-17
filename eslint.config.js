// @ts-check
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "demo-dist/**",
      "docs/**",
      "coverage/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".vue"],
      },
    },
  },
  {
    rules: {
      // Editor internals use plenty of intentionally-unused destructured
      // params/catch bindings; only flag ones that aren't prefixed with `_`.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "vue/multi-word-component-names": "off",
      "vue/no-v-html": "error",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.bench.test.ts", "tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  eslintConfigPrettier,
);
