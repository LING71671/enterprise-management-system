# `src/assets/js/modules` 模块分析报告

> 更新说明：本报告记录的是早期模块状态。当前业务模块已完成架构重构，`src/assets/js/modules` 只保留兼容门面，真实业务实现已迁移到 `src/assets/js/systems/<domain>/`。新的维护说明请优先参考 `JS_ARCHITECTURE.md`。

## 1. 文档目的

本文档用于沉淀 `web/src/assets/js/modules` 目录的真实结构与职责边界，明确：

- 当前有哪些模块已经承载了可执行逻辑
- 每个模块中包含哪些函数及其作用
- 模块之间的依赖关系和初始化链路是什么
- 当前目录中哪些文件仍处于占位阶段
- 后续业务逻辑模块化迁移应从哪里入手

本文档基于仓库当前代码实际状态整理，不按理想架构推断，不把尚未实现的占位文件误判为已落地模块。

---

## 2. 总体结论

`web/src/assets/js/modules` 目录下共有 10 个文件，但当前真正包含可执行逻辑的只有 4 个：

- `auth.js`
- `landing.js`
- `mobile-nav.js`
- `navigation.js`

其余 6 个文件：

- `employee.js`
- `equipment.js`
- `production.js`
- `purchase.js`
- `sales.js`
- `warehouse.js`

目前都只有说明性注释，没有真正函数实现，也没有实际业务逻辑落地。

需要特别强调的是：以上结论仅在 `modules` 目录范围内成立。若扩大到整个前端运行时，仍有大量真实业务逻辑存在于：

- `web/src/assets/js/main.js`
- 各业务页面的内联 `<script>`

也就是说，当前项目整体处于“公共模块已初步抽离、业务逻辑仍大量停留在页面脚本中”的状态。

---

## 3. 模块逐文件分析

## 3.1 `auth.js`

### 3.1.1 模块职责

负责前端鉴权、登录态管理、注册模拟、页面访问守卫。

### 3.1.2 函数清单与作用

#### `login(username, password)`

作用：

- 校验是否为硬编码管理员账号 `admin / 123456`
- 登录成功后写入当前用户信息
- 使用 `storage.session.set(...)` 把登录态保存到 `sessionStorage`
- 返回登录是否成功的布尔值

说明：

- 当前是纯前端模拟登录
- 没有接后端接口

#### `logout()`

作用：

- 清除当前登录会话
- 根据当前页面路径计算相对路径
- 跳转回 `landing.html`

说明：

- 不是固定写死跳转地址
- 会尝试根据 URL 中 `pages` 所在层级动态计算返回路径
- 说明项目考虑了子目录部署场景

#### `getUser()`

作用：

- 从 `sessionStorage` 中读取当前登录用户信息

#### `isLoggedIn()`

作用：

- 判断当前是否存在登录用户
- 本质是 `!!this.getUser()`

#### `guard()`

作用：

- 作为页面访问守卫
- 当用户未登录时，自动跳转到 `pages/login.html`

说明：

- 会根据当前 URL 层级动态计算相对路径
- 是后台页面鉴权入口
- 会被 `main.js` 在非登录/注册页调用

#### `register(username, email, password)`

作用：

- 模拟注册逻辑
- 从 `localStorage` 中读取本地用户列表
- 校验用户名或邮箱是否重复
- 注册成功后写入 `xm_users`

说明：

- 当前是本地存储模拟注册
- 不与后端服务交互

### 3.1.3 模块总结

`auth.js` 是当前项目中最核心的公共能力模块之一，负责：

- 登录态写入
- 登录态读取
- 登录校验
- 页面鉴权跳转
- 简易注册

### 3.1.4 直接依赖

- `web/src/assets/js/utils/storage.js`

---

## 3.2 `landing.js`

### 3.2.1 模块职责

负责首页 / 落地页的交互增强和视觉效果初始化。

### 3.2.2 函数清单与作用

#### `initSmoothScroll()`

作用：

- 查找所有以 `#` 开头的锚点链接
- 拦截默认跳转行为
- 平滑滚动到目标区域

涉及行为：

- `querySelectorAll('a[href^="#"]')`
- 事件监听
- `scrollIntoView({ behavior: 'smooth' })`

#### `initNavbarScroll()`

作用：

- 获取 `#navbar`
- 监听窗口滚动
- 当滚动距离大于 50 时添加 `navbar-scrolled` 类
- 否则移除该类

用途：

- 让首页导航栏在滚动后呈现不同视觉状态

