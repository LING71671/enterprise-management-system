'use strict';

const storage = {
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
