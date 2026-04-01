# 第八部分：常见问题 FAQ

[返回目录](./README.md) | [上一章：页面讲解](./07-pages.md) | [下一章：进阶知识](./09-advanced.md)

---

> 这里收集了初学者最常遇到的问题，按修改难度分类。

---

## 🔰 基础修改类

### Q1: 如何修改主题色？

**文件**：`web/src/assets/css/base/variables.css`

**步骤**：
1. 打开 `variables.css`
2. 找到 `--color-primary` 相关变量
3. 修改颜色值
4. 保存，刷新浏览器

```css
/* 原来：橙色 */
--color-primary: #FF6B00;

/* 改成：蓝色 */
--color-primary: #1890ff;
```

---

### Q2: 如何修改登录用户名和密码？

**文件**：`web/src/assets/js/modules/auth.js`

**步骤**：
1. 打开 `auth.js`
2. 找到 `login` 方法里的判断条件（第 8 行左右）
3. 修改用户名和密码

```javascript
// 原来
if (username === 'admin' && password === '123456') {

// 改成
if (username === 'myname' && password === 'mypassword') {
```

---

### Q3: 如何替换 Logo 图片？

**文件**：`web/src/assets/images/logo.png`

**步骤**：
1. 准备新的 Logo 图片（建议尺寸：宽度 ≥ 400px）
2. 重命名为 `logo.png`
3. 覆盖 `web/src/assets/images/logo.png`
4. 刷新浏览器（可能需要强制刷新：Ctrl+F5）

---

### Q4: 如何修改页面上的文字？

**方法**：找到对应的 HTML 文件，直接修改文字内容。

**示例**：修改登录页标题

**文件**：`web/src/pages/login.html`

```html
<!-- 原来 -->
<h1>小麦科技企业管理平台</h1>

<!-- 改成 -->
<h1>我的企业管理系统</h1>
```

---

### Q5: 如何修改侧边栏菜单？

**文件**：`web/src/components/sidebar.html`

**步骤**：
1. 打开 `sidebar.html`
2. 找到对应的菜单项
3. 修改文字或链接

```html
<!-- 原来 -->
<a href="#" data-page="production/index.html" class="sidebar-item">
    <span class="icon">🏭</span>
    <span>生产管理</span>
</a>

<!-- 改成 -->
<a href="#" data-page="production/index.html" class="sidebar-item">
    <span class="icon">🏭</span>
    <span>生产中心</span>
</a>
```

---

## 🔧 功能修改类

### Q6: 如何添加一个新页面？

**步骤**：

1. **创建 HTML 文件**
   - 在 `src/pages/` 下创建新文件，如 `mypage.html`
   - 复制现有页面的模板代码（如 `dashboard.html`）

2. **修改页面内容**
   - 修改 `<title>` 标签
   - 修改页面主体内容

3. **添加样式**（可选）
   - 在 `src/assets/css/pages/` 下创建 `mypage.css`
   - 在 `main.css` 里添加 `@import './pages/mypage.css';`

4. **添加导航链接**
   - 在 `sidebar.html` 里添加菜单项

---

### Q7: 如何修改模拟数据？

**文件**：`web/src/data/*.js`

**示例**：修改生产管理数据

**文件**：`web/src/data/production.js`

```javascript
const productionData = {
    plans: [
        // 在这里添加或修改数据
        { id: 'PP001', name: '我的生产计划', status: '进行中' },
    ],
    // ...
};
```

---

### Q8: 如何添加新的表单字段？

**示例**：在登录页添加"记住我"复选框

**文件**：`web/src/pages/login.html`

```html
<!-- 在密码输入框后面添加 -->
<div class="form-group">
    <label>
        <input type="checkbox" id="remember"> 记住我
    </label>
</div>
```

然后在 JavaScript 里处理这个字段。

---

## ⚠️ 故障排查类

### Q9: 为什么有些功能点进去是空的？

**原因**：业务逻辑 JavaScript 代码还未实现。

**解释**：项目目前完成了页面布局和样式，但很多页面的交互逻辑（点击按钮后发生什么）还没写。你可以查看 `web/src/assets/js/modules/` 目录，会发现很多文件是空的（只有文件名）。

---

### Q10: 项目报错了怎么办？

**步骤**：

1. 按 F12 打开浏览器开发者工具
2. 切换到 Console（控制台）标签
3. 查看红色错误信息
4. 根据错误信息定位问题

**常见错误**：
- `Uncaught ReferenceError: xxx is not defined` → 变量未定义，检查拼写或是否引入了对应 JS 文件
- `Failed to load resource` → 文件路径错误，检查文件是否存在

---

### Q11: 页面显示空白怎么办？

**可能原因**：
1. JavaScript 报错导致页面无法渲染
2. 文件路径错误
3. CSS 加载失败

**解决方法**：
1. 按 F12 查看控制台错误
2. 检查 Network 标签，看是否有文件加载失败（红色）
3. 清除浏览器缓存后重试

---

## 📱 响应式相关

### Q12: 如何让页面在手机上显示更好？

**文件**：对应的 CSS 文件

**方法**：使用媒体查询调整布局

```css
/* 默认：电脑端 */
.sidebar {
    width: 220px;
}

/* 手机端 */
@media (max-width: 768px) {
    .sidebar {
        width: 100%;
        position: fixed;
        left: -100%;  /* 默认隐藏 */
    }
}
```

---

## 🚀 部署相关

### Q13: 如何部署到服务器？

**步骤**：

1. **准备服务器**
   - 可以用 Nginx、Apache 或任何静态文件服务器

2. **上传文件**
   - 把整个 `web/` 目录上传到服务器

3. **配置服务器**
   - 配置网站根目录指向 `web/`
   - 配置默认首页为 `index.html`

4. **访问测试**
   - 在浏览器访问服务器 IP 或域名

---

### Q14: 如何备份项目？

**方法一**：复制整个文件夹
- 直接复制项目文件夹到其他位置

**方法二**：使用 Git
- 提交所有更改：`git add . && git commit -m "backup"`
- 推送到远程仓库：`git push`

---

### Q15: 如何与他人协作？

**使用 Git + GitHub**：

1. **创建 GitHub 仓库**
2. **推送代码**：`git push origin main`
3. **他人克隆**：`git clone <仓库地址>`
4. **协作开发**：各自创建分支，完成后提交 Pull Request

---

[上一章：页面讲解](./07-pages.md) | [下一章：进阶知识 →](./09-advanced.md)