#### `initAnimations()`

作用：

- 创建 `IntersectionObserver`
- 观察统计卡片、技术卡片、产品卡片进入视口的时机
- 元素进入视口时添加 `fade-in` 类

观察对象：

- `.stat-card`
- `.tech-card`
- `.product-card`

#### `init()`

作用：

- 作为模块统一初始化入口
- 顺序执行：
  - `initSmoothScroll()`
  - `initNavbarScroll()`
  - `initAnimations()`

### 3.2.3 初始化方式

`landing.js` 使用 IIFE（立即执行函数）模式封装为 `landing` 对象，并在：

- `DOMContentLoaded`

之后自动执行：

- `landing.init()`

这意味着它是一个自初始化页面模块，不依赖页面额外手动调用。

### 3.2.4 模块总结

`landing.js` 是典型的首页交互模块，主要处理：

- 平滑滚动
- 滚动态导航栏状态
- 进入视口触发动画

---

## 3.3 `mobile-nav.js`

### 3.3.1 模块职责

负责移动端侧边栏导航的打开、关闭、遮罩交互、键盘关闭和窗口尺寸响应。

### 3.3.2 函数清单与作用

#### `init()`

作用：

- 获取移动导航依赖的关键 DOM 元素：
  - `.sidebar`
  - `#sidebar-overlay`
  - `#hamburger-btn`
- 若元素缺失则输出警告并停止初始化
- 若元素存在则继续执行：
  - `bindEvents()`
  - `handleResize()`

#### `bindEvents()`

作用：

- 给汉堡按钮绑定点击事件
- 给遮罩层绑定点击关闭事件
- 监听 `Escape` 键关闭侧边栏
- 监听窗口 resize 事件，触发响应式收起逻辑

#### `toggleSidebar()`

作用：

- 根据 `isOpen` 状态决定执行打开或关闭

#### `openSidebar()`

作用：

- 为侧边栏添加 `open`
- 为遮罩层添加 `active`
- 为按钮添加 `active`
- 设置 `aria-expanded="true"`
- 将 `isOpen` 设为 `true`
- 设置 `document.body.style.overflow = 'hidden'`，禁止页面背景滚动

#### `closeSidebar()`

作用：

- 移除侧边栏、遮罩层、按钮的打开状态类名
- 设置 `aria-expanded="false"`
- 将 `isOpen` 设为 `false`
- 恢复页面滚动

#### `handleResize()`

作用：

- 当窗口宽度大于 `768` 且侧边栏仍处于打开状态时，自动关闭侧边栏

### 3.3.3 暴露方式

模块末尾通过：

- `window.MobileNav = MobileNav`

把对象暴露到全局，由页面脚本或 `main.js` 调用。

### 3.3.4 模块总结

`mobile-nav.js` 是一个移动端抽屉导航控制器，核心能力包括：

- 打开 / 关闭侧边栏
- 遮罩层联动
- ESC 键关闭
- 自适应宽度切换
- 可访问性属性维护

### 3.3.5 直接依赖

该模块没有 JS 级 import 依赖，但强依赖页面中存在以下 DOM 结构：

- `.sidebar`
- `#sidebar-overlay`
- `#hamburger-btn`

因此它本质上依赖后台布局组件是否已注入完成。

---

## 3.4 `navigation.js`

### 3.4.1 模块职责

负责后台公共导航初始化，包括：

- 当前菜单高亮
- 当前用户信息渲染
- 退出登录事件绑定

### 3.4.2 函数清单与作用

#### `init()`

作用：

- 作为模块统一初始化入口
- 顺序执行：
  - `highlightActive()`
  - `bindLogout()`
  - `renderUser()`

#### `highlightActive()`

作用：

- 获取当前页面路径 `window.location.pathname`
- 遍历 `.sidebar-item`
- 优先读取 `data-page`，否则从 `href` 中推导页面标识
- 若当前路径命中，则为菜单项增加 `active` 类

说明：

- 同时兼容动态生成链接与静态链接
- 是后台侧边栏激活态的核心逻辑

#### `renderUser()`

作用：

- 读取 `auth.getUser()` 返回的当前用户
- 把用户名渲染到 `.header-user .username`
- 把用户名首字母渲染到 `.header-user .avatar`

#### `bindLogout()`

作用：

- 获取 `#logout-btn`
- 绑定点击事件
- 点击后执行 `auth.logout()`

### 3.4.3 模块总结

