/*
 * SmartMenus
 * http://www.smartmenus.org/
 * Copyright (c) since 2001 Vasil Dinkov, Vadikom Web Ltd. http://vadikom.com
 * Licensed MIT https://github.com/vadikom/smartmenus/blob/master/LICENSE-MIT
 */

import Events from './dom-events.js'

const DATA_KEY = 'sm-mouse'
const EVENTS_NS = `.${DATA_KEY}`

let supportMouseInput // true/false when detection is enabled, undefined when detection is disabled
const supportPointerEvents = typeof window === 'undefined' ? false : Boolean(window.PointerEvent)

const MouseInputDetect = {
  get supportMouseInput() {
    return supportMouseInput
  },

  disable() {
    if (supportMouseInput !== undefined) {
      Events.off(document, EVENTS_NS)
      supportMouseInput = undefined
    }
  },

  enable(callbackOnFirstDetection) {
    if (supportMouseInput === undefined) {
      supportMouseInput = false
      // If we get two consecutive mousemoves within 4 pixels from each other and within 300ms, we assume a real mouse/cursor is present
      // in practice, this seems like impossible to trick unintentianally with a real mouse and a pretty safe detection on touch devices (even with older browsers that do not support touch events)
      let isFirstDetection = true
      let lastMove = null
      const events = {
        mousemove(event) {
          const thisMove = { x: event.pageX, y: event.pageY, timeStamp: Date.now() }
          if (lastMove) {
            const deltaX = Math.abs(lastMove.x - thisMove.x)
            const deltaY = Math.abs(lastMove.y - thisMove.y)
            if ((deltaX > 0 || deltaY > 0) && deltaX <= 4 && deltaY <= 4 && thisMove.timeStamp - lastMove.timeStamp <= 300) {
              supportMouseInput = true
              if (isFirstDetection) {
                if (callbackOnFirstDetection) {
                  callbackOnFirstDetection(event)
                }

                isFirstDetection = false
              }
            }
          }

          lastMove = thisMove
        }
      }

      events[supportPointerEvents ? 'pointerover pointermove pointerout' : 'touchstart'] = event => {
        if (!/^(4|mouse)$/.test(event.pointerType)) {
          supportMouseInput = false
        }
      }

      Events.on(document, Events.getEventsNS(events, EVENTS_NS))
    }
  }
}

export default MouseInputDetect
