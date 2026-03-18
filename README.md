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
    │   │   ├── main.js     # JS 入口文件
    │   │   ├── utils/      # 工具函数
    │   │   └── modules/    # 业务模块
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
    └── data/               # 模拟数据
```

---

## 技术栈

- **HTML5**：语义化标签
- **CSS3**：Flexbox、Grid、CSS 变量、媒体查询
- **JavaScript**：ES6+ 语法
- **开发服务器**：http-server

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

---

## 更多文档

- [开发规范](docs/DEV_STANDARDS.md)
- [文件内容规范](docs/CSS_JS_SPEC.md)
- [Git 命令大全](docs/GIT_GUIDE.md)

---

## 注意事项

1. 所有样式必须使用 CSS 变量，禁止硬编码颜色值
2. 所有页面必须引入 `main.css`，禁止单独引入组件样式
3. 模拟数据使用 JS 对象定义，导出后供模块使用
4. 修改公共组件需通知所有成员
5. 提交前确保代码无语法错误
