# 第五部分：CSS 样式系统

[返回目录](./README.md) | [上一章：文件结构全解](./04-structure.md) | [下一章：JavaScript 逻辑系统](./06-javascript.md)

---

> 这一章深入讲解项目的 CSS 架构，包括 CSS 变量、三层架构、如何修改主题色等。

---

## 5.1 什么是 CSS 变量？

### 用"外号"来理解

CSS 变量就像是给某个值起一个"外号"。

**打个比方**：
- 你的朋友叫"张三"，但你平时叫他"老张"
- "老张"就是"张三"的一个"外号"
- 如果哪天你想换个叫法，只需要改"外号"，不用改他的真名

在 CSS 里也是类似：

```css
/* 定义一个变量：把橙色 #FF6B00 叫做 "primary-color" */
:root {
    --color-primary: #FF6B00;
}

/* 使用这个变量 */
.button {
    background-color: var(--color-primary);
}
```

### 为什么要用 CSS 变量？

**好处一：方便修改**

假设网站上有 100 个地方用了橙色：
- 不用变量：如果要改成蓝色，需要改 100 处
- 用变量：只需要改 1 处变量定义

**好处二：保持一致**

所有地方都用同一个变量，颜色一定是一致的。

**好处三：语义化**

`--color-primary`（主题色）比 `#FF6B00` 更容易理解。

---

## 5.2 变量定义文件详解

`variables.css` 定义了项目所有的 CSS 变量：

### 主题色（小麦橙色系）

| 变量 | 值 | 用途 |
|------|-----|------|
| `--color-primary` | #FF6B00 | 主要按钮、链接、图标 |
| `--color-primary-light` | #FF8C33 | 悬停状态 |
| `--color-primary-dark` | #CC5500 | 按下状态 |
| `--color-primary-bg` | #FFF3E8 | 主题色背景 |

### 功能色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--color-success` | #52c41a | 成功提示（绿色） |
| `--color-warning` | #faad14 | 警告提示（黄色） |
| `--color-danger` | #f5222d | 错误提示（红色） |
| `--color-info` | #1890ff | 信息提示（蓝色） |

### 文字颜色

| 变量 | 用途 |
|------|------|
| `--color-text-primary` | 正文、标题 |
| `--color-text-secondary` | 说明文字、标签 |
| `--color-text-disabled` | 禁用状态 |
| `--color-text-inverse` | 深色背景上的文字 |

### 间距

| 变量 | 值 | 用途 |
|------|-----|------|
| `--spacing-xs` | 4px | 超小间距 |
| `--spacing-sm` | 8px | 小间距 |
| `--spacing-md` | 16px | 中等间距 |
| `--spacing-lg` | 24px | 大间距 |
| `--spacing-xl` | 32px | 超大间距 |

### 字体大小

| 变量 | 值 | 用途 |
|------|-----|------|
| `--font-size-xs` | 12px | 超小字体 |
| `--font-size-sm` | 13px | 小字体 |
| `--font-size-base` | 14px | 基础字体 |
| `--font-size-md` | 15px | 中等字体 |
| `--font-size-lg` | 16px | 大字体 |
| `--font-size-xl` | 20px | 超大字体 |
| `--font-size-xxl` | 24px | 特大字体 |

### 背景色

| 变量 | 值 | 用途 |
|------|-----|------|
| `--color-bg` | #f5f7f9 | 页面默认背景 |
| `--color-bg-white` | #ffffff | 白色背景（卡片等） |
| `--color-bg-sidebar` | #1f2233 | 侧边栏背景 |
| `--color-bg-sidebar-hover` | #2a2d42 | 侧边栏悬停背景 |
| `--color-bg-header` | #ffffff | 顶部导航背景 |
| `--color-bg-dark` | linear-gradient(...) | 深色渐变背景 |

### 边框

