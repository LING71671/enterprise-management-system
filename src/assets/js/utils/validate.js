'use strict';

const validators = {
  required(value, message = '此项为必填项') {
    return value !== null && value !== undefined && String(value).trim() !== ''
      ? null : message;
  },
  email(value, message = '请输入有效的邮箱地址') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : message;
  },
  phone(value, message = '请输入有效的手机号') {
    return /^1[3-9]\d{9}$/.test(value) ? null : message;
  },
  length(value, min, max, message) {
    const len = String(value).length;
    const msg = message || `长度须在 ${min} 到 ${max} 个字符之间`;
    return len >= min && len <= max ? null : msg;
  },
  range(value, min, max, message) {
    const num = Number(value);
    const msg = message || `数值须在 ${min} 到 ${max} 之间`;
    return num >= min && num <= max ? null : msg;
  }
};

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
