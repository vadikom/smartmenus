/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

const Helpers = {
  getComputedStyle(element) {
    return Helpers.getWindow(element).getComputedStyle(element)
  },

  getDocument(element) {
    return (element && element.ownerDocument) || window.document
  },

  getHeight(element) {
    return Helpers._getDimensions(element, true)
  },

  getViewportHeight(element) {
    return Helpers._getViewportDimensions(element, true)
  },

  getViewportWidth(element) {
    return Helpers._getViewportDimensions(element)
  },

  getWidth(element) {
    return Helpers._getDimensions(element)
  },

  getWindow(element) {
    const ownerDocument = element && element.ownerDocument
    return (ownerDocument && ownerDocument.defaultView) || window
  },

  _getDimensions(element, height) {
    const elementStyle = element.style
    let oldStyle = null
    if (Helpers.getComputedStyle(element).display === 'none') {
      oldStyle = { position: elementStyle.position, visibility: elementStyle.visibility, display: elementStyle.display }
      elementStyle.position = 'absolute'
      elementStyle.visibility = 'hidden'
      elementStyle.display = 'block'
    }

    const value = element.getBoundingClientRect()[height ? 'height' : 'width']
    if (oldStyle) {
      elementStyle.display = oldStyle.display
      elementStyle.position = oldStyle.position
      elementStyle.visibility = oldStyle.visibility
    }

    return value
  },

  _getViewportDimensions(element, height) {
    const _window = Helpers.getWindow(element)
    const { visualViewport } = _window
    if (visualViewport) {
      return visualViewport[height ? 'height' : 'width']
    }

    const _document = Helpers.getDocument(element)
    const name = height ? 'Height' : 'Width'
    const value = _document.documentElement[`client${name}`]
    const value2 = _window[`inner${name}`]
    return value2 ? Math.min(value, value2) : value
  }
}

export default Helpers