`navigation.js` 是后台壳层的导航辅助模块，解决的是：

- 菜单高亮
- 当前用户展示
- 退出登录交互

### 3.4.4 直接依赖

该模块依赖多个全局能力：

- `auth`
- `$`
- `$$`
- `on`
- `addClass`

这些能力分别来自：

- `web/src/assets/js/modules/auth.js`
- `web/src/assets/js/utils/dom.js`

因此它对脚本加载顺序有隐式要求。

---

## 3.5 `employee.js`

### 当前状态

仅包含注释说明，没有任何函数实现。

### 注释表达的未来职责

- 员工列表渲染
- 员工详情弹窗 / 详情页渲染
- 员工新增、编辑、删除的前端 CRUD 逻辑
- 部门筛选、关键字搜索、状态筛选
- 考勤、招聘、绩效页面的事件绑定与视图刷新
- 表单校验与本地状态更新

### 注释中建议的拆分函数

- `renderEmployeeList()`
- `renderEmployeeStats()`
- `bindEmployeeEvents()`
- `createEmployee()` / `updateEmployee()` / `deleteEmployee()`
- `filterEmployees()` / `searchEmployees()`

### 结论

该文件目前是员工业务域的模块化迁移占位文件。

---

## 3.6 `equipment.js`

### 当前状态

仅包含注释说明，没有任何函数实现。

### 注释表达的未来职责

- 设备列表与设备状态总览渲染
- 设备信息的新增、编辑、删除
- 设备状态筛选、故障筛选、维护计划筛选
- 监控、维护、故障记录等页面交互
- 状态 badge、统计卡片、详情弹窗渲染
- 本地数据更新

### 注释中建议的拆分函数

- `renderEquipmentTable()`
- `renderEquipmentStats()`
- `bindEquipmentEvents()`
- `createEquipment()` / `updateEquipment()` / `deleteEquipment()`
- `filterEquipment()` / `filterFaults()`

### 结论

该文件目前是设备业务域的模块化迁移占位文件。

---

## 3.7 `production.js`

### 当前状态

仅包含注释说明，没有任何函数实现。

### 注释表达的未来职责

- 生产计划、任务、物料、订单、质量数据渲染
- 生产计划 / 订单 / 任务的前端 CRUD
- 物料短缺统计、进度条、状态标记等视图计算
- 生产首页与子页面事件绑定
- 搜索、筛选、状态切换与本地数据刷新

### 注释中建议的拆分函数

- `renderProductionStats()`
- `renderPlans()` / `renderTasks()` / `renderOrders()`
- `bindProductionEvents()`
- `createPlan()` / `updatePlan()` / `deletePlan()`
- `filterPlans()` / `filterOrders()`

### 结论

该文件目前是生产业务域的模块化迁移占位文件。

---

## 3.8 `purchase.js`

### 当前状态

仅包含注释说明，没有任何函数实现。

### 注释表达的未来职责

- 供应商、采购订单、跟踪、分析页面渲染
- 供应商与采购订单的前端 CRUD
- 订单状态筛选、供应商搜索、金额统计
- 采购首页与子页面事件绑定
- 表格、弹窗、表单提交后的本地数据更新

### 注释中建议的拆分函数

- `renderPurchaseStats()`
- `renderSuppliers()` / `renderPurchaseOrders()`
- `bindPurchaseEvents()`
- `createSupplier()` / `updateSupplier()` / `deleteSupplier()`
- `createPurchaseOrder()` / `updatePurchaseOrder()`

### 结论

该文件目前是采购业务域的模块化迁移占位文件。

---

## 3.9 `sales.js`

### 当前状态

仅包含注释说明，没有任何函数实现。

### 注释表达的未来职责

- 客户、订单、报表、定价、团队页面渲染
- 客户与销售订单的前端 CRUD
- 客户搜索、订单状态筛选、金额统计、报表计算
- 销售首页与子页面事件绑定
- 表单校验、弹窗交互、列表刷新

### 注释中建议的拆分函数

- `renderSalesStats()`
- `renderCustomers()` / `renderOrders()` / `renderReports()`
- `bindSalesEvents()`
- `createCustomer()` / `updateCustomer()` / `deleteCustomer()`
- `createSalesOrder()` / `updateSalesOrder()` / `deleteSalesOrder()`

### 结论

该文件目前是销售业务域的模块化迁移占位文件。

---

## 3.10 `warehouse.js`

### 当前状态

仅包含注释说明，没有任何函数实现。

### 注释表达的未来职责

