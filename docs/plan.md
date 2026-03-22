# 开发计划

## 阶段一：基础设施（优先完成）

**目标：搭建所有页面依赖的公共基础**

### CSS 基础层 `src/assets/css/`
- `base/reset.css` — 浏览器样式重置
- `base/variables.css` — CSS 变量（颜色、间距、字体、阴影）
- `base/typography.css` — 基础排版
- `main.css` — 入口文件，按顺序 `@import` 所有样式

### JS 工具层 `src/assets/js/utils/`
- `dom.js` — 选择器、事件绑定、类名操作、显示隐藏
- `storage.js` — localStorage / sessionStorage 封装
- `format.js` — 日期、数字、金额、百分比格式化
- `validate.js` — 表单验证规则

### 公共组件 `src/components/`
- `header.html` — 顶部导航（系统名、用户信息、退出按钮）
- `sidebar.html` — 侧边菜单（六个子系统导航）
- `footer.html` — 页脚

---

## 阶段二：登录页 + 仪表盘

- **登录页** `src/pages/login.html` — 登录表单、表单验证、登录态写入 sessionStorage
  - `src/assets/css/pages/login.css`
- **仪表盘** `src/pages/dashboard.html` — 六个子系统入口卡片、数据概览
  - `src/assets/js/main.js` — 路由初始化、全局事件

---

## 阶段三：六个子系统页面

每个子系统结构：`pages/{module}/index.html` + 对应 CSS + 模拟数据

| 子系统 | 主要模块 | 数据文件 |
|--------|----------|----------|
| 生产管理 | 生产计划、任务排产、物料需求、生产订单、质量管理 | `data/production.js` |
| 销售管理 | 客户信息、销售报表、销售订单、定价促销、销售团队 | `data/sales.js` |
| 设备管理 | 状态监控、维护计划、故障记录、设备信息 | `data/equipment.js` |
| 采购管理 | 供应商信息、采购流程、订单跟踪、数据分析 | `data/purchase.js` |
| 仓储管理 | 基本操作、货位管理、库存预警、运输跟踪 | `data/warehouse.js` |
| 员工管理 | 员工信息、招聘培训、考勤薪资、绩效评估 | `data/employee.js` |

每个子系统开发步骤：
1. 填充 `data/*.js` 模拟数据
2. 写 `src/assets/js/modules/*.js` 业务逻辑（渲染表格、增删改查）
3. 写对应页面 CSS

---

## 阶段四：组件样式完善

`src/assets/css/components/` 下补全：
- `button.css`、`form.css`、`table.css`、`card.css`、`modal.css`
- `header.css`、`sidebar.css`

---

## 建议开发顺序

```
阶段一 → 阶段二 → 员工管理 → 生产管理 → 销售管理 → 设备/采购/仓储
```

员工管理数据结构最简单，适合作为第一个子系统练手，验证整体架构可行后再推进其他模块。
