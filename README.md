# 企业管理系统前端

## 项目概述

基于原生 HTML、CSS、JavaScript 的企业管理系统前端项目，包含六个业务子系统。

---

## 目录结构

```
web/
├── index.html                    # 项目入口（重定向到登录页）
├── package.json                  # 项目配置
├── README.md                     # 项目文档
│
└── src/
    ├── assets/                   # 静态资源
    │   ├── css/                  # 样式文件
    │   │   ├── main.css          # 样式入口文件（@import 所有样式）
    │   │   ├── base/             # 基础样式
    │   │   │   ├── reset.css     # CSS 重置
    │   │   │   ├── variables.css # CSS 变量（颜色、字体、间距等）
    │   │   │   └── typography.css# 排版样式
    │   │   ├── components/       # 组件样式
    │   │   │   ├── header.css    # 顶部导航栏
    │   │   │   ├── sidebar.css   # 侧边栏
    │   │   │   ├── button.css    # 按钮组件
    │   │   │   ├── form.css      # 表单组件
    │   │   │   ├── table.css     # 表格组件
    │   │   │   ├── card.css      # 卡片组件
    │   │   │   └── modal.css     # 弹窗组件
    │   │   └── pages/            # 页面样式
    │   │       ├── login.css     # 登录页
    │   │       ├── production.css # 生产管理
    │   │       ├── sales.css     # 销售管理
    │   │       ├── equipment.css # 设备管理
    │   │       ├── purchase.css  # 采购管理
    │   │       ├── warehouse.css # 仓储管理
    │   │       └── employee.css  # 员工管理
    │   │
    │   ├── js/                   # JavaScript 文件
    │   │   ├── main.js           # JS 入口文件
    │   │   ├── utils/            # 工具函数
    │   │   │   ├── dom.js        # DOM 操作工具
    │   │   │   ├── storage.js    # 本地存储工具
    │   │   │   ├── format.js     # 数据格式化
    │   │   │   └── validate.js   # 表单验证
    │   │   └── modules/          # 业务模块
    │   │       ├── auth.js       # 登录认证
    │   │       ├── navigation.js # 导航切换
    │   │       ├── production.js # 生产管理
    │   │       ├── sales.js      # 销售管理
    │   │       ├── equipment.js  # 设备管理
    │   │       ├── purchase.js   # 采购管理
    │   │       ├── warehouse.js  # 仓储管理
    │   │       └── employee.js   # 员工管理
    │   │
    │   └── images/                # 图片资源（待创建）
    │
    ├── components/                # 公共 HTML 组件
    │   ├── header.html            # 顶部导航栏
    │   ├── sidebar.html           # 侧边栏菜单
    │   └── footer.html            # 页脚
    │
    ├── pages/                     # 页面文件
    │   ├── login.html             # 登录页
    │   ├── dashboard.html         # 仪表盘/首页
    │   │
    │   ├── production/            # 生产管理子系统
    │   │   ├── index.html         # 生产管理首页
    │   │   ├── plan.html          # 生产计划管理
    │   │   ├── scheduling.html    # 生产任务排产
    │   │   ├── material.html      # 物料需求计划
    │   │   ├── inventory.html     # 库存管理
    │   │   ├── order.html         # 生产订单管理
    │   │   └── quality.html       # 质量管理
    │   │
    │   ├── sales/                 # 销售管理子系统
    │   │   ├── index.html         # 销售管理首页
    │   │   ├── customer.html      # 客户信息管理
    │   │   ├── report.html        # 销售数据报表
    │   │   ├── order.html         # 销售订单管理
    │   │   ├── pricing.html       # 产品定价和促销
    │   │   └── team.html          # 销售团队管理
    │   │
    │   ├── equipment/             # 设备管理子系统
    │   │   ├── index.html         # 设备管理首页
    │   │   ├── monitor.html       # 设备状态监控
    │   │   ├── maintenance.html   # 设备维护计划
    │   │   ├── fault.html         # 设备故障记录
    │   │   └── info.html          # 设备信息管理
    │   │
    │   ├── purchase/              # 采购管理子系统
    │   │   ├── index.html         # 采购管理首页
    │   │   ├── supplier.html      # 供应商信息管理
    │   │   ├── process.html       # 采购流程管理
    │   │   ├── tracking.html      # 采购订单跟踪
    │   │   └── analysis.html      # 采购数据分析
    │   │
    │   ├── warehouse/             # 仓储管理子系统
    │   │   ├── index.html         # 仓储管理首页
    │   │   ├── operation.html     # 仓储基本操作
    │   │   ├── layout.html        # 仓库布局和货位
    │   │   ├── warning.html       # 库存预警和盘点
    │   │   └── transport.html     # 运输计划和跟踪
    │   │
    │   └── employee/              # 员工管理子系统
    │   │       ├── index.html         # 员工管理首页
    │   │       ├── info.html          # 员工信息管理
    │   │       ├── recruitment.html   # 招聘和培训管理
    │   │       ├── attendance.html    # 考勤和薪资管理
    │   │       └── performance.html   # 员工绩效评估
    │
    └── data/                      # 模拟数据
        ├── production.js          # 生产管理数据
        ├── sales.js               # 销售管理数据
        ├── equipment.js           # 设备管理数据
        ├── purchase.js            # 采购管理数据
        ├── warehouse.js           # 仓储管理数据
        └── employee.js            # 员工管理数据
```

