# 传统 npm 命令对应 pnpm

# 安装依赖
npm install -> pnpm install

# 添加依赖
npm install <package> -> pnpm add <package>
npm install -D <package> -> pnpm add -D <package>

# 移除依赖
npm uninstall <package> -> pnpm remove <package>

# 运行脚本
npm run dev -> pnpm dev
npm run build -> pnpm build
npm run preview -> pnpm preview

# 全局安装
npm install -g <package> -> pnpm add -g <package>

# 清理缓存
npm cache clean -> pnpm store prune

# 查看依赖
npm list -> pnpm list

# 更新依赖
npm update -> pnpm update