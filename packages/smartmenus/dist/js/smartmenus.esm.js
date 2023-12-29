/*!
 * SmartMenus 2.0.0-alpha.1 - Dec 29, 2023
 * https://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. https://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function () {};
      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

var storage = new WeakMap();
var Data = {
  set: function set(element, key, value) {
    if (!storage.has(element)) {
      storage.set(element, new Map());
    }
    storage.get(element).set(key, value);
  },
  get: function get(element, key) {
    return storage.has(element) ? storage.get(element).get(key) || null : null;
  },
  delete: function _delete(element, key) {
    if (storage.has(element)) {
      return storage.get(element).delete(key);
    }
    return false;
  }
};

var DATA_KEY = 'sm-events';
function normalizeArguments(events, selector, handler) {
  if (!handler && typeof selector === 'function') {
    handler = selector;
    selector = '';
  }
  if (!events || typeof events === 'string') {
    var _eventsObject = {};
    _eventsObject[events || ''] = handler;
    events = _eventsObject;
  }
  if (!selector) {
    selector = '';
  }

  // Support space separated events
  var eventsObject = {};
  for (var _i = 0, _Object$keys = Object.keys(events); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    var _iterator = _createForOfIteratorHelper(key.split(' ')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var event = _step.value;
        eventsObject[event] = events[key];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  events = eventsObject;
  return [events, selector];
}
function parseEventNameAndNS(value) {
  var eventNameAndNS = value.split('.');
  return [eventNameAndNS[0], eventNameAndNS[1] || ''];
}
var Events = {
  // Add a namespace to multiple events
  getEventsNS: function getEventsNS(events) {
    var ns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var eventsNS = {};
    for (var _i2 = 0, _Object$keys2 = Object.keys(events); _i2 < _Object$keys2.length; _i2++) {
      var key = _Object$keys2[_i2];
      eventsNS[key.split(' ').join("".concat(ns, " ")) + ns] = events[key];
    }
    return eventsNS;
  },
  off: function off(element, events, selector, handler) {
    var storage = Data.get(element, DATA_KEY);
    if (!storage) {
      return;
    }
    var _normalizeArguments = normalizeArguments(events, selector, handler);
    var _normalizeArguments2 = _slicedToArray(_normalizeArguments, 2);
    events = _normalizeArguments2[0];
    selector = _normalizeArguments2[1];
    var _loop = function _loop() {
      var key = _Object$keys3[_i3];
      var handler = events[key];
      if (handler && !storage.has(handler)) {
        return {
          v: void 0
        };
      }
      var _parseEventNameAndNS = parseEventNameAndNS(key),
        _parseEventNameAndNS2 = _slicedToArray(_parseEventNameAndNS, 2),
        eventName = _parseEventNameAndNS2[0],
        eventNS = _parseEventNameAndNS2[1];
      var handlersToDelete = [];
      var handlersStorage = handler ? new Map().set(handler, storage.get(handler)) : storage;
      var _iterator2 = _createForOfIteratorHelper(handlersStorage),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
            _handler2 = _step2$value[0],
            handlerStorage = _step2$value[1];
          handlerStorage.eventHandlers = handlerStorage.eventHandlers.filter(function (eventHandler) {
            var keep = false;
            if (eventName) {
              keep = !(eventName === eventHandler.eventName && (!eventNS || eventNS === eventHandler.eventNS) && (!selector || selector === eventHandler.selector));
            } else if (eventNS) {
              keep = !(eventNS === eventHandler.eventNS && (!selector || selector === eventHandler.selector));
            } else if (selector) {
              keep = selector !== eventHandler.selector;
            }
            if (!keep) {
              element.removeEventListener(eventHandler.eventName, eventHandler.realHandler, Boolean(eventHandler.selector));
            }
            return keep;
          });
          if (handlerStorage.eventHandlers.length === 0) {
            handlersToDelete.push(_handler2);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      for (var _i4 = 0, _handlersToDelete = handlersToDelete; _i4 < _handlersToDelete.length; _i4++) {
        var _handler = _handlersToDelete[_i4];
        storage.delete(_handler);
      }
    };
    for (var _i3 = 0, _Object$keys3 = Object.keys(events); _i3 < _Object$keys3.length; _i3++) {
      var _ret = _loop();
      if (_typeof(_ret) === "object") return _ret.v;
    }
  },
  on: function on(element, events, selector, handler) {
    var storage = Data.get(element, DATA_KEY);
    if (!storage) {
      storage = new Map();
      Data.set(element, DATA_KEY, storage);
    }
    var _normalizeArguments3 = normalizeArguments(events, selector, handler);
    var _normalizeArguments4 = _slicedToArray(_normalizeArguments3, 2);
    events = _normalizeArguments4[0];
    selector = _normalizeArguments4[1];
    var _loop2 = function _loop2() {
      var key = _Object$keys4[_i5];
      var handler = events[key];
      var _parseEventNameAndNS3 = parseEventNameAndNS(key),
        _parseEventNameAndNS4 = _slicedToArray(_parseEventNameAndNS3, 2),
        eventName = _parseEventNameAndNS4[0],
        eventNS = _parseEventNameAndNS4[1];
      var realHandler = selector ? /^mouse(enter|leave)$/.test(eventName) ? function (event) {
        var target = event.target;
        if (target && target.matches && target.matches(selector) && element.contains(target)) {
          handler.call(target, event, target);
        }
      } : function (event) {
        var target = event.target;
        var closest = target && target.closest && target.closest(selector);
        if (closest && element.contains(closest)) {
          handler.call(closest, event, closest);
        }
      } : function (event) {
        handler.call(element, event, element);
      };
      if (!storage.has(handler)) {
        storage.set(handler, {
          eventHandlers: []
        });
      }
      var handlerStorage = storage.get(handler);
      handlerStorage.eventHandlers.push({
        eventName: eventName,
        eventNS: eventNS,
        selector: selector,
        realHandler: realHandler
      });
      element.addEventListener(eventName, realHandler, Boolean(selector));
    };
    for (var _i5 = 0, _Object$keys4 = Object.keys(events); _i5 < _Object$keys4.length; _i5++) {
      _loop2();
    }
  },
  trigger: function trigger(element, eventName, data) {
    var event = new CustomEvent(eventName, {
      bubbles: true,
      cancelable: true,
      detail: data || null
    });
    element.dispatchEvent(event);
    return event;
  }
};

/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

var Helpers = {
  getComputedStyle: function getComputedStyle(element) {
    return Helpers.getWindow(element).getComputedStyle(element);
  },
  getDocument: function getDocument(element) {
    return element && element.ownerDocument || window.document;
  },
  getHeight: function getHeight(element) {
    return Helpers._getDimensions(element, true);
  },
  getViewportHeight: function getViewportHeight(element) {
    return Helpers._getViewportDimensions(element, true);
  },
  getViewportWidth: function getViewportWidth(element) {
    return Helpers._getViewportDimensions(element);
  },
  getWidth: function getWidth(element) {
    return Helpers._getDimensions(element);
  },
  getWindow: function getWindow(element) {
    var ownerDocument = element && element.ownerDocument;
    return ownerDocument && ownerDocument.defaultView || window;
  },
  _getDimensions: function _getDimensions(element, height) {
    var elementStyle = element.style;
    var oldStyle = null;
    if (Helpers.getComputedStyle(element).display === 'none') {
      oldStyle = {
        position: elementStyle.position,
        visibility: elementStyle.visibility,
        display: elementStyle.display
      };
      elementStyle.position = 'absolute';
      elementStyle.visibility = 'hidden';
      elementStyle.display = 'block';
    }
    var value = element.getBoundingClientRect()[height ? 'height' : 'width'];
    if (oldStyle) {
      elementStyle.display = oldStyle.display;
      elementStyle.position = oldStyle.position;
      elementStyle.visibility = oldStyle.visibility;
    }
    return value;
  },
  _getViewportDimensions: function _getViewportDimensions(element, height) {
    var _window = Helpers.getWindow(element);
    var visualViewport = _window.visualViewport;
    if (visualViewport) {
      return visualViewport[height ? 'height' : 'width'];
    }
    var _document = Helpers.getDocument(element);
    var name = height ? 'Height' : 'Width';
    var value = _document.documentElement["client".concat(name)];
    var value2 = _window["inner".concat(name)];
    return value2 ? Math.min(value, value2) : value;
  }
};

/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

var Query = {
  get: function get(selector) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return element.querySelector(selector);
  },
  getAll: function getAll(selector) {
    var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.documentElement;
    return _toConsumableArray(element.querySelectorAll(selector));
  },
  closest: function closest(element, matchFunction) {
    var closest = null;
    while (element) {
      if (matchFunction(element)) {
        closest = element;
        break;
      }
      element = element.parentElement;
    }
    return closest;
  },
  parentsUntil: function parentsUntil(element, selector, filter) {
    var parents = [];
    var parent = element.parentElement;
    while (parent && !parent.matches(selector)) {
      if (!filter || parent.matches(filter)) {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
};

/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */
var DATA_KEY$1 = 'sm-mouse';
var EVENTS_NS = ".".concat(DATA_KEY$1);
var supportMouseInput; // true/false when detection is enabled, undefined when detection is disabled
var supportPointerEvents = typeof window === 'undefined' ? false : Boolean(window.PointerEvent);
var MouseInputDetect = {
  get supportMouseInput() {
    return supportMouseInput;
  },
  disable: function disable() {
    if (supportMouseInput !== undefined) {
      Events.off(document, EVENTS_NS);
      supportMouseInput = undefined;
    }
  },
  enable: function enable(callbackOnFirstDetection) {
    if (supportMouseInput === undefined) {
      supportMouseInput = false;
      // If we get two consecutive mousemoves within 4 pixels from each other and within 300ms, we assume a real mouse/cursor is present
      // in practice, this seems like impossible to trick unintentianally with a real mouse and a pretty safe detection on touch devices (even with older browsers that do not support touch events)
      var isFirstDetection = true;
      var lastMove = null;
      var events = {
        mousemove: function mousemove(event) {
          var thisMove = {
            x: event.pageX,
            y: event.pageY,
            timeStamp: Date.now()
          };
          if (lastMove) {
            var deltaX = Math.abs(lastMove.x - thisMove.x);
            var deltaY = Math.abs(lastMove.y - thisMove.y);
            if ((deltaX > 0 || deltaY > 0) && deltaX <= 4 && deltaY <= 4 && thisMove.timeStamp - lastMove.timeStamp <= 300) {
              supportMouseInput = true;
              if (isFirstDetection) {
                if (callbackOnFirstDetection) {
                  callbackOnFirstDetection(event);
                }
                isFirstDetection = false;
              }
            }
          }
          lastMove = thisMove;
        }
      };
      events[supportPointerEvents ? 'pointerover pointermove pointerout' : 'touchstart'] = function (event) {
        if (!/^(4|mouse)$/.test(event.pointerType)) {
          supportMouseInput = false;
        }
      };
      Events.on(document, Events.getEventsNS(events, EVENTS_NS));
    }
  }
};

