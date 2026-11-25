import { FILE_PATHS } from './eslint/constants'
import {
  ESLintCommentsPlugin,
  InclusiveLanguagePlugin,
  JestPlugin,
  NPlugin,
  PromisePlugin,
  SortDestructureKeysPlugin,
  SortExportsPlugin,
} from './eslint/plugins'
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

export default [{
  plugins: {
    'eslint-comments': ESLintCommentsPlugin,
    'inclusive-language': InclusiveLanguagePlugin,
    'n': NPlugin,
    'promise': PromisePlugin,
    'sort-destructure-keys': SortDestructureKeysPlugin,
    'sort-exports': SortExportsPlugin,
  },
  rules: {
    ...ESLintCommentsRules,
    ...InclusiveLanguageRules,
    ...NRules,
    ...PromiseRules,
    ...SortDestructureKeysRules,
    ...SortExportsRules,
  },
}, {
  files: FILE_PATHS.TESTS,
  languageOptions: {
    globals: {
      'jest/globals': true,
    },
  },
  plugins: {
    'jest': JestPlugin,
  },
  rules: {
    ...JestRules,
  },
}, {
  files: FILE_PATHS.TESTS_TYPESCRIPT,
  languageOptions: {
    globals: {
      'jest/globals': true,
    },
  },
  plugins: {
    'jest': JestPlugin,
  },
  rules: {
    ...JestTypescriptRules,
  },
}]
