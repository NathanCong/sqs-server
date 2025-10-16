import typescriptParser from '@typescript-eslint/parser';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['.husky/', 'dist/', 'node_modules/'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: typescriptParser,
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    plugins: {
      '@typescript-eslint': eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      // TypeScript 规则
      ...eslintPluginTypescript.configs.recommended.rules,
      // Prettier 规则
      'prettier/prettier': 'warn',
      // 自定义规则
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
  },
  // 应用 Prettier 配置来禁用可能与 Prettier 冲突的规则
  eslintConfigPrettier,
];