/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

var DEFAULTS = {
  collapsibleActivateSelectedLinkOnInit: false,
  collapsibleBehaviorAccordion: false,
  collapsibleResetSubsOnClickOn: 'toggler',
  dropdownsShowTrigger: 'click',
  dropdownsShowTimeout: 250,
  dropdownsHideTrigger: 'click',
  dropdownsHideTimeout: 500,
  dropdownsDropReverseX: false,
  dropdownsDropReverseY: false,
  dropdownsNavSubOffsetX: 0,
  dropdownsNavSubOffsetY: 0,
  dropdownsSubSubOffsetX: 0,
  dropdownsSubSubOffsetY: 0,
  dropdownsKeepInViewport: true,
  markCurrentLinkAsSelectedOnInit: false,
  markCurrentLinkParentsAsSelected: false,
  resetTogglerOnLinkSelect: false,
  showSubOnSplitLinkSelect: false,
  classNavbarVertical: 'sm-navbar--vertical',
  classNavbarDropReverseY: 'sm-navbar--drop-reverse-y',
  classNavbarDropReverseX: 'sm-navbar--drop-reverse-x',
  classSubMega: 'sm-sub--mega',
  classLinkExpanded: 'sm-expanded',
  classLinkSelected: 'sm-selected',
  classLinkDisabled: 'sm-disabled',
  classLinkHasSub: 'sm-has-sub',
  classShow: 'sm-show',
  classShowing: 'sm-showing',
  classHiding: 'sm-hiding',
  selectorTogglerState: '.sm-toggler-state',
  selectorTogglerAnchorShow: '.sm-toggler-anchor--show',
  selectorTogglerAnchorHide: '.sm-toggler-anchor--hide',
  selectorCollapse: '.sm-collapse',
  selectorOffcanvas: '.sm-offcanvas',
  selectorOffcanvasOverlay: '.sm-offcanvas-overlay',
  selectorNav: '.sm-nav',
  selectorSub: '.sm-sub',
  selectorItem: '.sm-nav-item, .sm-sub-item',
  selectorLink: '.sm-nav-link, .sm-sub-link',
  selectorLinkSplit: '.sm-nav-link--split, .sm-sub-link--split'
};

