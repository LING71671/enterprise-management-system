# 第六部分：JavaScript 逻辑系统

[返回目录](./README.md) | [上一章：CSS 样式系统](./05-css.md) | [下一章：页面讲解](./07-pages.md)

---

> 这一章深入讲解项目的 JavaScript 架构，包括工具函数、业务模块、代码逐行解读。

---

## 6.1 工具函数层 (utils/)

### dom.js — DOM 操作（完整版）

DOM 操作是网页开发的核心。这个文件封装了 12 个常用函数，让你不用每次都写重复的代码。

#### 什么是 DOM？

> **DOM**（Document Object Model，文档对象模型）是浏览器把 HTML 解析后生成的一种结构。
> JavaScript 通过 DOM 来操作网页元素（添加、删除、修改）。

#### 函数列表

| 函数 | 作用 | 用法示例 |
|------|------|----------|
| `$(selector)` | 获取单个元素 | `$('#submit-btn')` |
| `$$(selector)` | 获取多个元素（返回数组） | `$$('.card')` |
| `createElement(tag, className, innerHTML)` | 创建元素 | `createElement('div', 'card', '<h2>标题</h2>')` |
| `on(element, event, handler)` | 添加事件监听 | `on(button, 'click', () => alert('点击'))` |
| `delegate(parent, selector, event, handler)` | 事件委托 | `delegate(list, '.item', 'click', handler)` |
| `addClass(element, className)` | 添加 class | `addClass(card, 'active')` |
| `removeClass(element, className)` | 移除 class | `removeClass(card, 'active')` |
| `hasClass(element, className)` | 检查是否有 class | `hasClass(card, 'active')` → `true`或`false` |
| `toggleClass(element, className)` | 切换 class | `toggleClass(card, 'active')` |
| `show(element)` | 显示元素 | `show(modal)` |
| `hide(element)` | 隐藏元素 | `hide(modal)` |
| `toggle(element)` | 切换显示/隐藏 | `toggle(modal)` |

#### 完整代码解读

```javascript
'use strict';

// $ 函数：获取单个元素
function $(selector, context) {
  return (context || document).querySelector(selector);
}
```

**逐行解释**：

| 代码 | 解释 |
|------|------|
| `'use strict';` | 开启严格模式，帮助发现潜在错误 |
| `function $(selector, context)` | 定义函数，`selector` 是选择器，`context` 是查找范围（可选） |
| `(context || document)` | 如果提供了 context 就用 context，否则用 document |
| `.querySelector(selector)` | 在指定范围内查找第一个匹配的元素 |

**为什么要用 `$` 和 `$$`？**

> 这是一种简写命名，源自 jQuery 库的习惯。
> 原生的 `document.querySelector()` 太长了，用 `$(...)` 更简洁。

```javascript
// $$ 函数：获取多个元素
function $$(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}
```

**关键点**：
- `querySelectorAll()` 返回的是 NodeList（类数组）
- `Array.from()` 把 NodeList 转成真正的数组，可以使用 `forEach`、`map` 等方法

```javascript
// createElement 函数：创建元素
function createElement(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}
```

**参数说明**：

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `tag` | 字符串 | 标签名 | `'div'`、`'span'`、`'button'` |
| `className` | 字符串 | CSS 类名（可选） | `'card active'` |
| `innerHTML` | 字符串 | 内部 HTML（可选） | `'<h2>标题</h2>'` |

```javascript
// on 函数：添加事件监听
function on(element, event, handler) {
  if (element) element.addEventListener(event, handler);
}
```

**为什么要有 `if (element)` 判断？**

> 如果元素不存在（比如还没加载），直接调用 `addEventListener` 会报错。
> 加上判断，即使元素不存在也不会出错。

```javascript
// delegate 函数：事件委托
function delegate(parent, selector, event, handler) {
  on(parent, event, function (e) {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}
```

#### 什么是事件委托？

> 当你需要给很多个元素添加相同的事件时，一个一个添加太麻烦了。
> 事件委托就是：把事件监听添加到父元素上，让父元素帮你"代劳"。

**例子**：一个列表有 100 个 item，你想点击任何一个都弹出提示。

