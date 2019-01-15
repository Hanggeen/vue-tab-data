const config = {
  key: 'VStorageName'
};

const mixinData = keyObject => {
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
  let vueData = {};
  let localData = window.localStorage.getItem(config.key);

  if (localData === null || localData === '') {
    vueData = keyObject;
  } else {
    let localDataObj = JSON.parse(localData).data;

    for (let key in keyObject) {
      if (keyObject[key] !== null && keyObject[key] !== undefined) {
        vueData[key] = keyObject[key];
      } else {
        vueData[key] = localDataObj[key] || undefined;
      }
    }
  }

  return vueData;
};

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
const storage = {
  get(key) {
    var datastr = window.localStorage.getItem(config.key);

    if (datastr !== '' && datastr !== null) {
      var dataobj = JSON.parse(datastr);
      return dataobj.data[key] || null;
    } else {
      return null;
    }
  },

  set(key, value) {
    const datastr = window.localStorage.getItem(config.key);

    if (datastr !== '' && datastr !== null) {
      const dataobj = JSON.parse(datastr);
      dataobj.data[key] = value;
      dataobj.msg.key = key;
      window.localStorage.setItem(config.key, JSON.stringify(dataobj));
    } else {
      const dataobj = {
        data: {},
        msg: {
          key: ''
        }
      };
      dataobj.data[key] = value;
      dataobj.msg.key = key;
      window.localStorage.setItem(config.key, JSON.stringify(dataobj));
    }
  }

};

const mixinWatch = (keyList, broadcast) => {
  // 如果是广播的话，这个改动需要更改到localStorage
  // 检测到变化，就直接储存到localStorage
  // 注意这里还需要判断跟本地的差异
  let obj = {};

  if (broadcast) {
    for (let i = 0; i < keyList.length; i++) {
      obj[keyList[i]] = function (newVal) {
        storage.set(keyList[i], newVal);
      };
    }
  }

  return obj;
};

const mixinCreated = (keyList, listen, self) => {
  // 实现一个监听
  // 当localStorage有变化的时候，更改到本地
  if (listen) {
    window.addEventListener('storage', ev => {
      if (ev.key === config.key) {
        let obj = JSON.parse(ev.newValue);

        if (keyList.indexOf(obj.msg.key) !== -1) {
          self[obj.msg.key] = obj.data[obj.msg.key];
        }
      }
    });
  }
};

let VStorage = function (params, broadcast = true, listen = true) {
  var keyObject = {};
  var keyList = [];

  if (typeof params === 'object') {
    if (Array.isArray(params)) {
      keyList = params;

      for (let i = 0; i < params.length; i++) {
        keyObject[params[i]] = undefined;
      }
    } else {
      keyObject = params;

      for (let key in params) {
        keyList.push(key);
      }
    }
  } else if (typeof params === 'string') {
    keyObject[params] = undefined;
    keyList = [params];
  } else {
    throw new Error('参数不合法');
  }

  return {
    data() {
      return mixinData(keyObject);
    },

    watch: mixinWatch(keyList, broadcast),

    created() {
      const self = this;
      mixinCreated(keyList, listen, self);
    }

  };
};

export default VStorage;
