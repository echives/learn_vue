interface INativeResponse {
  err: number,
  data: any
}

enum ERRORS {
  NULL = 0,
  TIMEOUT = 1
}

const globalScope = window as any

export async function runBridge (name: string, params: any, callback?: (response: INativeResponse) => void, timeout: number = 0) {
  if (callback) {
    const callbackName = `${name}_${Date.now()}`
    registryCallback(callbackName, callback, timeout)
    sendToNative(name, params, callbackName)
  } else {
    sendToNative(name, params)
  }
}

function sendToNative (name: string, params: any, callback?: string) {
  const messageHandler = globalScope.webkit && globalScope.webkit.messageHandlers
  const paramsObj = { ...params }
  if (callback) {
    paramsObj['callback'] = callback
  }
  if (messageHandler) {
    if (messageHandler[name]) {
      messageHandler[name].postMessage(paramsObj)
      return true
    }
  }
  return false
}

const registryCallbackWithPromise = (resolve: (params: INativeResponse) => void,
  reject: (err: INativeResponse) => void, name: string, timeout = 0) => {
  let timeId = -1
  if (timeout > 0) {
    timeId = setTimeout(() => {
      reject({
        err: ERRORS.TIMEOUT,
        data: {}
      })
    }, timeout)
  }
  const callbackFunction = (response: any) => {
    if (timeId) {
      clearTimeout(timeId)
    }
    const err = response.err
    const data = response.data
    if (err) {
      reject({ err: err, data: {} })
    } else if (data) {
      resolve({
        data: data,
        err: ERRORS.NULL
      })
    }
  }
  globalScope[name] = callbackFunction
}

const registryCallback = (name: string, callback: (response: INativeResponse) => void, timeout = 0) => {
  let timeId = -1
  if (timeout > 0) {
    timeId = setTimeout(() => {
      globalScope[name] = ''
      callback({ err: ERRORS.TIMEOUT, data: {} })
    }, timeout)
  }
  globalScope[name] = (response: any) => {
    const error = response.err
    const dataJSON = response.dataJSON
    const data = JSON.parse(dataJSON)
    clearTimeout(timeId)
    callback({ err: error, data: data})
  }
}