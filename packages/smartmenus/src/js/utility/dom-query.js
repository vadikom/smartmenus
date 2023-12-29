/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

const Query = {
  get(selector, element = document.documentElement) {
    return element.querySelector(selector)
  },

  getAll(selector, element = document.documentElement) {
    return [...element.querySelectorAll(selector)]
  },

  closest(element, matchFunction) {
    let closest = null

    while (element) {
      if (matchFunction(element)) {
        closest = element
        break
      }

      element = element.parentElement
    }

    return closest
  },

  parentsUntil(element, selector, filter) {
    const parents = []
    let parent = element.parentElement

    while (parent && !parent.matches(selector)) {
      if (!filter || parent.matches(filter)) {
        parents.push(parent)
      }

      parent = parent.parentElement
    }

    return parents
  }
}

export default Query
