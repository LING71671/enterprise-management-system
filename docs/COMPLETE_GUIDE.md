# 小麦科技企业管理平台 — 零基础完全指南

> **本文档适合谁读？**
> 
> 如果你：
> - 完全没有编程经验，不知道什么是 HTML、CSS、JavaScript
> - 想了解这个项目是什么、怎么运行的、每个文件是干什么的
> - 想知道怎么修改页面上的内容、怎么添加新功能
> - 想从这个项目开始学习网页开发
>
> 那么，这篇文档就是为你写的！
>
> **阅读建议**：从头到尾按顺序阅读，不要跳过"显而易见"的部分——对零基础来说，没有什么概念是显而易见的。

---

## 目录

- [第一部分：项目概述](#第一部分项目概述)
  - [1.1 这是一个什么项目？](#11-这是一个什么项目)
  - [1.2 项目长什么样？](#12-项目长什么样)
  - [1.3 谁做的？用来做什么？](#13-谁做的用来做什么)
  - [1.4 项目目前的状态](#14-项目目前的状态)
- [第二部分：预备知识](#第二部分预备知识)
  - [2.1 网页是怎么显示在浏览器里的？](#21-网页是怎么显示在浏览器里的)
  - [2.2 HTML — 网页的骨架](#22-html--网页的骨架)
  - [2.3 CSS — 网页的衣服](#23-css--网页的衣服)
  - [2.4 JavaScript — 网页的大脑](#24-javascript--网页的大脑)
  - [2.5 浏览器 — 网页的舞台](#25-浏览器--网页的舞台)
  - [2.6 服务器 — 网页的家](#26-服务器--网页的家)
  - [2.7 三者如何配合工作？](#27-三者如何配合工作)
- [第三部分：开发环境搭建](#第三部分开发环境搭建)
  - [3.1 你需要准备什么？](#31-你需要准备什么)
  - [3.2 安装 Node.js](#32-安装-nodejs)
  - [3.3 下载项目代码](#33-下载项目代码)
  - [3.4 启动项目](#34-启动项目)
  - [3.5 在浏览器中查看](#35-在浏览器中查看)
- [第四部分：项目文件结构全解](#第四部分项目文件结构全解)
  - [4.1 整体结构一览](#41-整体结构一览)
  - [4.2 根目录文件逐个解释](#42-根目录文件逐个解释)
  - [4.3 web/ 目录详解](#43-web-目录详解)
  - [4.4 src/assets/ — 资源文件夹](#44-srcassets-资源文件夹)
  - [4.5 src/components/ — 公共组件](#45-srccomponents-公共组件)
  - [4.6 src/pages/ — 所有页面](#46-srcpages-所有页面)
  - [4.7 src/data/ — 模拟数据](#47-srcdata-模拟数据)
  - [4.8 docs/ — 开发文档](#48-docs-开发文档)
- [第五部分：CSS 样式系统详解](#第五部分css-样式系统详解)
  - [5.1 什么是 CSS 变量？为什么用它？](#51-什么是-css-变量为什么用它)
  - [5.2 variables.css 逐行解读](#52-variablescss-逐行解读)
  - [5.3 三层架构：基础 → 组件 → 页面](#53-三层架构基础--组件--页面)
  - [5.4 main.css 的 @import 机制](#54-maincss-的-import-机制)
  - [5.5 如何修改主题色？](#55-如何修改主题色)
  - [5.6 响应式设计](#56-响应式设计)
  - [5.7 自定义鼠标动画效果](#57-自定义鼠标动画效果)
- [第六部分：JavaScript 逻辑系统详解](#第六部分javascript-逻辑系统详解)
  - [6.1 工具函数层 (utils/)](#61-工具函数层-utils)
  - [6.2 业务模块层 (modules/)](#62-业务模块层-modules)
  - [6.3 main.js — 全局初始化](#63-mainjs--全局初始化)
  - [6.4 模拟数据 (data/)](#64-模拟数据-data)
  - [6.5 组件动态加载机制](#65-组件动态加载机制)
  - [6.6 脚本加载顺序的重要性](#66-脚本加载顺序的重要性)
- [第七部分：页面逐个讲解](#第七部分页面逐个讲解)
  - [7.1 落地页 landing.html](#71-落地页-landinghtml)
  - [7.2 登录页 login.html](#72-登录页-loginhtml)
  - [7.3 注册页 register.html](#73-注册页-registerhtml)
  - [7.4 仪表盘 dashboard.html](#74-仪表盘-dashboardhtml)
  - [7.5 生产管理子系统](#75-生产管理子系统)
  - [7.6 销售管理子系统](#76-销售管理子系统)
  - [7.7 设备管理子系统](#77-设备管理子系统)
  - [7.8 采购管理子系统](#78-采购管理子系统)
  - [7.9 仓储管理子系统](#79-仓储管理子系统)
  - [7.10 员工管理子系统](#710-员工管理子系统)
- [第八部分：常见问题 FAQ](#第八部分常见问题-faq)
- [第九部分：进阶知识](#第九部分进阶知识)
  - [9.1 Git 版本控制简介](#91-git-版本控制简介)
  - [9.2 如何提交代码更改](#92-如何提交代码更改)
  - [9.3 项目的开发规范](#93-项目的开发规范)
  - [9.4 未来可以做什么改进](#94-未来可以做什么改进)
  - [9.5 学习资源推荐](#95-学习资源推荐)
- [附录](#附录)
  - [术语表](#术语表)
  - [文件速查表](#文件速查表)
  - [页面路由对照表](#页面路由对照表)

---

# 第一部分：项目概述

## 1.1 这是一个什么项目？

想象一下，你走进一家公司，这家公司有生产车间、销售部门、仓库、人事部……每个部门都在忙碌地运转。为了让这些部门高效协作，公司需要一个"大脑"来统一管理——这就是**企业管理系统**。

这个项目就是这样一个"大脑"，一个**企业管理平台的前端界面**。

> **什么是前端？**
> 
> 打个比方：你去餐厅吃饭，你看到的是装修、菜单、服务员——这些"看得见"的部分就是**前端**。而厨房里切菜、炒菜的厨师、藏在后面的仓库——这些"看不见"的部分就是**后端**。
>
> 这个项目只做"看得见"的部分——网页界面。至于数据怎么存储、怎么计算，那是后端的事，这个项目暂时不涉及。

### 用大白话说，这个项目就是：

一套**网页系统**，公司员工可以在浏览器里打开它，然后：
- 生产部门用它安排生产计划、追踪生产进度
- 销售部门用它管理客户信息、跟进订单
- 仓库用它管理库存、出入库记录
- 人事部门用它管理员工信息、考勤、工资
- 领导用它看报表、了解公司运营情况

---

## 1.2 项目长什么样？

打开这个项目，你会看到一个网站。网站有以下几类页面：

### 1. 落地页（首页）
这是访客第一眼看到的页面，就像公司的"门面"。
- 顶部有导航栏，显示公司 logo 和"登录"、"注册"按钮
- 中间是大大的标语："北京有小米，南京有小麦"
- 往下滚动，会看到公司介绍、核心技术、产品服务、合作伙伴等信息
- 最底部是页脚，有公司名称和版权信息

### 2. 登录页和注册页
点击"登录"按钮，进入登录页：
- 左边是品牌展示区，写着公司名字和宣传语
- 右边是登录表单，有两个输入框（用户名、密码）和一个"登录"按钮
- 如果没有账号，可以点击"注册"跳转到注册页

### 3. 仪表盘（登录后的主页）
登录成功后，进入仪表盘：
- 顶部是导航栏，显示公司 logo、当前用户名、"退出"按钮
- 左侧是侧边栏，列出了所有功能模块的入口
- 右侧是主要内容区，显示欢迎语和 6 个模块入口卡片

### 4. 六大业务子系统
点击侧边栏的任意一项，进入对应的管理子系统：

| 模块 | 图标 | 主要功能 |
|------|------|----------|
| 生产管理 | 🏭 | 生产计划、任务排产、质量管理 |
| 销售管理 | 📈 | 客户信息、销售订单、数据报表 |
| 设备管理 | ⚙️ | 设备监控、维护计划、故障记录 |
| 采购管理 | 🛒 | 供应商管理、采购流程、订单跟踪 |
| 仓储管理 | 🏬 | 出入库管理、库存预警、货位管理 |
| 员工管理 | 👥 | 员工信息、考勤薪资、绩效评估 |

每个子系统又有若干子页面，比如"生产管理"下面有：
- 生产计划页
- 任务排产页
- 物料需求页
- 生产订单页
- 质量管理页
- 库存管理页

---

## 1.3 谁做的？用来做什么？

### 项目背景

这是**小麦科技**公司的企业管理平台。"小麦科技"是一个虚构的科技公司品牌，口号是：

> **"北京有小米，南京有小麦"**

意思是：北京有小米科技，南京有小麦科技——我们是一家年轻的、有活力的科技公司。

### 项目用途

这个项目用于：
1. **企业管理**：帮助公司管理生产、销售、库存、员工等日常运营事务
2. **原型展示**：作为一个企业管理系统的"原型"，展示系统长什么样、有什么功能
3. **学习练手**：作为前端开发的学习项目，帮助初学者理解网页开发

### 六大业务模块

| 模块 | 作用 |
|------|------|
| **生产管理** | 管理生产计划、安排生产任务、追踪生产进度、质检记录 |
| **销售管理** | 管理客户信息、跟进销售订单、分析销售数据 |
| **设备管理** | 监控设备状态、安排维护保养、记录故障和维修 |
| **采购管理** | 管理供应商、处理采购申请、跟踪采购订单 |
| **仓储管理** | 管理库存数量、出入库操作、库存预警、货位分配 |
| **员工管理** | 管理员工档案、考勤记录、薪资计算、绩效评估 |

---

## 1.4 项目目前的状态

### 完成度：约 75%

这个项目目前**完成了约 75%**。具体来说：

#### ✅ 已完成的部分

| 阶段 | 内容 | 完成度 |
|------|------|--------|
| 基础设施 | CSS 样式系统、JS 工具函数、公共组件 | 100% |
| 登录注册 | 登录页、注册页、登录逻辑 | 100% |
| 仪表盘 | 主页布局、模块入口 | 100% |
| 组件样式 | 按钮、表格、表单、卡片等组件的样式 | 100% |
| 页面骨架 | 所有页面的 HTML 结构 | 100% |
| 模拟数据 | 各模块的示例数据 | 100% |

#### 🔶 进行中的部分

| 阶段 | 内容 | 完成度 |
|------|------|--------|
| 业务逻辑 | 六大子系统的 JS 交互逻辑 | 0% |

#### 意思是：

- 你能看到所有页面（40 多个）
- 页面布局、样式都做好了
- 每个页面都能显示一些示例数据
- **但是**：很多页面上的按钮点击后没有反应，因为还没写具体的业务逻辑代码

打个比方：就像装修好了的房子，墙壁刷了、家具摆了，但电器还没通电——能看，但还不能完全使用。

---

# 第二部分：预备知识

> 在深入了解项目之前，我们需要先搞清楚一些最基础的概念。
>
> 如果你完全没有编程经验，这一章是必读的。如果你已经知道什么是 HTML、CSS、JavaScript，可以跳过这一章。

## 2.1 网页是怎么显示在浏览器里的？

### 用寄信的类比来理解

想象一下，你想给朋友寄一封信：

1. **写信**：你在纸上写下内容（这就是 **HTML**）
2. **装信封**：你把信装进漂亮的信封里，信封上有花纹、颜色（这就是 **CSS**）
3. **寄信**：你把信交给邮局，邮局帮你送到朋友手里（这就是 **服务器和浏览器**）
4. **读信**：朋友收到信，打开信封，阅读内容（这就是 **浏览器渲染网页**）

网页也是类似的：

```
┌─────────────┐     网络传输      ┌─────────────┐
│   服务器     │ ──────────────→ │   浏览器     │
│  (存放网页)   │                  │  (显示网页)   │
└─────────────┘                  └─────────────┘
```

- **服务器**：就像一个"仓库"，存放着网页文件
- **浏览器**：就像一个"阅读器"，把网页文件转换成你能看到的界面
- **HTML/CSS/JS**：就是网页文件的内容，就像信纸上的内容

### 简单来说

当你用浏览器打开一个网页时：

1. 浏览器向服务器发出请求："请把某某网页发给我"
2. 服务器把网页文件（HTML、CSS、JavaScript）发送给浏览器
3. 浏览器读取这些文件，把它们"翻译"成你能看到的页面

---

## 2.2 HTML — 网页的骨架

### 什么是 HTML？

**HTML** 的全称是 **HyperText Markup Language**（超文本标记语言）。别被这个英文名吓到了，其实它就是一种"用标签来标记内容"的语言。

### 用人体来类比

想象一下人体：

- **骨骼**：决定了人的基本形状——头在哪、手脚在哪
- **肌肉和皮肤**：让骨骼变得好看
- **大脑**：让人能动起来、有反应

在网页里：

- **HTML** 就像**骨骼**——决定了网页上有哪些东西、东西放在哪里
- **CSS** 就像**肌肉和皮肤**——让网页变得好看
- **JavaScript** 就像**大脑**——让网页能动起来、有反应

### HTML 长什么样？

HTML 由一个个"标签"（tag）组成。标签用尖括号 `< >` 包围，成对出现：

```html
<p>这是一段文字</p>
```

- `<p>` 是**开始标签**，表示"这里开始是一段文字"
- `</p>` 是**结束标签**，表示"这段文字结束了"
- 中间的"这是一段文字"是**内容**

### 常见的 HTML 标签

| 标签 | 含义 | 例子 |
|------|------|------|
| `<h1>` | 大标题 | `<h1>欢迎来到小麦科技</h1>` |
| `<p>` | 段落 | `<p>这是一段文字</p>` |
| `<div>` | 区块（盒子） | `<div>一些内容</div>` |
| `<span>` | 小块文字 | `<span>红色文字</span>` |
| `<a>` | 链接 | `<a href="login.html">点击登录</a>` |
| `<img>` | 图片 | `<img src="logo.png">` |
| `<button>` | 按钮 | `<button>提交</button>` |
| `<input>` | 输入框 | `<input type="text">` |

### 一个简单的 HTML 例子

```html
<!DOCTYPE html>
<html>
<head>
    <title>页面标题</title>
</head>
<body>
    <h1>欢迎来到小麦科技</h1>
    <p>这是一段介绍文字。</p>
    <button>点击我</button>
</body>
</html>
```

逐行解释：

| 行号 | 代码 | 解释 |
|------|------|------|
| 1 | `<!DOCTYPE html>` | 告诉浏览器：这是一个 HTML5 页面 |
| 2 | `<html>` | 整个网页从这里开始 |
| 3 | `<head>` | 头部区域开始（存放标题、样式引用等） |
| 4 | `<title>页面标题</title>` | 浏览器标签页显示的标题 |
| 5 | `</head>` | 头部区域结束 |
| 6 | `<body>` | 身体区域开始（存放网页能看到的内容） |
| 7 | `<h1>欢迎来到小麦科技</h1>` | 一个大标题 |
| 8 | `<p>这是一段介绍文字。</p>` | 一段文字 |
| 9 | `<button>点击我</button>` | 一个按钮 |
| 10 | `</body>` | 身体区域结束 |
| 11 | `</html>` | 整个网页结束 |

---

## 2.3 CSS — 网页的衣服

### 什么是 CSS？

**CSS** 的全称是 **Cascading Style Sheets**（层叠样式表）。它的作用就是让网页变得好看——设置颜色、字体、大小、位置等等。

### 用穿衣来类比

HTML 决定了网页上有什么东西，但这些东西默认长得很丑：
- 字是黑色的、小小的
- 背景是白色的
- 所有东西从上到下排成一列

就像一个人光着身子站在那里——有手有脚，但不好看。

**CSS 就是给网页"穿衣服"**：
- 把标题变成大号字体、橙色
- 给按钮加上圆角、背景色
- 让内容居中显示
- 给页面加背景图

### CSS 长什么样？

CSS 的基本语法是：

```css
选择器 {
    属性: 值;
    属性: 值;
}
```

举个例子：

```css
h1 {
    color: orange;
    font-size: 32px;
}
```

这段代码的意思是：
- 找到网页里所有的 `<h1>` 标签（这就是**选择器**）
- 把它们的颜色改成橙色（`color: orange;`）
- 把字体大小改成 32 像素（`font-size: 32px;`）

### 常见的 CSS 属性

| 属性 | 作用 | 例子 |
|------|------|------|
| `color` | 文字颜色 | `color: red;` |
| `background-color` | 背景颜色 | `background-color: #fff;` |
| `font-size` | 字体大小 | `font-size: 16px;` |
| `width` | 宽度 | `width: 100px;` |
| `height` | 高度 | `height: 50px;` |
| `margin` | 外边距 | `margin: 10px;` |
| `padding` | 内边距 | `padding: 20px;` |
| `border` | 边框 | `border: 1px solid black;` |
| `border-radius` | 圆角 | `border-radius: 8px;` |

### 在 HTML 里使用 CSS

有两种方式：

**方式一：在 HTML 文件里直接写 CSS（放在 `<style>` 标签里）**

```html
<head>
    <style>
        h1 {
            color: orange;
        }
    </style>
</head>
```

**方式二：把 CSS 写在单独的文件里，然后在 HTML 里引用**

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>
```

本项目用的是**方式二**，因为这样更容易管理——HTML 只管内容，CSS 只管样式，分工明确。

---

## 2.4 JavaScript — 网页的大脑

### 什么是 JavaScript？

**JavaScript**（简称 JS）是一种编程语言，它的作用是让网页"动起来"——响应用户的操作、改变页面内容、发送网络请求等等。

### 用大脑来类比

HTML 是骨骼，CSS 是衣服，那 JavaScript 就是**大脑**：

- 你点击一个按钮，大脑做出反应："哦，用户想登录，那我来检查一下用户名密码对不对"
- 你填写表单，大脑实时验证："邮箱格式不对，提醒用户一下"
- 页面加载完成，大脑开始工作："该显示欢迎信息了"

### JavaScript 长什么样？

JavaScript 的代码看起来像这样：

```javascript
// 点击按钮后弹出提示
document.getElementById('myButton').addEventListener('click', function() {
    alert('你点击了按钮！');
});
```

逐行解释：

| 行号 | 代码 | 解释 |
|------|------|------|
| 1 | `// 点击按钮后弹出提示` | 这是注释，不会被执行，只是给人看的说明 |
| 2 | `document.getElementById('myButton')` | 找到 id 为 `myButton` 的元素 |
| 2 | `.addEventListener('click', ...)` | 给这个元素添加一个"点击"事件监听器 |
| 2 | `function() { ... }` | 当点击时，执行这个函数 |
| 2 | `alert('你点击了按钮！');` | 弹出一个提示框 |

### JavaScript 能做什么？

| 功能 | 例子 |
|------|------|
| 改变页面内容 | 点击按钮后显示"登录成功" |
| 验证表单 | 检查邮箱格式是否正确 |
| 发送网络请求 | 从服务器获取数据 |
| 存储数据 | 把用户信息保存到浏览器 |
| 动态效果 | 按钮悬停时变色、弹出菜单 |

### 在 HTML 里使用 JavaScript

同样有两种方式：

**方式一：在 HTML 文件里直接写 JS（放在 `<script>` 标签里）**

```html
<script>
    alert('页面加载完成！');
</script>
```

**方式二：把 JS 写在单独的文件里，然后在 HTML 里引用**

```html
<script src="main.js"></script>
```

本项目用的是**方式二**，同样是为了分工明确。

---

## 2.5 浏览器 — 网页的舞台

### 什么是浏览器？

**浏览器**（Browser）是一个软件，用来打开和显示网页。常见的浏览器有：

- Chrome（谷歌浏览器）
- Firefox（火狐浏览器）
- Safari（苹果浏览器）
- Edge（微软浏览器）

### 浏览器的作用

浏览器就像一个"翻译官"：

1. 接收网页文件（HTML、CSS、JavaScript）
2. 解读这些文件
3. 把它们"画"在屏幕上给你看

### 浏览器怎么"翻译"网页？

浏览器的工作流程：

```
HTML ──→ 解析 ──→ DOM 树（网页结构）
CSS  ──→ 解析 ──→ CSSOM 树（样式规则）
JS   ──→ 执行 ──→ 可以操作 DOM 和 CSSOM

DOM + CSSOM ──→ 渲染树 ──→ 画在屏幕上
```

> 你可能会问：什么是 DOM？
>
> **DOM**（Document Object Model，文档对象模型）是浏览器把 HTML 解析后生成的一种结构，JavaScript 可以通过 DOM 来操作网页元素。

### 常用浏览器功能

作为开发者，你需要知道浏览器的**开发者工具**：

1. 在浏览器里按 **F12** 键（或右键点击"检查"）
2. 会打开一个面板，显示：
   - **Elements（元素）**：查看 HTML 结构
   - **Console（控制台）**：查看 JavaScript 输出和错误
   - **Network（网络）**：查看网络请求
   - **Sources（源代码）**：查看和调试 JS 代码

---

## 2.6 服务器 — 网页的家

### 什么是服务器？

**服务器**（Server）是一台特殊的电脑，它一直开着，等待其他电脑（比如你的电脑）来请求数据。

### 用图书馆来类比

- **服务器**就像**图书馆**：存放着很多书（网页）
- **浏览器**就像**读者**：去图书馆借书（请求网页）
- **网络**就像**道路**：连接读者和图书馆

### 这个项目的"服务器"

这个项目是一个**纯前端项目**，没有真正的后端服务器。但我们还是需要一个"东西"来提供网页文件。

这就是**开发服务器**（Development Server）——一个在本地（你的电脑上）运行的小型服务器，用来在开发时测试网页。

本项目用的是 **http-server**，一个简单的命令行工具，运行后会在本地启动一个服务器，让你在浏览器里访问 `http://localhost:8080` 来查看网页。

---

## 2.7 三者如何配合工作？

### 完整的工作流程

当你打开一个网页时，发生了什么？

```
┌──────────────────────────────────────────────────────────────────┐
│                           浏览器                                  │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 1. 用户输入网址，浏览器向服务器发送请求                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              ↓                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 2. 服务器返回 HTML 文件                                        │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              ↓                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 3. 浏览器解析 HTML，遇到 <link> 标签就请求 CSS 文件              │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              ↓                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 4. 浏览器解析 CSS，应用样式到 HTML 元素                          │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              ↓                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 5. 浏览器遇到 <script> 标签就请求 JS 文件并执行                  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                              ↓                                    │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │ 6. 页面显示完成，JS 可以响应用户操作                             │ │
│  └─────────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

### 举个例子

以本项目的登录页为例：

1. 用户在浏览器输入网址，请求 `login.html`
2. 服务器返回 `login.html` 文件
3. 浏览器解析 HTML，发现里面有 `<link rel="stylesheet" href="../assets/css/main.css">`
4. 浏览器请求 `main.css`，然后应用样式
5. 浏览器继续解析，发现 `<script src="../assets/js/modules/auth.js"></script>`
6. 浏览器请求 `auth.js`，然后执行 JavaScript 代码
7. 用户看到完整的登录页面，可以输入用户名密码点击登录
8. JavaScript 检查用户输入是否正确，决定是跳转还是显示错误

---

# 第三部分：开发环境搭建

> 在开始查看和修改项目之前，你需要先把项目运行起来。这一章会教你如何一步步搭建开发环境。
>
> 别担心，整个过程就像安装一个普通软件一样简单。

## 3.1 你需要准备什么？

在开始之前，请确保你有：

| 工具 | 用途 | 下载地址 |
|------|------|----------|
| 电脑 | 开发用的机器 | Windows 或 Mac 都可以 |
| 浏览器 | 查看网页效果 | Chrome 推荐，[下载地址](https://www.google.com/chrome/) |
| Node.js | 运行开发服务器 | [下载地址](https://nodejs.org/) |
| 代码编辑器 | 查看/编辑代码文件 | VS Code 推荐，[下载地址](https://code.visualstudio.com/) |

### 关于 Node.js

**Node.js** 是什么？

你可能知道 JavaScript 是运行在浏览器里的。但 Node.js 让 JavaScript 也可以在电脑上直接运行，就像 Python、Java 一样。

本项目用 Node.js 来运行 **http-server**（开发服务器），让你能在本地查看网页。

### 关于代码编辑器

**代码编辑器**（Code Editor）是用来查看和编辑代码文件的软件。就像用 Word 编辑文档一样，我们用代码编辑器来编辑代码文件。

推荐使用 **VS Code**（Visual Studio Code），它是最流行的免费代码编辑器，功能强大，插件丰富。

---

## 3.2 安装 Node.js

### Windows 系统安装步骤

1. **下载 Node.js**
   - 打开 [https://nodejs.org/](https://nodejs.org/)
   - 下载 LTS（长期支持版）版本，一般是左边那个按钮
   - 下载完成后，双击安装包

2. **安装 Node.js**
   - 一路点击"Next"（下一步）
   - 安装路径可以保持默认，也可以改到其他盘
   - 等待安装完成

3. **验证安装**
   - 按 `Win + R` 打开运行窗口
   - 输入 `cmd`，按回车，打开命令提示符
   - 输入 `node -v`，按回车
   - 如果显示版本号（如 `v20.11.0`），说明安装成功

### Mac 系统安装步骤

1. **下载 Node.js**
   - 打开 [https://nodejs.org/](https://nodejs.org/)
   - 下载 LTS（长期支持版）版本
   - 下载完成后，双击 `.pkg` 文件

2. **安装 Node.js**
   - 按照安装向导一步步操作
   - 输入管理员密码确认安装

3. **验证安装**
   - 打开"终端"（Terminal）应用
   - 输入 `node -v`，按回车
   - 如果显示版本号（如 `v20.11.0`），说明安装成功

### 什么是命令行？

在上面的步骤中，我们提到了"命令提示符"（Windows）和"终端"（Mac）。这些就是**命令行**（Command Line）。

**命令行**是一个用文字来操作电脑的工具。就像你可以用鼠标点击图标来打开软件，你也可以在命令行里输入命令来执行操作。

打个比方：
- **鼠标操作**：像在餐厅点菜，指着菜单说"我要这个"
- **命令行操作**：像打电话点外卖，说出你要什么

常用的命令行操作：

| 操作 | Windows 命令 | Mac 命令 | 说明 |
|------|--------------|----------|------|
| 查看当前目录 | `cd` | `pwd` | 显示你当前在哪个文件夹 |
| 切换目录 | `cd 文件夹名` | `cd 文件夹名` | 进入某个文件夹 |
| 返回上级目录 | `cd ..` | `cd ..` | 返回上一级文件夹 |
| 查看文件列表 | `dir` | `ls` | 显示当前文件夹里的文件 |
| 清屏 | `cls` | `clear` | 清除屏幕上的文字 |

---

## 3.3 下载项目代码

### 方式一：从 Git 克隆（推荐）

如果你安装了 Git，可以用以下命令下载：

```bash
git clone <项目地址>
```

### 方式二：下载 ZIP 压缩包

1. 在项目页面上找到"下载 ZIP"按钮
2. 点击下载，解压到你想存放的目录

### 项目目录结构

下载后，你会得到一个文件夹，里面的结构大致如下：

```
not-my-first-web/
├── .git/                    # Git 版本控制文件夹（隐藏）
├── .idea/                   # IDE 配置文件夹（隐藏）
├── .sisyphus/               # Sisyphus 工具文件夹（隐藏）
├── web/                     # 项目主要代码在这里！
│   ├── index.html           # 入口文件
│   ├── package.json         # 项目配置文件
│   ├── src/                 # 源代码目录
│   ├── docs/                # 文档目录
│   └── ...
├── 网页图片填充说明.md       # 图片说明文档
└── website.zip              # 项目压缩包
```

**注意**：项目的核心代码在 `web/` 目录下，接下来的操作都要在 `web/` 目录里进行。

---

## 3.4 启动项目

### 步骤一：打开命令行

**Windows**：
- 按 `Win + R`，输入 `cmd`，按回车

**Mac**：
- 按 `Cmd + 空格`，输入 `Terminal`，按回车

### 步骤二：进入项目目录

在命令行里输入：

```bash
cd 项目路径/web
```

例如，如果项目在 `D:/projects/not-my-first-web/`，就输入：

```bash
cd D:/projects/not-my-first-web/web
```

> **小提示**：你可以先输入 `cd `（注意有个空格），然后直接把文件夹拖到命令行窗口里，路径会自动填上。

### 步骤三：安装依赖

第一次运行项目时，需要先安装依赖（就是项目用到的第三方工具）。

在命令行里输入：

```bash
npm install
```

然后按回车。你会看到命令行显示一堆下载信息，等待完成即可。

> **什么是 npm？**
>
> **npm**（Node Package Manager）是 Node.js 的包管理工具，就像手机上的"应用商店"。
>
> `npm install` 命令会读取项目里的 `package.json` 文件，自动下载项目需要的依赖包。

### 步骤四：启动开发服务器

安装完成后，输入：

```bash
npm run dev
```

你会看到类似这样的输出：

```
Starting up http-server
Available on:
  http://127.0.0.1:8080
  http://192.168.x.x:8080
Hit CTRL-C to stop the server
```

这就说明服务器启动成功了！

---

## 3.5 在浏览器中查看

### 打开网页

服务器启动后：

1. 打开浏览器（Chrome 推荐）
2. 在地址栏输入：`http://localhost:8080`
3. 按回车

你就能看到项目的首页了！

### 什么是 localhost？

**localhost** 是一个特殊的地址，表示"本机"。`http://localhost:8080` 的意思是："访问本机的 8080 端口"。

当开发服务器运行时，它会在你电脑的 8080 端口监听请求，所以访问 `localhost:8080` 就能看到网页。

### 停止服务器

如果想停止服务器，回到命令行窗口，按 `Ctrl + C`（Windows 和 Mac 都一样）。

### 常见问题

**问题 1：`npm` 不是内部或外部命令**

原因：Node.js 没有正确安装，或者需要重启电脑让环境变量生效。

解决方法：
1. 重新安装 Node.js
2. 重启电脑
3. 再试一次

**问题 2：端口 8080 被占用**

原因：8080 端口被其他程序占用了。

解决方法：
1. 关闭占用端口的程序
2. 或者修改端口号：`npm start -- -p 8081`（用 8081 端口）

**问题 3：页面显示空白或报错**

原因：可能是路径问题或文件缺失。

解决方法：
1. 确保你在 `web/` 目录下运行命令
2. 检查是否有报错信息
3. 按 F12 打开浏览器开发者工具，查看 Console（控制台）是否有错误

---

# 第四部分：项目文件结构全解

> 这一章会详细解释项目里的每一个文件夹和文件是干什么的。
>
> 读完这章，你会清楚地知道：改哪个文件可以修改什么内容。

## 4.1 整体结构一览

项目的整体结构如下（只列出重要文件）：

```
not-my-first-web/                    # 项目根目录
│
├── .git/                            # Git 版本控制文件夹（隐藏）
├── .idea/                           # IDE 配置文件夹（隐藏）
├── .sisyphus/                       # Sisyphus 工具文件夹（隐藏）
├── 网页图片填充说明.md               # 图片替换说明文档
├── nul                              # 临时文件
├── website.zip                      # 项目压缩包
│
└── web/                             # ⭐ 项目主要代码在这里！
    │
    ├── index.html                   # 项目入口文件（自动跳转到落地页）
    ├── package.json                 # 项目配置文件
    ├── package-lock.json            # 依赖版本锁定文件
    ├── README.md                    # 项目说明文档
    │
    ├── docs/                        # 📁 文档目录
    │   ├── COMPLETE_GUIDE.md        # 📄 你正在读的这份文档
    │   ├── DEV_STANDARDS.md         # 开发规范
    │   ├── CSS_JS_SPEC.md           # CSS/JS 编写规范
    │   ├── GIT_GUIDE.md             # Git 命令大全
    │   ├── plan.md                  # 开发计划
    │   └── EMPTY_FILES_DOCS.md      # 空文件说明
    │
    └── src/                         # 📁 源代码目录
        │
        ├── assets/                  # 📁 静态资源文件夹
        │   │
        │   ├── css/                 # 📁 样式文件夹
        │   │   ├── main.css         # 📄 样式入口文件（导入所有样式）
        │   │   ├── style.css        # 📄 额外样式文件
        │   │   │
        │   │   ├── base/            # 📁 基础样式（最底层）
        │   │   │   ├── reset.css        # 重置浏览器默认样式
        │   │   │   ├── variables.css    # CSS 变量定义（主题色、间距等）
        │   │   │   └── typography.css   # 字体排版样式
        │   │   │
        │   │   ├── components/      # 📁 组件样式（中间层）
        │   │   │   ├── button.css       # 按钮样式
        │   │   │   ├── card.css         # 卡片样式
        │   │   │   ├── form.css         # 表单样式
        │   │   │   ├── header.css       # 顶部导航栏样式
        │   │   │   ├── modal.css        # 弹窗样式
        │   │   │   ├── sidebar.css      # 侧边栏样式
        │   │   │   └── table.css        # 表格样式
        │   │   │
        │   │   └── pages/           # 📁 页面样式（最顶层）
        │   │       ├── landing.css      # 落地页样式
        │   │       ├── login.css        # 登录页样式
        │   │       ├── production.css   # 生产管理样式
        │   │       ├── sales.css        # 销售管理样式
        │   │       ├── equipment.css    # 设备管理样式
        │   │       ├── purchase.css     # 采购管理样式
        │   │       ├── warehouse.css    # 仓储管理样式
        │   │       └── employee.css     # 员工管理样式
        │   │
        │   ├── js/                  # 📁 JavaScript 文件夹
        │   │   ├── main.js          # 📄 JS 入口文件（全局初始化）
        │   │   │
        │   │   ├── utils/           # 📁 工具函数层
        │   │   │   ├── dom.js           # DOM 操作工具函数
        │   │   │   ├── storage.js        # 数据存储工具函数
        │   │   │   ├── format.js         # 格式化工具函数
        │   │   │   └── validate.js       # 表单验证工具函数
        │   │   │
        │   │   └── modules/         # 📁 业务模块层
        │   │       ├── auth.js          # 登录认证模块 ⭐
        │   │       ├── navigation.js    # 导航管理模块
        │   │       ├── landing.js       # 落地页模块
        │   │       ├── production.js    # 生产管理模块（待实现）
        │   │       ├── sales.js         # 销售管理模块（待实现）
        │   │       ├── equipment.js     # 设备管理模块（待实现）
        │   │       ├── purchase.js      # 采购管理模块（待实现）
        │   │       ├── warehouse.js     # 仓储管理模块（待实现）
        │   │       └── employee.js      # 员工管理模块（待实现）
        │   │
        │   └── images/               # 📁 图片资源文件夹
        │       ├── logo.png              # 公司 Logo
        │       ├── alibabacloud-color.svg    # 阿里云 Logo
        │       ├── xiaomi-color.svg         # 小米 Logo
        │       └── ...                       # 其他合作伙伴 Logo
        │
        ├── components/              # 📁 公共 HTML 组件
        │   ├── header.html              # 顶部导航栏组件
        │   ├── sidebar.html             # 侧边栏组件
        │   └── footer.html              # 页脚组件
        │
        ├── pages/                   # 📁 所有页面
        │   │
        │   ├── landing.html             # 落地页（首页）
        │   ├── login.html               # 登录页
        │   ├── register.html            # 注册页
        │   ├── dashboard.html           # 仪表盘（登录后主页）
        │   │
        │   ├── production/          # 📁 生产管理子系统（7 个页面）
        │   │   ├── index.html               # 生产管理概览页
        │   │   ├── plan.html                 # 生产计划
        │   │   ├── scheduling.html           # 任务排产
        │   │   ├── material.html             # 物料需求
        │   │   ├── order.html                # 生产订单
        │   │   ├── quality.html              # 质量管理
        │   │   └── inventory.html            # 库存管理
        │   │
        │   ├── sales/               # 📁 销售管理子系统（6 个页面）
        │   │   ├── index.html               # 销售管理概览页
        │   │   ├── customer.html            # 客户信息
        │   │   ├── order.html               # 销售订单
        │   │   ├── pricing.html             # 定价促销
        │   │   ├── report.html              # 销售报表
        │   │   └── team.html                # 销售团队
        │   │
        │   ├── equipment/           # 📁 设备管理子系统（5 个页面）
        │   │   ├── index.html               # 设备管理概览页
        │   │   ├── info.html                # 设备信息
        │   │   ├── monitor.html             # 状态监控
        │   │   ├── maintenance.html         # 维护计划
        │   │   └── fault.html               # 故障记录
        │   │
        │   ├── purchase/            # 📁 采购管理子系统（5 个页面）
        │   │   ├── index.html               # 采购管理概览页
        │   │   ├── supplier.html            # 供应商信息
        │   │   ├── process.html             # 采购流程
        │   │   ├── tracking.html            # 订单跟踪
        │   │   └── analysis.html            # 数据分析
        │   │
        │   ├── warehouse/           # 📁 仓储管理子系统（5 个页面）
        │   │   ├── index.html               # 仓储管理概览页
        │   │   ├── operation.html           # 基本操作
        │   │   ├── layout.html              # 货位管理
        │   │   ├── warning.html             # 库存预警
        │   │   └── transport.html           # 运输跟踪
        │   │
        │   └── employee/           # 📁 员工管理子系统（5 个页面）
        │       ├── index.html               # 员工管理概览页
        │       ├── info.html                # 员工信息
        │       ├── attendance.html          # 考勤薪资
        │       ├── recruitment.html         # 招聘培训
        │       └── performance.html         # 绩效评估
        │
        └── data/                    # 📁 模拟数据文件夹
            ├── production.js            # 生产管理模拟数据
            ├── sales.js                 # 销售管理模拟数据
            ├── equipment.js             # 设备管理模拟数据
            ├── purchase.js              # 采购管理模拟数据
            ├── warehouse.js             # 仓储管理模拟数据
            └── employee.js              # 员工管理模拟数据
```

---

## 4.2 根目录文件逐个解释

项目根目录（`not-my-first-web/`）下的文件：

| 文件/文件夹 | 作用 |
|-------------|------|
| `.git/` | Git 版本控制文件夹，存放版本历史记录。**不要手动修改** |
| `.idea/` | IDE（如 WebStorm）的配置文件夹。**不要手动修改** |
| `.sisyphus/` | Sisyphus 工具的配置和计划文件。**不要手动修改** |
| `网页图片填充说明.md` | 说明如何替换页面上的图片 |
| `nul` | 临时文件，可以忽略 |
| `website.zip` | 项目压缩包，可以删除 |
| `web/` | **项目主要代码目录！下面所有的代码都在这里** |

---

## 4.3 web/ 目录详解

`web/` 是项目的核心目录，所有的网页代码都在这里：

| 文件 | 作用 |
|------|------|
| `index.html` | 项目入口文件。打开后会自动跳转到落地页 |
| `package.json` | 项目配置文件，定义项目名称、依赖、启动脚本等 |
| `package-lock.json` | 依赖版本锁定文件。**不要手动修改** |
| `README.md` | 项目说明文档 |

### package.json 详解

`package.json` 是项目的"身份证"，记录了项目的基本信息和依赖：

```json
{
  "name": "enterprise-management-system",
  "version": "1.0.0",
  "description": "企业管理系统前端原型",
  "main": "index.html",
  "scripts": {
    "start": "npx http-server -p 8080",
    "dev": "npx http-server -p 8080 -o"
  },
  "devDependencies": {
    "http-server": "^14.1.1"
  }
}
```

逐项解释：

| 字段 | 含义 |
|------|------|
| `name` | 项目名称：企业管理系统（enterprise-management-system） |
| `version` | 版本号：1.0.0 |
| `description` | 项目描述：企业管理系统前端原型 |
| `main` | 入口文件：index.html |
| `scripts.start` | 运行 `npm start` 会执行后面的命令（启动服务器） |
| `scripts.dev` | 运行 `npm run dev` 会执行后面的命令（启动服务器并自动打开浏览器） |
| `devDependencies` | 开发依赖：项目开发时需要的工具 |

---

## 4.4 src/assets/ — 资源文件夹

`src/assets/` 存放所有的静态资源：样式、脚本、图片。

### 4.4.1 css/ — 样式文件夹

样式文件采用**三层架构**：

```
css/
├── main.css           # 入口文件（导入所有样式）
├── base/              # 第一层：基础样式
├── components/        # 第二层：组件样式
└── pages/             # 第三层：页面样式
```

**为什么分三层？**

想象一下衣柜：
- **内衣**（基础层）：最贴身，每个人都要穿
- **外衣**（组件层）：穿在内衣外面，可以搭配不同款式
- **外套**（页面层）：最外层，根据场合选择不同外套

CSS 也是类似：
- **base 层**：所有页面共享的基础样式（重置样式、变量、字体）
- **components 层**：公共组件的样式（按钮、表格、卡片）
- **pages 层**：特定页面的样式（登录页、仪表盘）

#### base/ 基础样式

| 文件 | 作用 |
|------|------|
| `reset.css` | 重置浏览器默认样式，让不同浏览器显示一致 |
| `variables.css` | **定义 CSS 变量**（主题色、间距、字体大小等） |
| `typography.css` | 定义字体、行高、段落样式 |

#### components/ 组件样式

| 文件 | 作用 |
|------|------|
| `button.css` | 按钮样式（主要按钮、次要按钮、幽灵按钮等） |
| `card.css` | 卡片样式（统计卡片、信息卡片等） |
| `form.css` | 表单样式（输入框、下拉框、错误提示等） |
| `header.css` | 顶部导航栏样式 |
| `modal.css` | 弹窗样式 |
| `sidebar.css` | 侧边栏样式 |
| `table.css` | 表格样式 |

#### pages/ 页面样式

| 文件 | 作用 |
|------|------|
| `landing.css` | 落地页样式 |
| `login.css` | 登录页和注册页样式 |
| `production.css` | 生产管理页面样式 |
| `sales.css` | 销售管理页面样式 |
| `equipment.css` | 设备管理页面样式 |
| `purchase.css` | 采购管理页面样式 |
| `warehouse.css` | 仓储管理页面样式 |
| `employee.css` | 员工管理页面样式 |

#### main.css 入口文件

`main.css` 是样式系统的入口文件，它的作用是**导入所有样式文件**：

```css
/* 1. 基础样式 */
@import './base/reset.css';
@import './base/variables.css';
@import './base/typography.css';

/* 2. 组件样式 */
@import './components/header.css';
@import './components/sidebar.css';
/* ... 其他组件 */

/* 3. 页面样式 */
@import './pages/login.css';
@import './pages/landing.css';
/* ... 其他页面 */
```

这就像一张"购物清单"，告诉浏览器要加载哪些样式文件。

### 4.4.2 js/ — JavaScript 文件夹

JavaScript 文件采用**两层架构**：

```
js/
├── main.js            # 入口文件（全局初始化）
├── utils/             # 工具函数层
└── modules/           # 业务模块层
```

#### utils/ 工具函数层

工具函数是**通用的、可复用的**功能，不涉及具体业务。

| 文件 | 作用 |
|------|------|
| `dom.js` | DOM 操作工具函数：选择元素、添加事件、创建元素等 |
| `storage.js` | 数据存储工具函数：localStorage、sessionStorage 封装 |
| `format.js` | 格式化工具函数：日期格式化、数字格式化、金额格式化 |
| `validate.js` | 表单验证工具函数：必填验证、邮箱验证、手机号验证等 |

#### modules/ 业务模块层

业务模块是**特定功能**的代码，处理具体的业务逻辑。

| 文件 | 作用 | 状态 |
|------|------|------|
| `auth.js` | 登录认证模块：登录、登出、注册、权限验证 | ✅ 已实现 |
| `navigation.js` | 导航管理模块：高亮当前菜单、显示用户名 | ✅ 已实现 |
| `landing.js` | 落地页模块：滚动效果、导航栏吸顶 | ✅ 已实现 |
| `production.js` | 生产管理模块 | ⏳ 待实现 |
| `sales.js` | 销售管理模块 | ⏳ 待实现 |
| `equipment.js` | 设备管理模块 | ⏳ 待实现 |
| `purchase.js` | 采购管理模块 | ⏳ 待实现 |
| `warehouse.js` | 仓储管理模块 | ⏳ 待实现 |
| `employee.js` | 员工管理模块 | ⏳ 待实现 |

#### main.js 入口文件

`main.js` 是 JavaScript 的入口文件，负责**全局初始化**：

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 检查是否已登录
    auth.guard();
    
    // 初始化导航
    appNav.init();
    
    // 初始化鼠标跟随动画
    initCustomCursor();
    
    // 监听 DOM 变化，修复动态加载组件的路径
    initPathObserver();
});
```

### 4.4.3 images/ — 图片资源文件夹

存放项目中使用的图片：

| 文件 | 作用 |
|------|------|
| `logo.png` | 公司 Logo |
| `alibabacloud-color.svg` | 阿里云 Logo（合作伙伴展示） |
| `alibabadotcom-color.svg` | 阿里巴巴 Logo |
| `alipay-color.svg` | 支付宝 Logo |
| `xiaomi-color.svg` | 小米 Logo |
| `tiktok-color.svg` | 字节跳动 Logo |
| `nvidia-color.svg` | 英伟达 Logo |
| `tesla-color.svg` | 特斯拉 Logo |
| `facebook-color.svg` | Meta（Facebook）Logo |
| `huggingface-color.svg` | Hugging Face Logo |

---

## 4.5 src/components/ — 公共组件

公共组件是**多个页面共享的 HTML 片段**，避免重复代码。

| 文件 | 作用 |
|------|------|
| `header.html` | 顶部导航栏：包含 Logo、用户名、退出按钮 |
| `sidebar.html` | 侧边栏：包含六个模块的导航链接 |
| `footer.html` | 页脚：包含版权信息（目前为空） |

### 为什么需要公共组件？

想象一下，如果有 40 个页面，每个页面都需要顶部导航栏。如果直接把导航栏代码写死在每个页面里：
- 修改导航栏需要改 40 个文件
- 容易漏改，造成不一致

使用公共组件后：
- 导航栏代码只写一次（在 `header.html`）
- 每个页面用 JavaScript 动态加载这个组件
- 修改时只需改一个文件

### 如何加载公共组件？

在每个页面的 JavaScript 里，用 `fetch()` 加载组件：

```javascript
fetch('../../components/header.html')
    .then(r => r.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
    });
```

---

## 4.6 src/pages/ — 所有页面

这是项目里最核心的文件夹，存放所有的页面文件。

### 页面统计

| 类别 | 页面数 | 文件列表 |
|------|--------|----------|
| 核心页面 | 4 | landing.html, login.html, register.html, dashboard.html |
| 生产管理 | 7 | index, plan, scheduling, material, order, quality, inventory |
| 销售管理 | 6 | index, customer, order, pricing, report, team |
| 设备管理 | 5 | index, info, monitor, maintenance, fault |
| 采购管理 | 5 | index, supplier, process, tracking, analysis |
| 仓储管理 | 5 | index, operation, layout, warning, transport |
| 员工管理 | 5 | index, info, attendance, recruitment, performance |
| **总计** | **37** | |

> 注：每个子系统的 `index.html` 是该模块的概览页/首页。

### 页面之间的关系

```
landing.html（落地页）
    │
    ├── login.html（登录页）
    │       │
    │       └── dashboard.html（仪表盘）
    │               │
    │               ├── production/index.html
    │               │       └── plan.html, scheduling.html, ...
    │               │
    │               ├── sales/index.html
    │               │       └── customer.html, order.html, ...
    │               │
    │               ├── equipment/index.html
    │               │       └── info.html, monitor.html, ...
    │               │
    │               ├── purchase/index.html
    │               │       └── supplier.html, process.html, ...
    │               │
    │               ├── warehouse/index.html
    │               │       └── operation.html, layout.html, ...
    │               │
    │               └── employee/index.html
    │                       └── info.html, attendance.html, ...
    │
    └── register.html（注册页）
```

---

## 4.7 src/data/ — 模拟数据

由于这是一个前端原型项目，没有真正的后端数据库，所以使用**模拟数据**（Mock Data）来展示页面效果。

| 文件 | 作用 |
|------|------|
| `production.js` | 生产管理模拟数据：生产计划、任务、物料、订单、质检记录 |
| `sales.js` | 销售管理模拟数据：客户、订单、产品、团队、报表 |
| `equipment.js` | 设备管理模拟数据：设备列表、维护记录、故障记录 |
| `purchase.js` | 采购管理模拟数据：供应商、采购单、物料 |
| `warehouse.js` | 仓储管理模拟数据：库存、出入库记录、货位 |
| `employee.js` | 员工管理模拟数据：员工信息、考勤、薪资、绩效 |

### 模拟数据的结构

以 `production.js` 为例：

```javascript
const productionData = {
    plans: [
        { id: 'PP001', name: '2026年Q1生产计划', startDate: '2026-01-01', ... },
        { id: 'PP002', name: '2026年Q2生产计划', ... },
    ],
    tasks: [
        { id: 'PT001', planId: 'PP001', productName: '产品A', quantity: 500, ... },
    ],
    materials: [...],
    orders: [...],
    qualityRecords: [...]
};
```

页面的 JavaScript 会读取这些数据，显示在页面上。

---

## 4.8 docs/ — 开发文档

存放项目的各种文档：

| 文件 | 作用 |
|------|------|
| `COMPLETE_GUIDE.md` | 📄 **你正在读的这份文档**，零基础完全指南 |
| `README.md` | 项目简要说明 |
| `DEV_STANDARDS.md` | 开发规范：代码风格、命名规范等 |
| `CSS_JS_SPEC.md` | CSS 和 JS 的编写规范 |
| `GIT_GUIDE.md` | Git 命令大全 |
| `plan.md` | 开发计划和进度 |
| `EMPTY_FILES_DOCS.md` | 空文件说明 |

---

# 第五部分：CSS 样式系统详解

> 这一章深入讲解项目的 CSS 架构，包括 CSS 变量、三层架构、如何修改主题色等。
>
> 读完这章，你会知道如何修改网站的颜色、字体、间距等样式。

## 5.1 什么是 CSS 变量？为什么用它？

### 什么是 CSS 变量？

CSS 变量（也叫"自定义属性"）就像是给某个值起一个"外号"。

打个比方：
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

## 5.2 variables.css 逐行解读

`variables.css` 定义了项目所有的 CSS 变量。我们逐行来解读：

```css
:root {
/* 主题色 - 小麦橙色系 */
--color-primary: #FF6B00;
--color-primary-light: #FF8C33;
--color-primary-dark: #CC5500;
--color-primary-bg: #FFF3E8;
```

### 主题色（Primary Color）

| 变量 | 值 | 用途 | 色卡 |
|------|-----|------|------|
| `--color-primary` | #FF6B00 | 主要按钮、链接、图标等 | 🟠 橙色 |
| `--color-primary-light` | #FF8C33 | 悬停状态、渐变 | 🟧 浅橙 |
| `--color-primary-dark` | #CC5500 | 按下状态、阴影 | 🟫 深橙 |
| `--color-primary-bg` | #FFF3E8 | 主题色背景（淡橙） | ⬜ 淡橙白 |

> **小麦橙色系**：项目的品牌色是橙色，代表活力、创新、温暖。

### 功能色

```css
--color-success: #52c41a;    /* 成功 - 绿色 */
--color-warning: #faad14;    /* 警告 - 黄色 */
--color-danger: #f5222d;     /* 危险 - 红色 */
--color-info: #1890ff;       /* 信息 - 蓝色 */
```

| 变量 | 值 | 用途 | 色卡 |
|------|-----|------|------|
| `--color-success` | #52c41a | 成功提示、完成状态 | 🟢 绿色 |
| `--color-warning` | #faad14 | 警告提示、待处理状态 | 🟡 黄色 |
| `--color-danger` | #f5222d | 错误提示、删除按钮 | 🔴 红色 |
| `--color-info` | #1890ff | 信息提示、链接 | 🔵 蓝色 |

### 文字颜色

```css
/* 文字颜色 */
--color-text-primary: #1a1a1a;    /* 主要文字 - 深灰 */
--color-text-secondary: #666;     /* 次要文字 - 灰色 */
--color-text-disabled: #bbb;      /* 禁用文字 - 浅灰 */
--color-text-inverse: #fff;       /* 反色文字 - 白色 */
```

| 变量 | 用途 |
|------|------|
| `--color-text-primary` | 正文、标题 |
| `--color-text-secondary` | 说明文字、标签 |
| `--color-text-disabled` | 禁用状态的文字 |
| `--color-text-inverse` | 深色背景上的文字 |

### 背景色

```css
/* 背景色 */
--color-bg: #f5f7f9;              /* 页面背景 - 浅灰 */
--color-bg-white: #ffffff;        /* 卡片背景 - 白色 */
--color-bg-sidebar: #1f2233;      /* 侧边栏背景 - 深蓝灰 */
--color-bg-sidebar-hover: #2a2d42; /* 侧边栏悬停 */
--color-bg-header: #ffffff;       /* 顶部栏背景 - 白色 */
```

### 边框

```css
/* 边框 */
--border-color: #ebeef5;          /* 边框颜色 */
--border-radius-sm: 6px;          /* 小圆角 */
--border-radius: 12px;            /* 默认圆角 */
--border-radius-lg: 16px;         /* 大圆角 */
```

### 间距

```css
/* 间距 */
--spacing-xs: 4px;    /* 超小间距 */
--spacing-sm: 8px;    /* 小间距 */
--spacing-md: 16px;   /* 中等间距 */
--spacing-lg: 24px;   /* 大间距 */
--spacing-xl: 32px;   /* 超大间距 */
```

**为什么要用固定的间距值？**

就像装修房子，所有房间用统一的尺寸（1米、2米），这样看起来整齐。间距也是一样，用统一的值，页面会更协调。

### 字体大小

```css
/* 字体 */
--font-size-xs: 12px;    /* 超小字体 */
--font-size-sm: 13px;    /* 小字体 */
--font-size-base: 14px;  /* 基础字体 */
--font-size-md: 15px;    /* 中等字体 */
--font-size-lg: 16px;    /* 大字体 */
--font-size-xl: 20px;    /* 超大字体 */
--font-size-xxl: 24px;   /* 标题字体 */
```

### 阴影

```css
/* 阴影 */
--shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.03);   /* 小阴影 */
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.06);   /* 中等阴影 */
--shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.08);  /* 大阴影 */
```

阴影让元素看起来有"悬浮"的效果，增加层次感。

### 布局

```css
/* 布局 */
--sidebar-width: 220px;    /* 侧边栏宽度 */
--header-height: 60px;     /* 顶部栏高度 */
```

### 过渡

```css
/* 过渡 */
--transition: all 0.2s ease;   /* 平滑过渡效果 */
```

---

## 5.3 三层架构：基础 → 组件 → 页面

项目的 CSS 采用三层架构，就像衣柜的整理方式：

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
├── base/         【基础层】所有页面共享的基础样式
├── components/   【组件层】公共组件的样式
└── pages/        【页面层】特定页面的样式
```

### 第一层：base/ 基础样式

**最底层，所有页面都要用到。**

| 文件 | 作用 |
|------|------|
| `reset.css` | 重置浏览器默认样式 |
| `variables.css` | CSS 变量定义 |
| `typography.css` | 字体、排版样式 |

**reset.css 的作用：**

不同浏览器有不同的默认样式：
- Chrome 的标题可能比 Firefox 大一点
- Safari 的列表可能左边距不一样

`reset.css` 会把这些默认样式"清零"，让所有浏览器显示一致。

### 第二层：components/ 组件样式

**中间层，定义公共组件的样式。**

比如按钮、表格、卡片、表单等，这些组件在很多页面都会用到。

| 文件 | 作用 |
|------|------|
| `button.css` | 按钮样式 |
| `table.css` | 表格样式 |
| `card.css` | 卡片样式 |
| `form.css` | 表单样式 |
| `header.css` | 顶部导航栏样式 |
| `sidebar.css` | 侧边栏样式 |
| `modal.css` | 弹窗样式 |

### 第三层：pages/ 页面样式

**最顶层，定义特定页面的样式。**

比如登录页有特殊的背景，落地页有特殊的布局等。

| 文件 | 作用 |
|------|------|
| `login.css` | 登录页、注册页样式 |
| `landing.css` | 落地页样式 |
| `production.css` | 生产管理页面样式 |
| ... | 其他模块页面样式 |

---

## 5.4 main.css 的 @import 机制

`main.css` 是样式系统的入口文件，它的作用是**导入所有样式文件**。

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
@import './pages/landing.css';
```

### 为什么用 @import？

每个页面只需要引入一个 `main.css`：

```html
<link rel="stylesheet" href="../assets/css/main.css">
```

而不是引入十几个文件：

```html
<!-- 不推荐：太繁琐 -->
<link rel="stylesheet" href="../assets/css/base/reset.css">
<link rel="stylesheet" href="../assets/css/base/variables.css">
<link rel="stylesheet" href="../assets/css/base/typography.css">
<!-- ... 还有很多 -->
```

### 加载顺序很重要

注意 `@import` 的顺序：

1. **先加载 base 层**：因为变量和基础样式要先定义好
2. **再加载 components 层**：组件可能用到变量
3. **最后加载 pages 层**：页面可能覆盖组件样式

如果顺序反了，变量还没定义就使用，会报错。

---

## 5.5 如何修改主题色？

假设你想把橙色主题改成蓝色主题，只需要改 `variables.css` 里的几个变量：

### 修改步骤

1. 打开 `web/src/assets/css/base/variables.css`
2. 找到主题色定义：

```css
--color-primary: #FF6B00;
--color-primary-light: #FF8C33;
--color-primary-dark: #CC5500;
--color-primary-bg: #FFF3E8;
```

3. 改成蓝色：

```css
--color-primary: #1890ff;
--color-primary-light: #40a9ff;
--color-primary-dark: #096dd9;
--color-primary-bg: #e6f7ff;
```

4. 保存文件，刷新浏览器

整个网站的主题色就变了！

### 如何选择颜色？

推荐使用在线取色工具：
- [Adobe Color](https://color.adobe.com/)
- [Coolors](https://coolors.co/)
- [中国色](http://zhongguose.com/)

---

## 5.6 响应式设计

### 什么是响应式设计？

**响应式设计**（Responsive Design）是指网页能根据屏幕大小自动调整布局。

比如：
- 在电脑上：侧边栏显示在左边，内容在右边
- 在手机上：侧边栏隐藏，点击汉堡按钮才显示

### 媒体查询（Media Query）

CSS 用 **媒体查询** 来实现响应式：

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

这段代码的意思是：
- 默认情况：侧边栏宽度 220px，正常显示
- 如果屏幕宽度 ≤ 768px（手机）：侧边栏隐藏

### 本项目中的响应式断点

| 断点 | 含义 |
|------|------|
| ≤ 768px | 手机、平板竖屏 |
| > 768px | 电脑、平板横屏 |

### 如何测试响应式？

在浏览器里：

1. 按 F12 打开开发者工具
2. 点击"Toggle device toolbar"图标（或按 Ctrl+Shift+M）
3. 选择不同的设备或手动调整宽度

---

## 5.7 自定义鼠标动画效果

本项目有一个特殊的视觉效果：**鼠标跟随动画**。

### 效果描述

在电脑端，鼠标旁边会有一个橙色圆圈跟随鼠标移动：
- 正常状态：小圆圈（20px）
- 悬停在可点击元素上：大圆圈（48px）

### 代码解读

```css
/* 自定义鼠标样式 */
.custom-cursor {
    position: fixed;        /* 固定定位，不随页面滚动 */
    top: 0;
    left: 0;
    width: 20px;            /* 默认宽度 */
    height: 20px;           /* 默认高度 */
    border: 2px solid var(--color-primary);  /* 橙色边框 */
    border-radius: 50%;     /* 圆形 */
    pointer-events: none;   /* 不影响鼠标点击 */
    transform: translate(-50%, -50%);  /* 居中对齐 */
    z-index: 99999;         /* 最顶层 */
}

/* 悬停状态 */
.custom-cursor.hover {
    width: 48px;            /* 变大 */
    height: 48px;
    background-color: var(--color-primary);  /* 填充橙色 */
    opacity: 0.5;           /* 半透明 */
}
```

### 移动端隐藏

手机没有鼠标，所以要隐藏这个效果：

```css
@media (max-width: 768px) {
    .custom-cursor {
        display: none;
    }
}
```

---

# 第六部分：JavaScript 逻辑系统详解

> 这一章深入讲解项目的 JavaScript 架构，包括工具函数、业务模块、数据加载机制等。
>
> 读完这章，你会理解页面是如何"动起来"的。

## 6.1 工具函数层 (utils/)

工具函数是**通用的、可复用的**功能，不涉及具体业务逻辑。

### 6.1.1 dom.js — DOM 操作工具

这个文件封装了常用的 DOM（文档对象模型）操作函数。

> **什么是 DOM？**
> 
> DOM（Document Object Model）是浏览器把 HTML 解析后生成的一种树形结构。JavaScript 通过 DOM 来操作网页元素——获取元素、修改内容、添加事件等。

#### `$` 函数 — 获取单个元素

```javascript
function $(selector, context) {
    return (context || document).querySelector(selector);
}
```

**作用**：根据选择器获取**第一个**匹配的元素。

**用法**：
```javascript
const button = $('#submit-btn');        // 获取 id 为 submit-btn 的元素
const firstCard = $('.card');           // 获取第一个 class 为 card 的元素
```

#### `$$` 函数 — 获取多个元素

```javascript
function $$(selector, context) {
    return Array.from((context || document).querySelectorAll(selector));
}
```

**作用**：根据选择器获取**所有**匹配的元素，返回数组。

**用法**：
```javascript
const allCards = $$('.card');           // 获取所有 class 为 card 的元素
allCards.forEach(card => {              // 遍历所有卡片
    card.style.border = '1px solid red';
});
```

#### `createElement` 函数 — 创建元素

```javascript
function createElement(tag, className, innerHTML) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
}
```

**作用**：创建一个新的 HTML 元素。

**用法**：
```javascript
const div = createElement('div', 'card', '<h2>标题</h2>');
document.body.appendChild(div);
```

#### `on` 函数 — 添加事件监听

```javascript
function on(element, event, handler) {
    if (element) element.addEventListener(event, handler);
}
```

**作用**：给元素添加事件监听器。

**用法**：
```javascript
const button = $('#submit-btn');
on(button, 'click', function() {
    alert('按钮被点击了！');
});
```

#### 其他函数

| 函数 | 作用 |
|------|------|
| `addClass(element, className)` | 给元素添加 class |
| `removeClass(element, className)` | 移除元素的 class |
| `hasClass(element, className)` | 检查元素是否有某个 class |
| `toggleClass(element, className)` | 切换元素的 class |
| `show(element)` | 显示元素 |
| `hide(element)` | 隐藏元素 |
| `toggle(element)` | 切换元素的显示/隐藏 |

---

### 6.1.2 storage.js — 数据存储工具

这个文件封装了浏览器存储（localStorage 和 sessionStorage）的操作。

> **localStorage vs sessionStorage**
>
> - **localStorage**：数据永久保存，除非手动清除
> - **sessionStorage**：数据只在当前标签页有效，关闭标签页就清除

#### 存储对象结构

```javascript
const storage = {
    set(key, value) { ... },      // 保存到 localStorage
    get(key) { ... },              // 从 localStorage 读取
    remove(key) { ... },           // 从 localStorage 删除
    clear() { ... },               // 清空 localStorage
    
    session: {
        set(key, value) { ... },   // 保存到 sessionStorage
        get(key) { ... },          // 从 sessionStorage 读取
        remove(key) { ... },       // 从 sessionStorage 删除
        clear() { ... }            // 清空 sessionStorage
    }
};
```

#### 用法示例

```javascript
// 保存用户信息到 localStorage（永久保存）
storage.set('user', { name: '张三', role: 'admin' });

// 读取用户信息
const user = storage.get('user');
console.log(user.name);  // 输出：张三

// 保存登录状态到 sessionStorage（关闭浏览器就清除）
storage.session.set('isLoggedIn', true);

// 删除数据
storage.remove('user');
```

---

### 6.1.3 format.js — 格式化工具

这个文件提供日期、数字、金额的格式化函数。

#### `formatDate` 函数 — 格式化日期

```javascript
function formatDate(date, pattern = 'YYYY-MM-DD') {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d)) return '';
    const map = {
        YYYY: d.getFullYear(),
        MM: String(d.getMonth() + 1).padStart(2, '0'),
        DD: String(d.getDate()).padStart(2, '0'),
        HH: String(d.getHours()).padStart(2, '0'),
        mm: String(d.getMinutes()).padStart(2, '0'),
        ss: String(d.getSeconds()).padStart(2, '0'),
    };
    return pattern.replace(/YYYY|MM|DD|HH|mm|ss/g, m => map[m]);
}
```

**作用**：把日期对象或时间戳格式化为字符串。

**用法**：
```javascript
formatDate(new Date());                    // 输出：2026-03-25
formatDate(new Date(), 'YYYY年MM月DD日');  // 输出：2026年03月25日
formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss');  // 输出：2026-03-25 14:30:00
```

#### `formatNumber` 函数 — 格式化数字

```javascript
function formatNumber(num, decimals = 0) {
    return Number(num).toLocaleString('zh-CN', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
}
```

**用法**：
```javascript
formatNumber(1234567);      // 输出：1,234,567
formatNumber(1234.567, 2);  // 输出：1,234.57
```

#### `formatMoney` 函数 — 格式化金额

```javascript
function formatMoney(amount, currency = '¥') {
    return currency + formatNumber(amount, 2);
}
```

**用法**：
```javascript
formatMoney(12345.6);       // 输出：¥12,345.60
formatMoney(12345, '$');    // 输出：$12,345.00
```

---

### 6.1.4 validate.js — 表单验证工具

这个文件提供表单验证函数。

#### 验证器列表

| 验证器 | 作用 | 示例 |
|--------|------|------|
| `required` | 检查是否为空 | `validators.required('')` 返回 '此项为必填项' |
| `email` | 检查邮箱格式 | `validators.email('test@example.com')` 返回 null（通过） |
| `phone` | 检查手机号格式 | `validators.phone('13800138000')` 返回 null（通过） |
| `length` | 检查长度范围 | `validators.length('abc', 2, 5)` 返回 null（通过） |
| `range` | 检查数值范围 | `validators.range(5, 1, 10)` 返回 null（通过） |

#### 用法示例

```javascript
// 检查必填
const error1 = validators.required('');
console.log(error1);  // 输出：此项为必填项

// 检查邮箱
const error2 = validators.email('invalid-email');
console.log(error2);  // 输出：请输入有效的邮箱地址

// 检查邮箱（正确格式）
const error3 = validators.email('test@example.com');
console.log(error3);  // 输出：null（通过）
```

---

## 6.2 业务模块层 (modules/)

业务模块处理具体的业务逻辑。

### 6.2.1 auth.js — 登录认证模块（核心）

这是项目最核心的模块，处理登录、登出、注册、权限验证。

#### 完整代码逐行解读

```javascript
'use strict';

const auth = {
    USER_KEY: 'xm_user',
```

- 第 1 行：`'use strict';` 开启严格模式，帮助发现错误
- 第 3 行：定义 `auth` 对象，包含所有认证相关的方法
- 第 4 行：`USER_KEY` 是用户数据在存储中的 key（键名）

#### login 方法 — 登录

```javascript
login(username, password) {
    // 模拟账号验证
    if (username === 'admin' && password === '123456') {
        const user = { username, role: '管理员', loginTime: Date.now() };
        storage.session.set(this.USER_KEY, user);
        return true;
    }
    return false;
},
```

**逐行解释**：

| 行号 | 代码 | 解释 |
|------|------|------|
| 1 | `login(username, password) {` | 定义 login 方法，接收用户名和密码 |
| 2 | `// 模拟账号验证` | 注释：这是模拟验证，实际应该调用后端 API |
| 3 | `if (username === 'admin' && password === '123456') {` | 检查用户名和密码是否正确 |
| 4 | `const user = { username, role: '管理员', loginTime: Date.now() };` | 创建用户对象，包含用户名、角色、登录时间 |
| 5 | `storage.session.set(this.USER_KEY, user);` | 把用户信息保存到 sessionStorage |
| 6 | `return true;` | 返回 true 表示登录成功 |
| 7 | `}` | if 语句结束 |
| 8 | `return false;` | 如果用户名密码不对，返回 false |
| 9 | `},` | login 方法结束 |

**默认账号**：用户名 `admin`，密码 `123456`

#### logout 方法 — 登出

```javascript
logout() {
    storage.session.remove(this.USER_KEY);
    // 退出登录跳转到首页
    const pathParts = window.location.pathname.split('/');
    const pagesIndex = pathParts.lastIndexOf('pages');
    if (pagesIndex !== -1) {
        const depth = pathParts.length - pagesIndex - 1;
        const relativePath = depth > 0 ? '../'.repeat(depth) : './';
        window.location.href = relativePath + 'landing.html';
    } else {
        window.location.href = 'landing.html';
    }
},
```

**逻辑解释**：

1. 从 sessionStorage 删除用户信息
2. 计算当前页面相对于根目录的路径深度
3. 跳转到落地页 `landing.html`

#### getUser 方法 — 获取当前用户

```javascript
getUser() {
    return storage.session.get(this.USER_KEY);
},
```

从 sessionStorage 读取用户信息。

#### isLoggedIn 方法 — 检查是否已登录

```javascript
isLoggedIn() {
    return !!this.getUser();
},
```

`!!` 是双重否定，把值转成布尔类型：
- 如果有用户信息，返回 `true`
- 如果没有用户信息，返回 `false`

#### guard 方法 — 权限守卫

```javascript
guard() {
    if (!this.isLoggedIn()) {
        const pathParts = window.location.pathname.split('/').filter(Boolean);
        let depth = 0;
        for (let i = 0; i < pathParts.length; i++) {
            if (pathParts[i] === 'pages') {
                depth = pathParts.length - i - 1;
                break;
            }
        }
        const basePath = '../'.repeat(depth > 0 ? depth : 1);
        window.location.href = basePath + 'pages/login.html';
    }
},
```

**作用**：在需要登录的页面调用，如果用户没登录就跳转到登录页。

**使用场景**：在仪表盘、业务子系统页面的 JS 里调用：

```javascript
// 页面加载时检查登录状态
auth.guard();
```

#### register 方法 — 注册

```javascript
register(username, email, password) {
    // 模拟注册（实际应调用后端API）
    const users = storage.local.get('xm_users') || [];
    const exists = users.some(u => u.username === username || u.email === email);
    if (exists) {
        return false;
    }
    users.push({ username, email, password, regTime: Date.now() });
    storage.local.set('xm_users', users);
    return true;
}
```

**逻辑解释**：

1. 从 localStorage 读取已有用户列表
2. 检查用户名或邮箱是否已存在
3. 如果存在，返回 false（注册失败）
4. 如果不存在，添加新用户，保存，返回 true（注册成功）

---

### 6.2.2 navigation.js — 导航管理模块

处理侧边栏导航的高亮、用户名显示、退出绑定。

```javascript
'use strict';

const appNav = {
    init() {
        this.highlightActive();
        this.bindLogout();
        this.renderUser();
    },

    highlightActive() {
        const current = window.location.pathname;
        $$('.sidebar-item').forEach(item => {
            const href = item.getAttribute('href');
            const dataPage = item.getAttribute('data-page');
            const page = dataPage || (href ? href.replace(/.*pages\//, '').replace('.html', '') : '');
            if (page && current.includes(page.replace('.html', ''))) {
                addClass(item, 'active');
            }
        });
    },

    renderUser() {
        const user = auth.getUser();
        if (!user) return;
        const el = $('.header-user .username');
        if (el) el.textContent = user.username;
        const avatar = $('.header-user .avatar');
        if (avatar) avatar.textContent = user.username.charAt(0).toUpperCase();
    },

    bindLogout() {
        const btn = $('#logout-btn');
        on(btn, 'click', () => auth.logout());
    }
};
```

**方法解释**：

| 方法 | 作用 |
|------|------|
| `init()` | 初始化，调用下面三个方法 |
| `highlightActive()` | 高亮当前页面对应的侧边栏项 |
| `renderUser()` | 在顶部导航栏显示用户名和头像 |
| `bindLogout()` | 绑定退出按钮的点击事件 |

---

## 6.3 main.js — 全局初始化

`main.js` 是 JavaScript 的入口文件，负责全局初始化。

```javascript
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // 非登录页执行鉴权
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.endsWith('login.html') || currentPath.endsWith('register.html');
    if (!isLoginPage) {
        auth.guard();
        if (typeof appNav !== 'undefined') appNav.init();
    }

    // 初始化鼠标跟随动效
    initCustomCursor();

    // 监听 DOM 树变化，修正路径
    initPathObserver();
});
```

**逐行解释**：

| 行号 | 代码 | 解释 |
|------|------|------|
| 1 | `'use strict';` | 开启严格模式 |
| 3 | `document.addEventListener('DOMContentLoaded', () => {` | 等待页面加载完成再执行 |
| 5 | `const currentPath = window.location.pathname;` | 获取当前页面路径 |
| 6 | `const isLoginPage = ...` | 检查是否是登录页或注册页 |
| 7-10 | `if (!isLoginPage) { ... }` | 如果不是登录页，执行鉴权和导航初始化 |
| 13 | `initCustomCursor();` | 初始化自定义鼠标动画 |
| 16 | `initPathObserver();` | 监听 DOM 变化，修复动态加载组件的路径 |

---

## 6.4 模拟数据 (data/)

模拟数据存放在 `src/data/` 目录下，每个业务模块对应一个数据文件。

### 数据结构示例（production.js）

```javascript
const productionData = {
    plans: [
        { id: 'PP001', name: '2026年Q1生产计划', startDate: '2026-01-01', endDate: '2026-03-31', status: '进行中' },
        { id: 'PP002', name: '2026年Q2生产计划', startDate: '2026-04-01', endDate: '2026-06-30', status: '待启动' },
    ],
    tasks: [
        { id: 'PT001', planId: 'PP001', productName: '产品A', quantity: 500, progress: 80, assignee: '王磊' },
    ],
    materials: [
        { id: 'PM001', name: '钢材', spec: 'Q235 10mm', unit: '吨', required: 50, stock: 35 },
    ],
    orders: [
        { id: 'PO001', customer: '北京科技有限公司', product: '产品A', quantity: 200, status: '生产中' },
    ],
    qualityRecords: [
        { id: 'PQ001', orderId: 'PO001', inspector: '周强', date: '2026-03-18', result: '合格' },
    ]
};
```

---

## 6.5 组件动态加载机制

### 什么是组件动态加载？

公共组件（header、sidebar）不是直接写在每个页面里的，而是通过 JavaScript 动态加载。

### 为什么这样做？

1. **避免重复代码**：导航栏代码只写一次
2. **方便维护**：修改导航栏只需改一个文件
3. **保持一致**：所有页面的导航栏自动同步

### 如何加载？

在每个页面的 JavaScript 里：

```javascript
// 加载顶部导航栏
fetch('../../components/header.html')
    .then(r => r.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
        appNav.init();
    });

// 加载侧边栏
fetch('../../components/sidebar.html')
    .then(r => r.text())
    .then(html => {
        document.getElementById('sidebar-placeholder').innerHTML = html;
    });
```

**解释**：

1. `fetch('../../components/header.html')` 请求组件文件
2. `.then(r => r.text())` 把响应转成文本
3. `.then(html => { ... })` 把文本插入到页面的占位符里

---

## 6.6 脚本加载顺序的重要性

### 为什么加载顺序很重要？

JavaScript 代码在执行时会依赖其他文件：
- `auth.js` 依赖 `storage.js`
- `main.js` 依赖 `auth.js` 和 `navigation.js`

如果依赖的文件还没加载，就会报错。

### 正确的加载顺序

```html
<!-- 1. 先加载工具函数 -->
<script src="../../assets/js/utils/dom.js"></script>
<script src="../../assets/js/utils/storage.js"></script>
<script src="../../assets/js/utils/format.js"></script>
<script src="../../assets/js/utils/validate.js"></script>

<!-- 2. 再加载业务模块 -->
<script src="../../assets/js/modules/auth.js"></script>
<script src="../../assets/js/modules/navigation.js"></script>

<!-- 3. 最后加载入口文件 -->
<script src="../../assets/js/main.js"></script>
```

### 为什么 script 放在 body 底部？

浏览器解析 HTML 是从上到下的。如果把 `<script>` 放在 `<head>` 里：

1. 浏览器遇到 `<script>` 就开始下载和执行 JS
2. 此时页面的 HTML 还没解析完
3. JS 里如果操作 DOM 元素，可能找不到（元素还没创建）

把 `<script>` 放在 `</body>` 前面：

1. 浏览器先解析完 HTML
2. DOM 树构建完成
3. 然后执行 JS，可以安全地操作 DOM

---

