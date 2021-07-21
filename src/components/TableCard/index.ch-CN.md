TableCard

表格面板

### 基本用法

``` vue
<template>
    <table-card
      :columns="columns"
      :getList="fetchData"></table-card>
</template>
<script>

export default {
  data () {
    return {
      columns: [
        { prop: 'f0', label: '列1' }, // 列的属性与 el-table-column 的属性是一样的
        { prop: 'f1', label: '列2' },
        { prop: 'f2', label: '列3' },
      ]
    }
  },
  methods: {
    fetchData () {
      return new Promise(resolve => {
        resolve({
          'data': [
            {
              'f0': 0,
              'f1': 0,
              'f2': 0,
            },
            {
              'f0': 0,
              'f1': 0,
              'f2': 0,
            }],
          'total': 2 // 总数行数，用于分页
        })
      })
    }
  }
}
</script>
```

### 高级用法

``` vue
<template>
  <table-card
    :getList="fetchData"
    :columns="columns"
    :actionColumns="actionColumns"
    @action="handleActions">
  </table-card>
</template>
<script>
export default {
  components: {
    TableCard
  },
  data () {
    const h = this.$createElement
    return {
      columns: [
        { prop: 'f0', label: '列1' }, // 列的属性与 el-table-column 的属性是一样的
        { prop: 'f1', label: '列2', formatter: `filterA()` }, // 使用过滤器函数格式化数据
        // 自定义格式化数据
        {
          prop: 'f2',
          label: '列3',
          formatter: (row, column, cellValue, index) => {
            return h('span', cellValue)
          }
        },
      ],
      // 操作列按钮
      actionColumns: [
        { key: 'del', label: '删除' }, // 除了"key"属性，其他的属性与el-button相同
        { key: 'disable', type: 'info', label: '禁用' }
      ]
    }
  },
  methods: {
    fetchData () {
      return new Promise(resolve => {
        resolve({
          'data': [
            {
              'f0': 0,
              'f1': 0,
              'f2': 0,
            }],
          'total': 1 // 总数行数，用于分页
        })
      })
    },
    handleActions (key, row) {
      console.log(key, row)
    }
  }
}
</script>
```

### Attributes

| 参数              | 说明                                                         | 类型     | 可选值                | 默认值 |
| ----------------- | ------------------------------------------------------------ | -------- | --------------------- | ------ |
| getList           | 获取数据的方法，返回一个Promise对象                          | Function | —                     | —      |
| columns           | 表格列数组, 列的属性可查看[el-table-column的属性](http://element.eleme.io/#/zh-CN/component/table) | Array    | —                     | —      |
| actionColumns     | 操作列操作按钮数组                                           | Array    | —                     | —      |
| actionColumnWidth | 操作列的宽度                                                 | String   | —                     | —      |
| form              | 查询表单字段配置数组                                         | Array    | —                     | —      |
| extraParam        | 额外的查询参数对象，对象中的参数会覆盖查询表单有相同名称的字段 | Object   | —                     | —      |
| size              | 表格大小                                                     | String   | medium / small / mini | small  |
| height            | 表格高度                                                     | String   | —                     | 484px  |
| noPagination      | 关闭分页                                                     | Boolean  | —                     | false  |
| noAutoLoad        | 关闭自动加载                                                 | Boolean  | —                     | false  |
| $attrs            | 以上没有的属性会直接绑定el-table中，可以查看[el-table的属性](http://element.eleme.io/#/zh-CN/component/table) | Function | —                     | —      |
| $listeners        | 没有的事件会直接绑定el-table中，可以查看[el-table的事件](http://element.eleme.io/#/zh-CN/component/table) | Function | —                     | —      |

### Methods

| 方法名 | 说明                   | 参数       |
| ------ | ---------------------- | ---------- |
| query  | 查询，可以临时附加参数 | (param={}) |

### Slot

| 名称    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| —       | 追加到表格前面的内容，可以通过`slot-scope="{query, urrentRow, selectedRows}"`获取已经选择的行,与查询的操作方法                                         |
| toolbar | 工具栏 |
| form    | 表单  |

### Events

| 事件名称 | 说明                                                       | 回调参数 |
| -------- | ---------------------------------------------------------- | -------- |
| action   | 操作列点击回调，参数key为操作按钮的标识，row为当前行的数据 | key, row |