```
不使用事件委托：                    使用事件委托：
┌─────────────────┐              ┌─────────────────┐
│ <ul>            │              │ <ul>            │
│   <li> item 1   │ ← 添加事件   │   <li> item 1   │
│   <li> item 2   │ ← 添加事件   │   <li> item 2   │
│   <li> item 3   │ ← 添加事件   │   <li> item 3   │
│   ...           │              │   ...           │
│   <li> item 100 │ ← 添加事件   │   <li> item 100 │
│ </ul>           │              │ </ul> ← 只添加一次│
└─────────────────┘              └─────────────────┘
添加 100 次事件                   只添加 1 次事件
```

**代码对比**：

```javascript
// ❌ 不推荐：给每个 item 添加事件
const items = $$('.item');
items.forEach(item => {
  on(item, 'click', () => alert('点击了'));
});

// ✅ 推荐：事件委托，只添加一次
delegate(document, '.item', 'click', (e) => {
  alert('点击了: ' + e.target.textContent);
});
```

```javascript
// class 操作函数
function addClass(element, className) {
  if (element) element.classList.add(className);
}

function removeClass(element, className) {
  if (element) element.classList.remove(className);
}

function hasClass(element, className) {
  return element ? element.classList.contains(className) : false;
}

function toggleClass(element, className) {
  if (element) element.classList.toggle(className);
}
```

**classList API 说明**：

| 方法 | 作用 | 示例 |
|------|------|------|
| `add(name)` | 添加 class | `el.classList.add('active')` |
| `remove(name)` | 移除 class | `el.classList.remove('active')` |
| `contains(name)` | 检查是否有 | `el.classList.contains('active')` → `true/false` |
| `toggle(name)` | 切换 | 有就移除，没有就添加 |

```javascript
// 显示/隐藏函数
function show(element) {
  if (element) element.style.display = '';
}

function hide(element) {
  if (element) element.style.display = 'none';
}

function toggle(element) {
  if (element) {
    element.style.display = element.style.display === 'none' ? '' : 'none';
  }
}
```

**为什么 `show()` 用 `display = ''`？**

> `display = ''` 会清除内联样式，让元素恢复到 CSS 定义的默认显示方式。
> 比如 `<div>` 默认是 `block`，`<span>` 默认是 `inline`。
> 如果用 `display = 'block'`，可能会覆盖掉原本的 `inline` 或 `flex`。

### storage.js — 数据存储

封装了 localStorage 和 sessionStorage，让存储数据更简单。

#### localStorage 和 sessionStorage 的区别

| 特性 | localStorage | sessionStorage |
|------|--------------|----------------|
| 生命周期 | 永久保存 | 关闭浏览器就清除 |
| 作用域 | 同域名所有页面共享 | 仅当前页面 |
| 容量 | 约 5MB | 约 5MB |
| 用途 | 用户设置、持久数据 | 临时会话数据 |

#### 完整代码解读

```javascript
'use strict';

const storage = {
  // localStorage 方法
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  },
  
  remove(key) {
    localStorage.removeItem(key);
  },
  
  clear() {
    localStorage.clear();
  },

  // sessionStorage 方法
  session: {
    set(key, value) {
      sessionStorage.setItem(key, JSON.stringify(value));
    },
    
    get(key) {
      try {
        return JSON.parse(sessionStorage.getItem(key));
      } catch {
        return null;
      }
    },
    
    remove(key) {
      sessionStorage.removeItem(key);
    },
    
    clear() {
      sessionStorage.clear();
    }
  }
};
```

**为什么要用 `JSON.stringify` 和 `JSON.parse`？**

> localStorage 和 sessionStorage 只能存储**字符串**。
> 如果直接存储对象，会变成 `"[object Object]"`。
> 所以存储前用 `JSON.stringify` 转成 JSON 字符串，读取时用 `JSON.parse` 转回对象。

```javascript
// ❌ 直接存储对象
localStorage.setItem('user', { name: '张三' });
// 实际存储的是："[object Object]"

// ✅ 先转成 JSON
storage.set('user', { name: '张三' });
// 实际存储的是：'{"name":"张三"}'
```

