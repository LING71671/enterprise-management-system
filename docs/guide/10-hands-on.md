# 第十部分：手把手教程

[返回目录](./README.md) | [上一章：进阶知识](./09-advanced.md) | [下一章：附录](./appendix.md)

---

> 前面学了很多概念，现在是动手的时候了！
> 这一章会带你完成几个实际的修改任务，让你真正理解如何操作。

---

## 10.1 准备工作

### 确保项目正在运行

1. 打开命令行，进入项目目录
2. 运行 `npm run dev`
3. 打开浏览器访问 `http://localhost:8080`

### 打开代码编辑器

推荐使用 VS Code：
1. 打开 VS Code
2. 选择「文件」→「打开文件夹」
3. 选择项目目录 `web/`

---

## 10.2 案例 1：修改登录页欢迎语

### 目标

把登录页的 "小麦科技企业管理平台" 改成你自己的名字。

### 步骤

**第一步：找到目标文件**

登录页文件是：`web/src/pages/login.html`

**第二步：打开文件**

在 VS Code 左侧文件树中，找到并点击 `login.html`

**第三步：找到要修改的文字**

按 `Ctrl + F` 打开搜索，输入 "小麦科技企业管理平台"

**第四步：修改文字**

找到这行代码：
```html
<h1>小麦科技企业管理平台</h1>
```

改成：
```html
<h1>我的管理系统</h1>
```

**第五步：保存文件**

按 `Ctrl + S` 保存

**第六步：刷新浏览器**

回到浏览器，按 `F5` 刷新页面

**第七步：验证结果**

登录页标题应该显示 "我的管理系统"

### 练习

试着把登录页的副标题也改掉！

---

## 10.3 案例 2：添加新的表单字段

### 目标

在登录页添加一个"记住我"复选框。

### 步骤

**第一步：找到表单位置**

在 `login.html` 中找到 `<form>` 标签

**第二步：添加 HTML 代码**

在密码输入框后面、登录按钮前面，添加：

```html
<div class="form-group">
  <label class="remember-me">
    <input type="checkbox" id="remember"> 记住我
  </label>
</div>
```

**第三步：添加样式**

打开 `web/src/assets/css/pages/login.css`，添加：

```css
.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary);
}
```

**第四步：保存并刷新**

保存两个文件，刷新浏览器

### 练习

给"记住我"复选框添加功能：勾选后，下次登录自动填充用户名。

---

## 10.4 案例 3：修改主题色

### 目标

把橙色主题改成蓝色。

### 步骤

**第一步：找到变量文件**

打开 `web/src/assets/css/base/variables.css`

**第二步：找到主题色定义**

找到这几行：

```css
--color-primary: #FF6B00;
--color-primary-light: #FF8C33;
--color-primary-dark: #CC5500;
--color-primary-bg: #FFF3E8;
```

**第三步：修改为蓝色**

```css
--color-primary: #1890ff;
--color-primary-light: #40a9ff;
--color-primary-dark: #096dd9;
--color-primary-bg: #e6f7ff;
```

**第四步：保存并刷新**

保存文件，按 `Ctrl + F5` 强制刷新（清除缓存）

**第五步：验证**

整个网站的所有按钮、链接、图标都会变成蓝色！

### 颜色推荐

想要其他颜色？这里有一些推荐：

| 颜色 | 主色 | 浅色 | 深色 | 背景色 |
|------|------|------|------|--------|
| 红色 | #f5222d | #ff4d4f | #cf1322 | #fff1f0 |
| 绿色 | #52c41a | #73d13d | #389e0d | #f6ffed |
| 紫色 | #722ed1 | #9254de | #531dab | #f9f0ff |
| 青色 | #13c2c2 | #36cfc9 | #08979c | #e6fffb |

---

## 10.5 案例 4：创建新页面

### 目标

创建一个"关于我们"页面。

### 步骤

**第一步：创建 HTML 文件**

在 `web/src/pages/` 下创建 `about.html`

**第二步：复制模板**

复制 `dashboard.html` 的内容到 `about.html`

**第三步：修改内容**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>关于我们 - 小麦科技</title>
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
  <!-- 加载公共组件 -->
  <div id="header-placeholder"></div>
  <div id="sidebar-placeholder"></div>

  <!-- 页面内容 -->
  <main class="main-content">
    <h1>关于我们</h1>
    <p>小麦科技是一家创新型科技公司...</p>
  </main>

  <!-- 加载脚本 -->
  <script src="../assets/js/utils/dom.js"></script>
  <script src="../assets/js/utils/storage.js"></script>
  <script src="../assets/js/modules/auth.js"></script>
  <script src="../assets/js/modules/navigation.js"></script>
  <script src="../assets/js/main.js"></script>
</body>
</html>
```

**第四步：添加导航链接**

在 `sidebar.html` 中添加：

```html
<a href="#" data-page="about.html" class="sidebar-item">
  <span class="icon">ℹ️</span>
  <span>关于我们</span>
</a>
```

**第五步：测试**

访问 `http://localhost:8080/pages/about.html`

---

## 10.6 浏览器调试入门

> 当你的代码不按预期工作时，调试是你最重要的技能。

### 什么是调试？

调试就是"找 bug"的过程。Bug 是程序中的错误。

### 打开开发者工具

**方法一**：按 `F12` 键

**方法二**：右键点击页面，选择"检查"

**方法三**：按 `Ctrl + Shift + I`（Mac 上是 `Cmd + Option + I`）

### 开发者工具界面

