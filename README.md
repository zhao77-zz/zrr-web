This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 博客平台项目文档

## 一、项目简介
本项目是基于Next.js 15.3.4构建的技术博客平台，集成QAnything交互组件、WakaTime编码统计及课程练习作业管理功能，支持实时编辑与自动刷新。

## 二、QAnything集成路径与实现细节
### 集成路径
选择在`src/app/practice/page.tsx`中嵌入QAnything交互组件，原因：
1. 与课程练习模块强关联，符合用户学习场景
2. 独立路由路径`/practice`便于功能扩展

### 实现细节
通过`<iframe>`标签嵌入第三方HTML页面：
```tsx
// src/app/practice/page.tsx
<iframe
  src="https://qanything.example.com/embed"
  width="100%"
  height="600px"
  title="QAnything交互面板"
/>
```

## 三、WakaTime API集成方法
### 配置步骤
1. 在WakaTime官网获取API Key（路径：Settings -> Account -> API Key）
2. 在项目根目录创建`.env.local`文件，添加：
   ```
   WAKATIME_API_KEY=your_api_key_here
   ```
3. 通过`src/app/wakatime-stats.tsx`组件调用API：
```tsx
// 调用示例
const fetchWakaTimeData = async () => {
  const res = await fetch(
    `https://wakatime.com/api/v1/users/current/stats/last_7_days`,
    { headers: { Authorization: `Basic ${btoa(process.env.WAKATIME_API_KEY)}` } }
  );
  const data = await res.json();
  return data.data.total_seconds;
};
```

## 四、Next.js项目结构
```
src/
└── app/
    ├── api/          # API路由
    ├── practice/     # 练习模块（含QAnything嵌入）
    ├── page.tsx      # 首页
    ├── navbar.tsx    # 导航栏
    └── wakatime-stats.tsx # WakaTime统计组件
```

## 五、旧作业整合方式
将历史课程练习按类型分类存储于`src/app/exercises.json`，通过`exercise-card.tsx`组件渲染为可点击的练习卡片：
```json
// src/app/exercises.json
[
  {
    "id": "001",
    "title": "基础HTML练习",
    "path": "/practice/html-basics"
  }
]
```

## 六、项目运行指南
### 1. 环境准备
- Node.js 18+（推荐18.17.0）
- npm 9+（随Node.js安装）

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```
访问`http://localhost:3000`查看效果

## 七、运行截图
### (1) QAnything运行截图
![QAnything交互界面](/img/qanything-screenshot.png)

### (2) WakaTime编码统计截图
![总编码时长展示](/img/wakatime-stats.png)

### (3) 课程练习导航页截图
![练习导航界面](/img/exercise-nav.png)

> 注：截图文件请放置于`public/img/`目录下

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

