'use strict';

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

function formatNumber(num, decimals = 0) {
  return Number(num).toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatMoney(amount, currency = '¥') {
  return currency + formatNumber(amount, 2);
}

function formatPercent(value, decimals = 1) {
  return (Number(value) * 100).toFixed(decimals) + '%';
}