```
┌─────────────────────────────────────────────────────────────┐
│ Elements  Console  Sources  Network  ...                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│                    [工具内容区域]                            │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 常用标签页

| 标签 | 作用 | 使用场景 |
|------|------|----------|
| Elements | 查看 HTML 结构 | 找元素、修改样式测试 |
| Console | 查看 JS 输出和错误 | 调试代码、查看错误 |
| Network | 查看网络请求 | 检查文件是否加载、API 调试 |
| Sources | 查看源代码 | 设置断点、单步调试 |

### 案例：查看 JavaScript 错误

**场景**：点击按钮没反应

**步骤**：

1. 打开开发者工具（F12）
2. 点击 Console 标签
3. 查看是否有红色错误信息
4. 点击错误信息，会跳转到出错的代码位置

**常见错误**：

| 错误信息 | 原因 | 解决方法 |
|----------|------|----------|
| `Uncaught ReferenceError: xxx is not defined` | 使用了未定义的变量 | 检查变量名拼写、是否引入了相关 JS |
| `Uncaught TypeError: Cannot read property 'xxx' of null` | 对 null 调用方法 | 检查元素是否存在 |
| `Failed to load resource` | 文件加载失败 | 检查文件路径是否正确 |

### 案例：检查样式问题

**场景**：元素样式不对

**步骤**：

1. 右键点击目标元素
2. 选择"检查"
3. 在右侧 Styles 面板查看应用的样式
4. 样式被划线表示被覆盖
5. 可以直接修改样式值测试效果

### 案例：查看网络请求

**场景**：组件没加载出来

**步骤**：

1. 打开 Network 标签
2. 刷新页面
3. 查看是否有红色的请求（失败）
4. 点击失败的请求查看详情
5. 检查状态码和响应内容

### 实用技巧

**技巧 1：在代码中输出调试信息**

```javascript
console.log('当前用户：', user);
console.log('执行到这里了');
console.log('变量值：', myVariable);
```

**技巧 2：使用 debugger 断点**

```javascript
function myFunction() {
  debugger;  // 代码会在这里暂停
  // 后续代码...
}
```

**技巧 3：查看元素事件**

在 Elements 面板，选中元素后，右侧 Event Listeners 标签可以查看绑定的所有事件。

---

## 10.7 从零创建一个组件

> 学习如何创建一个可复用的 UI 组件。

### 目标

创建一个"消息提示"组件，类似手机上的 Toast 提示。

### 什么是组件？

组件就是可复用的 UI 单元。比如按钮、卡片、弹窗都是组件。

### 组件的组成部分

一个完整的组件需要：
1. HTML 结构
2. CSS 样式
3. JavaScript 交互

### 步骤一：创建 HTML 结构

在 `components/` 下创建 `toast.html`：

```html
<div class="toast-container" id="toast-container">
  <!-- Toast 消息会动态插入这里 -->
</div>

<template id="toast-template">
  <div class="toast">
    <span class="toast-message"></span>
    <button class="toast-close">×</button>
  </div>
</template>
```

### 步骤二：创建 CSS 样式

在 `css/components/` 下创建 `toast.css`：

```css
/* Toast 容器 - 固定在右上角 */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 单个 Toast 消息 */
.toast {
  background: var(--color-bg-white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  animation: slideIn 0.3s ease;
  min-width: 200px;
}

/* 关闭按钮 */
.toast-close {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: var(--color-text-secondary);
}

/* 成功样式 */
.toast.success {
  border-left: 4px solid var(--color-success);
}

/* 错误样式 */
.toast.error {
  border-left: 4px solid var(--color-danger);
}

/* 动画 */
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### 步骤三：创建 JavaScript 功能

在 `js/utils/` 下创建 `toast.js`：

```javascript
'use strict';

const toast = {
  container: null,
  template: null,

  init() {
    // 加载组件 HTML
    fetch('../../components/toast.html')
      .then(r => r.text())
      .then(html => {
        document.body.insertAdjacentHTML('beforeend', html);
        this.container = $('#toast-container');
        this.template = $('#toast-template');
      });
  },

  show(message, type = 'info', duration = 3000) {
    if (!this.container) return;

    // 克隆模板
    const toastEl = this.template.content.cloneNode(true);
    const toastDiv = toastEl.querySelector('.toast');
    
    // 设置内容和类型
    toastDiv.querySelector('.toast-message').textContent = message;
    toastDiv.classList.add(type);

    // 添加关闭事件
    toastDiv.querySelector('.toast-close').addEventListener('click', () => {
      this.remove(toastDiv);
    });

    // 添加到容器
    this.container.appendChild(toastDiv);

    // 自动消失
    if (duration > 0) {
      setTimeout(() => this.remove(toastDiv), duration);
    }
  },

  remove(toastEl) {
    toastEl.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toastEl.remove(), 300);
  },

  success(message) {
    this.show(message, 'success');
  },

  error(message) {
    this.show(message, 'error', 5000);
  }
};
```

### 步骤四：引入样式

在 `main.css` 中添加：

```css
@import './components/toast.css';
```

### 步骤五：使用组件

在需要的地方调用：

```javascript
// 显示成功消息
toast.success('操作成功！');

// 显示错误消息
toast.error('操作失败，请重试');

// 自定义消息
toast.show('正在处理...', 'info', 2000);
```

### 组件设计原则

1. **单一职责**：一个组件只做一件事
2. **可配置**：通过参数控制行为
3. **可复用**：不依赖特定上下文
4. **可扩展**：预留扩展点

### 练习

试着给 Toast 添加更多类型：warning、info，并添加对应的样式。

---

## 10.8 练习任务

完成以下练习，检验你的学习成果：

1. **修改 Logo**：替换网站 Logo 图片
2. **添加页脚**：给所有页面添加统一的页脚
3. **创建新模块**：仿照现有模块，创建一个"公告管理"子系统
4. **修改验证规则**：把密码最小长度从 6 位改成 8 位

---

[上一章：进阶知识](./09-advanced.md) | [下一章：附录 →](./appendix.md)
