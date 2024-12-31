import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.js"], 
    ignores: ["node_modules/", "dist/", "coverage/"], 
    languageOptions: {
      ecmaVersion: "latest", 
      sourceType: "module", 
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error", 
    },
  },
  pluginJs.configs.recommended,
];
