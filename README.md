# 企业管理系统前端

## 项目概述

基于原生 HTML、CSS、JavaScript 的企业管理系统前端项目，包含六个业务子系统。

---

## 目录结构

```
web/
├── index.html              # 项目入口（重定向到登录页）
├── package.json            # 项目配置
├── README.md               # 项目文档
├── docs/                   # 文档目录
│   ├── DEV_STANDARDS.md    # 开发规范
│   ├── CSS_JS_SPEC.md      # 文件内容规范
│   └── GIT_GUIDE.md        # Git 命令大全
│
└── src/
    ├── assets/             # 静态资源
    │   ├── css/            # 样式文件
    │   │   ├── main.css    # 样式入口文件（@import 所有样式）
    │   │   ├── base/       # 基础样式
    │   │   ├── components/ # 组件样式
    │   │   └── pages/      # 页面样式
    │   │
    │   ├── js/             # JavaScript 文件
    │   │   ├── main.js     # JS 启动编排入口
    │   │   ├── core/       # 路由、页面壳、脚本加载、光标等运行时能力
    │   │   ├── shared/     # 跨业务域状态与视图组件工具
    │   │   ├── systems/    # 业务域真实实现
    │   │   ├── modules/    # 兼容门面，暴露 window.xxxModule
    │   │   └── utils/      # 基础工具函数
    │   │
    │   └── images/         # 图片资源（待创建）
    │
    ├── components/         # 公共 HTML 组件
    │
    ├── pages/              # 页面文件
    │   ├── login.html      # 登录页
    │   ├── dashboard.html  # 仪表盘/首页
    │   ├── production/     # 生产管理子系统
    │   ├── sales/          # 销售管理子系统
    │   ├── equipment/      # 设备管理子系统
    │   ├── purchase/       # 采购管理子系统
    │   ├── warehouse/      # 仓储管理子系统
    │   └── employee/       # 员工管理子系统
    │
    └── data/               # 模拟数据，localStorage 为空时初始化业务状态
```

---

## 技术栈

- **HTML5**：语义化标签
- **CSS3**：Flexbox、Grid、CSS 变量、媒体查询、响应式设计
- **JavaScript**：ES6+ 语法
- **开发服务器**：http-server

---

## 功能特性

### 无后端业务闭环

项目当前没有后端服务，业务演示流程在浏览器内完成：

- `src/data/*.js` 提供各子系统的初始种子数据
- `src/assets/js/shared/state.js` 将业务状态保存到 `localStorage`
- 登录态使用 `sessionStorage`，由 `auth.js` 维护
- 页面刷新后优先读取本地业务状态，本地不存在时回退到种子数据

### JavaScript 分层架构

当前 JS 架构按运行时、共享能力、业务域和兼容入口分层：

- `main.js`：启动编排，不承载业务逻辑
- `core/`：页面元信息、公共组件加载、业务脚本加载和全局交互
- `shared/`：跨子系统复用的状态容器、统计卡片、表格行渲染、关键词过滤、删除确认和 prompt 表单采集
- `systems/<domain>/store.js`：维护单个业务域的本地状态
- `systems/<domain>/actions.js`：封装业务写操作
- `systems/<domain>/renderers.js`：维护状态徽章和统计渲染映射
- `systems/<domain>/pages.js`：绑定具体页面事件并刷新 DOM
- `modules/<domain>.js`：保留旧的 `window.xxxModule` 入口，供动态加载器兼容调用

新增业务子系统时，先在 `systems/<domain>/` 下拆分 `store/actions/renderers/pages`，再在 `modules/<domain>.js` 暴露兼容门面。

### 移动端响应式支持

后台管理系统已全面支持移动端响应式设计：

- **抽屉式侧边栏**：移动端侧边栏默认隐藏，点击汉堡菜单按钮从左侧滑出
- **遮罩层交互**：侧边栏展开时显示半透明遮罩，点击遮罩或按 ESC 键可关闭侧边栏
- **表格卡片视图**：移动端表格自动转换为卡片布局，数据清晰可读
- **响应式布局**：工具栏、搜索框、统计卡片等均适配移动端显示

响应式断点：`768px`（与前台页面保持一致）

---

## 快速开始

> **注意**：本项目位于 `web/` 子目录，请确保在该目录下执行命令。

### 1. 进入项目目录
```bash
cd web
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:8080

### 4. 提交前检查
```powershell
Get-ChildItem src/assets/js,src/data -Recurse -Filter *.js | ForEach-Object { node --check $_.FullName }
git diff --check
rg "export |import " src/assets/js
```

检查目标：

- 所有 JS 语法通过 `node --check`
- 经典 `<script>` 架构中不出现 `export/import`
- 提交内容不包含临时审计目录或压缩包
- `src/assets/js/system` 不应重新出现

---

## 更多文档

- [开发规范](docs/DEV_STANDARDS.md)
- [文件内容规范](docs/CSS_JS_SPEC.md)
- [JavaScript 架构说明](docs/JS_ARCHITECTURE.md)
- [Git 命令大全](docs/GIT_GUIDE.md)
- [整体分析报告与 4 人团队开发策略](docs/ARCHITECTURE_TEAM_STRATEGY.md)

---

## 注意事项

1. 所有样式必须使用 CSS 变量，禁止硬编码颜色值
2. 所有页面必须引入 `main.css`，禁止单独引入组件样式
3. 模拟数据使用 JS 对象定义，由 `shared/state.js` 在 localStorage 为空时接入
4. 修改公共组件需同步检查 header、sidebar、footer 的加载路径
5. 提交前确保代码无语法错误
6. 新增后台页面按现有模板引入 `main.js`，移动端导航由 `core/shell.js` 按需加载
7. 新增业务逻辑优先放入 `systems/<domain>`，不要继续堆进 `modules`

---

## 更新日志

### 2026-04 - JS 架构分层与业务闭环优化
- 拆分 `core/shared/systems/modules` 四层结构
- 将六个业务子系统的真实实现迁移到 `systems/<domain>`
- 保留 `modules/<domain>.js` 作为兼容门面
- 使用 `shared/state.js` 统一管理无后端 localStorage 状态
- 使用 `shared/view.js` 统一统计卡片、表格空状态、关键词过滤、删除确认和 prompt 表单采集

### 2026-03 - 移动端响应式适配
- 新增汉堡菜单按钮，支持移动端侧边栏切换
- 新增 `mobile-nav.js` 模块，处理侧边栏交互逻辑
- 侧边栏支持抽屉式展开（transform 动画）
- 表格支持移动端卡片视图
- 所有业务子系统页面适配响应式布局
- Logo 尺寸优化（36px → 42px）
