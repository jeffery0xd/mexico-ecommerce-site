# 🇪🇸 MercadoLibre México - E-commerce Website

一个专为墨西哥市场设计的现代化电商网站，采用React + TypeScript + Supabase技术栈构建。

## 🚀 快速开始

### 环境要求
- Node.js 18+
- npm 或 pnpm

### 安装与运行

```bash
# 克隆项目
git clone <repository-url>
cd mexico-ecommerce-site

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，添加你的 Supabase 配置

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### 验证项目

```bash
# 运行验证脚本
chmod +x verify.sh
./verify.sh
```

## 🌎 在线演示

**当前部署URL:** https://61tszkzq2w9q.space.minimax.io

## 📚 项目特性

### 🏢 核心功能
- 🛋 **产品展示**: 响应式产品目录和详情页
- 📋 **分类浏览**: 多级产品分类系统
- 🔍 **搜索功能**: 全文搜索和筛选
- 📱 **移动优化**: 移动端友好的2列网格布局
- 📌 **产品置顶**: 管理员可设置重点推广产品
- 🏷️ **SEO优化**: 可自定义页面标题模板

### 🛠️ 管理功能
- 🔐 **管理员登录**: 密码保护的后台管理（密码：19961015）
- ➕ **产品管理**: 添加、编辑、删除产品
- 📊 **数据统计**: 产品状态和分类管理
- 🎨 **品牌定制**: SEO设置和网站标题管理

### 📱 用户体验
- ⚡ **快速加载**: 优化的图片和代码分割
- 📱 **响应式设计**: 完美适配手机、平板、桌面
- 🎨 **MercadoLibre风格**: 忠实还原官方设计语言
- 🔄 **滚动优化**: 修复页面切换滚动位置问题

## 💻 技术栈

### 前端技术
- **React 18** - 现代化UI框架
- **TypeScript** - 类型安全的JavaScript
- **Tailwind CSS** - 实用优先的CSS框架
- **Vite** - 快速的构建工具
- **React Router** - 客户端路由
- **Lucide React** - 优美的图标库

### 后端服务
- **Supabase** - 后端即服务平台
  - PostgreSQL数据库
  - 实时API
  - 认证系统
  - 文件存储

## 🗂️ 项目结构

```
src/
├── components/          # React组件
│   ├── Header.tsx       # 网站头部导航
│   ├── Footer.tsx       # 网站底部
│   ├── ProductCard.tsx  # 产品卡片组件
│   └── ScrollToTop.tsx  # 滚动重置组件
├── pages/              # 页面组件
│   ├── HomePage.tsx     # 首页
│   ├── CategoryPage.tsx # 分类页
│   ├── ProductDetailPage.tsx # 产品详情
│   └── AdminPage.tsx    # 管理后台
├── lib/                # 工具库
│   └── supabase.ts      # Supabase客户端
├── types/              # TypeScript类型定义
└── App.tsx             # 主应用组件
```

## 📦 部署指南

### Cloudflare Pages 部署

1. **准备代码仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **连接Cloudflare Pages**
   - 登录 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 前往 Pages > Create a project
   - 连接你的GitHub仓库

3. **配置构建设置**
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js version**: 18

4. **环境变量配置**
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 其他部署平台

- **Netlify**: 拖拽 `dist` 文件夹到部署区域
- **Vercel**: 连接GitHub仓库自动部署
- **GitHub Pages**: 使用GitHub Actions工作流

## 📋 数据库配置

### Supabase 设置

1. **创建Supabase项目**
   - 访问 [supabase.com](https://supabase.com)
   - 创建新项目
   - 获取项目URL和API密钥

2. **数据库架构**
   查看 `DATABASE_SCHEMA.md` 了解完整的数据库结构。

3. **示例数据**
   ```sql
   -- 创建示例分类
   INSERT INTO categories (name, slug) VALUES
   ('Tecnología', 'tecnologia'),
   ('Celulares', 'celulares'),
   ('Electrodomésticos', 'electrodomesticos');
   
   -- 创建示例产品
   INSERT INTO products (name, price, category_id, description, featured) VALUES
   ('iPhone 15 Pro', 24999.00, 2, 'El iPhone más avanzado', true),
   ('MacBook Air M3', 34999.00, 1, 'Laptop ultradelgada y potente', false);
   ```

## 🔧 开发指南

### 代码规范

- 使用TypeScript进行类型检查
- 遵循React Hooks最佳实践
- 使用Tailwind CSS进行样式管理
- 组件名使用PascalCase
- 文件名使用kebab-case

### 组件开发

```typescript
// 示例组件结构
import React from 'react';
import { ComponentProps } from '../types';

interface Props {
  title: string;
  description?: string;
}

const MyComponent: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};

export default MyComponent;
```

### 状态管理

项目使用React内置的状态管理：
- `useState` - 组件本地状态
- `useEffect` - 副作用处理
- `useContext` - 跨组件状态共享（如需要）

## 🔍 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 清理依赖重新安装
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Supabase连接问题**
   - 检查 `.env` 文件中的环境变量
   - 确认Supabase项目状态正常
   - 验证API密钥权限

3. **图片显示问题**
   - 确保图片URL可公开访问
   - 检查CORS设置
   - 验证图片格式支持

### 性能优化

1. **图片优化**
   - 使用WebP格式
   - 实现懒加载
   - 压缩图片尺寸

2. **代码分割**
   - 使用React.lazy()进行组件懒加载
   - 按路由分割代码

3. **缓存策略**
   - 配置CDN缓存
   - 使用浏览器缓存

## 📄 许可证

MIT License - 详见 `LICENSE` 文件

## 👥 贡献指南

1. Fork项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📞 支持与联系

如有问题或建议，请：
- 创建Issue报告问题
- 提交Pull Request贡献代码
- 查看项目Wiki获取详细文档

---

**开发完成日期**: 2024年12月
**技术支持**: React + TypeScript + Supabase
**目标市场**: 墨西哥电商市场