- 库存、入库、出库、货位、运输、预警页面渲染
- 入库 / 出库记录与库存信息的前端 CRUD
- 库存预警判断、货位筛选、运输状态筛选
- 仓储首页与子页面事件绑定
- 表格、统计卡片、状态标记与本地数据更新

### 注释中建议的拆分函数

- `renderWarehouseStats()`
- `renderInventory()` / `renderInbound()` / `renderOutbound()`
- `bindWarehouseEvents()`
- `createInventoryItem()` / `updateInventoryItem()` / `deleteInventoryItem()`
- `filterInventory()` / `filterTransport()`

### 结论

该文件目前是仓储业务域的模块化迁移占位文件。

---

## 4. 模块间依赖关系

### 4.1 `auth.js -> storage.js`

`auth.js` 依赖 `web/src/assets/js/utils/storage.js` 提供的存储能力：

- 登录态存入 `sessionStorage`
- 注册用户写入 `localStorage`

这是当前前端登录 / 注册状态管理的基础。

### 4.2 `navigation.js -> auth.js + dom.js`

`navigation.js` 使用的全局能力包括：

- `auth.getUser()`
- `$`
- `$$`
- `on`
- `addClass`

说明它依赖：

- `auth.js`
- `utils/dom.js`

也说明当前模块系统依赖脚本加载顺序，而不是 `import / export`。

### 4.3 `mobile-nav.js -> 页面布局组件`

`mobile-nav.js` 强依赖以下 DOM 元素已经存在：

- `.sidebar`
- `#sidebar-overlay`
- `#hamburger-btn`

这些元素通常来自后台页异步加载的公共组件，因此它的有效初始化往往发生在页面组件注入完成之后。

### 4.4 `landing.js -> 首页页面结构`

`landing.js` 依赖首页上存在以下结构：

- `#navbar`
- 锚点链接
- 统计卡片、技术卡片、产品卡片

它是典型的页面级交互模块。

---

## 5. 与 `main.js` 和页面脚本的关系

## 5.1 `main.js` 并非空壳

虽然本文重点分析的是 `modules` 目录，但 `web/src/assets/js/main.js` 也承担了大量运行时职责，包括：

- 在非登录 / 注册页执行 `auth.guard()`
- 尝试执行 `appNav.init()`
- 尝试执行 `MobileNav.init()`
- 初始化自定义鼠标跟随动效 `initCustomCursor()`
- 通过 `MutationObserver` 监听 DOM 变化，修正组件路径 `initPathObserver()`

因此，不能把项目运行时行为全部归结到 `modules` 目录。

## 5.2 页面内联脚本仍承载大量业务逻辑

从页面调用关系看：

- `login.html` 调用 `auth.login(...)`
- `register.html` 调用 `auth.register(...)`
- `dashboard.html` 调用 `auth.getUser()`
- 多数后台页会在组件加载完成后调用 `appNav.init()`
- 部分页面会在组件加载完成后调用 `MobileNav.init()`

这意味着当前架构仍然保留了大量页面级内联脚本逻辑。特别是各业务域页面的渲染、筛选、统计、表单交互，还没有真正迁移到 `modules/employee.js`、`modules/sales.js` 等业务模块文件中。

## 5.3 初始化链路的真实情况

当前公共模块的初始化方式并不完全一致：

- `landing.js`：在 `DOMContentLoaded` 后自初始化
- `navigation.js`：通常由各页面在 header / sidebar 加载完成后调用 `appNav.init()`
- `mobile-nav.js`：通常由各页面在组件注入完成后调用 `MobileNav.init()`，`main.js` 中也有兜底尝试
- `auth.js`：由 `main.js` 或页面脚本按需调用

因此项目实际是“模块暴露公共能力 + 页面脚本组织初始化”的混合模式。

---

## 6. 当前目录体现出的设计模式

### 6.1 对象字面量模块

例如：

- `auth`
- `appNav`
- `MobileNav`

特点：

- 用对象封装状态与方法
- 通过全局变量暴露能力
- 适合纯脚本项目快速组织公共逻辑

### 6.2 IIFE 模块模式

例如：

- `landing`

特点：

- 私有函数不泄漏到全局作用域
- 对外只暴露有限入口
- 适合单页交互封装

### 6.3 `init()` 聚合入口

多个模块都采用统一初始化入口：

- `landing.init()`
- `MobileNav.init()`
- `appNav.init()`

这说明项目倾向于把模块内部子逻辑收敛到单一启动函数中，便于页面在合适时机进行初始化。

