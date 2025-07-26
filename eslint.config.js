import globals from 'globals';
import js from '@eslint/js';
import jest from 'eslint-plugin-jest';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],  // Apply to all JS files
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      },
      ecmaVersion: "latest",
      sourceType: "module"
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off"
    }
  },
  {
    // Override for test files
    files: ['tests/**/*.js', '**/*.test.js'],  // Target your test folder/files
    ...jest.configs['flat/recommended'],  // Extend Jest's recommended config
    languageOptions: {
      globals: {
        ...globals.jest  // Add Jest globals like test, expect, describe
      }
    }
  }
];
