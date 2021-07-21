/**
 const dictionaryValue = {
  MTPCK_TYPECD: '料件成品标志',
  ORG_FLAG: '归并方式',
  LCL_FLAG: '包装标识',
  ISAUDITING: '审核标志',
  IS_TYPE: '自报自缴',
  DOC_DEC_TYPE: '报关单类型'
  CHK_STATUS_P: '报关单状态'
}
 const tableNames = {
  codCusCustomsrel: '进出口岸',
  codCusTrade: '监管方式',
  codCusTransf: '运输方式',
  codCusCountry: '国别',
  codCusLevymode: '征免性质',
  codCusTrans: '成交方式',
  codCusWrap: '包装种类'
}

 'codCusBrief', // 海关注册企业表
 'codCusBusitype', // 加工类别
 'codCusBusttype', // 企业类型
 'codCusClassify', // 商品归类表
 'codCusComplex', // 商品税则表
 'codCusCotype', // 企业性质
 'codCusCountry', // 国别地区
 'codCusCurr', // 币制代码
 'codCusCustomsfec', // 关区代码
 'codCusCustomsrel', // 口岸海关代码
 'codCusDistrictrel', // 国内地区
 'codCusDisttype', // 地区类别
 'codCusLctype', // 结汇方式
 'codCusLevymode', // 征免方式
 'codCusLevytype', // 征免性质
 'codCusLicensedocu', // 许可证件
 'codCusMfteccode', // 主管外经贸部门
 'codCusMftecode', // 外经贸部门
 'codCusPaymode', // 保税方式
 'codCusPaytype', // 支付方式
 'codCusPortlin', // 港口航线
 'codCusProducetype', // 生产方式
 'codCusTrade', // 监管方式
 'codCusTrademode', // 监管方式证件
 'codCusTrans', // 成交方式
 'codCusTransf', // 运输方式
 'codCusUnit', // 计量单位
 'codCusUserto', // 用途代码
 'codCusWrap', // 包装方式
 'codCusInvestmode', // 投资方式
 'codCusInvclass', // 引进方式

 'codStdAreaCode', // 场地代码
 'codStdClearanceType', // 通关业务类型
 'codStdContaParam', // 集装箱参数
 'codStdExchangeRate', // 汇率维护
 'codStdTransportType', // 运输类型
 'codStdCarType', // 车辆类型
 'codStdCarSort', // 车辆分类
 'codStdBusType', // 业务类型
 'codStdSprocesstype', // 简单加工方式
 'codStdEnttype', // 企业类型
 'codStdRsk', // 风险参数基础表
 'codStdBus', // 业务参数基础表
 'codStdTrpType', // 运输类型基础表

 'codBizBus', // 业务参数
 'codBizRsk', // 风险参数

 // 报关单基础cod
 'codCusCode', // 检验检疫代码名称
 'codCusOffice', // 检验检疫机关
 'codCusRelatedreasons', // 关联理由代码
 'codCusPermittype', // 企业产品许可类别代码
 'codCusPurpose', // 用途代码
 'codCusPackingtype', // 包装种类代码
 'codCusDangerbag', // 危包规格代码
 'codCusGoodsprop', // 货物属性代码
 'codCusBusinessmatters', // 业务选项代码
 'codCusSpecialbuss', // 特殊业务标识
 'codCusProductPermiType', // 企业资质类别
 'codCusCertBillName', // 检验检疫签证申报要素
 'codCusEdoctype', // 随附单据类型
 'codCusCurrNew', // 报关单币制代码
 'codCusCountryNew', // 报关单国别地区
 'codCusWorldFirstDistrict' //  报关单国际地区
 'codCusPortlinNew'// 报关单港口航线
 'codCusChinaregionalism' // 报关单国内地区
 */

import Vue from 'vue'
import request from '@/utils/request'
import { idToText } from '@/utils/dataSourceFn'

const localData = Vue.observable({
  dataSource: {},
  dictionary: {},
})

