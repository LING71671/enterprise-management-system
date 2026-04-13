/**
 * 数据格式化工具库
 *
 * 这个文件提供了各种数据格式化的工具函数。
 * 格式化是指将原始数据转换成适合显示的格式，例如：
 * - 将日期对象转换成 "2024年1月15日" 这样的字符串
 * - 将数字 1234567 转换成 "1,234,567" 这样带千位分隔符的格式
 * - 将金额转换成 "¥1,234.56" 这样的货币格式
 *
 * 学习目标：
 * 1. 理解日期格式化的占位符含义
 * 2. 掌握数字本地化的概念
 * 3. 学会处理货币格式化
 * 4. 理解百分比计算和格式化
 */

'use strict';

/**
 * 日期格式化函数
 *
 * 作用：将 Date 对象或日期字符串转换成指定格式的字符串
 *
 * @param {Date|string|number} date - 要格式化的日期
 *   - Date 对象：new Date()
 *   - 字符串：'2024-01-15' 或 '2024/01/15'
 *   - 数字：时间戳（毫秒数）
 * @param {string} [format='yyyy-MM-dd'] - 格式化模板，默认 'yyyy-MM-dd'
 * @returns {string} 格式化后的日期字符串
 *
 * 格式化占位符说明：
 *   yyyy - 四位年份，如 2024
 *   MM   - 两位月份，01-12
 *   dd   - 两位日期，01-31
 *   HH   - 两位小时（24小时制），00-23
 *   mm   - 两位分钟，00-59
 *   ss   - 两位秒数，00-59
 *
 * 使用示例：
 *   const now = new Date();  // 假设当前是 2024年1月15日
 *
 *   formatDate(now);                          // '2024-01-15'
 *   formatDate(now, 'yyyy年MM月dd日');         // '2024年01月15日'
 *   formatDate(now, 'yyyy/MM/dd HH:mm');      // '2024/01/15 14:30'
 *   formatDate('2024-01-15', 'MM-dd');        // '01-15'
 *
 * 实现原理：
 * 1. 首先将输入转换成 Date 对象
 * 2. 然后使用正则表达式替换占位符为实际的日期值
 * 3. padStart(2, '0') 确保月份、日期等都是两位数
 */
function formatDate(date, format = 'yyyy-MM-dd') {
  // 将输入转换成 Date 对象
  // 如果输入已经是 Date 对象，就使用它
  // 否则用 new Date(date) 转换（可以处理字符串和数字时间戳）
  const d = date instanceof Date ? date : new Date(date);

  // 检查日期是否有效
  // isNaN(d.getTime()) 返回 true 表示日期无效
  if (isNaN(d.getTime())) return '';

  // 获取日期的各个部分
  const year = d.getFullYear();    // 获取四位年份，如 2024
  const month = d.getMonth() + 1;  // 获取月份（0-11），所以要加 1
  const day = d.getDate();         // 获取日期（1-31）
  const hours = d.getHours();      // 获取小时（0-23）
  const minutes = d.getMinutes();  // 获取分钟（0-59）
  const seconds = d.getSeconds();  // 获取秒数（0-59）

  // 使用对象存储格式映射
  // 键是占位符，值是格式化后的实际值
  const formatMap = {
    'yyyy': String(year),                          // 年份直接转字符串
    'MM': String(month).padStart(2, '0'),          // 月份补零成两位
    'dd': String(day).padStart(2, '0'),            // 日期补零成两位
    'HH': String(hours).padStart(2, '0'),          // 小时补零成两位
    'mm': String(minutes).padStart(2, '0'),        // 分钟补零成两位
    'ss': String(seconds).padStart(2, '0')         // 秒数补零成两位
  };

  // 使用正则表达式替换占位符
  // Object.keys(formatMap) 获取所有占位符 ['yyyy', 'MM', 'dd', ...]
  // join('|') 用 | 连接成正则表达式，如 'yyyy|MM|dd|HH|mm|ss'
  // new RegExp() 创建正则表达式，g 标志表示全局匹配（替换所有）
  // replace() 的第二个参数是函数，match 是匹配到的占位符
  return format.replace(
    new RegExp(Object.keys(formatMap).join('|'), 'g'),
    match => formatMap[match]
  );
}

