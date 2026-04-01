# 开发规范

## 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| CSS 类名 | 小写 + 连字符 | `.login-container`, `.btn-primary` |
| CSS 变量 | 小写 + 连字符 | `--color-primary`, `--font-size-base` |
| JS 变量 | 小驼峰 | `let userName = ''` |
| JS 常量 | 大写 + 下划线 | `const MAX_COUNT = 100` |
| JS 函数 | 小驼峰 | `function getUserInfo() {}` |
| HTML 文件 | 小写 + 连字符 | `user-info.html` |
| 图片文件 | 小写 + 连字符 | `logo-main.png` |

---

## CSS 编写规范

1. **使用 CSS 变量**：颜色、间距等统一使用 `variables.css` 中定义的变量
2. **避免深层嵌套**：选择器层级不超过 3 层
3. **移动端优先**：先写移动端样式，再用 `@media` 扩展桌面端

---

## JavaScript 编写规范

1. **使用严格模式**：文件顶部添加 `'use strict';`
2. **避免全局变量**：使用 IIFE 或模块模式
3. **添加注释**：函数说明、参数说明、关键逻辑注释
4. **错误处理**：try-catch 包裹可能出错的代码

---

## Git 提交规范

```
feat: 新功能
fix: 修复 bug
style: 样式调整
refactor: 代码重构
docs: 文档更新
test: 测试相关
chore: 构建/工具变动
```
