/**
 * 本地存储工具库
 *
 * 这个文件提供了操作浏览器本地存储的封装函数。
 * 浏览器的本地存储有两种主要方式：
 * 1. localStorage - 永久存储，关闭浏览器后数据还在
 * 2. sessionStorage - 临时存储，关闭标签页后数据消失
 *
 * 学习目标：
 * 1. 理解 localStorage 和 sessionStorage 的区别
 * 2. 掌握数据的存储、读取、删除操作
 * 3. 理解 JSON 序列化和反序列化
 * 4. 学会处理存储错误
 */

'use strict';

/**
 * localStorage 操作对象
 *
 * localStorage 是浏览器提供的一种存储机制，特点：
 * - 存储容量：通常约 5-10 MB
 * - 生命周期：永久保存，除非用户手动清除
 * - 作用域：同源策略限制（相同域名、端口、协议才能访问）
 * - 存储类型：只能存储字符串
 */
const storage = {
  /**
   * 存储数据
   *
   * 作用：将数据保存到 localStorage
   *
   * @param {string} key - 数据的键名（标识符）
   * @param {*} value - 要存储的数据（可以是任何类型）
   *
   * 实现原理：
   * 1. 使用 JSON.stringify() 将数据转换成字符串
   *    - 因为 localStorage 只能存储字符串
   *    - JSON.stringify() 可以把对象、数组等转换成 JSON 字符串
   * 2. 使用 localStorage.setItem() 保存
   *
   * 使用示例：
   *   storage.set('username', '张三');
   *   storage.set('userInfo', { name: '张三', age: 25 });
   *   storage.set('scores', [85, 90, 78]);
   *
   * 错误处理：
   * - 如果存储空间满了会抛出错误
   * - 使用 try-catch 捕获错误并打印到控制台
   */
  set(key, value) {
    try {
      // JSON.stringify(value) 将任意类型的数据转换成 JSON 字符串
      // 例如：{name: '张三'} 变成 '{"name":"张三"}'
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // 如果存储失败（如空间不足），在控制台输出错误
      console.error('Storage set error:', e);
    }
  },

  /**
   * 读取数据
   *
   * 作用：从 localStorage 获取数据
   *
   * @param {string} key - 数据的键名
   * @param {*} [defaultValue=null] - 可选，如果数据不存在返回的默认值
   * @returns {*} 存储的数据，如果不存在返回默认值
   *
   * 实现原理：
   * 1. 使用 localStorage.getItem() 获取字符串
   * 2. 使用 JSON.parse() 将 JSON 字符串转回原始数据类型
   *
   * 使用示例：
   *   const username = storage.get('username');           // '张三'
   *   const userInfo = storage.get('userInfo');           // { name: '张三', age: 25 }
   *   const notExist = storage.get('notExist', '默认值');  // '默认值'
   *
   * 错误处理：
   * - 如果存储的数据不是有效的 JSON，返回 null
   * - 使用 try-catch 捕获解析错误
   */
  get(key, defaultValue = null) {
    try {
      // 从 localStorage 获取字符串
      const item = localStorage.getItem(key);

      // 如果 item 是 null（表示没有这个键），返回默认值
      if (item === null) return defaultValue;

      // JSON.parse(item) 将 JSON 字符串转回原始数据
      // 例如：'{"name":"张三"}' 变成 {name: '张三'}
      return JSON.parse(item);
    } catch (e) {
      // 如果解析失败（数据损坏），返回 null
      console.error('Storage get error:', e);
      return null;
    }
  },

  /**
   * 删除数据
   *
   * 作用：从 localStorage 删除指定的数据
   *
   * @param {string} key - 要删除的数据键名
   *
   * 使用示例：
   *   storage.remove('username');  // 删除 username 这个数据
   */
  remove(key) {
    localStorage.removeItem(key);
  },

  /**
   * 清空所有数据
   *
   * 作用：删除 localStorage 中的所有数据（慎用！）
   *
   * 使用示例：
   *   storage.clear();  // 清空所有存储的数据
   */
  clear() {
    localStorage.clear();
  },

  /**
   * sessionStorage 操作对象
   *
   * sessionStorage 与 localStorage 类似，但生命周期不同：
   * - 数据只在当前浏览器标签页有效
   * - 关闭标签页后数据自动清除
   * - 刷新页面数据不会丢失
   *
   * 适用场景：
   * - 临时表单数据
   * - 页面间的临时传递数据
   * - 不需要长期保存的信息
   */
  session: {
    /**
     * 存储临时数据
     *
     * @param {string} key - 数据的键名
     * @param {*} value - 要存储的数据
     *
     * 使用示例：
     *   storage.session.set('tempData', { step: 1 });
     */
    set(key, value) {
      try {
        // 使用 sessionStorage 而不是 localStorage
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error('Session storage set error:', e);
      }
    },

    /**
     * 读取临时数据
     *
     * @param {string} key - 数据的键名
     * @param {*} [defaultValue=null] - 可选，默认值
     * @returns {*} 存储的数据
     *
     * 使用示例：
     *   const tempData = storage.session.get('tempData');
     */
    get(key, defaultValue = null) {
      try {
        const item = sessionStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
      } catch (e) {
        console.error('Session storage get error:', e);
        return null;
      }
    },

    /**
     * 删除临时数据
     *
     * @param {string} key - 要删除的数据键名
     */
    remove(key) {
      sessionStorage.removeItem(key);
    },

    /**
     * 清空所有临时数据
     */
    clear() {
      sessionStorage.clear();
    }
  }
};