---

## 文件内容规范

### CSS 文件

#### `src/assets/css/base/variables.css`
定义全局 CSS 变量，所有样式统一引用。
```css
/* 示例结构 */
:root {
  /* 主题色 */
  --color-primary: #1890ff;
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-danger: #f5222d;
  
  /* 文字颜色 */
  --color-text-primary: #333;
  --color-text-secondary: #666;
  --color-text-disabled: #ccc;
  
  /* 背景色 */
  --color-bg: #f5f5f5;
  --color-bg-white: #fff;
  
  /* 边框 */
  --border-color: #e8e8e8;
  --border-radius: 4px;
  
  /* 间距 */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* 字体 */
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  
  /* 阴影 */
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.12);
}
```

#### `src/assets/css/main.css`
样式入口文件，按顺序引入所有样式。
```css
/* 1. 基础样式 */
@import './base/reset.css';
@import './base/variables.css';
@import './base/typography.css';

/* 2. 组件样式 */
@import './components/header.css';
@import './components/sidebar.css';
@import './components/button.css';
@import './components/form.css';
@import './components/table.css';
@import './components/card.css';
@import './components/modal.css';

/* 3. 页面样式 */
@import './pages/login.css';
@import './pages/production.css';
@import './pages/sales.css';
@import './pages/equipment.css';
@import './pages/purchase.css';
@import './pages/warehouse.css';
@import './pages/employee.css';
```

---

### JavaScript 文件

#### `src/assets/js/utils/dom.js`
DOM 操作工具函数。
```javascript
/* 应包含的功能 */
// 选择器
function $(selector) {}
function $$(selector) {}

// 元素创建
function createElement(tag, className, innerHTML) {}

// 事件绑定
function on(element, event, handler) {}
function delegate(parent, selector, event, handler) {}

// 类名操作
function addClass(element, className) {}
function removeClass(element, className) {}
function hasClass(element, className) {}
function toggleClass(element, className) {}

// 显示隐藏
function show(element) {}
function hide(element) {}
function toggle(element) {}
```

#### `src/assets/js/utils/storage.js`
本地存储工具。
```javascript
/* 应包含的功能 */
const storage = {
  // localStorage
  set(key, value) {},
  get(key) {},
  remove(key) {},
  clear() {},
  
  // sessionStorage
  session: {
    set(key, value) {},
    get(key) {},
    remove(key) {},
    clear() {}
  }
};
```

#### `src/assets/js/utils/format.js`
数据格式化工具。
```javascript
/* 应包含的功能 */
// 日期格式化
function formatDate(date, pattern) {}

// 数字格式化
function formatNumber(num, decimals) {}

// 金额格式化
function formatMoney(amount, currency) {}

// 百分比格式化
function formatPercent(value) {}
```

#### `src/assets/js/utils/validate.js`
表单验证工具。
```javascript
/* 应包含的功能 */
const validators = {
  // 必填
  required(value, message) {},
  
  // 邮箱
  email(value, message) {},
  
  // 手机号
  phone(value, message) {},
  
  // 长度范围
  length(value, min, max, message) {},
  
  // 数字范围
  range(value, min, max, message) {}
};

// 验证表单
function validateForm(formData, rules) {}
```

#### `src/assets/js/main.js`
JS 入口文件。
```javascript
/* 应包含的功能 */
// 1. 导入所有模块
// 2. 初始化应用
// 3. 绑定全局事件
// 4. 启动路由
```

---

### 模拟数据文件