| 变量 | 值 | 用途 |
|------|-----|------|
| `--border-color` | #ebeef5 | 默认边框颜色 |
| `--border-radius-sm` | 6px | 小圆角 |
| `--border-radius` | 12px | 默认圆角 |
| `--border-radius-lg` | 16px | 大圆角 |

### 阴影

| 变量 | 值 | 用途 |
|------|-----|------|
| `--shadow-sm` | 0 4px 12px rgba(0,0,0,0.03) | 微阴影（卡片悬停） |
| `--shadow-md` | 0 8px 24px rgba(0,0,0,0.06) | 中阴影（弹窗） |
| `--shadow-lg` | 0 12px 32px rgba(0,0,0,0.08) | 大阴影（模态框） |

### 布局

| 变量 | 值 | 用途 |
|------|-----|------|
| `--sidebar-width` | 220px | 侧边栏宽度 |
| `--header-height` | 60px | 顶部导航高度 |

### 过渡

| 变量 | 值 | 用途 |
|------|-----|------|
| `--transition` | all 0.2s ease | 默认过渡效果 |

---

## 5.3 三层架构

### 用衣柜类比

```
衣柜
├── 内衣层（最里面，每个人都要穿）
├── 外衣层（中间，搭配不同款式）
└── 外套层（最外面，根据场合选择）
```

CSS 的三层：

```
css/
├── base/         【基础层】所有页面共享
├── components/   【组件层】公共组件
└── pages/        【页面层】特定页面
```

### 加载顺序

1. **先加载 base 层**：变量和基础样式要先定义好
2. **再加载 components 层**：组件可能用到变量
3. **最后加载 pages 层**：页面可能覆盖组件样式

---

## 5.4 如何修改主题色？

假设你想把橙色主题改成蓝色：

### 步骤

1. 打开 `web/src/assets/css/base/variables.css`
2. 找到主题色定义
3. 改成你想要的颜色：

```css
/* 原来：橙色 */
--color-primary: #FF6B00;
--color-primary-light: #FF8C33;
--color-primary-dark: #CC5500;
--color-primary-bg: #FFF3E8;

/* 改成：蓝色 */
--color-primary: #1890ff;
--color-primary-light: #40a9ff;
--color-primary-dark: #096dd9;
--color-primary-bg: #e6f7ff;
```

4. 保存文件，刷新浏览器

整个网站的主题色就变了！

### 推荐取色工具

- [Adobe Color](https://color.adobe.com/)
- [Coolors](https://coolors.co/)
- [中国色](http://zhongguose.com/)

---

## 5.5 响应式设计

### 什么是响应式设计？

网页能根据屏幕大小自动调整布局：
- 电脑上：侧边栏显示在左边
- 手机上：侧边栏隐藏，点击汉堡按钮才显示

### 媒体查询

```css
/* 默认样式（电脑端） */
.sidebar {
    width: 220px;
    display: block;
}

/* 手机端样式（屏幕宽度 ≤ 768px） */
@media (max-width: 768px) {
    .sidebar {
        display: none;
    }
}
```

### 断点

| 断点 | 含义 |
|------|------|
| ≤ 768px | 手机、平板竖屏 |
| > 768px | 电脑、平板横屏 |

### 测试响应式

1. 按 F12 打开开发者工具
2. 按 Ctrl+Shift+M 切换设备模式
3. 选择不同设备或手动调整宽度

---

## 5.6 自定义鼠标动画

本项目有一个特殊的视觉效果：**鼠标跟随动画**。

在电脑端，鼠标旁边会有一个橙色圆圈跟随鼠标移动：
- 正常状态：小圆圈（20px）
- 悬停在可点击元素上：大圆圈（48px）

### 移动端自动隐藏

```css
@media (max-width: 768px) {
    .custom-cursor {
        display: none;
    }
}
```

---

[上一章：文件结构全解](./04-structure.md) | [下一章：JavaScript 逻辑系统 →](./06-javascript.md)