**为什么用 `try-catch`？**

> 如果存储的数据被手动修改成无效的 JSON，`JSON.parse` 会报错。
> 用 `try-catch` 捕获错误，返回 `null`，避免程序崩溃。

#### 使用示例

```javascript
// 保存用户信息（localStorage，永久保存）
storage.set('user', { 
  name: '张三', 
  role: '管理员' 
});

// 读取用户信息
const user = storage.get('user');
console.log(user.name);  // "张三"

// 删除用户信息
storage.remove('user');

// 清空所有数据
storage.clear();

// 保存登录状态（sessionStorage，关闭浏览器就清除）
storage.session.set('isLoggedIn', true);
storage.session.set('loginTime', Date.now());

// 读取登录状态
const isLoggedIn = storage.session.get('isLoggedIn');  // true
```

### format.js — 格式化函数

提供日期、数字、金额的格式化功能。

#### 完整代码解读

```javascript
'use strict';

// formatDate：格式化日期
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

**参数说明**：

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `date` | Date 或字符串 | 必填 | 要格式化的日期 |
| `pattern` | 字符串 | `'YYYY-MM-DD'` | 输出格式 |

**格式占位符**：

| 占位符 | 含义 | 示例 |
|--------|------|------|
| `YYYY` | 年份 | 2026 |
| `MM` | 月份（补零） | 03 |
| `DD` | 日期（补零） | 25 |
| `HH` | 小时（补零） | 14 |
| `mm` | 分钟（补零） | 30 |
| `ss` | 秒数（补零） | 45 |

**使用示例**：

```javascript
const now = new Date();

formatDate(now);                      // "2026-03-25"
formatDate(now, 'YYYY年MM月DD日');      // "2026年03月25日"
formatDate(now, 'YYYY-MM-DD HH:mm:ss'); // "2026-03-25 14:30:45"
formatDate('2026-01-01');             // "2026-01-01"
formatDate('invalid');                // ""（无效日期返回空字符串）
```

**代码解析**：

| 代码 | 解释 |
|------|------|
| `date instanceof Date ? date : new Date(date)` | 如果已经是 Date 对象就直接用，否则转换 |
| `d.getMonth() + 1` | 月份从 0 开始，所以要加 1 |
| `String(...).padStart(2, '0')` | 不足两位补零，如 `3` → `'03'` |
| `pattern.replace(...)` | 把占位符替换成实际值 |

```javascript
// formatNumber：格式化数字（添加千分位）
function formatNumber(num, decimals = 0) {
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

// formatMoney：格式化金额
function formatMoney(amount, currency = '¥') {
  return currency + formatNumber(amount, 2);
}

// formatPercent：格式化百分比
function formatPercent(value, decimals = 1) {
  return (Number(value) * 100).toFixed(decimals) + '%';
}
```

**使用示例**：

```javascript
formatNumber(1234567);        // "1,234,567"
formatNumber(1234567.891, 2); // "1,234,567.89"
formatMoney(12345.6);         // "¥12,345.60"
formatMoney(12345.6, '$');    // "$12,345.60"
formatPercent(0.856);         // "85.6%"
formatPercent(0.5, 0);        // "50%"
```

---

### validate.js — 表单验证

提供常用的表单验证函数。

#### 完整代码解读

```javascript
'use strict';

const validators = {
  // 必填验证
  required(value, message = '此项为必填项') {
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null : message;
  },
  
  // 邮箱验证
  email(value, message = '请输入有效的邮箱地址') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },
  
  // 手机号验证（中国大陆）
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },
  
  // 长度验证
  length(value, min, max, message) {
    const len = String(value).length;
    const msg = message || `长度须在 ${min} 到 ${max} 个字符之间`;
    return len >= min && len <= max ? null : msg;
  },
  
  // 数值范围验证
  range(value, min, max, message) {
    const num = Number(value);
    const msg = message || `数值须在 ${min} 到 ${max} 之间`;
    return num >= min && num <= max ? null : msg;
  }
};
```

**验证器的设计模式**：

> 所有验证器都遵循相同的模式：
> - 返回 `null` 表示验证通过
> - 返回错误消息字符串表示验证失败
>
> 这样可以用统一的方式处理验证结果。

**正则表达式解释**：

| 正则 | 含义 | 匹配示例 |
|------|------|----------|
| `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | 邮箱格式 | `test@example.com` |
| `/^1[3-9]\d{9}$/` | 中国手机号 | `13812345678` |

