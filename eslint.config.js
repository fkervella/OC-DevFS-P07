//eslint.config.js

import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import next from 'eslint-config-next';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsdoc from 'eslint-plugin-jsdoc';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  {
    ignores: [
      'node_modules',
      '.next',
      'dist',
      'build',
      'coverage',
      '.config.js',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next,
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort,
      'unused-imports': unusedImports,
      react,
      'react-hooks': reactHooks,
      jsdoc,
    },
    settings: {
      react: {
        version: 'detect',
      },
      jsdoc: {
        tagNamePreference: {
          returns: 'return',
        },
      },
    },
    rules: {
      // Règles générales
      complexity: ['warn', 10],
      'max-depth': ['warn', 4],

      // Règles pour les imports
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',

      // Règles pour les imports inutilisés
      'unused-imports/no-unused-imports': 'warn',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // Règles pour React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': 'error',
      'react/jsx-no-useless-fragment': 'warn',

      // Règles pour les hooks React
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Règles pour JSDoc
      'jsdoc/require-description': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-description': 'error',
      'jsdoc/require-throws': 'error',
      'jsdoc/valid-types': 'error',
    },
  },
]);
