//eslint.config.js

import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import next from "eslint-config-next";
import globals from "globals";
import prettier from "eslint-config-prettier";

import importPlugin from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
    { 
        ignores: [
        "node_modules",
        ".next",
        "dist",
        "build",
        "converage",
        ".config.js",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...next,
    prettier,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            import: importPlugin,
            "simple-import-sort": simpleImportSort,
            "unused-imports": unusedImports,
            react,
            "react-hooks": reactHooks,
        },
        settings: {
            react: {
                version: "detect",
            },
        },
        rules: {
            complexity: ["warn", 10],
            "max-depth": ["warn", 4],
            
            "simple-import-sort/imports": "warn",
            "simple-import-sort/exports": "warn",

            "import/no-cycle": "error",
            "import/no-duplicates": "error",

            "unused-imports/no-unused-imports": "warn",
            "unused-imports/no-unused-vars": [
                "warn", 
                {
                    vars: "all",
                    varsIgnorePattern: "^_",
                    args: "after-used",
                    argsIgnorePattern: "^_",
                },
            ],

            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/jsx-key": "error",
            "react/jsx-no-useless-fragment": "warn",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
        },
    },
]);

