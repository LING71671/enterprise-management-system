'use strict';

// 定价促销页逻辑
fetch('../../components/header.html').then(r => r.text()).then(html => {
  document.getElementById('header-placeholder').innerHTML = html;
  appNav.init();
});

fetch('../../components/sidebar.html').then(r => r.text()).then(html => {
  document.getElementById('sidebar-placeholder').innerHTML = html;
});

// 渲染表格 - 使用 DOM API 避免 XSS
function renderTable() {
  const tbody = document.getElementById('pricing-tbody');
  tbody.innerHTML = '';

  salesData.pricing.forEach(p => {
    const tr = document.createElement('tr');

    const tdId = document.createElement('td');
    tdId.textContent = p.id;
    tr.appendChild(tdId);

    const tdProduct = document.createElement('td');
    const strong = document.createElement('strong');
    strong.textContent = p.product;
    tdProduct.appendChild(strong);
    tr.appendChild(tdProduct);

    const tdStandardPrice = document.createElement('td');
    tdStandardPrice.textContent = formatMoney(p.standardPrice);
    tr.appendChild(tdStandardPrice);

    const tdCurrentPrice = document.createElement('td');
    const priceStrong = document.createElement('strong');
    priceStrong.style.color = 'var(--color-primary)';
    priceStrong.textContent = formatMoney(p.currentPrice);
    tdCurrentPrice.appendChild(priceStrong);
    tr.appendChild(tdCurrentPrice);

    const tdDiscount = document.createElement('td');
    if (p.discount < 1) {
      const badge = document.createElement('span');
      badge.className = 'badge badge-warning';
      badge.textContent = (p.discount * 10).toFixed(1) + '折';
      tdDiscount.appendChild(badge);
    } else {
      tdDiscount.textContent = '—';
    }
    tr.appendChild(tdDiscount);

    const tdValidPeriod = document.createElement('td');
    tdValidPeriod.textContent = p.validFrom + ' ~ ' + p.validTo;
    tr.appendChild(tdValidPeriod);

    const tdStatus = document.createElement('td');
    const statusBadge = document.createElement('span');
    statusBadge.className = 'badge badge-success';
    statusBadge.textContent = p.status;
    tdStatus.appendChild(statusBadge);
    tr.appendChild(tdStatus);

    tbody.appendChild(tr);
  });
}

document.getElementById('add-btn').onclick = () => alert('新增定价功能待实现');

renderTable();
