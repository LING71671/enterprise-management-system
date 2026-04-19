# 前端 JavaScript 架构说明

本项目是无后端的静态前端原型，业务闭环依赖页面脚本、模拟数据和 `localStorage`。当前架构继续使用经典 `<script>` 与全局命名空间，不使用 `type="module"`、打包器或后端接口。

## 目录分层

```text
src/assets/js/
├── main.js              # 应用启动编排
├── core/                # 路由、页面壳、模块加载、光标等运行时能力
├── shared/              # 跨业务域复用的状态和视图工具
├── systems/             # 业务域真实实现
├── modules/             # 对外入口门面
└── utils/               # 基础工具函数
```

## 启动流程

`main.js` 只负责启动编排：

1. 计算当前页面相对路径。
2. 动态加载 `core` 运行时。
3. 执行登录鉴权。
4. 加载 header、sidebar、footer。
5. 初始化导航与移动端菜单。
6. 根据页面业务域加载 `systems/<domain>` 与 `modules/<domain>.js`。

业务域脚本加载顺序固定为：

```text
shared/state.js
shared/view.js
systems/<domain>/store.js
systems/<domain>/actions.js
systems/<domain>/renderers.js
systems/<domain>/pages.js
modules/<domain>.js
```

## 业务域职责

每个 `systems/<domain>` 目录按职责拆分：

- `store.js`：维护 localStorage 状态、模拟数据默认值和状态快照。
- `actions.js`：封装新增、编辑、删除等业务操作，不直接写 DOM。
- `renderers.js`：封装状态映射、统计卡片、徽章、进度条等展示辅助。
- `pages.js`：根据当前页面绑定事件、调用 actions、刷新 DOM。

`modules/<domain>.js` 只作为兼容门面，继续暴露旧的 `window.employeeModule`、`window.salesModule` 等全局 API，避免破坏已有调用。

## 约束

- 不在业务页面恢复内联业务脚本。
- 不使用 `export/import`，除非后续单独升级构建体系。
- 保持现有 localStorage key，例如 `xm_employee_state`、`xm_sales_state`。
- 新业务优先放入 `systems/<domain>`，不要继续把实现堆进 `modules`。
