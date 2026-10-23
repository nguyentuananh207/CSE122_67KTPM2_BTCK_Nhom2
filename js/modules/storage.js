/**
 * CraftLink – Storage Service
 * Quản lý LocalStorage an toàn với tiền tố nhất quán và các tiện ích CRUD
 */

const STORAGE_PREFIX = "craftlink_";

export const StorageService = {
  get(key) {
    try {
      const data = localStorage.getItem(STORAGE_PREFIX + key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error reading ${key} from localStorage:`, e);
      return null;
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error saving ${key} to localStorage:`, e);
      return false;
    }
  },

  remove(key) {
    localStorage.removeItem(STORAGE_PREFIX + key);
  },

  getList(key, fallback = []) {
    const data = this.get(key);
    return Array.isArray(data) ? data : fallback;
  },

  prepend(key, item) {
    const list = this.getList(key);
    list.unshift(item);
    this.set(key, list);
    return list;
  },

  append(key, item) {
    const list = this.getList(key);
    list.push(item);
    this.set(key, list);
    return list;
  },

  update(key, predicate, updater) {
    const list = this.getList(key);
    const index = list.findIndex(predicate);
    if (index !== -1) {
      list[index] = typeof updater === "function" ? updater(list[index]) : { ...list[index], ...updater };
      this.set(key, list);
      return list[index];
    }
    return null;
  },

  delete(key, predicate) {
    const list = this.getList(key);
    const filtered = list.filter((item) => !predicate(item));
    this.set(key, filtered);
    return filtered;
  }
};
