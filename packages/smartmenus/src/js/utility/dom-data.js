/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

const storage = new WeakMap()

const Data = {
  set(element, key, value) {
    if (!storage.has(element)) {
      storage.set(element, new Map())
    }

    storage.get(element).set(key, value)
  },

  get(element, key) {
    return storage.has(element) ? (storage.get(element).get(key) || null) : null
  },

  delete(element, key) {
    if (storage.has(element)) {
      return storage.get(element).delete(key)
    }

    return false
  }
}

export default Data