```javascript
// validateForm：批量验证表单
function validateForm(formData, rules) {
  const errors = {};
  
  for (const field in rules) {
    for (const rule of rules[field]) {
      const error = rule(formData[field]);
      if (error) {
        errors[field] = error;
        break;  // 找到第一个错误就停止
      }
    }
  }
  
  return Object.keys(errors).length === 0 ? null : errors;
}
```

**使用示例**：

```javascript
// 单个验证
validators.required('');           // "此项为必填项"
validators.required('hello');      // null（通过）
validators.email('test@example.com'); // null（通过）
validators.email('invalid');       // "请输入有效的邮箱地址"
validators.phone('13812345678');   // null（通过）
validators.length('hello', 1, 10); // null（通过）
validators.length('hi', 3, 10);    // "长度须在 3 到 10 个字符之间"

// 批量验证
const formData = {
  username: 'admin',
  email: 'invalid-email',
  password: '123'
};

const rules = {
  username: [validators.required, v => validators.length(v, 3, 20)],
  email: [validators.required, validators.email],
  password: [validators.required, v => validators.length(v, 6, 20)]
};

const errors = validateForm(formData, rules);
// { email: "请输入有效的邮箱地址", password: "长度须在 6 到 20 个字符之间" }
```

---

## 6.2 auth.js — 登录认证模块（核心）

处理用户登录、注册、权限验证的核心模块。

### 完整代码解读

```javascript
'use strict';

const auth = {
  USER_KEY: 'xm_user',  // 用户数据在 sessionStorage 中的键名
```

**设计说明**：

| 代码 | 解释 |
|------|------|
| `'use strict';` | 开启严格模式，帮助发现潜在错误 |
| `const auth = { ... }` | 用对象封装所有认证方法，避免污染全局命名空间 |
| `USER_KEY: 'xm_user'` | 定义常量，统一管理存储键名，使用 `xm_` 前缀避免与其他项目冲突 |

### getUser 方法 — 获取当前用户

```javascript
getUser() {
  return storage.session.get(this.USER_KEY);
},
```

**作用**：从 sessionStorage 获取已登录用户的信息。

**返回值**：用户对象 `{ username, role, loginTime }` 或 `null`（未登录）

### isLoggedIn 方法 — 检查登录状态

```javascript
isLoggedIn() {
  return !!this.getUser();  // 双重否定，转成布尔值
},
```

**解释**：

```
this.getUser() 返回：    用户对象  或  null
!this.getUser() 变成：   false     或  true
!!this.getUser() 变成：  true      或  false
```

**为什么用 `!!`？**

> 函数的语义是"返回登录状态"，应该是 `true` 或 `false`。
> 直接返回用户对象或 null 也可以用，但语义不够清晰。

### login 方法 — 登录验证

```javascript
login(username, password) {
  // 模拟账号验证（实际项目应调用后端 API）
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
| 1 | `login(username, password)` | 接收用户名和密码两个参数 |
| 2 | `if (username === 'admin' && password === '123456')` | 硬编码验证（实际项目应该调用后端 API） |
| 3 | `const user = { username, role: '管理员', loginTime: Date.now() }` | 创建用户对象，包含用户名、角色、登录时间 |
| 4 | `storage.session.set(this.USER_KEY, user)` | 保存到 sessionStorage |
| 5 | `return true` | 返回登录成功 |
| 6 | `return false` | 验证失败，返回登录失败 |

**安全提示**：

> 这是前端模拟登录，实际项目中：
> - 密码不能硬编码在前端代码里
> - 应该调用后端 API 验证
> - 密码需要加密传输（HTTPS）
> - 登录成功后由后端返回 token

### logout 方法 — 退出登录

```javascript
logout() {
  storage.session.remove(this.USER_KEY);
  // 退出登录跳转到首页
  const pathParts = window.location.pathname.split('/');
  const pagesIndex = pathParts.lastIndexOf('pages');
  if (pagesIndex !== -1) {
    // 计算从当前位置到 pages 目录的路径
    const depth = pathParts.length - pagesIndex - 1;
    const relativePath = depth > 0 ? '../'.repeat(depth) : './';
    // 首页在 pages 目录下
    window.location.href = relativePath + 'landing.html';
  } else {
    window.location.href = 'landing.html';
  }
},
```

**为什么路径计算这么复杂？**

> 因为页面可能在不同的目录层级：
> - `login.html` 在 `pages/` 下，深度是 1
> - `index.html` 在 `pages/production/` 下，深度是 2
>
> 需要根据实际深度计算正确的相对路径。

**路径计算图解**：

```
假设当前在 /web/src/pages/production/index.html