### 6.4 DOM 驱动型前端结构

当前模块的核心操作主要围绕：

- 查询 DOM
- 绑定事件
- 改写 class
- 渲染文本内容
- 根据 URL 和状态切换 UI

说明项目属于典型的原生 JavaScript 页面增强式前端，而不是状态驱动型框架应用。

### 6.5 全局依赖型组织方式

模块之间不是通过 `import / export` 建立关系，而是通过：

- 全局对象
- 共享工具函数
- 脚本加载顺序

来完成协作。

优点：

- 结构直观
- 接入成本低

缺点：

- 依赖隐式
- 顺序敏感
- 规模扩大后更容易变脆弱

---

## 7. 涉及的知识点

从该目录可以提炼出以下前端知识点：

### 7.1 JavaScript 基础与组织方式

- 对象字面量模块
- IIFE（立即执行函数）
- 闭包
- `this` 上下文
- 布尔强转 `!!`

### 7.2 DOM 操作

- `querySelector`
- `querySelectorAll`
- `getElementById`
- `textContent`
- `classList.add / remove`
- `setAttribute`

### 7.3 浏览器事件机制

- `click`
- `scroll`
- `resize`
- `keydown`
- `DOMContentLoaded`

### 7.4 浏览器原生 API

- `localStorage`
- `sessionStorage`
- `IntersectionObserver`
- `MutationObserver`
- `window.location`
- `scrollIntoView`

### 7.5 响应式与交互体验

- 抽屉侧边栏
- 遮罩层交互
- ESC 键关闭
- 滚动态导航栏
- 视口进入动画
- 页面滚动锁定
- `aria-expanded` 可访问性属性

### 7.6 前端架构与工程化意识

- 公共模块抽取
- 页面初始化时机控制
- 组件异步注入后的再初始化
- 相对路径修正
- 内联脚本向模块脚本迁移

---

## 8. 当前代码结构所反映的真实状态

从 `modules` 目录的实际内容看，当前项目已经完成了部分公共能力的抽取，但业务域模块化仍停留在规划阶段。

可以分成两部分理解：

### 8.1 已经落地的部分

- 鉴权与登录态管理
- 后台导航高亮与用户展示
- 移动端侧边栏交互
- 首页滚动与动效增强

### 8.2 尚未落地的部分

- 六大业务域页面的渲染逻辑
- CRUD 操作
- 搜索 / 筛选逻辑
- 统计逻辑
- 表单提交流程
- 页面事件绑定的统一收拢

因此，当前目录更像是：

- 公共模块已成型
- 业务模块待迁移

这也是为什么多个业务文件虽然名字已经建立，但实际还只是模块化重构目标的“壳”。

---

## 9. 后续重构建议

如果后续要真正发挥 `modules` 目录价值，建议按业务域逐步把页面内联脚本迁移到对应模块文件中。

建议方向：

1. 先从单个业务域开始，例如 `employee.js`
2. 优先抽取高复用逻辑：
   - 列表渲染
   - 统计卡片渲染
   - 搜索与筛选
   - 弹窗 / 表单事件绑定
3. 保留页面内只做：
   - 数据注入
   - 模块初始化调用
4. 逐步将“页面即业务逻辑”的模式改成“页面负责挂载，模块负责逻辑”

这样做的收益包括：

- 逻辑复用更容易
- 批量修复成本更低
- 页面结构更清晰
- 业务域边界更明确

---

## 10. 验证与结论说明

本次文档结论基于以下核查：

- 通读 `web/src/assets/js/modules` 下全部 10 个文件
- 检查 `web/src/assets/js/main.js`
- 检查 `web/src/assets/js/utils/dom.js`
- 检查 `web/src/assets/js/utils/storage.js`
- 检查 `login.html`、`register.html`、`dashboard.html` 对模块的调用关系
- 搜索 `appNav.init()`、`MobileNav.init()`、`auth.*` 的页面调用位置
- 对 `web/src/assets/js/modules` 执行 LSP 诊断，结果为 0 报错
- 使用 Oracle 对结论范围做复核，确认“4 个有逻辑 + 6 个占位”的判断在 `modules` 目录范围内成立

最终结论：

`src/assets/js/modules` 当前是一个“已具备公共模块雏形、但尚未完成业务模块化迁移”的目录。真正已落地的，是认证、导航、移动端侧边栏和首页交互；真正还没落地的，是六大业务域自身的页面逻辑模块化。
