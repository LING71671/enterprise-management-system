'use strict';

function $(selector, context) {
  return (context || document).querySelector(selector);
}

function $$(selector, context) {
  return Array.from((context || document).querySelectorAll(selector));
}

function createElement(tag, className, innerHTML) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}

function on(element, event, handler) {
  if (element) element.addEventListener(event, handler);
}

function delegate(parent, selector, event, handler) {
  on(parent, event, function (e) {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) {
      handler.call(target, e);
    }
  });
}

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