pathParts = ['', 'web', 'src', 'pages', 'production', 'index.html']
pagesIndex = 3（'pages' 的位置）
depth = 6 - 3 - 1 = 2（需要回到 pages 目录的层级数）
relativePath = '../' * 2 = '../../'
跳转路径 = '../../landing.html'
```

### guard 方法 — 权限守卫

```javascript
guard() {
  if (!this.isLoggedIn()) {
    // 使用相对路径，支持子目录部署
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

**使用方法**：

```javascript
// 在页面 JavaScript 中调用
document.addEventListener('DOMContentLoaded', () => {
  auth.guard();  // 没登录就自动跳转
  // ... 其他初始化代码
});
```

**执行流程**：

```
页面加载
    │
    ▼
调用 auth.guard()
    │
    ▼
检查 isLoggedIn()
    │
    ├── true（已登录）→ 继续执行页面逻辑
    │
    └── false（未登录）→ 跳转到 login.html
```

### register 方法 — 用户注册

```javascript
register(username, email, password) {
  // 模拟注册（实际应调用后端 API）
  const users = storage.local.get('xm_users') || [];
  const exists = users.some(u => u.username === username || u.email === email);
  if (exists) {
    return false;  // 用户名或邮箱已被使用
  }
  
  users.push({ username, email, password, regTime: Date.now() });
  storage.local.set('xm_users', users);
  return true;
}
```

**逻辑流程**：

```
用户提交注册表单
        │
        ▼
从 localStorage 读取已有用户列表
        │
        ▼
检查用户名或邮箱是否已存在
        │
    ┌───┴───┐
    │       │
  已存在   不存在
    │       │
    ▼       ▼
返回 false  添加新用户到列表
            │
            ▼
          保存到 localStorage
            │
            ▼
          返回 true
```

---

## 6.3 navigation.js — 导航管理

| 方法 | 作用 |
|------|------|
| `init()` | 初始化 |
| `highlightActive()` | 高亮当前页面对应的侧边栏项 |
| `renderUser()` | 显示用户名和头像 |
| `bindLogout()` | 绑定退出按钮 |

---

## 6.4 main.js — 全局初始化

这是整个项目的 JavaScript 入口文件，负责全局初始化。

### 完整代码解读

```javascript
'use strict';

// 导入顺序：utils → modules
// 各页面按需引入对应 module，main.js 只做全局初始化

document.addEventListener('DOMContentLoaded', () => {
  // 非登录页执行鉴权和导航初始化
  const currentPath = window.location.pathname;
  const isLoginPage = currentPath.endsWith('login.html') || currentPath.endsWith('register.html');
  
  if (!isLoginPage) {
    auth.guard();  // 权限守卫
    // appNav.init() 在每个页面的 fetch header 回调里执行了
    if (typeof appNav !== 'undefined') appNav.init();
  }

  // 初始化鼠标跟随动效
  initCustomCursor();

  // 监听 DOM 树变化，修正通过 fetch 注入的组件路径
  initPathObserver();
});
```

**执行顺序图**：

```
页面加载完成（DOMContentLoaded）
            │
            ▼
    检查是否是登录/注册页
            │
    ┌───────┴───────┐
    │               │
   是              否
    │               │
    ▼               ▼
跳过权限检查    auth.guard()
                    │
                    ▼
              appNav.init()
                    │
                    ▼
            initCustomCursor()
                    │
                    ▼
            initPathObserver()
```

### initPathObserver — 路径修复器

```javascript
function initPathObserver() {
  function fixComponentPaths() {
    const pathParts = window.location.pathname.split('/');
    const pagesIndex = pathParts.lastIndexOf('pages');
    if (pagesIndex === -1) return;

    const depth = Math.max(0, pathParts.length - pagesIndex - 2);
    const pagesPath = depth > 0 ? '../'.repeat(depth) : '';
    const rootPath = pagesPath + '../';

    // 修复 Header Logo 路径
    const logoImg = document.getElementById('header-logo-img');
    if (logoImg && !logoImg.dataset.fixed) {
      logoImg.style.display = '';
      logoImg.dataset.fixed = '1';
      setTimeout(() => {
        logoImg.src = rootPath + 'assets/images/logo.png';
      }, 0);
    }

    // 修复侧边栏导航路径
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-page]:not([data-fixed])');
    sidebarItems.forEach(item => {
      const targetPage = item.getAttribute('data-page');
      const fixedHref = pagesPath + targetPage;
      item.setAttribute('href', fixedHref);
      item.dataset.fixed = '1';
    });
  }

  const observer = new MutationObserver(fixComponentPaths);
  observer.observe(document.body, { childList: true, subtree: true });
  fixComponentPaths();
}
```

**为什么需要路径修复？**

> 公共组件（header、sidebar）通过 `fetch()` 动态加载。
> 组件内的链接是相对路径，但不同页面层级不同，相对路径需要动态计算。

**MutationObserver 的作用**：

> 监听 DOM 变化，当组件被动态插入时自动修复路径。
> 这样即使组件加载有延迟，路径也能正确修复。

**修复流程图**：

```
页面在 /pages/production/index.html
            │
            ▼
计算路径深度：depth = 2
            │
            ▼
pagesPath = '../../'
rootPath = '../../../'
            │
            ▼
Logo 路径 = '../../../assets/images/logo.png'
侧边栏链接 = '../../production/plan.html'
```

### initCustomCursor — 鼠标跟随动画

```javascript
function initCustomCursor() {
  // 移动端不加载
  if (window.innerWidth <= 768) return;
  
  // 创建圆圈元素
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  // 初始位置（屏幕中心）
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  // 使用 requestAnimationFrame 平滑移动
  function updateCursor() {
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    // 缓动效果：每次只移动距离的 20%
    cursorX += dx * 0.2;
    cursorY += dy * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // 监听鼠标移动
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // 为可点击元素增加 hover 态
  const addHover = () => cursor.classList.add('hover');
  const removeHover = () => cursor.classList.remove('hover');

  const interactives = document.querySelectorAll('a, button, input, .module-card, .founder-card, .product-card, .tech-card, .btn');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', addHover);
    el.addEventListener('mouseleave', removeHover);
  });
}
```

**动画原理**：

```
鼠标位置 (mouseX, mouseY)
            │
            ▼
    计算与圆圈的距离
    dx = mouseX - cursorX
    dy = mouseY - cursorY
            │
            ▼
    圆圈向鼠标移动 20%
    cursorX += dx * 0.2
    cursorY += dy * 0.2
            │
            ▼
    更新圆圈位置
            │
            ▼
    下一帧继续（requestAnimationFrame）
```

**为什么用 `0.2` 缓动系数？**

> 如果直接把圆圈位置设为鼠标位置，会完全同步，没有"跟随"的感觉。
> 每次只移动距离的 20%，会产生平滑的"拖尾"效果。
> 系数越小，拖尾越明显；系数越大，跟随越紧。

**为什么用 `translate3d`？**

> `translate3d` 会触发 GPU 加速，比 `left/top` 性能更好。
> 适合动画场景，避免页面重排。

---

## 6.5 组件动态加载

公共组件通过 JavaScript 动态加载：

```javascript
fetch('../../components/header.html')
    .then(r => r.text())
    .then(html => {
        document.getElementById('header-placeholder').innerHTML = html;
    });
```

**好处**：
- 代码只写一次
- 修改只需改一个文件
- 所有页面自动同步

---

## 6.6 脚本加载顺序

正确的加载顺序非常重要，因为后面的代码依赖前面的代码。

### 加载顺序图

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              脚本加载顺序                                    │
└─────────────────────────────────────────────────────────────────────────────┘

  第一步：工具函数（无依赖）
  ┌─────────────┐
  │ dom.js      │ ◄── DOM 操作函数
  │ storage.js  │ ◄── 数据存储函数
  │ format.js   │ ◄── 格式化函数
  │ validate.js │ ◄── 表单验证函数
  └─────────────┘
        │
        ▼
  第二步：业务模块（依赖工具函数）
  ┌─────────────┐
  │ auth.js     │ ◄── 依赖 storage.js
  │ navigation.js│ ◄── 依赖 dom.js、auth.js
  │ landing.js  │ ◄── 依赖 dom.js
  └─────────────┘
        │
        ▼
  第三步：入口文件（依赖前面所有）
  ┌─────────────┐
  │ main.js     │ ◄── 依赖 auth.js、navigation.js
  └─────────────┘
```

### HTML 中的引入顺序

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

### 依赖关系表

| 文件 | 依赖 | 说明 |
|------|------|------|
| `dom.js` | 无 | 基础工具 |
| `storage.js` | 无 | 基础工具 |
| `format.js` | 无 | 基础工具 |
| `validate.js` | 无 | 基础工具 |
| `auth.js` | `storage.js` | 需要 storage 存储用户信息 |
| `navigation.js` | `dom.js`, `auth.js` | 需要 DOM 操作和用户信息 |
| `landing.js` | `dom.js` | 需要 DOM 操作 |
| `main.js` | `auth.js`, `navigation.js` | 需要调用初始化方法 |

---

## 6.7 landing.js — 落地页效果

落地页有特殊的动画效果，由 `landing.js` 管理。

### 完整代码解读

```javascript
'use strict';

const landing = (function() {
  // 平滑滚动
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // 导航栏滚动效果
  function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });
  }

  // 滚动动画
  function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-card, .tech-card, .product-card').forEach(el => {
      observer.observe(el);
    });
  }

  return {
    init: function() {
      initSmoothScroll();
      initNavbarScroll();
      initAnimations();
    }
  };
})();