/**
 * #=获取表单字段数据源
 * @param {String} tableNames
 */
export function getDataSource (tableNames) {
  return cacheData('/redis/getDataSource', 'tableNames', tableNames, 'dataSource')
}

/**
 * #=表单字段数据字典
 * @param {String} dictionaryValue
 */
export function getDictionary (dictionaryValue) {
  return cacheData('/redis/getDictionary', 'dictionaryValue', dictionaryValue, 'dictionary')
}

/**
 * 获取数据字典可响应代理
 * @param tableNames
 * @param callback
 * @return {{}}
 */
export function dataDictionaryRef (tableNames, callback = _ => _) {
  getDictionary(tableNames).then(callback)
  return localData.dictionary
}

/**
 * #=el-table单元格字典格式化方法
 * @param tableName
 * @return {function(*, *, *=, *): *}
 */
export function dataDictionaryFormatter (tableName) {
  const dataDictionary = dataDictionaryRef(tableName)
  return (row, column, cellValue, index) => {
    return idToText(dataDictionary[tableName], cellValue)
  }
}

/**
 * 获取数据源可响应代理
 * @param tableNames
 * @param callback
 * @return {{}}
 */
export function dataSourceRef (tableNames, callback = _ => _) {
  getDataSource(tableNames).then(callback)
  return localData.dataSource
}

/**
 * #=el-table单元格数据源格式化方法
 * @param tableName
 * @return {function(*, *, *=, *): *}
 */
export function dataSourceFormatter (tableName) {
  const dataSource = dataSourceRef(tableName)
  return (row, column, cellValue, index) => {
    return idToText(dataSource[tableName], cellValue)
  }
}

/**
 * #=加载表单字段的数据源
 * @param {Object} dataSourceKeys - {fieldName: 'dataSourceKey', fieldName2: 'dataSourceKey2'}
 * @return {Promise}
 * @example
 * loadDataSource({fieldName: 'dataSourceKey'}) // 返回 {fieldName: [dataSourceArray]}
 */
export function loadDataSource (dataSourceKeys) {
  const values = [...new Set(Object.values(dataSourceKeys))]
  return getDataSource(values.join(',')).then(res => {
    const data = {}
    for (let [k, v] of Object.entries(dataSourceKeys)) {
      data[k] = res.data[v]
    }
    return data
  })
}

/**
 * #=加载表单字段的数据字典
 * @param {Object} dataDictionaryKeys - {fieldName: 'dataDictionaryKey', fieldName2: 'dataDictionaryKey2'}
 * @return {Promise}
 * @example
 * loadDataDictionary({fieldName: 'dataDictionaryKeys'}) // 返回 {fieldName: [dataDictionaryArray]}
 */
export function loadDataDictionary (dataDictionaryKeys) {
  const values = [...new Set(Object.values(dataDictionaryKeys))]
  return getDictionary(values.join(',')).then(res => {
    const data = {}
    for (let [k, v] of Object.entries(dataDictionaryKeys)) {
      data[k] = res.data[v]
    }
    return data
  })
}

/***
 * #=缓存数据
 * @param {String} url
 * @param {String} keyName
 * @param {String} keyValue
 * @param {String} group
 * @returns {Promise}
 */
function cacheData (url, keyName, keyValue, group = '') {
  const data = {}
  const values = keyValue.split(',')
  const others = []

  values.forEach(key => {
    if (localData[group][key]) {
      data[key] = localData[group][key]
    } else {
      localData[group][key] = null
      others.push(key)
    }
  })

  if (others.length) {
    return request({
      url,
      method: 'get',
      params: {
        [keyName]: others.join(','),
      },
    }).then(res => {
      Object.keys(res.data).forEach(key => {
        const list = (res.data[key] || [])
          .map(item => {
            Object.freeze(item)
            return item
          })
        Object.freeze(list)
        localData[group][key] = list
        data[key] = list
      })
      return { data }
    })
  } else {
    return new Promise(resolve => {
      resolve({ data })
    })
  }
}
