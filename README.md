# Farcaster Mini App Demo

一个功能完整的 Farcaster Mini App 演示项目，展示了如何构建具有身份认证、社交功能和钱包集成的 Web3 应用。

## ✨ 功能特性

- 🔐 **Farcaster 身份认证** - 使用 Privy 实现一键登录
- 👤 **个人资料展示** - 显示用户 Farcaster 信息和统计数据
- ✍️ **发布动态** - 直接发布 Cast 到 Farcaster 网络
- 📰 **信息流浏览** - 查看热门 Farcaster 动态
- 💰 **钱包集成** - 支持多种钱包连接和交易
- 🎨 **现代化 UI** - 响应式设计，支持移动端

## 🚀 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn
- Git

### 安装步骤

1. **克隆项目**
```bash
git clone https://github.com/your-username/farcaster-mini-app-demo.git
cd farcaster-mini-app-demo
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **环境配置**
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入必要的 API 密钥：

```env
# 应用基本信息
NEXT_PUBLIC_APP_NAME="Farcaster Mini App Demo"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Farcaster 配置
NEYNAR_API_KEY="your_neynar_api_key_here"

# Privy 认证配置
NEXT_PUBLIC_PRIVY_APP_ID="your_privy_app_id_here"

# 钱包配置
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID="your_wallet_connect_project_id"
```

4. **启动开发服务器**
```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 🔧 API 密钥获取

### Neynar API Key
1. 访问 [Neynar Dashboard](https://neynar.com)
2. 注册账户并创建新应用
3. 获取 API Key 并添加到环境变量

### Privy App ID
1. 访问 [Privy Dashboard](https://dashboard.privy.io)
2. 创建新应用
3. 在设置中启用 Farcaster 登录
4. 获取 App ID 并添加到环境变量

### WalletConnect Project ID
1. 访问 [WalletConnect Cloud](https://cloud.walletconnect.com)
2. 创建新项目
3. 获取 Project ID 并添加到环境变量

## 📁 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   └── farcaster/     # Farcaster 相关 API
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   ├── page.tsx          # 主页面
│   └── providers.tsx      # Context 提供者
├── components/            # React 组件
│   ├── FarcasterProfile.tsx
│   ├── CastComposer.tsx
│   ├── FeedDisplay.tsx
│   └── WalletActions.tsx
└── types/                # TypeScript 类型定义
```

## 🛠️ 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **认证**: Privy
- **钱包**: Wagmi + RainbowKit
- **Farcaster API**: Neynar
- **部署**: Vercel

## 🎯 核心功能

### 身份认证
使用 Privy 实现 Farcaster 账户登录，支持：
- 一键 Farcaster 登录
- 钱包连接
- 用户会话管理

### 社交功能
- 查看用户 Farcaster 资料
- 发布新的 Cast
- 浏览热门动态
- 互动统计显示

### 钱包集成
- 多钱包支持（MetaMask、WalletConnect 等）
- 余额查询
- 交易发送
- 网络切换

## 🚀 部署

### Vercel 部署

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **连接 Vercel**
- 访问 [Vercel Dashboard](https://vercel.com)
- 导入 GitHub 仓库
- 配置环境变量
- 部署

3. **配置环境变量**
在 Vercel 项目设置中添加所有必要的环境变量。

### 其他部署选项

- **Netlify**: 支持静态部署
- **Railway**: 支持全栈部署
- **自托管**: 使用 Docker 容器化部署

## 📝 自定义指南

### 修改主题色彩
编辑 `tailwind.config.js` 中的 `farcaster` 颜色配置：

```js
farcaster: {
  600: '#8b5cf6', // 主色
  // ... 其他颜色
}
```

### 添加新功能
1. 在 `src/components/` 中创建新组件
2. 在 `src/app/api/` 中添加 API 路由
3. 更新主页面的导航和路由

### 集成其他 API
参考 `src/app/api/farcaster/` 中的示例，创建新的 API 集成。

## 🔒 安全注意事项

- 永远不要在客户端暴露私钥
- 使用环境变量存储敏感信息
- 实施适当的用户输入验证
- 定期更新依赖项

## 🐛 常见问题

### Q: 无法连接 Farcaster 账户
A: 检查 Privy App ID 配置和 Farcaster 登录是否已启用。

### Q: API 请求失败
A: 验证 Neynar API Key 是否正确配置。

### Q: 钱包连接问题
A: 确保 WalletConnect Project ID 已正确设置。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Farcaster](https://farcaster.xyz/) - 去中心化社交协议
- [Neynar](https://neynar.com/) - Farcaster API 服务
- [Privy](https://privy.io/) - Web3 认证解决方案
- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架

## 📞 联系方式

如有问题，请通过以下方式联系：

- GitHub Issues: [项目 Issues](https://github.com/your-username/farcaster-mini-app-demo/issues)
- Email: your-email@example.com
- Farcaster: @yourusername

---

⭐ 如果这个项目对您有帮助，请给它一个 Star！
