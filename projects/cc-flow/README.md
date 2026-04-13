# cc-flow

cc-flow 是 FastGPT 工作流编辑器的独立项目，从 `app` 项目中提取工作流部分，作为独立的 Next.js 应用运行。

## 项目定位

- 承载 FastGPT 工作流编辑器 UI（WorkflowComponents）
- 独立开发、独立部署
- 依赖 FastGPT monorepo 的公共包：`@fastgpt/global`、`@fastgpt/web`

## 目录结构

```
projects/cc-flow/
├── src/
│   ├── pages/              # Next.js 页面
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── index.tsx       # 首页（重定向至 /flow）
│   │   └── flow.tsx        # 工作流编辑器主页面
│   ├── components/
│   │   ├── WorkflowComponents/  # 工作流编辑器核心组件
│   │   ├── Workflow/            # 工作流页面组件（Header、Logs、Publish 入口）
│   │   ├── AppContext/          # App 上下文（应用详情、保存等）
│   │   ├── Logs/                # 日志组件
│   │   └── Publish/             # 发布渠道组件
│   ├── web/
│   │   ├── core/workflow/  # 工作流 API、utils、类型
│   │   ├── core/app/       # App API、utils
│   │   └── common/         # 公共 API 工具
│   └── global/             # 全局类型定义
├── Dockerfile
├── next.config.js
├── next-i18next.config.js
├── package.json
└── tsconfig.json
```

## 开发

```sh
# 在 monorepo 根目录安装依赖
pnpm i

# 启动 cc-flow 开发服务器
make dev name=cc-flow
# 或
cd projects/cc-flow && pnpm dev
```

## 构建

```sh
# Docker 构建
docker build -f ./projects/cc-flow/Dockerfile -t cc-flow:latest . --build-arg name=cc-flow

# Make 构建
make build name=cc-flow image=cc-flow:latest
```

## 环境变量

参考 `.env.example` 配置环境变量。
