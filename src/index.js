import mixinData from './data'
import mixinWatch from './watch'
import mixinCreated from './created'
let VStorage = function (params, broadcast = true, listen = true) {
  var keyObject = {}
  var keyList = []
  if (typeof params === 'object') {
    if (Array.isArray(params)) {
      keyList = params
      for (let i = 0; i < params.length; i++) {
        keyObject[params[i]] = undefined
      }
    } else {
      keyObject = params
      for (let key in params) {
        keyList.push(key)
      }
    }
  } else if (typeof params === 'string') {
    keyObject[params] = undefined
    keyList = [params]
  } else {
    throw new Error('参数不合法')
  }

  return {
    data () {
      return mixinData(keyObject)
    },
    watch: mixinWatch(keyList, broadcast),
    created () {
      const self = this
      mixinCreated(keyList, listen, self)
    }
  }
}

export default VStorage