var DATA_KEY$2 = 'sm';
var DATA_SUFFIX = "-".concat(DATA_KEY$2);
var DATA_ATTRIBUTE_PREFIX = "data-".concat(DATA_KEY$2, "-");
var EVENTS_NS$1 = ".".concat(DATA_KEY$2);
var API_EVENTS_SUFFIX = "-".concat(DATA_KEY$2);
var navbars = [];
var SmartMenus = /*#__PURE__*/function () {
  function SmartMenus(element, options) {
    _classCallCheck(this, SmartMenus);
    this._navbar = element;

    // Get any options defined as data- attributes
    var dataOptions = {};
    for (var _i = 0, _Object$keys = Object.keys(DEFAULTS); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      var dataValue = this._navbar.dataset["".concat(DATA_KEY$2).concat(key.charAt(0).toUpperCase()).concat(key.slice(1))];
      if (dataValue !== undefined) {
        switch (_typeof(DEFAULTS[key])) {
          case 'number':
            {
              dataValue = Number.parseFloat(dataValue, 10);
              break;
            }
          case 'boolean':
            {
              dataValue = dataValue === 'true';
              break;
            }
        }
        dataOptions[key] = dataValue;
      }
    }
    this._opts = _objectSpread2(_objectSpread2(_objectSpread2({}, DEFAULTS), options), dataOptions);
    this._togglerState = null;
    this._togglerAnchorShow = null;
    this._togglerAnchorHide = null;
    this._collapse = null;
    this._offcanvas = null;
    this._offcanvasOverlay = null;
    this._nav = null;
    this._navbarId = String(Date.now() + Math.random()).replace(/\D/g, ''); // for internal use
    this._accessIdPrefix = "".concat(DATA_KEY$2, "-").concat(this._navbarId, "-");
    this._visibleSubs = []; // stores visible subs (might be in no particular order in collapsible non-accordion mode)
    this._dropdownsShowTimeout = 0;
    this._dropdownsHideTimeout = 0;
    this._clickActivated = false;
    this._zIndexInc = 0;
    this._idInc = 0;
    this._disabled = false;
    this._wasCollapsible = false;

    // We'll access these for some tests at runtime so we'll cache them
    this._firstLink = null;
    this._firstSub = null;
    this._init();
  }

  // Getters
  _createClass(SmartMenus, [{
    key: "destroy",
    // Public
    value: function destroy(refresh) {
      this.subHideAll();
      if (this._nav) {
        this._destroySubs();
        this._destroyNav();
        this._nav = null;
      }
      this._togglerState = null;
      if (this._togglerAnchorShow) {
        Data.delete(this._togglerAnchorShow, "beforefirstshow-fired".concat(DATA_SUFFIX));
        this._togglerAnchorShow = null;
      }
      this._togglerAnchorHide = null;
      this._collapse = null;
      this._offcanvas = null;
      this._offcanvasOverlay = null;
      this._firstLink = null;
      this._firstSub = null;
      if (!refresh) {
        this._destroyNavbar();
        this._navbar = null;
      }
    }
  }, {
    key: "disable",
    value: function disable() {
      if (!this._disabled) {
        this.subHideAll();
        this._disabled = true;
      }
    }
  }, {
    key: "enable",
    value: function enable() {
      if (this._disabled) {
        this._disabled = false;
      }
    }
    /**
     * Activate a menu link
     *
     * @param {HTMLElement} element                       Any element which matches the "selectorLink" selector
     * @param {('none'|'same'|'deeper'|'self')} hideSubs  Hide any visible subs from the same or deeper levels or only the self sub (if it exists)
     * @param {boolean} showSub                           Should the link's sub be shown (if it exists)?
     * @returns {void}
     */
  }, {
    key: "linkActivate",
    value: function linkActivate(element) {
      var hideSubs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
      var showSub = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var menu = element.closest("".concat(this._opts.selectorNav, ", ").concat(this._opts.selectorSub));
      var level = Data.get(menu, "level".concat(DATA_SUFFIX));
      var sub = Data.get(element, "sub".concat(DATA_SUFFIX));

      // If for some reason the containing menu is not visible (e.g. this is an API call to activate the link), show all parent menus first
      if (level > 1 && !this._subIsVisible(menu)) {
        var parents = Query.parentsUntil(menu, this._opts.selectorNav, this._opts.selectorSub).reverse();
        parents.push(menu);
        var _iterator = _createForOfIteratorHelper(parents),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _menu = _step.value;
            this.linkActivate(Data.get(_menu, "parent-link".concat(DATA_SUFFIX)), this._isCollapsible() && !this._opts.collapsibleBehaviorAccordion ? 'none' : 'same');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      // Hide any visible subs
      switch (hideSubs) {
        case 'same':
          {
            this._subHideSubs(level - 1);
            break;
          }
        case 'deeper':
          {
            this._subHideSubs(level);
            break;
          }
        case 'self':
          {
            if (sub) {
              this._subHide(sub);
            }
            break;
          }
      }
      if (Events.trigger(this._navbar, "activate".concat(API_EVENTS_SUFFIX), element).defaultPrevented || !showSub) {
        return;
      }

      // Show the sub menu if this link has one
      if (sub) {
        this._subShow(sub);
      }
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.destroy(true);
      this._init(true);
    }
  }, {
    key: "subHideAll",
    value: function subHideAll() {
      this._clearTimeout(this._dropdownsShowTimeout);
      this._clearTimeout(this._dropdownsHideTimeout);
      var visibleCount = this._visibleSubs.length;
      if (visibleCount > 0) {
        var _iterator2 = _createForOfIteratorHelper(_toConsumableArray(this._visibleSubs).reverse()),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var sub = _step2.value;
            this._subHide(sub);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      this._visibleSubs = [];
      this._clickActivated = false;
      this._zIndexInc = 0;
      if (visibleCount > 0) {
        Events.trigger(this._navbar, "hideall".concat(API_EVENTS_SUFFIX));
      }
    } // Private
  }, {
    key: "_activateSelectedLink",
    value: function _activateSelectedLink() {
      var selectedLink = Query.getAll(".".concat(this._opts.classLinkSelected), this._nav).pop();
      if (selectedLink) {
        this.linkActivate(selectedLink);
      }
    }
  }, {
    key: "_animate",
    value: function _animate(element, classAnimate) {
      // Reflow to make sure the animation would be restarted
      void element.offsetWidth;
      element.classList.add(classAnimate);
      var _Helpers$getComputedS = Helpers.getComputedStyle(element),
        animationDuration = _Helpers$getComputedS.animationDuration;
      if (!animationDuration || animationDuration.startsWith('0s')) {
        element.classList.remove(classAnimate);
        return;
      }

      // Trigger animationend if animation needs to be stopped or just in case it isn't fired for some reason
      var endTimeout = Data.get(element, "animationend-timeout".concat(DATA_SUFFIX));
      if (endTimeout) {
        window.clearTimeout(endTimeout);
        Data.get(element, "animationend-trigger".concat(DATA_SUFFIX))();
      }
      var endTrigger = function endTrigger() {
        Data.delete(element, "animationend-timeout".concat(DATA_SUFFIX));
        Data.delete(element, "animationend-trigger".concat(DATA_SUFFIX));
        if (element.classList.contains(classAnimate)) {
          Events.trigger(element, 'animationend');
        }
      };
      Data.set(element, "animationend-trigger".concat(DATA_SUFFIX), endTrigger);
      Data.set(element, "animationend-timeout".concat(DATA_SUFFIX), window.setTimeout(endTrigger, Number.parseFloat(animationDuration) * 1000 + 1));
      Events.on(element, "animationend".concat(EVENTS_NS$1), function (event) {
        if (event.target === element) {
          Events.off(element, "animationend".concat(EVENTS_NS$1));
          element.classList.remove(classAnimate);
        }
      });
    }
  }, {
    key: "_animateHide",
    value: function _animateHide(element) {
      // This property is used for the expand/collapse animation
      element.style.setProperty("--".concat(DATA_KEY$2, "-height"), "".concat(Helpers.getHeight(element), "px"));
      element.classList.remove(this._opts.classShow);
      this._animate(element, this._opts.classHiding);
    }
  }, {
    key: "_animateShow",
    value: function _animateShow(element) {
      // This property is used for the expand/collapse animation
      element.style.setProperty("--".concat(DATA_KEY$2, "-height"), "".concat(Helpers.getHeight(element), "px"));
      element.classList.add(this._opts.classShow);
      this._animate(element, this._opts.classShowing);
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout(timeout) {
      if (timeout) {
        window.clearTimeout(timeout);
        timeout = 0;
      }
    }
  }, {
    key: "_destroyLink",
    value: function _destroyLink(element) {
      if (element.classList.contains(this._opts.classLinkHasSub)) {
        if ((element.getAttribute('id') || '').startsWith(this._accessIdPrefix)) {
          element.removeAttribute('id');
        }
        element.classList.remove(this._opts.classLinkHasSub);
        Data.delete(element, "sub".concat(DATA_SUFFIX));
        Data.delete(element, "toggler".concat(DATA_SUFFIX));
        Data.delete(element, "link".concat(DATA_SUFFIX));
        element.removeAttribute('role');
        element.removeAttribute('aria-controls');
        element.removeAttribute('aria-expanded');
      }
      if (this._opts.markCurrentLinkAsSelectedOnInit && element.classList.contains(this._opts.classLinkSelected)) {
        element.classList.remove(this._opts.classLinkSelected);
        element.removeAttribute('aria-current');
      }
    }
  }, {
    key: "_destroyNav",
    value: function _destroyNav() {
      Data.delete(this._nav, "level".concat(DATA_SUFFIX));
      Events.off(this._nav, EVENTS_NS$1);
      Events.off(window.document, "".concat(EVENTS_NS$1, "-").concat(this._navbarId));
      Events.off(window, "".concat(EVENTS_NS$1, "-").concat(this._navbarId));
    }
  }, {
    key: "_destroyNavbar",
    value: function _destroyNavbar() {
      Data.delete(this._navbar, DATA_KEY$2);
      this._navbar.removeAttribute("".concat(DATA_ATTRIBUTE_PREFIX, "id"));
      Events.off(this._navbar, EVENTS_NS$1);
      navbars.splice(navbars.indexOf(this), 1);
    }
  }, {
    key: "_destroySub",
    value: function _destroySub(element) {
      var shownBefore = Data.get(element, "shown-before".concat(DATA_SUFFIX));
      if (shownBefore) {
        this._subResetPosition(element);
      }
      if ((element.getAttribute('id') || '').startsWith(this._accessIdPrefix)) {
        element.removeAttribute('id');
      }
      Data.delete(element, "shown-before".concat(DATA_SUFFIX));
      Data.delete(element, "parent-link".concat(DATA_SUFFIX));
      Data.delete(element, "level".concat(DATA_SUFFIX));
      Data.delete(element, "beforefirstshow-fired".concat(DATA_SUFFIX));
      element.removeAttribute('aria-hidden');
      element.removeAttribute('aria-labelledby');
    }
  }, {
    key: "_destroySubs",
    value: function _destroySubs() {
      var _iterator3 = _createForOfIteratorHelper(Query.getAll(this._opts.selectorSub, this._nav)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var sub = _step3.value;
          this._destroySub(sub);
        }

        // Let's process the links separately from the subs (unline on init) since some link might possibly be disconnected
        // from the sub it had on init (e.g. its sub might have been removed in some DOM operation)
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var _iterator4 = _createForOfIteratorHelper(Query.getAll(this._opts.selectorLink, this._nav)),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var link = _step4.value;
          this._destroyLink(link);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "_docClick",
    value: function _docClick(event) {
      // Hide on any click outside the nav
      var isCollapsible = this._isCollapsible();
      if ((!isCollapsible && this._opts.dropdownsHideTrigger === 'click' || isCollapsible && this._opts.collapsibleResetSubsOnClickOn === 'page') && (!event.target || !this._nav.contains(event.target))) {
        this.subHideAll();
      }
    }
  }, {
    key: "_docTouchEnd",
    value: function _docTouchEnd() {
      var _this = this;
      if (!this._lastTouch) {
        return;
      }
      if ((this._lastTouch.x2 === undefined || this._lastTouch.x1 === this._lastTouch.x2) && (this._lastTouch.y2 === undefined || this._lastTouch.y1 === this._lastTouch.y2)) {
        this._clearTimeout(this._dropdownsHideTimeout);

        // Call with a delay to prevent triggering accidental unwanted click on some page element
        var target = this._lastTouch.target;
        this._dropdownsHideTimeout = window.setTimeout(function () {
          _this._docClick({
            target: target
          });
        }, 350);
      }
      this._lastTouch = null;
    }
  }, {
    key: "_docTouchMove",
    value: function _docTouchMove(event) {
      if (!this._lastTouch) {
        return;
      }
      var touchPoint = event.touches[0];
      this._lastTouch.x2 = touchPoint.pageX;
      this._lastTouch.y2 = touchPoint.pageY;
    }
  }, {
    key: "_docTouchStart",
    value: function _docTouchStart(event) {
      var touchPoint = event.touches[0];
      this._lastTouch = {
        x1: touchPoint.pageX,
        y1: touchPoint.pageY,
        target: touchPoint.target
      };
    }
  }, {
    key: "_getRootZIndex",
    value: function _getRootZIndex() {
      var zIndex = Number.parseInt(Helpers.getComputedStyle(this._navbar).zIndex, 10);
      return Number.isNaN(zIndex) ? 1 : zIndex;
    }
  }, {
    key: "_handleEvents",
    value: function _handleEvents() {
      return !this._disabled && this._isCSSOn();
    }
  }, {
    key: "_init",
    value: function _init(refresh) {
      if (this._navbar.classList.contains(this._opts.classNavbarDropReverseX)) {
        this._opts.dropdownsDropReverseX = true;
      }
      if (this._navbar.classList.contains(this._opts.classNavbarDropReverseY)) {
        this._opts.dropdownsDropReverseY = true;
      }
      this._togglerState = Query.get(this._opts.selectorTogglerState, this._navbar);
      this._togglerAnchorShow = Query.get(this._opts.selectorTogglerAnchorShow, this._navbar);
      this._togglerAnchorHide = Query.get(this._opts.selectorTogglerAnchorHide, this._navbar);
      this._collapse = Query.get(this._opts.selectorCollapse, this._navbar);
      this._offcanvas = Query.get(this._opts.selectorOffcanvas, this._navbar);
      this._offcanvasOverlay = Query.get(this._opts.selectorOffcanvasOverlay, this._navbar);
      this._nav = Query.get(this._opts.selectorNav, this._navbar);
      if (!refresh) {
        this._initNavbar();
      }
      if (this._nav) {
        this._initNav();
        this._initSubs();

        // Save initial state
        var isCollapsible = this._isCollapsible();
        this._wasCollapsible = isCollapsible;
        if (this._opts.markCurrentLinkAsSelectedOnInit) {
          this._markCurrentLinkAsSelected();
        }
        if (this._opts.collapsibleActivateSelectedLinkOnInit && isCollapsible) {
          this._activateSelectedLink();
        }
        MouseInputDetect.enable(
        // On mouse input detected - check if we are not over some link by chance and call the mouseenter handler if yes
        function (event) {
          var target = event.target;
          if (target !== null && target !== void 0 && target.closest) {
            navbars.some(function (object) {
              var link = target.closest(object._opts.selectorLink);
              if (link && object._navbar.contains(link)) {
                object._linkEnter(event, link);
                return true;
              }
              return false;
            });
          }
        });
      }
    }
  }, {
    key: "_initNav",
    value: function _initNav() {
      Data.set(this._nav, "level".concat(DATA_SUFFIX), 1);
      Events.on(this._nav, Events.getEventsNS({
        'mouseover focusin': this._navOver.bind(this),
        'mouseout focusout': this._navOut.bind(this),
        keydown: this._navKeyDown.bind(this)
      }, EVENTS_NS$1));
      Events.on(this._nav, Events.getEventsNS({
        mouseenter: this._linkEnter.bind(this),
        mouseleave: this._linkLeave.bind(this),
        mousedown: this._linkDown.bind(this),
        focus: this._linkFocus.bind(this),
        blur: this._linkBlur.bind(this),
        click: this._linkClick.bind(this)
      }, EVENTS_NS$1), this._opts.selectorLink);
    }
  }, {
    key: "_initNavbar",
    value: function _initNavbar() {
      navbars.push(this);
      Data.set(this._navbar, DATA_KEY$2, this);
      this._navbar.setAttribute("".concat(DATA_ATTRIBUTE_PREFIX, "id"), this._navbarId);
      Events.on(this._navbar, "click".concat(EVENTS_NS$1), this._opts.selectorTogglerAnchorShow, this._togglerAnchorShowClick.bind(this));
      Events.on(this._navbar, "click".concat(EVENTS_NS$1), this._opts.selectorTogglerAnchorHide, this._togglerAnchorHideClick.bind(this));
      Events.on(this._navbar, "click".concat(EVENTS_NS$1), this._opts.selectorOffcanvasOverlay, this._offcanvasOverlayClick.bind(this));
    }
  }, {
    key: "_initSub",
    value: function _initSub(element) {
      var parentLink = Query.get(this._opts.selectorLink, element.closest(this._opts.selectorItem));
      parentLink.classList.add(this._opts.classLinkHasSub);
      var parentLinkNextElement = parentLink.nextElementSibling;
      var parentLinkToggler = parentLinkNextElement !== null && parentLinkNextElement !== void 0 && parentLinkNextElement.matches(this._opts.selectorLinkSplit) && parentLink.matches(this._opts.selectorLinkSplit) ? parentLinkNextElement : null;
      if (parentLinkToggler) {
        Data.set(parentLink, "toggler".concat(DATA_SUFFIX), parentLinkToggler);
        Data.set(parentLinkToggler, "link".concat(DATA_SUFFIX), parentLink);
        parentLinkToggler.classList.add(this._opts.classLinkHasSub);
      }
      Data.set(parentLink, "sub".concat(DATA_SUFFIX), element);
      Data.set(element, "parent-link".concat(DATA_SUFFIX), parentLink);
      Data.set(element, "level".concat(DATA_SUFFIX), Query.parentsUntil(element, this._opts.selectorNav, this._opts.selectorSub).length + 2);
      this._setTogglerSubARIA(parentLinkToggler || parentLink, element);
    }
  }, {
    key: "_initSubs",
    value: function _initSubs() {
      // Hide subs on tap or click outside the nav
      if (this._opts.dropdownsHideTrigger === 'click' || this._opts.collapsibleResetSubsOnClickOn === 'page') {
        Events.on(window.document, Events.getEventsNS({
          touchstart: this._docTouchStart.bind(this),
          touchmove: this._docTouchMove.bind(this),
          touchend: this._docTouchEnd.bind(this),
          click: this._docClick.bind(this)
        }, "".concat(EVENTS_NS$1, "-").concat(this._navbarId)));
      }

      // Hide subs on resize
      Events.on(window, Events.getEventsNS({
        'resize orientationchange': this._winResize.bind(this)
      }, "".concat(EVENTS_NS$1, "-").concat(this._navbarId)));
      var subs = Query.getAll(this._opts.selectorSub, this._nav);
      var _iterator5 = _createForOfIteratorHelper(subs),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var sub = _step5.value;
          this._initSub(sub);
        }

        // Cache these for faster access at runtime
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      this._firstLink = Query.get(this._opts.selectorLink, this._nav);
      this._firstSub = subs[0];
    }
  }, {
    key: "_isCollapsible",
    value: function _isCollapsible() {
      return this._isCSSOn() && this._firstSub && Helpers.getComputedStyle(this._firstSub).position === 'static';
    }
  }, {
    key: "_isCSSOn",
    value: function _isCSSOn() {
      return this._firstLink && Helpers.getComputedStyle(this._firstLink).display !== 'inline';
    }
  }, {
    key: "_isTouchMode",
    value: function _isTouchMode() {
      return !MouseInputDetect.supportMouseInput || this._isCollapsible();
    }
  }, {
    key: "_linkBlur",
    value: function _linkBlur(event, element) {
      if (!this._handleEvents()) {
        return;
      }

      // If this is a split link toggler, trigger the handler for the actual link
      var link = Data.get(element, "link".concat(DATA_SUFFIX));
      if (link) {
        this._linkBlur(event, link);
        return;
      }
      Events.trigger(this._navbar, "blur".concat(API_EVENTS_SUFFIX), element);
    }
    /* eslint-disable complexity */
    // Maybe refactor this to lower complexity?
  }, {
    key: "_linkClick",
    value: function _linkClick(event, element) {
      if (!this._handleEvents()) {
        return;
      }
      if (element.classList.contains(this._opts.classLinkDisabled)) {
        event.preventDefault();
        return false;
      }

      // If this is a split link toggler, get the actual link
      var link = Data.get(element, "link".concat(DATA_SUFFIX));
      var isTogglerClicked = Boolean(link);
      if (!isTogglerClicked) {
        link = element;
      }
      if (Events.trigger(this._navbar, "click".concat(API_EVENTS_SUFFIX), link).defaultPrevented) {
        event.preventDefault();
        return false;
      }
      var linkToggler = Data.get(link, "toggler".concat(DATA_SUFFIX));
      var sub = Data.get(link, "sub".concat(DATA_SUFFIX));
      var subIsVisible = sub && this._subIsVisible(sub);
      var level = Data.get(sub, "level".concat(DATA_SUFFIX)) - 1;
      var isCollapsible = this._isCollapsible();
      var selectLink = !sub || linkToggler && !isTogglerClicked;
      if (selectLink && Events.trigger(this._navbar, "select".concat(API_EVENTS_SUFFIX), link).defaultPrevented) {
        event.preventDefault();
        return false;
      }
      if (sub && (!selectLink || this._opts.showSubOnSplitLinkSelect)) {
        this._clickActivated = this._clickActivated || Boolean(!isCollapsible && !subIsVisible && this._opts.dropdownsShowTrigger === 'click-then-mouseover' && level === 1);
      }

      // Activate link
      var hideSubs = 'none';
      if (subIsVisible && isCollapsible && !this._opts.collapsibleBehaviorAccordion && (!selectLink || !this._opts.showSubOnSplitLinkSelect)) {
        hideSubs = 'self';
      } else if (sub && (subIsVisible && (!isCollapsible || this._opts.collapsibleBehaviorAccordion) && (!selectLink || !this._opts.showSubOnSplitLinkSelect) || !subIsVisible && (!isCollapsible || this._opts.collapsibleBehaviorAccordion && (!selectLink || this._opts.showSubOnSplitLinkSelect))) || !sub && !isCollapsible) {
        hideSubs = 'same';
      }
      var showSub = selectLink ? this._opts.showSubOnSplitLinkSelect : !subIsVisible;
      this.linkActivate(link, hideSubs, showSub);

      // Select link
      if (selectLink) {
        if (this._opts.resetTogglerOnLinkSelect && this._togglerAnchorHide && Helpers.getComputedStyle(this._togglerAnchorHide).display !== 'none' && this._togglerAnchorHide.offsetWidth > 0) {
          this._togglerAnchorHide.click();
        }
        if (!isCollapsible && (!sub || subIsVisible || !this._opts.showSubOnSplitLinkSelect)) {
          this.subHideAll();
        }
        return true;
      }

      // Toggle sub
      if (sub) {
        if (!isCollapsible && level === 1 && subIsVisible) {
          this.subHideAll();
        }
        event.preventDefault();
        return false;
      }
    } /* eslint-enable complexity */
  }, {
    key: "_linkDown",
    value: function _linkDown(event, element) {
      if (!this._handleEvents()) {
        return;
      }

      // If this is a split link toggler, trigger the handler for the actual link
      var link = Data.get(element, "link".concat(DATA_SUFFIX));
      if (link) {
        this._linkDown(event, link);
        return;
      }
      Data.set(element, "mousedown".concat(DATA_SUFFIX), true);
    }
  }, {
    key: "_linkEnter",
    value: function _linkEnter(event, element) {
      var _this2 = this;
      if (!this._handleEvents()) {
        return;
      }

      // If this is a split link toggler, trigger the handler for the actual link
      var link = Data.get(element, "link".concat(DATA_SUFFIX));
      if (link) {
        this._linkEnter(event, link);
        return;
      }
      if (!this._isTouchMode() && (this._opts.dropdownsShowTrigger === 'mouseover' || this._opts.dropdownsShowTrigger === 'click-then-mouseover' && this._clickActivated || this._opts.dropdownsHideTrigger !== 'click')) {
        this._clearTimeout(this._dropdownsShowTimeout);
        var level = Data.get(element.closest("".concat(this._opts.selectorNav, ", ").concat(this._opts.selectorSub)), "level".concat(DATA_SUFFIX));
        var sub = Data.get(element, "sub".concat(DATA_SUFFIX));
        var hideSubs = !sub || !this._subIsVisible(sub) ? 'same' : 'deeper';
        var showSub = this._opts.dropdownsShowTrigger === 'mouseover' || this._opts.dropdownsShowTrigger === 'click-then-mouseover' && this._clickActivated;
        var timeout = this._opts.dropdownsShowTrigger === 'click-then-mouseover' && level === 1 ? 1 : this._opts.dropdownsShowTimeout;
        this._dropdownsShowTimeout = window.setTimeout(function () {
          _this2.linkActivate(element, hideSubs, showSub);
        }, timeout);
      }
      Events.trigger(this._navbar, "mouseenter".concat(API_EVENTS_SUFFIX), element);
    }
  }, {
    key: "_linkFocus",
    value: function _linkFocus(event, element) {
      if (!this._handleEvents()) {
        return;
      }

      // If this is a split link toggler, trigger the handler for the actual link
      var link = Data.get(element, "link".concat(DATA_SUFFIX));
      if (link) {
        this._linkFocus(event, link);
        return;
      }

      // Neglect focus events that were triggered by mouse input
      if (!Data.get(element, "mousedown".concat(DATA_SUFFIX))) {
        var sub = Data.get(element, "sub".concat(DATA_SUFFIX));
        var hideSubs = this._isCollapsible() && !this._opts.collapsibleBehaviorAccordion ? 'none' : !sub || !this._subIsVisible(sub) ? 'same' : 'deeper';
        var showSub = false;
        this.linkActivate(element, hideSubs, showSub);
      }
      Events.trigger(this._navbar, "focus".concat(API_EVENTS_SUFFIX), element);
    }
  }, {
    key: "_linkLeave",
    value: function _linkLeave(event, element) {
      if (!this._handleEvents()) {
        return;
      }

      // If this is a split link toggler, trigger the handler for the actual link
      var link = Data.get(element, "link".concat(DATA_SUFFIX));
      if (link) {
        this._linkLeave(event, link);
        return;
      }
      if (!this._isTouchMode() && this._opts.dropdownsHideTrigger !== 'click') {
        element.blur();
        var linkToggler = Data.get(element, "toggler".concat(DATA_SUFFIX));
        if (linkToggler) {
          linkToggler.blur();
        }
        this._clearTimeout(this._dropdownsShowTimeout);
      }
      Data.delete(element, "mousedown".concat(DATA_SUFFIX));
      Events.trigger(this._navbar, "mouseleave".concat(API_EVENTS_SUFFIX), element);
    }
  }, {
    key: "_navKeyDown",
    value: function _navKeyDown(event) {
      if (!this._handleEvents()) {
        return;
      }
      switch (event.keyCode) {
        // Esc
        case 27:
          {
            var target = event.target; // If has own sub and it's visible, hide it
            if (target !== null && target !== void 0 && target.matches(this._opts.selectorLink)) {
              var link = Data.get(target, "link".concat(DATA_SUFFIX)) || target;
              var linkToggler = Data.get(link, "toggler".concat(DATA_SUFFIX));
              var element = linkToggler || link;
              var sub = Data.get(link, "sub".concat(DATA_SUFFIX));
              if (sub && this._subIsVisible(sub)) {
                this._linkClick(event, element);
                event.preventDefault();
                return;
              }
            }

            // Hide closest sub
            var closestSub = target === null || target === void 0 ? void 0 : target.closest("".concat(this._opts.selectorSub));
            if (closestSub) {
              var parentLink = Data.get(closestSub, "parent-link".concat(DATA_SUFFIX));
              var parentLinkToggler = Data.get(parentLink, "toggler".concat(DATA_SUFFIX));
              var _element = parentLinkToggler || parentLink;
              this._linkClick(event, _element);
              _element.focus();
              event.preventDefault();
            }
            return;
          }

        // Space
        case 32:
          {
            var _target = event.target; // Toggle link's sub
            if (_target !== null && _target !== void 0 && _target.matches(this._opts.selectorLink)) {
              this._linkClick(event, _target);
              event.preventDefault();
            }
          }
      }
    }
  }, {
    key: "_navOut",
    value: function _navOut(event) {
      var _this3 = this;
      if (!this._handleEvents() || this._isTouchMode() || event.target === this._nav) {
        return;
      }
      this._clearTimeout(this._dropdownsHideTimeout);

      // On focusout if there is no related target (i.e. another page element that was focused) it means the page lost focus so do not hide the sub menus
      if (this._opts.dropdownsHideTrigger !== 'click' || event.type !== 'mouseout' && event.relatedTarget && (!event.target || !this._nav.contains(event.target))) {
        this._dropdownsHideTimeout = window.setTimeout(function () {
          _this3.subHideAll();
        }, this._opts.dropdownsHideTimeout);
      }
    }
  }, {
    key: "_navOver",
    value: function _navOver(event) {
      if (!this._handleEvents() || this._isTouchMode() || event.target === this._nav) {
        return;
      }
      this._clearTimeout(this._dropdownsHideTimeout);
    }
  }, {
    key: "_offcanvasOverlayClick",
    value: function _offcanvasOverlayClick(event) {
      if (!this._handleEvents()) {
        return;
      }
      if (this._togglerAnchorHide) {
        this._togglerAnchorHide.click();
      }
      event.preventDefault();
    }
  }, {
    key: "_markCurrentLinkAsSelected",
    value: function _markCurrentLinkAsSelected() {
      var reDefaultDocument = /(index|default)\.[^#/?]*/i;
      var reHash = /#.*/;
      var locHref = window.location.href.replace(reDefaultDocument, '');
      var locHrefNoHash = locHref.replace(reHash, '');
      var _iterator6 = _createForOfIteratorHelper(Query.getAll(this._opts.selectorLink, this._nav)),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var link = _step6.value;
          // if this is a split link toggler, skip it
          if (Data.get(link, "link".concat(DATA_SUFFIX))) {
            continue;
          }
          var href = link.href.replace(reDefaultDocument, '');
          if (href === locHref || href === locHrefNoHash) {
            link.classList.add(this._opts.classLinkSelected);
            link.setAttribute('aria-current', 'page');
            var linkToggler = Data.get(link, "toggler".concat(DATA_SUFFIX));
            if (linkToggler) {
              linkToggler.classList.add(this._opts.classLinkSelected);
            }
            if (this._opts.markCurrentLinkParentsAsSelected) {
              var _iterator7 = _createForOfIteratorHelper(Query.parentsUntil(link, this._opts.selectorNav, this._opts.selectorSub)),
                _step7;
              try {
                for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
                  var sub = _step7.value;
                  var parentLink = Data.get(sub, "parent-link".concat(DATA_SUFFIX));
                  parentLink.classList.add(this._opts.classLinkSelected);
                  var parentLinkToggler = Data.get(parentLink, "toggler".concat(DATA_SUFFIX));
                  if (parentLinkToggler) {
                    parentLinkToggler.classList.add(this._opts.classLinkSelected);
                  }
                }
              } catch (err) {
                _iterator7.e(err);
              } finally {
                _iterator7.f();
              }
            }
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "_setTogglerSubARIA",
    value: function _setTogglerSubARIA(togglerElement, subElement) {
      var togglerId = togglerElement.getAttribute('id') || this._accessIdPrefix + ++this._idInc;
      var subId = subElement.getAttribute('id') || this._accessIdPrefix + ++this._idInc;
      togglerElement.setAttribute('id', togglerId);
      togglerElement.setAttribute('role', 'button');
      togglerElement.setAttribute('aria-controls', subId);
      togglerElement.setAttribute('aria-expanded', 'false');
      subElement.setAttribute('id', subId);
      subElement.setAttribute('aria-hidden', 'true');
      subElement.setAttribute('aria-labelledby', togglerId);
    }
  }, {
    key: "_subHide",
    value: function _subHide(element) {
      if (!this._subIsVisible(element)) {
        return;
      }
      if (Events.trigger(this._navbar, "beforehide".concat(API_EVENTS_SUFFIX), element).defaultPrevented) {
        return;
      }
      this._animateHide(element);
      var parentLink = Data.get(element, "parent-link".concat(DATA_SUFFIX));
      parentLink.classList.remove(this._opts.classLinkExpanded);
      var parentLinkToggler = Data.get(parentLink, "toggler".concat(DATA_SUFFIX));
      if (parentLinkToggler) {
        parentLinkToggler.classList.remove(this._opts.classLinkExpanded);
        parentLinkToggler.setAttribute('aria-expanded', 'false');
      } else {
        parentLink.setAttribute('aria-expanded', 'false');
      }
      element.setAttribute('aria-hidden', 'true');
      this._visibleSubs.splice(this._visibleSubs.indexOf(element), 1);
      Events.trigger(this._navbar, "hide".concat(API_EVENTS_SUFFIX), element);
    }
  }, {
    key: "_subHideSubs",
    value: function _subHideSubs(level) {
      for (var index = this._visibleSubs.length - 1; index >= level; index--) {
        this._subHide(this._visibleSubs[index]);
      }
    }
  }, {
    key: "_subIsVisible",
    value: function _subIsVisible(element) {
      return element.classList.contains(this._opts.classShow);
    }
    /* eslint-disable complexity */
    // Maybe refactor this to lower complexity?
  }, {
    key: "_subPosition",
    value: function _subPosition(element) {
      var parentItem = element.closest(this._opts.selectorItem);
      var level = Data.get(element, "level".concat(DATA_SUFFIX));
      var mega = element.classList.contains(this._opts.classSubMega);
      var vertical = this._navbar.classList.contains(this._opts.classNavbarVertical);
      var horizontalParent = level === 2 && !vertical;
      var rtl = Helpers.getComputedStyle(this._navbar).direction === 'rtl';
      var rightToLeft = rtl && !this._opts.dropdownsDropReverseX || !rtl && this._opts.dropdownsDropReverseX;
      if (parentItem.matches("[".concat(DATA_ATTRIBUTE_PREFIX, "drop-reverse-x]"))) {
        rightToLeft = !rightToLeft;
      }
      var downToUp = this._opts.dropdownsDropReverseY;
      if (parentItem.matches("[".concat(DATA_ATTRIBUTE_PREFIX, "drop-reverse-y]"))) {
        downToUp = !downToUp;
      }
      var xProperty = rightToLeft ? 'right' : 'left';
      var xPropertyCapitalized = xProperty.charAt(0).toUpperCase() + xProperty.slice(1);
      var yProperty = downToUp ? 'bottom' : 'top';
      var yPropertyCapitalized = yProperty.charAt(0).toUpperCase() + yProperty.slice(1);
      var parentItemRect = parentItem.getBoundingClientRect();
      var parentItemRectX = parentItemRect[xProperty];
      var parentItemRectY = parentItemRect[yProperty];
      var parentItemWidth = Helpers.getWidth(parentItem);
      var parentItemHeight = Helpers.getHeight(parentItem);
      var subComputedStyle = Helpers.getComputedStyle(element);
      var subOffsetX = level === 2 ? this._opts.dropdownsNavSubOffsetX : this._opts.dropdownsSubSubOffsetX;
      var subOffsetY = level === 2 && !vertical ? this._opts.dropdownsNavSubOffsetY : this._opts.dropdownsSubSubOffsetY - Number.parseFloat(subComputedStyle["border".concat(yPropertyCapitalized, "Width")], 10) - Number.parseFloat(subComputedStyle["padding".concat(yPropertyCapitalized)], 10);
      var x = 0;
      var y = 0;
      if (horizontalParent) {
        x = subOffsetX;
        y = parentItemHeight + subOffsetY;
      } else {
        x = parentItemWidth + subOffsetX;
        y = subOffsetY;
      }

      // Mega subs are not positioned against their parent item (as it has position: static) so compensate that
      if (mega) {
        // Find closest positioned parent (e.g. might be the navbar, offcanvas element)
        var positionedParent = Query.closest(element.parentElement, function (parent) {
          return Helpers.getComputedStyle(parent).position !== 'static';
        });
        if (positionedParent) {
          var positionedParentRect = positionedParent.getBoundingClientRect();
          var positionedParentComputedStyle = Helpers.getComputedStyle(positionedParent);
          if (horizontalParent) {
            y += Math.abs(parentItemRectY - positionedParentRect[yProperty]) - Number.parseFloat(positionedParentComputedStyle["border".concat(yPropertyCapitalized, "Width")], 10);
          } else {
            x += Math.abs(parentItemRectX - positionedParentRect[xProperty]) - Number.parseFloat(positionedParentComputedStyle["border".concat(xPropertyCapitalized, "Width")], 10);
          }
        }
      }

      // Keep sub in viewport
      if (this._opts.dropdownsKeepInViewport && !mega) {
        var viewportWidth = Helpers.getViewportWidth();
        var viewportHeight = Helpers.getViewportHeight();
        var subWidth = Helpers.getWidth(element);
        var subHeight = Helpers.getHeight(element);
        var parentItemX = rightToLeft ? viewportWidth - parentItemRectX : parentItemRectX;
        var parentItemY = downToUp ? viewportHeight - parentItemRectY : parentItemRectY;
        if (subWidth < viewportWidth) {
          if (horizontalParent) {
            if (parentItemX + x + subWidth > viewportWidth) {
              // Align against the opposite edge of the viewport
              x = viewportWidth - subWidth - parentItemX;
            } else if (parentItemX + x < 0) {
              // Align against the same edge of the viewport
              x = -parentItemX;
            }
          } else if (parentItemX + x + subWidth > viewportWidth) {
            if (subOffsetX + subWidth <= parentItemX) {
              // Flip position if there is enough space on the other side of the parent item
              x = -subOffsetX - subWidth;
            } else if (parentItemX > viewportWidth - parentItemX - parentItemWidth + 1) {
              // If there is no space for a flip, align it against the edge of the viewport where there is more space
              // 1px added for consistent results when the space difference is only due to rounding
              x = -parentItemX;
            } else {
              x = viewportWidth - subWidth - parentItemX;
            }
          }
        } else {
          // If the sub cannot fit inside the viewport, align it against the same edge of the viewport
          x = -parentItemX;
        }
        if (!horizontalParent) {
          if (subHeight < viewportHeight) {
            if (parentItemY + y + subHeight > viewportHeight) {
              // Align against the opposite edge of the viewport
              y = viewportHeight - subHeight - parentItemY;
            } else if (parentItemY + y < 0) {
              // Align against the same edge of the viewport
              y = -parentItemY;
            }
          } else {
            // If the sub cannot fit inside the viewport, align it against the top edge of the viewport
            y = downToUp ? viewportHeight - subHeight - parentItemY : -parentItemY;
          }
        }
      }
      var elementStyle = element.style;
      elementStyle.zIndex = this._zIndexInc = (this._zIndexInc || this._getRootZIndex()) + 1;
      if (mega) {
        if (horizontalParent) {
          elementStyle[yProperty] = y + 'px';
        } else {
          elementStyle[xProperty] = x + 'px';
        }
      } else {
        elementStyle[xProperty] = x + 'px';
        elementStyle[yProperty] = y + 'px';
      }
    } /* eslint-enable complexity */
  }, {
    key: "_subResetPosition",
    value: function _subResetPosition(element) {
      var elementStyle = element.style;
      elementStyle.zIndex = '';
      elementStyle.top = '';
      elementStyle.left = '';
      elementStyle.bottom = '';
      elementStyle.right = '';
    }
  }, {
    key: "_subShow",
    value: function _subShow(element) {
      if (this._subIsVisible(element)) {
        return;
      }
      if (!Data.get(element, "beforefirstshow-fired".concat(DATA_SUFFIX))) {
        Data.set(element, "beforefirstshow-fired".concat(DATA_SUFFIX), true);
        if (Events.trigger(this._navbar, "beforefirstshow".concat(API_EVENTS_SUFFIX), element).defaultPrevented) {
          return;
        }
      }
      if (Events.trigger(this._navbar, "beforeshow".concat(API_EVENTS_SUFFIX), element).defaultPrevented) {
        return;
      }
      Data.set(element, "shown-before".concat(DATA_SUFFIX), true);
      var parentLink = Data.get(element, "parent-link".concat(DATA_SUFFIX));
      parentLink.classList.add(this._opts.classLinkExpanded);
      var parentLinkToggler = Data.get(parentLink, "toggler".concat(DATA_SUFFIX));
      if (parentLinkToggler) {
        parentLinkToggler.classList.add(this._opts.classLinkExpanded);
      }
      var isCollapsible = this._isCollapsible();
      if (isCollapsible) {
        this._subResetPosition(element);
      } else {
        this._subPosition(element);
      }
      this._animateShow(element);
      // Accessibility
      if (parentLinkToggler) {
        parentLinkToggler.setAttribute('aria-expanded', 'true');
      } else {
        parentLink.setAttribute('aria-expanded', 'true');
      }
      element.setAttribute('aria-hidden', 'false');
      // Store sub menu in visible array
      this._visibleSubs.push(element);
      Events.trigger(this._navbar, "show".concat(API_EVENTS_SUFFIX), element);
    }
  }, {
    key: "_togglerAnchorHideClick",
    value: function _togglerAnchorHideClick(event) {
      if (!this._handleEvents()) {
        return;
      }
      if (Events.trigger(this._navbar, "beforehide".concat(API_EVENTS_SUFFIX), this._collapse || this._offcanvas || null).defaultPrevented) {
        return;
      }
      if (this._opts.collapsibleResetSubsOnClickOn === 'toggler') {
        this.subHideAll();
      }
      if (this._collapse) {
        this._animateHide(this._collapse);
      }
      if (this._offcanvas) {
        this._animateHide(this._offcanvas);
      }
      if (this._offcanvasOverlay) {
        this._animateHide(this._offcanvasOverlay);
      }
      if (this._togglerState) {
        this._togglerState.classList.remove(this._opts.classShow);
        // Just in case try to remove the hash too
        window.location.hash = window.location.hash.replace(new RegExp("^#".concat(this._togglerState.getAttribute('id'), "$")), '');
      }
      if (this._togglerAnchorHide) {
        this._togglerAnchorShow.focus();
      }
      event.preventDefault();
      Events.trigger(this._navbar, "hide".concat(API_EVENTS_SUFFIX), this._collapse || this._offcanvas || null);
    }
  }, {
    key: "_togglerAnchorShowClick",
    value: function _togglerAnchorShowClick(event, element) {
      if (!this._handleEvents()) {
        return;
      }
      if (!Data.get(element, "beforefirstshow-fired".concat(DATA_SUFFIX))) {
        Data.set(element, "beforefirstshow-fired".concat(DATA_SUFFIX), true);
        if (Events.trigger(this._navbar, "beforefirstshow".concat(API_EVENTS_SUFFIX), this._collapse || this._offcanvas || null).defaultPrevented) {
          return;
        }
      }
      if (Events.trigger(this._navbar, "beforeshow".concat(API_EVENTS_SUFFIX), this._collapse || this._offcanvas || null).defaultPrevented) {
        return;
      }
      if (this._collapse) {
        this._animateShow(this._collapse);
      }
      if (this._offcanvas) {
        this._animateShow(this._offcanvas);
      }
      if (this._offcanvasOverlay) {
        this._animateShow(this._offcanvasOverlay);
      }
      if (this._togglerState) {
        this._togglerState.classList.add(this._opts.classShow);
      }
      if (this._togglerAnchorHide) {
        this._togglerAnchorHide.focus();
      }
      event.preventDefault();
      Events.trigger(this._navbar, "show".concat(API_EVENTS_SUFFIX), this._collapse || this._offcanvas || null);
    }
  }, {
    key: "_winResize",
    value: function _winResize(event) {
      if (!this._handleEvents()) {
        return;
      }

      // Hide subs on resize - on mobile do it only on orientation change
      if (!('onorientationchange' in window) || event.type === 'orientationchange') {
        var isCollapsible = this._isCollapsible();
        // If it was collapsible before resize and still is, don't do it
        if (!(this._wasCollapsible && isCollapsible)) {
          this.subHideAll();
        }
        this._wasCollapsible = isCollapsible;
      }
    } // Static
  }], [{
    key: "destroy",
    value: function destroy() {
      while (navbars.length > 0) {
        navbars[0].destroy();
      }
      MouseInputDetect.disable();
    }
  }, {
    key: "subHideAll",
    value: function subHideAll() {
      for (var _i2 = 0, _navbars = navbars; _i2 < _navbars.length; _i2++) {
        var navbar = _navbars[_i2];
        navbar.subHideAll();
      }
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY$2;
    }
  }, {
    key: "Dom",
    get: function get() {
      return {
        Data: Data,
        Events: Events,
        Helpers: Helpers,
        Query: Query
      };
    }
  }, {
    key: "MouseInputDetect",
    get: function get() {
      return MouseInputDetect;
    }
  }, {
    key: "navbars",
    get: function get() {
      return navbars;
    }
  }]);
  return SmartMenus;
}();

export default SmartMenus;
