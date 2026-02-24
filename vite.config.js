import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { visualizer } from 'rollup-plugin-visualizer'
import viteImagemin from 'vite-plugin-imagemin'
import { lazyImport, VxeResolver } from 'vite-plugin-lazy-import'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
// import { createHtmlPlugin } from 'vite-plugin-html'
const pathSrc = path.resolve(__dirname, 'src')
console.log('🚀 ~ __dirname:', __dirname)
console.log('工作目录:', process.cwd())
console.log(process.env.NODE_ENV) // 输出当前的运行环境，如 "development" 或 "production"
const isProduction = process.env.NODE_ENV === 'production'
console.log('🚀 ~ isProduction:', isProduction)
// 外部化依赖（生产环境使用CDN）
const externals = {
  'vue': 'Vue',
  'vue-router': 'VueRouter',
 
}

// CDN 链接
const cdnUrls = {
  vue: 'https://unpkg.com/vue@3.5.21/dist/vue.global.prod.js',
  vueRouter: 'https://unpkg.com/vue-router@4.2.4/dist/vue-router.global.prod.js',
 
}

export default defineConfig(({ mode }) => {
  // 加载对应环境的 .env 文件
  const env = loadEnv(mode, process.cwd())
  console.log('🚀 ~ mode:', mode)
  console.log('🚀 ~ env:', env)
  

  return {
    define: {
      'process.env': env,// 将环境变量注入到客户端代码中
      __VUE_OPTIONS_API__: true,    // 必须为 true
      __VUE_PROD_DEVTOOLS__: false  // 生产环境禁用
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 确保路径正确
        '@stores': path.resolve(__dirname, 'src/stores'),
      },
    },
    base: '/',
    build: {
      // 生产环境配置
      minify: 'terser', // 使用 terser 进行压缩
      terserOptions: {
        compress: {
          drop_console: true, // 移除 console
          drop_debugger: true, // 移除 debugger
        },
      },
      rollupOptions: {
        externals: isProduction ? externals : {},
        treeshake: true,
        output: {
          // 第三方库单独打包
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
      // 打包后是否生成 source map 文件
      sourcemap: false,
      // 构建后是否生成代码报告
      reportCompressedSize: false,
      // chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
    },
    plugins: [
      vue(),
      // Gzip 压缩插件
      viteCompression({
        algorithm: 'gzip',// 压缩算法
        ext: '.gz',// 文件扩展名
        threshold: 0,// 只有大于 10KB 的文件才会压缩
        deleteOriginFile: false,// 压缩后是否删除源文件
        verbose: true,
        compressionOptions: { level: 9 },// gzip 压缩级别 1-9
      
        // 自定义成功提示
        success: () => {
          console.log('\n✅ Gzip 压缩完成！')
          console.log('📁 文件保存在: dist/ 目录')
          console.log('🔧 需要在服务器配置 gzip_static on;\n')
        },
      }),
      // Brotli 压缩（压缩率更高）
      viteCompression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240,
        deleteOriginFile: false,
        compressionOptions: {
          level: 11, // Brotli 压缩级别 0-11
        },
      }),
      eslintPlugin({
        cache: false,
        include: ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'],
        // 调试时可关闭构建失败（上线可移除或设为 true）
        failOnError: false,
      }),
      lazyImport({
        resolvers: [],
      }),
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', 'vue-router', 'pinia', {
          'vue': [
            'useTemplateRef',
          ],
        }],
        // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver(),
        ],
        dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
      }),
      // createHtmlPlugin({
      //   minify: isProduction,
      //   inject: {
      //     data: {
      //       // 注入环境变量到 HTML
      //       title: 'Vue 3 App',
      //       cdnVue: isProduction ? cdnUrls.vue : '',
      //       cdnVueRouter: isProduction ? cdnUrls.vueRouter : ''
           
      //     }
      //   }
      // }),
      Components({
        resolvers: [
          // Auto register icon components
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          }),
          // Auto register Element Plus components
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
        ],
        dts: path.resolve(pathSrc, 'components.d.ts'),
      }),
      Icons({
        autoInstall: true,
      }),
      // 图片压缩插件
      viteImagemin({
        plugins: [
          // 配置各种图片格式的压缩选项
          'gifsicle',
          'mozjpeg',
          'optipng',
          'pngquant',
          'webp',
        ],
        // 启用详细日志
        verbose: true,
        // 全局图片质量设置
        quality: 80,
        // 配置各个插件的选项
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false,
        },
        mozjpeg: {
          quality: 80,
        },
        optipng: {
          optimizationLevel: 7,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
        webp: {
          quality: 75,
        },
      }),
      // 打包分析插件
      visualizer({
        open: false, // 在浏览器中自动打开分析报告
        gzipSize: true, // 显示 gzip 大小
        brotliSize: true, // 显示 brotli 大小
        filename: 'stats.html', // 分析报告文件名
      }),
    ],
  }
})
