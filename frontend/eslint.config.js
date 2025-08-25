import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react'; // ADICIONADO
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y'; // ADICIONADO
import prettier from 'eslint-plugin-prettier/recommended'; // ADICIONADO
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    prettier,
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      ecmaVersion: 'latest', // Simplificado para 'latest'
      sourceType: 'module',
      globals: {
        ...globals.browser, // Adiciona todas as globais do navegador
        ...globals.node, // Adiciona as globais do Node.js, se necessário
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    // ADICIONADO: Configurações específicas do plugin React
    settings: {
      react: {
        version: 'detect', // Detecta automaticamente a versão do React
      },
    },
    rules: {
      // Ativa as configurações recomendadas dos plugins
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules, // ADICIONADO
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules, // ADICIONADO

      // Regras personalizadas
      'react/react-in-jsx-scope': 'off', // Essencial para projetos Vite/React 17+
      'react-refresh/only-export-components': 'warn',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
]);