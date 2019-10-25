//developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
;(function(): boolean {
  if (typeof window.CustomEvent === 'function') return false

  /*eslint @typescript-eslint/no-explicit-any: "off"*/
  function CustomEvent(event, params): CustomEvent<any> {
    params = params || { bubbles: false, cancelable: false, detail: null }
    const evt = document.createEvent('CustomEvent')
    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
    return evt
  }

  // @ts-ignore
  window.CustomEvent = CustomEvent
})()
