# 第四部分：文件结构全解

[返回目录](./README.md) | [上一章：开发环境搭建](./03-setup.md) | [下一章：CSS 样式系统](./05-css.md)

---

> 这一章会详细解释项目里的每一个文件夹和文件是干什么的。

---

## 4.1 整体结构一览

```
web/
├── index.html                   # 项目入口（自动跳转到落地页）
├── package.json                 # 项目配置
├── README.md                    # 项目说明
│
├── docs/                        # 📁 文档目录
│   ├── COMPLETE_GUIDE.md        # 本指南（旧版单文件）
│   ├── guide/                   # 本指南（新版分章节）
│   ├── DEV_STANDARDS.md         # 开发规范
│   └── plan.md                  # 开发计划
│
└── src/                         # 📁 源代码目录
    │
    ├── assets/                  # 📁 静态资源
    │   ├── css/                 # 📁 样式文件
    │   │   ├── main.css         # 样式入口
    │   │   ├── base/            # 基础样式
    │   │   ├── components/      # 组件样式
    │   │   └── pages/           # 页面样式
    │   │
    │   ├── js/                  # 📁 JavaScript 文件
    │   │   ├── main.js          # JS 入口
    │   │   ├── utils/           # 工具函数
    │   │   └── modules/         # 业务模块
    │   │
    │   └── images/              # 📁 图片资源
    │
    ├── components/              # 📁 公共组件
    │   ├── header.html          # 顶部导航栏
    │   ├── sidebar.html         # 侧边栏
    │   └── footer.html          # 页脚
    │
    ├── pages/                   # 📁 所有页面
    │   ├── landing.html         # 落地页
    │   ├── login.html           # 登录页
    │   ├── register.html        # 注册页
    │   ├── dashboard.html       # 仪表盘
    │   ├── production/          # 生产管理（7页）
    │   ├── sales/               # 销售管理（6页）
    │   ├── equipment/           # 设备管理（5页）
    │   ├── purchase/            # 采购管理（5页）
    │   ├── warehouse/           # 仓储管理（5页）
    │   └── employee/            # 员工管理（5页）
    │
    └── data/                    # 📁 模拟数据
        ├── production.js
        ├── sales.js
        ├── equipment.js
        ├── purchase.js
        ├── warehouse.js
        └── employee.js
```

---

## 4.2 CSS 样式文件详解

### 三层架构

```
css/
├── main.css           # 入口文件
├── base/              # 第一层：基础样式
├── components/        # 第二层：组件样式
└── pages/             # 第三层：页面样式
```

### base/ 基础样式

| 文件 | 作用 |
|------|------|
| `reset.css` | 重置浏览器默认样式 |
| `variables.css` | **定义 CSS 变量**（主题色、间距等） |
| `typography.css` | 字体、行高、段落样式 |

### components/ 组件样式

| 文件 | 作用 |
|------|------|
| `button.css` | 按钮样式 |
| `card.css` | 卡片样式 |
| `form.css` | 表单样式 |
| `header.css` | 顶部导航栏样式 |
| `sidebar.css` | 侧边栏样式 |
| `modal.css` | 弹窗样式 |
| `table.css` | 表格样式 |

### pages/ 页面样式

| 文件 | 作用 |
|------|------|
| `landing.css` | 落地页样式 |
| `login.css` | 登录/注册页样式 |
| `production.css` | 生产管理样式 |
| `sales.css` | 销售管理样式 |
| `equipment.css` | 设备管理样式 |
| `purchase.css` | 采购管理样式 |
| `warehouse.css` | 仓储管理样式 |
| `employee.css` | 员工管理样式 |

---

## 4.3 JavaScript 文件详解

### 两层架构

```
js/
├── main.js            # 入口文件
├── utils/             # 工具函数层
└── modules/           # 业务模块层
```

### utils/ 工具函数

| 文件 | 作用 |
|------|------|
| `dom.js` | DOM 操作：选择元素、添加事件等 |
| `storage.js` | 数据存储：localStorage、sessionStorage |
| `format.js` | 格式化：日期、数字、金额 |
| `validate.js` | 表单验证：必填、邮箱、手机号 |

### modules/ 业务模块

| 文件 | 作用 | 状态 |
|------|------|------|
| `auth.js` | 登录认证：登录、登出、注册 | ✅ 已实现 |
| `navigation.js` | 导航管理：菜单高亮、用户显示 | ✅ 已实现 |
| `landing.js` | 落地页效果 | ✅ 已实现 |
| `production.js` | 生产管理业务逻辑 | ⏳ 待实现 |
| `sales.js` | 销售管理业务逻辑 | ⏳ 待实现 |
| `equipment.js` | 设备管理业务逻辑 | ⏳ 待实现 |
| `purchase.js` | 采购管理业务逻辑 | ⏳ 待实现 |
| `warehouse.js` | 仓储管理业务逻辑 | ⏳ 待实现 |
| `employee.js` | 员工管理业务逻辑 | ⏳ 待实现 |

---

## 4.4 页面文件详解

### 核心页面

| 文件 | 作用 |
|------|------|
| `landing.html` | 落地页（首页），公司介绍 |
| `login.html` | 登录页 |
| `register.html` | 注册页 |
| `dashboard.html` | 仪表盘（登录后主页） |

### 业务子系统页面

| 子系统 | 页面数量 | 文件列表 |
|--------|----------|----------|
| 生产管理 | 7 | index, plan, scheduling, material, order, quality, inventory |
| 销售管理 | 6 | index, customer, order, pricing, report, team |
| 设备管理 | 5 | index, info, monitor, maintenance, fault |
| 采购管理 | 5 | index, supplier, process, tracking, analysis |
| 仓储管理 | 5 | index, operation, layout, warning, transport |
| 员工管理 | 5 | index, info, attendance, recruitment, performance |

**总计**：37 个页面

---

## 4.5 数据文件详解

每个业务模块对应一个模拟数据文件：

| 文件 | 包含的数据 |
|------|------------|
| `production.js` | 生产计划、任务、物料、订单、质检记录 |
| `sales.js` | 客户、订单、产品、团队、报表 |
| `equipment.js` | 设备列表、维护记录、故障记录 |
| `purchase.js` | 供应商、采购单、物料 |
| `warehouse.js` | 库存、出入库记录、货位 |
| `employee.js` | 员工信息、考勤、薪资、绩效 |

---

## 4.6 公共组件详解

| 文件 | 作用 |
|------|------|
| `header.html` | 顶部导航栏：Logo、用户名、退出按钮 |
| `sidebar.html` | 侧边栏：六个模块的导航链接 |
| `footer.html` | 页脚：版权信息（目前为空） |

---

[上一章：开发环境搭建](./03-setup.md) | [下一章：CSS 样式系统 →](./05-css.md)
