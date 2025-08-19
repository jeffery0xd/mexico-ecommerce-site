#!/bin/bash

# 项目验证脚本
echo "🔧 开始验证墨西哥电商网站项目..."

# 检查Node.js版本
echo "📋 检查Node.js版本..."
node --version

# 安装依赖
echo "📦 安装项目依赖..."
npm install

# 运行类型检查
echo "🔍 运行TypeScript类型检查..."
npx tsc --noEmit

# 构建项目
echo "🏗️ 构建生产版本..."
npm run build

# 检查构建产物
echo "📁 检查构建产物..."
ls -la dist/

echo "✅ 项目验证完成！"
echo "🚀 项目已准备好部署到Cloudflare Pages或其他静态托管平台"
echo "📝 请查看README.md获取详细的部署说明"