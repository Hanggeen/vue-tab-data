import storage from './storage'

const mixinWatch = (keyList, broadcast) => {
  // 如果是广播的话，这个改动需要更改到localStorage
  // 检测到变化，就直接储存到localStorage
  // 注意这里还需要判断跟本地的差异
  let obj = {}
  if (broadcast) {
    for (let i = 0; i < keyList.length; i++) {
      obj[keyList[i]] = function (newVal) {
        storage.set(keyList[i], newVal)
      }
    }
  }
  return obj
}
export default mixinWatch
