import config from './config'
const mixinData = (keyObject) => {
/*
  从本地读取数据，
  对于当前实例，
  如果传入有值，则用传入值，
  如果传入无值，则用本地缓存值，
  如果本地缓存没有值，则用null
  TODO
  如果传入的数据，跟本地缓存的数据不符合
  那么是要把新数据写入本地缓存吗
*/
  let vueData = {}
  let localData = window.localStorage.getItem(config.key)
  if (localData === null || localData === '') {
    vueData = keyObject
  } else {
    let localDataObj = JSON.parse(localData).data
    for (let key in keyObject) {
      if (keyObject[key] !== null && keyObject[key] !== undefined) {
        vueData[key] = keyObject[key]
      } else {
        vueData[key] = localDataObj[key] || undefined
      }
    }
  }
  return vueData
}
export default mixinData
