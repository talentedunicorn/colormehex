import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  ...pluginVue.configs["flat/essential"],
  prettier,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
    languageOptions: {
      globals: {
        jest: true,
      },
    },
  },
  {
    ignores: ["dist/**", "coverage/**", "node_modules/**", ".*/**"],
  },
];
