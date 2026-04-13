/**
 * 表单验证工具库
 *
 * 这个文件提供了一系列用于验证用户输入的工具函数。
 * 表单验证是 Web 开发中非常重要的一环，它可以：
 * 1. 确保用户输入的数据符合要求
 * 2. 在数据发送到服务器之前进行检查
 * 3. 给用户及时的错误提示，提升用户体验
 *
 * 学习目标：
 * 1. 理解什么是表单验证
 * 2. 掌握常用的验证规则（必填、邮箱、手机号等）
 * 3. 理解正则表达式的基本用法
 * 4. 学会组织验证逻辑
 */

'use strict';

/**
 * 验证器对象
 *
 * 这是一个包含各种验证规则的对象。
 * 每个验证规则都是一个函数，接收要验证的值，返回错误信息或 null。
 * 返回 null 表示验证通过，返回字符串表示验证失败，字符串就是错误信息。
 */
const validators = {
  /**
   * 必填验证
   *
   * 作用：检查用户是否填写了某个字段
   *
   * @param {*} value - 要验证的值（可以是任何类型）
   * @param {string} [message='此项为必填项'] - 验证失败时显示的错误信息
   * @returns {string|null} 验证失败返回错误信息，通过返回 null
   *
   * 验证逻辑：
   * 1. 值不能是 null
   * 2. 值不能是 undefined
   * 3. 转换成字符串后去掉首尾空格，不能是空字符串
   *
   * 使用示例：
   *   const error = validators.required('');           // 返回 '此项为必填项'
   *   const error = validators.required('  ');         // 返回 '此项为必填项'（空格也算空）
   *   const error = validators.required('张三');       // 返回 null（验证通过）
   *   const error = validators.required(null);         // 返回 '此项为必填项'
   */
  required(value, message = '此项为必填项') {
    // 检查三个条件：不是 null、不是 undefined、去掉空格后不是空字符串
    // String(value) 将值转换成字符串（防止数字等非字符串类型）
    // .trim() 去掉字符串首尾的空格
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null  // 验证通过，返回 null
      : message;  // 验证失败，返回错误信息
  },

  /**
   * 邮箱格式验证
   *
   * 作用：检查输入的字符串是否符合邮箱格式
   *
   * @param {string} value - 要验证的邮箱地址
   * @param {string} [message='请输入有效的邮箱地址'] - 验证失败时显示的错误信息
   * @returns {string|null} 验证失败返回错误信息，通过返回 null
   *
   * 正则表达式解释：
   * ^         - 表示字符串的开始
   * [^\s@]+   - 一个或多个非空格、非 @ 的字符（邮箱用户名部分）
   * @         - 字面意义的 @ 符号
   * [^\s@]+   - 一个或多个非空格、非 @ 的字符（域名部分）
   * \.        - 字面意义的点号（需要用 \ 转义）
   * [^\s@]+   - 一个或多个非空格、非 @ 的字符（顶级域名部分）
   * $         - 表示字符串的结束
   *
   * 使用示例：
   *   const error = validators.email('abc');           // 返回错误信息
   *   const error = validators.email('abc@');          // 返回错误信息
   *   const error = validators.email('abc@example');   // 返回错误信息（缺少点）
   *   const error = validators.email('abc@example.com'); // 返回 null（验证通过）
   */
  email(value, message = '请输入有效的邮箱地址') {
    // 正则表达式测试字符串
    // test() 方法返回 true 或 false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },

  /**
   * 手机号格式验证（中国大陆）
   *
   * 作用：检查输入的字符串是否符合中国大陆手机号格式
   *
   * @param {string} value - 要验证的手机号
   * @param {string} [message='请输入有效的手机号'] - 验证失败时显示的错误信息
   * @returns {string|null} 验证失败返回错误信息，通过返回 null
   *
   * 正则表达式解释：
   * ^         - 字符串开始
   * 1         - 必须以 1 开头
   * [3-9]     - 第二位是 3 到 9 之间的数字
   * \d{9}     - 后面跟着 9 位数字（\d 表示数字，{9} 表示重复 9 次）
   * $         - 字符串结束
   * 总共 11 位数字
   *
   * 使用示例：
   *   const error = validators.phone('12345678901');   // 返回错误信息（第二位是2）
   *   const error = validators.phone('13800138000');   // 返回 null（验证通过）
   *   const error = validators.phone('1380013800');    // 返回错误信息（10位）
   */
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },

  /**
   * 长度范围验证
   *
   * 作用：检查字符串的长度是否在指定范围内
   *
   * @param {string} value - 要验证的字符串
   * @param {number} min - 最小长度（包含）
   * @param {number} max - 最大长度（包含）
   * @param {string} [message] - 可选，自定义错误信息
   * @returns {string|null} 验证失败返回错误信息，通过返回 null
   *
   * 使用示例：
   *   const error = validators.length('abc', 5, 10);   // 返回错误信息（太短）
   *   const error = validators.length('abcdef', 5, 10); // 返回 null（验证通过）
   *   const error = validators.length('abcdefghijk', 5, 10); // 返回错误信息（太长）
   */
  length(value, min, max, message) {
    // 获取字符串长度
    const len = String(value).length;
    // 如果没有提供自定义错误信息，就生成默认的
    const msg = message || `长度须在 ${min} 到 ${max} 个字符之间`;
    // 检查长度是否在范围内
    return len >= min && len <= max ? null : msg;
  },

  /**
   * 数值范围验证
   *
   * 作用：检查数字是否在指定范围内
   *
   * @param {number} value - 要验证的数字
   * @param {number} min - 最小值（包含）
   * @param {number} max - 最大值（包含）
   * @param {string} [message] - 可选，自定义错误信息
   * @returns {string|null} 验证失败返回错误信息，通过返回 null
   *
   * 使用示例：
   *   const error = validators.range(5, 10, 100);      // 返回错误信息（太小）
   *   const error = validators.range(50, 10, 100);     // 返回 null（验证通过）
   *   const error = validators.range(200, 10, 100);    // 返回错误信息（太大）
   */
  range(value, min, max, message) {
    // 将值转换成数字
    const num = Number(value);
    // 生成错误信息
    const msg = message || `数值须在 ${min} 到 ${max} 之间`;
    // 检查是否在范围内
    return num >= min && num <= max ? null : msg;
  }
};

