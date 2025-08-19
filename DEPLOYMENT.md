# 部署指南

## Cloudflare Pages 部署步骤

### 1. 准备代码仓库
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/mexico-ecommerce-site.git
git push -u origin main
```

### 2. 连接Cloudflare Pages
1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 点击 "Pages" -> "Create a project"
3. 选择 "Connect to Git"
4. 授权GitHub访问
5. 选择 `mexico-ecommerce-site` 仓库

### 3. 配置构建设置
- **项目名称**: mexico-ecommerce-site
- **生产分支**: main
- **构建命令**: `npm run build`
- **构建输出目录**: `dist`

### 4. 设置环境变量
在 "Settings" -> "Environment variables" 中添加：
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
NODE_VERSION=18
```

### 5. 部署
点击 "Save and Deploy"，等待部署完成。

## 其他部署平台

### Vercel
```bash
npm i -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# 上传 dist 文件夹到 Netlify
```

### 自托管服务器
```bash
npm run build
scp -r dist/* user@server:/var/www/html/
```