#### `src/data/production.js`
```javascript
/* 应包含的数据结构 */
const productionData = {
  // 生产计划列表
  plans: [
    { id, name, startDate, endDate, status, products: [] }
  ],
  
  // 生产任务
  tasks: [
    { id, planId, productName, quantity, progress, assignee, deadline }
  ],
  
  // 物料需求
  materials: [
    { id, name, spec, unit, required, stock, shortage }
  ],
  
  // 生产订单
  orders: [
    { id, customer, product, quantity, status, createDate, deliveryDate }
  ],
  
  // 质检记录
  qualityRecords: [
    { id, orderId, inspector, date, result, defects }
  ]
};
```

---

### HTML 页面模板

每个页面应包含：
```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>页面标题 - 企业管理系统</title>
  <!-- 引入主样式 -->
  <link rel="stylesheet" href="../../assets/css/main.css">
  <!-- 引入页面专属样式（如有） -->
</head>
<body>
  <!-- 引入公共组件 -->
  <!-- 页面内容 -->
  <!-- 引入JS文件 -->
  <script src="../../assets/js/main.js"></script>
  <script src="../../assets/js/modules/xxx.js"></script>
</body>
</html>
```

---

## 开发规范

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| CSS 类名 | 小写 + 连字符 | `.login-container`, `.btn-primary` |
| CSS 变量 | 小写 + 连字符 | `--color-primary`, `--font-size-base` |
| JS 变量 | 小驼峰 | `let userName = ''` |
| JS 常量 | 大写 + 下划线 | `const MAX_COUNT = 100` |
| JS 函数 | 小驼峰 | `function getUserInfo() {}` |
| HTML 文件 | 小写 + 连字符 | `user-info.html` |
| 图片文件 | 小写 + 连字符 | `logo-main.png` |

### CSS 编写规范

1. **使用 CSS 变量**：颜色、间距等统一使用 `variables.css` 中定义的变量
2. **避免深层嵌套**：选择器层级不超过 3 层
3. **移动端优先**：先写移动端样式，再用 `@media` 扩展桌面端

### JavaScript 编写规范

1. **使用严格模式**：文件顶部添加 `'use strict';`
2. **避免全局变量**：使用 IIFE 或模块模式
3. **添加注释**：函数说明、参数说明、关键逻辑注释
4. **错误处理**：try-catch 包裹可能出错的代码

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
style: 样式调整
refactor: 代码重构
docs: 文档更新
test: 测试相关
chore: 构建/工具变动
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

## Git 命令大全（新手必读）

> **本仓库信息**
> - 仓库地址：`https://github.com/LING71671/enterprise-management-system.git`
> - 默认分支：`main`
> - 项目路径：`web/`

---

### 基础配置（首次使用必做）

```bash
# 设置用户名（改成你自己的）
git config --global user.name "你的名字"

# 设置邮箱（改成你自己的）
git config --global user.email "你的邮箱@example.com"

# 查看当前配置
git config --list

# 设置默认分支名
git config --global init.defaultBranch main
```

---

### 克隆本项目

```bash
# 克隆本项目到本地
git clone https://github.com/LING71671/enterprise-management-system.git

# 进入项目目录
cd enterprise-management-system/web
```

---

### 查看状态

```bash
# 查看当前状态（修改了哪些文件）
git status

# 查看简短状态
git status -s

# 查看提交历史
git log

# 查看简洁历史（一行显示）
git log --oneline

# 查看最近3次提交
git log -3

# 查看某个文件的修改历史
git log --follow src/assets/css/pages/production.css

# 查看文件具体修改内容
git diff

# 查看已暂存的修改
git diff --staged
```

---

### 分支操作

```bash
# 查看所有分支
git branch

# 查看远程分支
git branch -r

# 查看所有分支（本地+远程）
git branch -a

# 创建新分支
git branch feature/my-feature

# 切换分支
git checkout main

# 创建并切换到新分支（推荐）
git checkout -b feature/my-feature

# ===== 本项目推荐的分支命名 =====

# 功能分支
git checkout -b feature/production-plan      # 生产计划管理功能
git checkout -b feature/sales-customer       # 客户信息管理功能
git checkout -b feature/equipment-monitor    # 设备监控功能

# 修复分支
git checkout -b fix/login-error              # 修复登录问题
git checkout -b fix/style-button             # 修复按钮样式

# 样式调整分支
git checkout -b style/dashboard-layout       # 调整仪表盘布局

# 文档分支
git checkout -b docs/api-guide               # 更新API文档

# ===== 分支管理 =====

# 删除本地分支
git branch -d feature/my-feature

# 强制删除分支（如果分支未合并）
git branch -D feature/my-feature

# 删除远程分支
git push origin --delete feature/my-feature

# 重命名分支
git branch -m feature/old-name feature/new-name

# 合并分支到当前分支
git merge feature/my-feature
```

