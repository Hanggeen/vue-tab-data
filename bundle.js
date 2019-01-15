'use strict';

var config = {
  key: 'VStorageName'
};

var mixinData = function (keyObject) {
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
  var vueData = {};
  var localData = window.localStorage.getItem(config.key);
  if (localData === null || localData === '') {
    vueData = keyObject;
  } else {
    var localDataObj = JSON.parse(localData).data;
    for (var key in keyObject) {
      if (keyObject[key] !== null && keyObject[key] !== undefined) {
        vueData[key] = keyObject[key];
      } else {
        vueData[key] = localDataObj[key] || undefined;
      }
    }
  }
  return vueData
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
var storage = {
  get: function get (key) {
    var datastr = window.localStorage.getItem(config.key);
    if (datastr !== '' && datastr !== null) {
      var dataobj = JSON.parse(datastr);
      return dataobj.data[key] || null
    } else {
      return null
    }
  },
  set: function set (key, value) {
    var datastr = window.localStorage.getItem(config.key);
    if (datastr !== '' && datastr !== null) {
      var dataobj = JSON.parse(datastr);
      dataobj.data[key] = value;
      dataobj.msg.key = key;
      window.localStorage.setItem(config.key, JSON.stringify(dataobj));
    } else {
      var dataobj$1 = {
        data: {},
        msg: {
          key: ''
        }
      };
      dataobj$1.data[key] = value;
      dataobj$1.msg.key = key;
      window.localStorage.setItem(config.key, JSON.stringify(dataobj$1));
    }
  }
};

var mixinWatch = function (keyList, broadcast) {
  // 如果是广播的话，这个改动需要更改到localStorage
  // 检测到变化，就直接储存到localStorage
  // 注意这里还需要判断跟本地的差异
  var obj = {};
  if (broadcast) {
    var loop = function ( i ) {
      obj[keyList[i]] = function (newVal) {
        storage.set(keyList[i], newVal);
      };
    };

    for (var i = 0; i < keyList.length; i++) loop( i );
  }
  return obj
};

var mixinCreated = function (keyList, listen, self) {
  // 实现一个监听
  // 当localStorage有变化的时候，更改到本地
  if (listen) {
    window.addEventListener('storage', function (ev) {
      if (ev.key === config.key) {
        var obj = JSON.parse(ev.newValue);
        if (keyList.indexOf(obj.msg.key) !== -1) {
          self[obj.msg.key] = obj.data[obj.msg.key];
        }
      }
    });
  }
};

var VStorage = function (params, broadcast, listen) {
  if ( broadcast === void 0 ) broadcast = true;
  if ( listen === void 0 ) listen = true;

  var keyObject = {};
  var keyList = [];
  if (typeof params === 'object') {
    if (Array.isArray(params)) {
      keyList = params;
      for (var i = 0; i < params.length; i++) {
        keyObject[params[i]] = undefined;
      }
    } else {
      keyObject = params;
      for (var key in params) {
        keyList.push(key);
      }
    }
  } else if (typeof params === 'string') {
    keyObject[params] = undefined;
    keyList = [params];
  } else {
    throw new Error('参数不合法')
  }

  return {
    data: function data () {
      return mixinData(keyObject)
    },
    watch: mixinWatch(keyList, broadcast),
    created: function created () {
      var self = this;
      mixinCreated(keyList, listen, self);
    }
  }
};

module.exports = VStorage;
