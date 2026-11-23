import gts from 'gts';
import {defineConfig, globalIgnores} from 'eslint/config';

export default defineConfig([
  globalIgnores(['**/node_modules', '**/dist', '**/coverage', '**/results']),
  ...gts,
  {
    files: ['**/*.js'],
    languageOptions: {sourceType: 'module'},
  },
]);
