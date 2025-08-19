# 技术文档

## 项目架构

### 技术栈
- **前端框架**: React 18
- **类型系统**: TypeScript
- **构建工具**: Vite
- **样式框架**: TailwindCSS
- **状态管理**: React Context + Hooks
- **路由**: React Router v6
- **后端**: Supabase (PostgreSQL + Auth + Storage)
- **部署**: Cloudflare Pages

### 目录结构
```
src/
├── components/          # 可复用组件
│   ├── Header.tsx       # 网站头部
│   ├── Footer.tsx       # 网站底部
│   ├── ProductCard.tsx  # 产品卡片
│   └── ScrollToTop.tsx  # 滚动控制
│
├── pages/              # 页面组件
│   ├── HomePage.tsx     # 首页
│   ├── CategoryPage.tsx # 分类页
│   ├── ProductDetailPage.tsx # 产品详情
│   └── AdminPage.tsx    # 管理后台
│
├── lib/                # 工具和配置
│   ├── supabase.ts      # Supabase客户端
│   └── utils.ts         # 工具函数
│
├── hooks/              # 自定义Hooks
├── types/              # TypeScript类型
└── main.tsx            # 应用入口
```

## 数据模型

### 数据库表

#### categories (分类)
```sql
id: BIGSERIAL PRIMARY KEY
name: TEXT NOT NULL              -- 分类名称
slug: TEXT UNIQUE NOT NULL       -- URL友好的标识
description: TEXT                -- 分类描述
created_at: TIMESTAMP WITH TIME ZONE
```

#### products (产品)
```sql
id: BIGSERIAL PRIMARY KEY
name: TEXT NOT NULL              -- 产品名称
variant: TEXT                    -- 产品变体
description: TEXT                -- 产品描述
price: NUMERIC(10,2) NOT NULL    -- 价格
images: TEXT[] DEFAULT '{}'      -- 产品图片URL数组
category_id: BIGINT              -- 分类外键
featured: BOOLEAN DEFAULT FALSE  -- 是否精品
is_active: BOOLEAN DEFAULT TRUE  -- 是否启用
is_pinned: BOOLEAN DEFAULT FALSE -- 是否置顶
buy_link: TEXT                   -- 购买链接
created_at: TIMESTAMP WITH TIME ZONE
```

#### site_settings (网站设置)
```sql
id: BIGSERIAL PRIMARY KEY
setting_key: TEXT UNIQUE NOT NULL    -- 设置键
setting_value: TEXT                  -- 设置值
created_at: TIMESTAMP WITH TIME ZONE
updated_at: TIMESTAMP WITH TIME ZONE
```

### 类型定义
```typescript
interface Product {
  id: number;
  name: string;
  variant?: string;
  description?: string;
  price: number;
  images?: string[];
  category_id?: number;
  featured?: boolean;
  is_active?: boolean;
  is_pinned?: boolean;
  buy_link?: string;
  created_at?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  created_at?: string;
}
```

## 组件设计

### 响应式设计
- **移动端优先**: 采用移动端优先的设计理念
- **断点**: `sm:640px` `md:768px` `lg:1024px` `xl:1280px`
- **网格系统**: 移动端2列，桌面端4-5列

### 颜色系统
```css
:root {
  --primary-blue: #3483FA;     /* MercadoLibre蓝 */
  --success-green: #00A650;    /* 成功绿 */
  --warning-yellow: #FFE600;   /* 警告黄 */
  --error-red: #FF0000;        /* 错误红 */
  --text-primary: #333333;     /* 主文本 */
  --text-secondary: #666666;   /* 次要文本 */
  --background: #F5F5F5;       /* 背景 */
  --card-background: #FFFFFF;  /* 卡片背景 */
}
```

## 状态管理

### Context Providers
- 目前使用React内置的state管理
- 未来可考虑集成Zustand或Redux Toolkit

### 数据获取
```typescript
// 示例：产品数据获取
const fetchProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_active', true)
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};
```

## 性能优化

### 代码分割
- 路由级别的代码分割
- 第三方库分割
- 公共组件分割

### 图片优化
- 错误处理和占位图
- 自动根据屏幕尺寸调整
- 支持WebP格式

### 数据缓存
- 利用React Query或SWR做数据缓存
- Supabase实时数据同步

## 安全性

### 前端安全
- XSS防护：使用React的内置防护
- CSRF防护：Supabase内置防护
- 输入验证：使用Zod进行数据验证

### 后端安全
- RLS (Row Level Security)
- API Rate Limiting
- 数据库访问控制

## 测试策略

### 单元测试
- 组件测试：React Testing Library
- 工具函数测试：Jest

### 集成测试
- E2E测试：Playwright
- API测试：直接测试Supabase接口

### 测试覆盖率
- 目标覆盖率：80%+
- 关键业务逻辑：100%覆盖

## 部署和监控

### CI/CD
- GitHub Actions自动化部署
- 代码质量检查
- 自动化测试

### 监控
- Cloudflare Analytics
- 错误追踪：Sentry
- 性能监控：Web Vitals

## 未来规划

### 短期目标
- [ ] 添加购物车功能
- [ ] 集成Stripe支付
- [ ] 用户认证系统
- [ ] 产品搜索优化

### 长期目标
- [ ] PWA支持
- [ ] 多语言支持
- [ ] 产品推荐系统
- [ ] 实时聊天支持
- [ ] 移动端App