---

### 添加和提交

```bash
# 添加单个文件到暂存区
git add src/assets/css/pages/production.css

# 添加多个文件
git add src/assets/css/pages/production.css src/assets/js/modules/production.js

# 添加所有修改的文件（推荐）
git add .

# 添加所有文件（包括删除的）
git add -A

# 只添加已跟踪文件的修改
git add -u

# 提交暂存区的文件
git commit -m "feat: 添加生产计划管理页面样式"

# 添加并提交（合并写法，仅适用于已跟踪文件）
git commit -am "fix: 修复生产管理页面样式问题"

# 修改上一次提交信息（未push时使用）
git commit --amend -m "feat: 添加生产计划管理页面完整样式"
```

---

### 推送和拉取（本项目专用）

```bash
# ===== 推送到本项目远程仓库 =====

# 推送当前分支到远程（已设置上游分支后使用）
git push

# 首次推送并设置上游分支（推荐）
git push -u origin feature/my-feature

# 推送到 main 分支
git push origin main

# 推送到指定分支
git push origin feature/production-plan


# ===== 从本项目拉取更新 =====

# 拉取 main 分支最新代码
git pull origin main

# 拉取当前分支最新代码
git pull

# 拉取但不合并（只下载）
git fetch origin

# 查看远程仓库信息
git remote -v
```

---

### 撤销操作

```bash
# 撤销工作区的修改（丢弃修改，危险操作）
git checkout -- src/assets/css/pages/production.css

# 撤销所有工作区修改
git checkout -- .

# 撤销暂存区的文件（取消 add）
git reset HEAD src/assets/css/pages/production.css

# 撤销所有暂存
git reset HEAD

# 撤销最近一次提交（保留修改）
git reset --soft HEAD~1

# 撤销最近一次提交（不保留修改，危险操作）
git reset --hard HEAD~1

# 撤销最近两次提交
git reset --hard HEAD~2

# 回退到指定提交
git reset --hard e2d466e

# 查看已删除的提交（用于恢复）
git reflog

# 恢复误删的提交
git reset --hard e2d466e
```

---

### 暂存工作

```bash
# 暂存当前工作（切换分支前使用）
git stash

# 暂存并添加说明
git stash save "生产计划页面样式开发中"

# 查看暂存列表
git stash list

# 恢复最近的暂存
git stash pop

# 恢复暂存但不删除记录
git stash apply

# 恢复指定的暂存
git stash apply stash@{0}

# 删除暂存
git stash drop stash@{0}

# 删除所有暂存
git stash clear
```

---

### 标签管理

```bash
# 创建标签
git tag v1.0.0

# 创建带说明的标签
git tag -a v1.0.0 -m "企业管理系统前端 v1.0.0 发布"

# 查看所有标签
git tag

# 查看标签详情
git show v1.0.0

# 推送标签到远程
git push origin v1.0.0

# 推送所有标签
git push --tags

# 删除本地标签
git tag -d v1.0.0

# 删除远程标签
git push origin --delete tag v1.0.0
```

---

### 解决冲突

```bash
# 查看冲突文件
git status

# 编辑冲突文件后，标记为已解决
git add 冲突文件名

# 提交合并结果
git commit -m "fix: 解决生产管理页面样式合并冲突"

# 取消合并
git merge --abort

# 使用 ours 策略（保留当前分支）
git checkout --ours src/assets/css/pages/production.css

# 使用 theirs 策略（保留合并分支）
git checkout --theirs src/assets/css/pages/production.css
```

---

### 团队协作完整流程（本项目专用）

#### 场景一：新人首次参与开发

```bash
# 1. 克隆项目
git clone https://github.com/LING71671/enterprise-management-system.git
cd enterprise-management-system/web

# 2. 安装依赖
npm install

# 3. 创建自己的功能分支
git checkout -b feature/production-plan

# 4. 开发代码...

# 5. 查看修改
git status

# 6. 添加修改
git add .

# 7. 提交修改
git commit -m "feat: 完成生产计划管理页面基础结构"

# 8. 推送到远程
git push -u origin feature/production-plan

# 9. 在 GitHub 上创建 Pull Request
# 访问: https://github.com/LING71671/enterprise-management-system
# 点击 "New Pull Request"

# 10. 等待代码审查通过后合并
```

#### 场景二：日常开发流程

