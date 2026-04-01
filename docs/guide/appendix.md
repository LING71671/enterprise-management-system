# 附录

[返回目录](./README.md) | [上一章：手把手教程](./10-hands-on.md)

---

## 术语表

| 术语 | 英文 | 解释 |
|------|------|------|
| HTML | HyperText Markup Language | 超文本标记语言，网页的骨架 |
| CSS | Cascading Style Sheets | 层叠样式表，网页的衣服 |
| JavaScript | JS | 网页的编程语言，让网页动起来 |
| DOM | Document Object Model | 文档对象模型，网页的结构 |
| 浏览器 | Browser | 用来显示网页的软件 |
| 服务器 | Server | 存放网页文件的电脑 |
| localhost | - | 本机地址，指向自己的电脑 |
| 前端 | Frontend | 用户能看到的部分 |
| 后端 | Backend | 用户看不到的部分 |
| API | Application Programming Interface | 应用程序接口 |
| Git | - | 版本控制工具 |
| npm | Node Package Manager | Node.js 包管理工具 |
| 响应式 | Responsive | 根据屏幕大小自动调整布局 |
| 选择器 | Selector | CSS 中用来选择元素的语法 |
| 变量 | Variable | 存储数据的容器 |
| 函数 | Function | 完成特定任务的代码块 |
| 事件 | Event | 用户操作（如点击、输入） |
| 标签 | Tag | HTML 的基本单位，如 `<div>` |
| 属性 | Attribute | 标签的附加信息，如 `class="name"` |

---

## 文件速查表

### 核心文件

| 文件 | 作用 | 修改场景 |
|------|------|----------|
| `variables.css` | CSS 变量定义 | 修改主题色、间距、字体 |
| `auth.js` | 登录认证 | 修改用户名密码 |
| `main.css` | 样式入口 | 添加新样式文件引用 |
| `main.js` | JS 入口 | 修改全局初始化逻辑 |

### 页面文件

| 页面 | 文件路径 |
|------|----------|
| 落地页 | `src/pages/landing.html` |
| 登录页 | `src/pages/login.html` |
| 注册页 | `src/pages/register.html` |
| 仪表盘 | `src/pages/dashboard.html` |

### 组件文件

| 组件 | 文件路径 |
|------|----------|
| 顶部导航栏 | `src/components/header.html` |
| 侧边栏 | `src/components/sidebar.html` |
| 页脚 | `src/components/footer.html` |

### 数据文件

| 模块 | 文件路径 |
|------|----------|
| 生产管理 | `src/data/production.js` |
| 销售管理 | `src/data/sales.js` |
| 设备管理 | `src/data/equipment.js` |
| 采购管理 | `src/data/purchase.js` |
| 仓储管理 | `src/data/warehouse.js` |
| 员工管理 | `src/data/employee.js` |

---

## 页面路由对照表

### 核心页面

| 页面名称 | URL 路径 | 文件路径 |
|----------|----------|----------|
| 落地页 | `/` 或 `/landing.html` | `src/pages/landing.html` |
| 登录页 | `/login.html` | `src/pages/login.html` |
| 注册页 | `/register.html` | `src/pages/register.html` |
| 仪表盘 | `/dashboard.html` | `src/pages/dashboard.html` |

### 生产管理

| 页面名称 | URL 路径 | 文件路径 |
|----------|----------|----------|
| 概览 | `/production/` | `src/pages/production/index.html` |
| 生产计划 | `/production/plan.html` | `src/pages/production/plan.html` |
| 任务排产 | `/production/scheduling.html` | `src/pages/production/scheduling.html` |
| 物料需求 | `/production/material.html` | `src/pages/production/material.html` |
| 生产订单 | `/production/order.html` | `src/pages/production/order.html` |
| 质量管理 | `/production/quality.html` | `src/pages/production/quality.html` |
| 库存管理 | `/production/inventory.html` | `src/pages/production/inventory.html` |

### 销售管理

| 页面名称 | URL 路径 | 文件路径 |
|----------|----------|----------|
| 概览 | `/sales/` | `src/pages/sales/index.html` |
| 客户信息 | `/sales/customer.html` | `src/pages/sales/customer.html` |
| 销售订单 | `/sales/order.html` | `src/pages/sales/order.html` |
| 定价促销 | `/sales/pricing.html` | `src/pages/sales/pricing.html` |
| 销售报表 | `/sales/report.html` | `src/pages/sales/report.html` |
| 销售团队 | `/sales/team.html` | `src/pages/sales/team.html` |

### 设备管理

| 页面名称 | URL 路径 | 文件路径 |
|----------|----------|----------|
| 概览 | `/equipment/` | `src/pages/equipment/index.html` |
| 设备信息 | `/equipment/info.html` | `src/pages/equipment/info.html` |
| 状态监控 | `/equipment/monitor.html` | `src/pages/equipment/monitor.html` |
| 维护计划 | `/equipment/maintenance.html` | `src/pages/equipment/maintenance.html` |
| 故障记录 | `/equipment/fault.html` | `src/pages/equipment/fault.html` |

### 采购管理

| 页面名称 | URL 路径 | 文件路径 |
|----------|----------|----------|
| 概览 | `/purchase/` | `src/pages/purchase/index.html` |
| 供应商信息 | `/purchase/supplier.html` | `src/pages/purchase/supplier.html` |
| 采购流程 | `/purchase/process.html` | `src/pages/purchase/process.html` |
| 订单跟踪 | `/purchase/tracking.html` | `src/pages/purchase/tracking.html` |
| 数据分析 | `/purchase/analysis.html` | `src/pages/purchase/analysis.html` |

### 仓储管理

| 页面名称 | URL 路径 | 文件路径 |
|----------|----------|----------|
| 概览 | `/warehouse/` | `src/pages/warehouse/index.html` |
| 基本操作 | `/warehouse/operation.html` | `src/pages/warehouse/operation.html` |
| 货位管理 | `/warehouse/layout.html` | `src/pages/warehouse/layout.html` |
| 库存预警 | `/warehouse/warning.html` | `src/pages/warehouse/warning.html` |
| 运输跟踪 | `/warehouse/transport.html` | `src/pages/warehouse/transport.html` |

### 员工管理

| 页面名称 | URL 路径 | 文件路径 |
|----------|----------|----------|
| 概览 | `/employee/` | `src/pages/employee/index.html` |
| 员工信息 | `/employee/info.html` | `src/pages/employee/info.html` |
| 考勤薪资 | `/employee/attendance.html` | `src/pages/employee/attendance.html` |
| 招聘培训 | `/employee/recruitment.html` | `src/pages/employee/recruitment.html` |
| 绩效评估 | `/employee/performance.html` | `src/pages/employee/performance.html` |

---

## 快捷键速查

### 浏览器

| 快捷键 | 作用 |
|--------|------|
| `F12` | 打开开发者工具 |
| `Ctrl + F5` | 强制刷新（清除缓存） |
| `Ctrl + Shift + M` | 切换设备模式（响应式测试） |
| `Ctrl + U` | 查看页面源代码 |

### VS Code

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + P` | 快速打开文件 |
| `Ctrl + S` | 保存文件 |
| `Ctrl + Z` | 撤销 |
| `Ctrl + Y` | 重做 |
| `Ctrl + F` | 查找 |
| `Ctrl + H` | 查找替换 |

### 命令行

| 快捷键 | 作用 |
|--------|------|
| `Ctrl + C` | 停止当前命令 |
| `Ctrl + L` | 清屏 |
| `↑` / `↓` | 查看历史命令 |
| `Tab` | 自动补全 |

---

*文档完成！*

[返回目录](./README.md)
