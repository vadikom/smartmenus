/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

import Data from './dom-data.js'

const DATA_KEY = 'sm-events'

function normalizeArguments(events, selector, handler) {
  if (!handler && typeof selector === 'function') {
    handler = selector
    selector = ''
  }

  if (!events || typeof events === 'string') {
    const eventsObject = {}
    eventsObject[events || ''] = handler
    events = eventsObject
  }

  if (!selector) {
    selector = ''
  }

  // Support space separated events
  const eventsObject = {}
  for (const key of Object.keys(events)) {
    for (const event of key.split(' ')) {
      eventsObject[event] = events[key]
    }
  }

  events = eventsObject

  return [events, selector]
}

function parseEventNameAndNS(value) {
  const eventNameAndNS = value.split('.')
  return [eventNameAndNS[0], eventNameAndNS[1] || '']
}

const Events = {
  // Add a namespace to multiple events
  getEventsNS(events, ns = '') {
    const eventsNS = {}
    for (const key of Object.keys(events)) {
      eventsNS[key.split(' ').join(`${ns} `) + ns] = events[key]
    }

    return eventsNS
  },

  off(element, events, selector, handler) {
    const storage = Data.get(element, DATA_KEY)
    if (!storage) {
      return
    }

    [events, selector] = normalizeArguments(events, selector, handler)

    for (const key of Object.keys(events)) {
      const handler = events[key]
      if (handler && !storage.has(handler)) {
        return
      }

      const [eventName, eventNS] = parseEventNameAndNS(key)
      const handlersToDelete = []
      const handlersStorage = handler ? new Map().set(handler, storage.get(handler)) : storage

      for (const [handler, handlerStorage] of handlersStorage) {
        handlerStorage.eventHandlers = handlerStorage.eventHandlers.filter(eventHandler => {
          let keep = false
          if (eventName) {
            keep = !(eventName === eventHandler.eventName && (!eventNS || eventNS === eventHandler.eventNS) && (!selector || selector === eventHandler.selector))
          } else if (eventNS) {
            keep = !(eventNS === eventHandler.eventNS && (!selector || selector === eventHandler.selector))
          } else if (selector) {
            keep = selector !== eventHandler.selector
          }

          if (!keep) {
            element.removeEventListener(eventHandler.eventName, eventHandler.realHandler, Boolean(eventHandler.selector))
          }

          return keep
        })
        if (handlerStorage.eventHandlers.length === 0) {
          handlersToDelete.push(handler)
        }
      }

      for (const handler of handlersToDelete) {
        storage.delete(handler)
      }
    }
  },

  on(element, events, selector, handler) {
    let storage = Data.get(element, DATA_KEY)
    if (!storage) {
      storage = new Map()
      Data.set(element, DATA_KEY, storage)
    }

    [events, selector] = normalizeArguments(events, selector, handler)

    for (const key of Object.keys(events)) {
      const handler = events[key]
      const [eventName, eventNS] = parseEventNameAndNS(key)
      const realHandler = selector
        ? (/^mouse(enter|leave)$/.test(eventName)
          ? function (event) {
            const { target } = event
            if (target && target.matches && target.matches(selector) && element.contains(target)) {
              handler.call(target, event, target)
            }
          }
          : function (event) {
            const { target } = event
            const closest = target && target.closest && target.closest(selector)
            if (closest && element.contains(closest)) {
              handler.call(closest, event, closest)
            }
          })
        : function (event) {
          handler.call(element, event, element)
        }

      if (!storage.has(handler)) {
        storage.set(handler, { eventHandlers: [] })
      }

      const handlerStorage = storage.get(handler)
      handlerStorage.eventHandlers.push({
        eventName,
        eventNS,
        selector,
        realHandler
      })
      element.addEventListener(eventName, realHandler, Boolean(selector))
    }
  },

  trigger(element, eventName, data) {
    const event = new CustomEvent(eventName, { bubbles: true, cancelable: true, detail: data || null })
    element.dispatchEvent(event)
    return event
  }
}

export default Events