```bash
# 1. 每天开始工作前，先拉取最新代码
git checkout main
git pull origin main

# 2. 创建或切换到功能分支
git checkout -b feature/sales-customer
# 或者继续之前的分支
git checkout feature/sales-customer

# 3. 开发代码...

# 4. 定期提交（小步提交）
git add src/pages/sales/customer.html
git commit -m "feat: 添加客户信息管理页面结构"

git add src/assets/css/pages/sales.css
git commit -m "feat: 添加销售管理页面样式"

# 5. 推送到远程
git push origin feature/sales-customer

# 6. 创建 Pull Request 并等待合并
```

#### 场景三：合并后清理分支

```bash
# 1. 切换到 main 分支
git checkout main

# 2. 拉取最新代码
git pull origin main

# 3. 删除本地已合并的分支
git branch -d feature/production-plan

# 4. 删除远程已合并的分支
git push origin --delete feature/production-plan
```

#### 场景四：解决 main 分支冲突

```bash
# 1. 切换到 main 分支，拉取最新
git checkout main
git pull origin main

# 2. 切换回功能分支
git checkout feature/production-plan

# 3. 合并 main 到功能分支
git merge main

# 4. 如果有冲突，解决冲突
# 打开冲突文件，找到 <<<<<<< HEAD ====== >>>>>>> main 标记
# 手动编辑解决冲突

# 5. 添加解决后的文件
git add .

# 6. 提交合并结果
git commit -m "fix: 解决与 main 分支的合并冲突"

# 7. 推送
git push origin feature/production-plan
```

---

### 常见问题解决

#### 问题1：提交错文件了

```bash
# 撤销最近一次提交（保留修改）
git reset --soft HEAD~1

# 重新添加正确的文件
git add src/assets/css/pages/production.css
git commit -m "feat: 添加生产计划管理页面样式"
```

#### 问题2：push 被拒绝

```bash
# 先拉取远程更新
git pull origin main

# 如果有冲突，解决后再提交
git add .
git commit -m "fix: 解决合并冲突"
git push origin main
```

#### 问题3：想放弃所有本地修改

```bash
# 重置到远程 main 状态
git fetch origin
git reset --hard origin/main
```

#### 问题4：误删了分支

```bash
# 查看操作记录
git reflog

# 找到删除前的提交 ID，恢复
git checkout -b feature/production-plan e2d466e
```

#### 问题5：合并了错误的分支

```bash
# 在 push 之前可以撤销
git reset --hard HEAD~1

# 如果已经 push，需要创建新提交来撤销
git revert -m 1 e2d466e
```

#### 问题6：想查看某个提交的详细内容

```bash
# 查看某个提交的内容
git show e2d466e

# 查看某个提交的某个文件
git show e2d466e:src/assets/css/pages/production.css
```

---

### Git 提交规范（本项目专用）

```bash
# 功能开发
feat: 添加生产计划管理页面
feat: 完成销售管理子系统客户信息模块
feat: 实现设备状态监控数据展示

# 修复问题
fix: 修复登录页面验证码不显示问题
fix: 修复侧边栏菜单点击无响应
fix: 修复表格排序功能异常

# 样式调整
style: 调整按钮圆角和间距
style: 优化登录页面响应式布局
style: 统一表格样式配色

# 代码重构
refactor: 重构导航切换逻辑
refactor: 优化表单验证代码结构

# 文档更新
docs: 更新 README 开发指南
docs: 添加 Git 协作流程说明

# 其他
chore: 更新 .gitignore 配置
perf: 优化表格渲染性能
```

---

### 本项目常用命令速查

| 场景 | 命令 |
|------|------|
| 克隆项目 | `git clone https://github.com/LING71671/enterprise-management-system.git` |
| 拉取最新 | `git pull origin main` |
| 创建功能分支 | `git checkout -b feature/功能名` |
| 查看状态 | `git status` |
| 添加所有修改 | `git add .` |
| 提交 | `git commit -m "feat: 描述"` |
| 推送分支 | `git push -u origin feature/功能名` |
| 切换到 main | `git checkout main` |
| 合并 main | `git merge main` |
| 放弃本地修改 | `git checkout -- .` |
| 查看历史 | `git log --oneline` |

---

## 注意事项

1. 所有样式必须使用 CSS 变量，禁止硬编码颜色值
2. 所有页面必须引入 `main.css`，禁止单独引入组件样式
3. 模拟数据使用 JS 对象定义，导出后供模块使用
4. 修改公共组件需通知所有成员
5. 提交前确保代码无语法错误
