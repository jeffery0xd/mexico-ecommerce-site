import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import sourceIdentifierPlugin from 'vite-plugin-source-info'

const isProd = process.env.BUILD_MODE === 'prod' || process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    react(), 
    sourceIdentifierPlugin({
      enabled: !isProd,
      attributePrefix: 'data-matrix',
      includeProps: true,
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // 代码分割优化 - 针对Cloudflare Pages
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React相关依赖
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'vendor-react';
          }
          // UI组件库
          if (id.includes('@radix-ui')) {
            return 'vendor-ui';
          }
          // 工具库
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'vendor-utils';
          }
          // Supabase
          if (id.includes('@supabase')) {
            return 'vendor-supabase';
          }
          // 表单相关
          if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('zod')) {
            return 'vendor-form';
          }
          // 图表和其他大型库
          if (id.includes('recharts') || id.includes('date-fns')) {
            return 'vendor-charts';
          }
          // 其他node_modules依赖
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Cloudflare Pages优化配置
    target: 'es2015',
    minify: 'terser',
    sourcemap: false,
    chunkSizeWarningLimit: 500,
    // 压缩设置
    terserOptions: {
      compress: {
        drop_console: isProd,
        drop_debugger: isProd,
      },
    },
  },
  // 环境变量定义
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
  // 开发服务器配置
  server: {
    port: 5173,
    host: '0.0.0.0',
    strictPort: true,
  },
  // 预览服务器配置  
  preview: {
    port: 4173,
    host: '0.0.0.0',
    strictPort: true,
  },
  // 性能优化
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@supabase/supabase-js'
    ],
  },
})