document.addEventListener('DOMContentLoaded', function() {
  landing.init();
});
```

### 三种效果详解

#### 1. 平滑滚动

点击导航链接时，页面平滑滚动到对应位置，而不是突然跳转。

```javascript
target.scrollIntoView({ behavior: 'smooth', block: 'start' });
```

| 参数 | 值 | 作用 |
|------|-----|------|
| `behavior` | `'smooth'` | 平滑滚动（而非瞬间跳转） |
| `block` | `'start'` | 目标元素滚动到视口顶部 |

#### 2. 导航栏滚动效果

滚动超过 50 像素后，导航栏添加 `navbar-scrolled` 类，改变样式（如背景色变深）。

```javascript
if (window.scrollY > 50) {
  navbar.classList.add('navbar-scrolled');
} else {
  navbar.classList.remove('navbar-scrolled');
}
```

#### 3. 滚动动画

使用 IntersectionObserver API，当元素进入视口时添加 `fade-in` 类，触发 CSS 动画。

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.1 });  // 元素 10% 可见时触发
```

**IntersectionObserver 原理**：

```
┌─────────────────────────────────────┐
│             浏览器视口               │
│                                     │
│    ┌─────────────────┐              │
│    │   stat-card     │◄── 进入视口  │── 触发回调
│    │   (10% 可见)    │              │    ↓
│    └─────────────────┘              │  添加 fade-in 类
│                                     │    ↓
│    ┌─────────────────┐              │  CSS 动画播放
│    │   tech-card     │◄── 未进入    │
│    └─────────────────┘              │
│                                     │
└─────────────────────────────────────┘
```

---

[上一章：CSS 样式系统](./05-css.md) | [下一章：页面讲解 →](./07-pages.md)
