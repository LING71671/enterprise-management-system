# 第九部分：进阶知识

[返回目录](./README.md) | [上一章：常见问题 FAQ](./08-faq.md) | [下一章：附录](./appendix.md)

---

> 如果你已经掌握了前面的内容，这一章会带你了解更多进阶知识。

---

## 9.1 Git 版本控制简介

### 什么是 Git？

**Git** 是一个版本控制工具，可以记录文件的每一次修改历史。

**打个比方**：
- Git 就像游戏的"存档"功能
- 每次提交代码就像创建一个存档
- 如果改错了，可以回退到之前的存档

### 为什么需要 Git？

- **记录历史**：每次修改都有记录，可以查看"谁、什么时候、改了什么"
- **团队协作**：多人可以同时开发，Git 会帮你合并代码
- **回退错误**：改错了可以一键回退

### 常用 Git 命令

| 命令 | 作用 |
|------|------|
| `git init` | 初始化仓库 |
| `git status` | 查看当前状态 |
| `git add .` | 添加所有修改到暂存区 |
| `git commit -m "消息"` | 提交修改 |
| `git log` | 查看提交历史 |
| `git push` | 推送到远程仓库 |
| `git pull` | 从远程仓库拉取最新代码 |
| `git clone <地址>` | 克隆远程仓库 |

---

## 9.2 如何提交代码更改

### 步骤

1. **查看状态**
   ```bash
   git status
   ```

2. **添加修改**
   ```bash
   git add .
   ```

3. **提交更改**
   ```bash
   git commit -m "修改了登录页样式"
   ```

4. **推送到远程**
   ```bash
   git push
   ```

---

## 9.3 项目的开发规范

### CSS 规范

1. **必须使用 CSS 变量**，禁止硬编码颜色值
   ```css
   /* ❌ 错误 */
   color: #FF6B00;
   
   /* ✅ 正确 */
   color: var(--color-primary);
   ```

2. **所有页面必须引入 main.css**
   ```html
   <link rel="stylesheet" href="../assets/css/main.css">
   ```

3. **样式文件放对位置**
   - 基础样式 → `base/`
   - 组件样式 → `components/`
   - 页面样式 → `pages/`

### JavaScript 规范

1. **使用严格模式**
   ```javascript
   'use strict';
   ```

2. **脚本放在 body 底部**

3. **按正确顺序引入**
   - 工具函数 → 业务模块 → 入口文件

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| CSS 类名 | kebab-case（短横线） | `.sidebar-item` |
| JS 变量 | camelCase（驼峰） | `userName` |
| JS 常量 | UPPER_SNAKE_CASE | `USER_KEY` |
| 文件名 | kebab-case | `login-page.css` |

---

## 9.4 未来可以做什么改进

### 短期改进

1. **完成业务逻辑**
   - 实现六个子系统的 JS 交互
   - 添加增删改查功能

2. **完善表单验证**
   - 添加更多验证规则
   - 改进错误提示

3. **优化响应式**
   - 更多断点适配
   - 移动端菜单

### 中期改进

1. **接入后端 API**
   - 替换模拟数据
   - 实现真实登录注册

2. **添加图表**
   - 使用 ECharts 或 Chart.js
   - 数据可视化

3. **国际化**
   - 支持多语言

### 长期改进

1. **使用框架**
   - 迁移到 Vue 或 React
   - 组件化开发

2. **性能优化**
   - 代码分割
   - 懒加载

3. **自动化测试**
   - 单元测试
   - E2E 测试

---

## 9.5 学习资源推荐

### 在线教程

| 资源 | 链接 | 适合人群 |
|------|------|----------|
| MDN Web Docs | [developer.mozilla.org](https://developer.mozilla.org/) | 所有阶段 |
| freeCodeCamp | [freecodecamp.org](https://www.freecodecamp.org/) | 初学者 |
| JavaScript.info | [javascript.info](https://javascript.info/) | 进阶学习 |
| CSS-Tricks | [css-tricks.com](https://css-tricks.com/) | CSS 深入 |

### 书籍推荐

| 书名 | 作者 | 内容 |
|------|------|------|
| 《JavaScript 高级程序设计》 | Nicholas C. Zakas | JS 权威教程 |
| 《CSS 权威指南》 | Eric A. Meyer | CSS 详细讲解 |
| 《HTML5 权威指南》 | Adam Freeman | HTML5 全貌 |

### 视频课程

- B站：搜索"前端入门"
- YouTube：Traversy Media、Net Ninja

---

[上一章：常见问题 FAQ](./08-faq.md) | [下一章：手把手教程 →](./10-hands-on.md)