/**
 * 数字格式化函数（带千位分隔符）
 *
 * 作用：将数字转换成带千位分隔符的字符串，便于阅读
 *
 * @param {number} num - 要格式化的数字
 * @param {number} [decimals=0] - 保留的小数位数，默认 0
 * @returns {string} 格式化后的数字字符串
 *
 * 使用示例：
 *   formatNumber(1234567);           // '1,234,567'
 *   formatNumber(1234567.89);        // '1,234,568'（默认四舍五入到整数）
 *   formatNumber(1234567.89, 2);     // '1,234,567.89'（保留两位小数）
 *   formatNumber(1234.5, 2);         // '1,234.50'（不足两位补零）
 *
 * 实现原理：
 * 使用 Intl.NumberFormat 对象，它是 JavaScript 内置的国际化数字格式化工具
 * - 'zh-CN' 表示使用中文地区的格式
 * - minimumFractionDigits 和 maximumFractionDigits 控制小数位数
 */
function formatNumber(num, decimals = 0) {
  // 将输入转换成数字类型
  const number = Number(num);

  // 检查是否是有效数字
  // isNaN() 返回 true 表示不是数字
  if (isNaN(number)) return '';

  // 创建数字格式化器
  // Intl.NumberFormat 是 JavaScript 的国际化 API
  const formatter = new Intl.NumberFormat('zh-CN', {
    minimumFractionDigits: decimals,  // 最少小数位数
    maximumFractionDigits: decimals   // 最多小数位数
  });

  // 格式化数字
  return formatter.format(number);
}

/**
 * 货币格式化函数
 *
 * 作用：将数字格式化成货币形式，如 ¥1,234.56
 *
 * @param {number} amount - 要格式化的金额
 * @param {string} [currency='CNY'] - 货币代码，默认 'CNY'（人民币）
 * @returns {string} 格式化后的货币字符串
 *
 * 常见货币代码：
 *   CNY - 人民币（¥）
 *   USD - 美元（$）
 *   EUR - 欧元（€）
 *   JPY - 日元（¥）
 *   GBP - 英镑（£）
 *
 * 使用示例：
 *   formatMoney(1234.5);             // '¥1,234.50'
 *   formatMoney(1234.5, 'USD');      // '$1,234.50'
 *   formatMoney(1234.5, 'EUR');      // '€1,234.50'
 *   formatMoney(0);                  // '¥0.00'
 *
 * 实现原理：
 * 使用 Intl.NumberFormat 的货币格式化功能
 * style: 'currency' 表示格式化为货币
 * currency 指定货币代码
 */
function formatMoney(amount, currency = 'CNY') {
  // 将输入转换成数字
  const num = Number(amount);

  // 检查是否是有效数字
  if (isNaN(num)) return '';

  // 创建货币格式化器
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',    // 格式化为货币
    currency: currency    // 指定货币类型
  });

  return formatter.format(num);
}

/**
 * 百分比格式化函数
 *
 * 作用：将小数转换成百分比形式
 *
 * @param {number} value - 要格式化的数值（0.5 表示 50%）
 * @param {number} [decimals=0] - 保留的小数位数，默认 0
 * @returns {string} 格式化后的百分比字符串
 *
 * 使用示例：
 *   formatPercent(0.5);              // '50%'
 *   formatPercent(0.5, 1);           // '50.0%'
 *   formatPercent(0.1234, 2);        // '12.34%'
 *   formatPercent(1);                // '100%'
 *   formatPercent(0);                // '0%'
 *
 * 实现原理：
 * 1. 将数值乘以 100（0.5 -> 50）
 * 2. 使用 Intl.NumberFormat 格式化数字
 * 3. 添加 % 符号
 */
function formatPercent(value, decimals = 0) {
  // 将输入转换成数字
  const num = Number(value);

  // 检查是否是有效数字
  if (isNaN(num)) return '';

  // 创建百分比格式化器
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'percent',              // 格式化为百分比
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return formatter.format(num);
}
