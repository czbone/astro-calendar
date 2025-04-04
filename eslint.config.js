import eslint from '@eslint/js'
import typescriptParser from '@typescript-eslint/parser'
import astroEslintParser from 'astro-eslint-parser'
import eslintPluginAstro from 'eslint-plugin-astro'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs['flat/recommended'],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // セミコロン省略スタイル
      semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      'semi-spacing': ['error', { after: true, before: false }],
      'semi-style': ['error', 'first'],
      'no-extra-semi': 'error',
      'no-unexpected-multiline': 'error',
      'no-unreachable': 'error',

      // セキュリティ関連のルール
      'no-eval': 'error',
      'no-implied-eval': 'error',
      'no-unsafe-finally': 'error',
      'no-unsafe-negation': 'error',

      // コード品質の向上
      'max-len': [
        'warn',
        { code: 100, ignoreUrls: true, ignoreStrings: true, ignoreTemplateLiterals: true }
      ],
      complexity: ['warn', { max: 10 }],

      // パフォーマンス最適化
      'no-await-in-loop': 'warn'
    }
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      }
    }
  },
  {
    files: ['**/*.{js,jsx,astro}'],
    rules: {
      'no-mixed-spaces-and-tabs': ['error', 'smart-tabs']
    }
  },
  {
    files: ['**/*.{ts,tsx}', '**/*.astro/*.js'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd()
      }
    },
    rules: {
      // Note: you must disable the base rule as it can report incorrect errors
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/triple-slash-reference': 'off',

      // TypeScriptの厳格化
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/strict-boolean-expressions': 'warn'
    }
  },
  {
    ignores: ['dist', 'node_modules', '.github', 'types.generated.d.ts', '.astro']
  }
]
