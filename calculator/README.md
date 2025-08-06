# 计算器 Mini App

一个使用 Next.js 14 和 Tailwind CSS 构建的美观现代化计算器应用。

## 功能特性

- ✨ 美观的现代化UI设计
- 🌙 支持深色模式
- 📱 响应式设计，适配移动端
- ⚡ 基本计算功能：加减乘除
- 🎯 流畅的动画效果
- 💻 TypeScript 支持

## 技术栈

- **Next.js 14** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Radix UI** - 无障碍组件库
- **Lucide React** - 图标库

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 打开浏览器访问 [http://localhost:3001](http://localhost:3001)

## 项目结构

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # 全局样式
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 主页面
├── components/         # React 组件
│   ├── ui/            # UI 基础组件
│   └── Calculator.tsx  # 计算器主组件
├── hooks/             # 自定义 Hooks
│   └── useCalculator.ts # 计算器逻辑
└── lib/               # 工具函数
    └── utils.ts       # 通用工具
```

## 使用说明

1. 点击数字按钮输入数字
2. 点击运算符按钮（+、-、×、÷）进行运算
3. 点击等号（=）查看计算结果
4. 点击"清空"按钮重置计算器
5. 点击小数点（.）输入小数

## 开发命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start

# 代码检查
npm run lint
```

## 特色功能

- **智能显示格式化**：自动处理长数字和科学计数法
- **错误处理**：除零保护等安全机制
- **键盘支持**：支持键盘输入（即将推出）
- **历史记录**：计算历史查看（即将推出）

## 贡献

欢迎提交 Issues 和 Pull Requests！

## 许可证

MIT License