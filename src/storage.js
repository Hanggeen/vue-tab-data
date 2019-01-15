/*
  实现简单存取操作
  结构：
  storage: {
    data: {
      key: value
      ...
    },
    msg: {
      key: 'change_key_name'
    }
  }
 */
import config from './config'
const storage = {
  get (key) {
    var datastr = window.localStorage.getItem(config.key)
    if (datastr !== '' && datastr !== null) {
      var dataobj = JSON.parse(datastr)
      return dataobj.data[key] || null
    } else {
      return null
    }
  },
  set (key, value) {
    const datastr = window.localStorage.getItem(config.key)
    if (datastr !== '' && datastr !== null) {
      const dataobj = JSON.parse(datastr)
      dataobj.data[key] = value
      dataobj.msg.key = key
      window.localStorage.setItem(config.key, JSON.stringify(dataobj))
    } else {
      const dataobj = {
        data: {},
        msg: {
          key: ''
        }
      }
      dataobj.data[key] = value
      dataobj.msg.key = key
      window.localStorage.setItem(config.key, JSON.stringify(dataobj))
    }
  }
}

export default storage
