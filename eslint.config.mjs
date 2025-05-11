import { globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-unused-vars": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  globalIgnores([
    "node_modules",
    "*.config.mjs",
    "*.config.js",
    "dist",
    "src/*.gen.ts",
  ]),
);
