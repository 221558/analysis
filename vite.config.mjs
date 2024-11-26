import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import createVitePlugins from './vite/plugins';
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  // 根据环境模式加载对应的环境变量
  const env = loadEnv(mode, process.cwd());
  // 从环境变量中提取应用基础路径和URL
  const { VITE_APP_BASE, VITE_APP_BASE_URL } = env;

  // 返回Vite配置对象
  return defineConfig({
    // 设置应用的基础路径
    base: VITE_APP_BASE,
    // 配置服务器
    server: {
      // 设置服务器端口
      port: 7888,
      // 配置代理
      proxy: {
        // 将以'/api'开头的请求代理到VITE_APP_BASE_URL
        '/api': {
          target: VITE_APP_BASE_URL,
          // 修改请求头，使Origin看起来像是从目标服务器发出的请求
          changeOrigin: true,
          // 重写请求路径，移除'/api'前缀
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/upload': {
          target: VITE_APP_BASE_URL,
          // 修改请求头，使Origin看起来像是从目标服务器发出的请求
          changeOrigin: true,
          // 重写请求路径，移除'/api'前缀
          rewrite: (path) => path.replace(/^\/upload/, ''),
        },
      },
    },
    // 配置路径解析
    resolve: {
      alias: {
        // 配置别名，简化路径引用
        '~': resolve(__dirname, './'),
        '@': resolve(__dirname, './src'),
        components: resolve(__dirname, './src/components'),
        styles: resolve(__dirname, './src/styles'),
        utils: resolve(__dirname, './src/utils'),
      },
    },
    // 创建Vite插件
    plugins: createVitePlugins(env, command === 'build'),
    // 配置CSS处理
    css: {
      postcss: {
        plugins: [tailwindcss, autoprefixer],
      },
    },
  });
};
