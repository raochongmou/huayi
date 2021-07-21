/**
 * #=对象压缩删除值为undefined的属性
 * #=给目标对象的属性设值（等于合并对象，不过只保留目标对象的属性）
 * #=检查一个对象的属性的值是否有改变
 * #=判断俩个对象是否相等
 * #=将JSON对象参数编译成search URL-encoded字符串
 * #=获取url参数
 * #=复制数组
 */

/**
 * #=对象压缩删除值为undefined的属性
 * @param  {object} target - 目标对像
 * @return {object}        压缩后的对象
 */
export function objectReduce (target) {
  const obj = {}
  Object.keys(target).forEach(el => {
    if (target[el] !== undefined) {
      obj[el] = target[el]
    }
  })
  return obj
}

/**
 * #=给目标对象的属性设值（等于合并对象，不过只保留目标对象的属性）
 * @param  {object}    target  - 目标对像
 * @param  {...object} objects - 值对象
 * @return {object} 目标对像
 */
export function objectFill (target, ...objects) {
  if (objects.length > 0) {
    let obj = {}
    for (let val of objects) {
      Object.assign(obj, val)
    }
    Object.keys(target).forEach(function (key) {
      if (obj[key] !== undefined) {
        target[key] = obj[key]
      }
    })
  }
  return target
}

/**
 * #=检查一个对象的属性的值是否有改变
 * @param {object} target - 目标对像
 * @param {object} object - 比较对象
 * @return {boolean} 检查结果
 */
export function objectIsChanged (target, object) {
  let isChanged = false
  for (const key of Object.keys(target)) {
    if (target[key] !== object[key]) {
      isChanged = true
      break
    }
  }
  return isChanged
}

/**
 * #=判断俩个对象是否相等
 * @param {object} target - 目标对像
 * @param {object} object - 比较对象
 * @return {boolean} 比较结果
 */
export function objectEquals (target, object) {
  const targetKeys = Object.keys(target)
  const objectKeys = Object.keys(object)

  if (targetKeys.length !== objectKeys.length) {
    return false
  }

  for (const key of targetKeys) {
    if (target[key] === object[key] && typeof target[key] === 'object' && typeof object[key] === 'object') {
      const equal = objectEquals(target[key], object[key])
      if (!equal) {
        return false
      }
    }
    if (target[key] !== object[key]) {
      return false
    }
  }
  return true
}

/**
 * #=将JSON对象参数编译成search URL-encoded字符串
 * @param {object} json
 * @returns {string}
 */
export function JsonSerialize (json = {}) {
  let str = ''
  if (json) {
    Object.keys(json).forEach(key => {
      str += `${str ? '&' + key : key}=${json[key]}`
    })
  }
  return encodeURI(str)
}

/**
 * #=获取url参数
 * @param {string} url
 * @return {Object} 返回一个GET参数JSON
 */
export function getUrlParams (url) {
  const search = url.split('?')[1]
  const args = {}
  if (search) {
    const reg = /(?:([^&]+)=([^&]+))/g
    let match = reg.exec(search)
    while (match) {
      args[match[1]] = match[2]
      match = reg.exec(search)
    }
  }
  return args
}

/**
 * #=复制数组
 * @param {Array} arr
 * @return {Array} 返回一个新数组
 */
export function arrayCopy (arr) {
  return arr.map((e) => {
    if (typeof e === 'object') {
      return Object.assign({}, e)
    } else {
      return e
    }
  })
}
