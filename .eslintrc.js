module.exports = {
  "root": true,
  "extends": [
    "expo",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  "ignorePatterns": [
    ".expo",
    ".vscode",
    ".yarn",
    "assets",
    "dist",
    "expo-env.d.ts",
    "**/*.*js",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "project": [
      "tsconfig.json",
      "tsconfig.web.json",
    ],
  },
  "plugins": [
    "unused-imports",
    "import",
    "unicorn",
    "prettier",
  ],
  "settings": {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      "typescript": {
        "alwaysTryTypes": true,
      },
    },
  },
  "rules": {
    "@typescript-eslint/consistent-type-imports": ["error", {
      "fixStyle": "separate-type-imports",
    }],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        "multiline": {
          "delimiter": "semi",
          "requireLast": true,
        },
        "singleline": {
          "delimiter": "semi",
          "requireLast": false,
        },
      },
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "variable",
        "format": [
          "camelCase",
          "PascalCase",
          "UPPER_CASE",
        ],
        "leadingUnderscore": "allow",
      },
      {
        "selector": "function",
        "format": [
          "camelCase",
          "PascalCase",
        ],
      },
      {
        "selector": "typeLike",
        "format": [
          "PascalCase",
        ],
      },
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false,
        },
      },
    ],
    "@typescript-eslint/no-shadow": [
      "error",
      {
        "ignoreTypeValueShadow": true,
      },
    ],
    "curly": [
      "error",
      "all",
    ],
    "dot-notation": "error",
    "import/no-extraneous-dependencies": "error",
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true,
        },
        "newlines-between": "always",
      },
    ],
    "no-restricted-syntax": [
      "error",
      "ForInStatement",
      "LabeledStatement",
      "WithStatement",
    ],
    "no-void": [
      "error",
      {
        "allowAsStatement": true,
      },
    ],
    "prefer-destructuring": [
      "error",
      {
        "object": true,
        "array": true,
      },
      {
        "enforceForRenamedProperties": true,
      },
    ],
    "prettier/prettier": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        "additionalHooks": "(useAsync|useAppNavigation)",
      },
    ],
    "unicorn/no-null": "off",
    "unicorn/prevent-abbreviations": [
      "error",
      {
        "ignore": [
          "[Pp]rops",
          "[Rr]ef",
        ],
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_",
      },
    ],
  },
};
