'use strict';

// 登录、注册和业务表单共用的轻量校验器。
const validators = {
  // 校验必填字段。
  required(value, message = '此项为必填项') {
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null : message;
  },
  // 校验注册页和员工档案中的邮箱字段。
  email(value, message = '请输入有效的邮箱地址') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },
  // 校验客户、供应商、员工档案中的手机号字段。
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },
  // 校验文本字段长度。
  length(value, min, max, message) {
    const len = String(value).length;
    const msg = message || `长度须在 ${min} 到 ${max} 个字符之间`;
    return len >= min && len <= max ? null : msg;
  },
  // 校验数值字段范围。
  range(value, min, max, message) {
    const num = Number(value);
    const msg = message || `数值须在 ${min} 到 ${max} 之间`;
    return num >= min && num <= max ? null : msg;
  }
};

// 按字段规则批量校验表单，并返回字段级错误信息。
function validateForm(formData, rules) {
  const errors = {};
  for (const field in rules) {
    for (const rule of rules[field]) {
      const error = rule(formData[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  }
  return Object.keys(errors).length === 0 ? null : errors;
}
