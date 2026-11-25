import { FILE_PATHS } from './eslint/constants'
import {
  ESLintCommentsRules,
  InclusiveLanguageRules,
  JestRules,
  JestTypescriptRules,
  NRules,
  PromiseRules,
  SortDestructureKeysRules,
  SortExportsRules,
} from './eslint/rules'

export default {
  env: {
    'jest/globals': true,
  },
  plugins: [
    'eslint-comments',
    'inclusive-language',
    'n',
    'promise',
    'sort-destructure-keys',
    'sort-exports',
  ],
  rules: {
    ...ESLintCommentsRules,
    ...InclusiveLanguageRules,
    ...NRules,
    ...PromiseRules,
    ...SortDestructureKeysRules,
    ...SortExportsRules,
  },
  overrides: [{
    files: FILE_PATHS.TESTS,
    plugins: [
      'jest',
    ],
    rules: {
      ...JestRules,
    },
  }, {
    files: FILE_PATHS.TESTS_TYPESCRIPT,
    plugins: [
      'jest',
    ],
    rules: {
      ...JestTypescriptRules,
    },
  }],
}
