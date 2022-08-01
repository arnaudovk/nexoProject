class Cache {
  #id = 0;
  #isFirstRequest = true;
  constructor() {
    this.cache = {};
  }

  setCacheData(cacheData) {
    if (cacheData) {
      for (const key in this.cache) {
        delete this.cache[key];
      }
      Object.keys(cacheData).forEach((key) => {
        if (cacheData[key] === null) {
          delete cacheData[key];
        }
      });

      Object.assign(this.cache, cacheData);
    }
  }

  getCacheData() {
    return Object.freeze({ ...this.cache });
  }

  getId() {
    return this.#id;
  }

  getIsFirstRequest() {
    return this.#isFirstRequest;
  }

  setId(id) {
    this.#id = id;
  }

  setIsFirstRequest() {
    return (this.#isFirstRequest = false);
  }

  getValue(key) {
    return this.cache[key];
  }

  findKey(key) {
    return Object.keys(this.cache).find((cacheKey) => cacheKey === key);
  }

  getKeyByValue(value) {
    return Object.keys(this.cache).find((key) => this.cache[key] === value);
  }

  setKeyValuePair(key, value) {
    if (key && value) {
      this.cache[key] = value;
    }
  }

  deleteKeyValuePair(key) {
    if (key) {
      delete this.cache[key];
    }
  }

  isEmpty() {
    return Object.keys(this.cache).length === 0;
  }
}

module.exports = Cache;