/**
 * 表单整体验证函数
 *
 * 作用：一次性验证表单中的多个字段
 *
 * @param {Object} formData - 表单数据对象，格式如：{ 字段名: 字段值 }
 * @param {Object} rules - 验证规则对象，格式如：{ 字段名: [验证函数数组] }
 * @returns {Object|null} 如果有错误返回错误对象，没有错误返回 null
 *
 * 返回的错误对象格式：
 *   {
 *     字段名1: '错误信息1',
 *     字段名2: '错误信息2'
 *   }
 *
 * 使用示例：
 *   const formData = {
 *     name: '张三',
 *     email: 'zhangsan@example.com',
 *     age: 25
 *   };
 *
 *   const rules = {
 *     name: [v => validators.required(v)],
 *     email: [v => validators.required(v), v => validators.email(v)],
 *     age: [v => validators.range(v, 18, 60)]
 *   };
 *
 *   const errors = validateForm(formData, rules);
 *   if (errors) {
 *     console.log('验证失败：', errors);
 *   } else {
 *     console.log('验证通过！');
 *   }
 */
function validateForm(formData, rules) {
  // 创建一个空对象来存储错误信息
  const errors = {};

  // 遍历规则对象中的每个字段
  // for...in 循环遍历对象的所有属性名
  for (const field in rules) {
    // 获取该字段的所有验证规则（是一个数组）
    const fieldRules = rules[field];

    // 遍历该字段的所有验证规则
    for (const rule of fieldRules) {
      // 执行验证规则函数，传入表单中对应字段的值
      const error = rule(formData[field]);

      // 如果返回了错误信息（不是 null）
      if (error) {
        // 将错误信息记录到 errors 对象中
        errors[field] = error;
        // 跳出内层循环，该字段的其他验证规则不再执行
        // （一个字段有一个错误就够了）
        break;
      }
    }
  }

  // 检查 errors 对象是否为空
  // Object.keys(errors) 返回 errors 对象所有属性名组成的数组
  // .length === 0 表示没有属性，即没有错误
  return Object.keys(errors).length === 0 ? null : errors;
}
