import config from './config'
const mixinCreated = (keyList, listen, self) => {
  // 实现一个监听
  // 当localStorage有变化的时候，更改到本地
  if (listen) {
    window.addEventListener('storage', (ev) => {
      if (ev.key === config.key) {
        let obj = JSON.parse(ev.newValue)
        if (keyList.indexOf(obj.msg.key) !== -1) {
          self[obj.msg.key] = obj.data[obj.msg.key]
        }
      }
    })
  }
}
export default mixinCreated
