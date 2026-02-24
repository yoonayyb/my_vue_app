import { defineConfig } from 'eslint-define-config';
import vueRecommended from 'eslint-plugin-vue/lib/configs/vue3-recommended.js';
import vuePlugin from 'eslint-plugin-vue';

export default defineConfig([
  {
    ignores: [
      // 将 .eslintignore 文件中的内容迁移到这里
      'node_modules/',
      'dist/',
      '*.min.js',
      '.vscode',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // 定义环境变量
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
      },
    },
    plugins: {
      // 添加 vue 插件
      vue: vuePlugin,
    },
    rules: {
      // 合并 vueRecommended 的规则
      ...vueRecommended.rules,
      // 'no-console': 'warn',
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 console 使用，开发环境中关闭规则
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off', // 生产环境中警告 debugger 使用，开发环境中关闭规则
      indent: ['warn', 2], // 缩进使用 4个空格 error
      'linebreak-style': ['warn', 'windows'], // 使用 Unix 风格的换行符
      quotes: ['warn', 'single'], // 使用单引号
      // semi: ['warn', 'never'], // 语句末尾不加分号
      'no-unused-vars': 'off', // 关闭未使用变量警告
      '@typescript-eslint/no-unused-vars': 'off', // 关闭未使用变量警告
      'vue/multi-word-component-names': 'off',
    },
  },
]);
