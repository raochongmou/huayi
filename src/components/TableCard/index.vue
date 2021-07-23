<template>
  <el-card
    class="x-table-card"
    :header="title"
    :shadow="tight?'never': 'always'"
    :class="tight?'tight-box-card':''"
  > 
    <!-- el-card-header -->
    <template slot="header">
      <slot name="header"></slot>
    </template>

    <!-- 动态表 -->
    <el-collapse-transition v-if="hasForm">
      <div class="x-table-card__form" v-show="searchVisible" ref="searchForm">
        <x-dynamic-form
          v-if="form.length > 0"
          ref="dynamicForm"
          @keyup.enter.native="handleSearch"
          class="x-query-form float-right"
          :value="formValue"
          :size="size"
          :labelWidth="labelWidth"
          :colSpan="formColSpan"
          :fields="form">
          <template v-for="(item) in form" v-slot:[item.name]="{ formData }">
            <slot :name="'search_' + item.name" :form-data="formData"></slot>
          </template>
          <div>
            <el-button type="primary" @click="handleSearch" size="mini">查询</el-button>
            <el-button @click="handleReset" size="mini">清除</el-button>
            <el-button @click="searchVisible = false" size="mini">收起</el-button>
          </div>
        </x-dynamic-form>
        <slot name="form" :query="query"></slot>
      </div>
    </el-collapse-transition>

    <!-- 工具 -->
    <div class="x-table-card__toolbar" v-if="extraBtns.length > 0 || btnGroup">
      <slot
        name="toolbar"
        :list="list"
        :current-row="currentRow"
        :selected-rows="selectedRows"
      >
        <span
          v-for="btn in filterExtraBtns(extraBtns)"
          v-show="ckRoles(btn.key)"
          :key="btn.key"
          class="extraBtn-span"
        >
          <el-dropdown
            v-if="btn.isDropDownBtn"
          >
            <el-button
              :size="btnGroupSize"
              :disabled="extraBtnDisabled(btn.disabled, {currentRow, selectedRows, list})"
              :type="btn.type || 'text'"
            > {{ btn.label }} <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in btn.dropdownList" :key="item.key"
                @click.native="handleExtraBtnAction(item.key, btn, {currentRow, selectedRows, list})"
              >{{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button
            v-else
            :size="btnGroupSize"
            :icon="btn.icon"
            :type="btn.type || 'text'"
            :loading="extraBtnLoading(btn.loading)"
            :disabled="extraBtnDisabled(btn.disabled, {currentRow, selectedRows, list})"
            @click.native="handleExtraBtnAction(btn.key, btn, {currentRow, selectedRows, list})"
          >{{ btn.label }}
          </el-button>
        </span>
        <slot
          name="toolbarExtraContent"
          :list="list"
          :current-row="currentRow"
          :selected-rows="selectedRows"
        ></slot>
        <div class="toolbar-right-btn">
          <el-button-group round>
            <slot name="toolbarBtn"></slot>
            <el-button
              v-if="deleteBtnVisible"
              size="mini"
              title="删除"
              icon="el-icon-delete"
              :disabled="toolBtnDisabled"
              @click="handleDelete"
            ></el-button>
            <el-button v-if="refreshBtnVisible" size="mini" title="刷新" :disabled="toolBtnDisabled"
                       @click="refresh"
                       icon="el-icon-refresh"></el-button>
            <el-button v-if="searchBtnVisible" size="mini" ref="searchIcon" :disabled="toolBtnDisabled" title="搜索"
                       @click="searchVisible = true"
                       icon="el-icon-search"></el-button>
            <el-button v-if="exportBtnVisible" size="mini" title="导出" @click="handleExport"
                       icon="el-icon-printer"></el-button>
            <!-- <el-button size="mini" @click="refresh" title="设置" v-if="settingBtnVisible" icon="el-icon-setting"></el-button> -->
          </el-button-group>
        </div>
      </slot>
    </div>

    <!-- 内容 -->
    <div class="x-table-card__body">
      <el-tabs v-model="tabs" type="card" v-if="tabsLabel.length > 0" @tab-click="tabsClick">
        <el-tab-pane :label="item" :name="item" :key="index" v-for="(item, index) in tabsLabel"></el-tab-pane>
      </el-tabs>

      <el-table
        v-loading="listLoading"
        ref="table"
        style="width: 100%"
        :data="list"
        highlight-current-row
        fit
        stripe
        :size="size"
        :row-key="rowKey"
        :current-row-key="currentRowKey"
        :height="visibleHeight || (height==='auto' || height==='' ? null : height)"
        :row-class-name="rowClassName"
        v-bind="$attrs"
        v-on="$listeners"
        @current-change="handleTableCurrentChange"
        @select="handleTableSelect"
        @selection-change="handleTableSelectionChange"
        @sort-change="handleTableSortChange"
        @row-dblclick="handleRowDbclick"
      >
        <el-table-column
          v-if='!showSelection && defaultCkFirstItem'
          fixed="left"
          width="36px"
          align="center"
          :resizable="false"
        >
          <template slot-scope="scope">
            <el-radio class="cell-radio" :value="isCurrentRow(scope.row)" :label="true"></el-radio>
          </template>
        </el-table-column>
        <el-table-column
          v-if='showSelection'
          fixed="left"
          type="selection"
          width="36px"
          align="center"
          :resizable="false"
          :selectable="selectableFn"
          :reserve-selection="true"
        />
        <el-table-column
          v-for="col in filterColumns(columns)"
          :prop="col.prop"
          :type="col.type"
          :label="col.label"
          :width="col.width"
          :min-width="col.minWidth"
          :align="col.align"
          :header-align="col.headerAlign"
          :minWidth="col.minWidth||''"
          :sortable="col.sortable"
          :show-overflow-tooltip="col.showOverflowTooltip || false"
          :formatter="formatter(col.formatter)"
          :index="(i)=>(((pagination.pageNum-1) * pagination.pageSize)  + i + 1)"
          :key="col.prop"
        />
        <slot></slot>
        <el-table-column
          v-if='actionColumns && actionColumns.length>0'
          fixed="right"
          align="center"
          label="操作"
          :width="actionColumnWidth"
        >
          <template slot-scope="scope">
          <span class="el-button-wrap--action-column" v-for="action in actionColumns" :key="action.key">
            <el-button
              :key="action.key"
              v-if="actionBtnShow(action.hidden, scope.row) && ckRoles(action.key)"
              :size="action.size || 'normal'"
              :type="action.type || 'text'"
              :icon="action.icon"
              :plain="action.plain"
              :round="action.round"
              :circle="action.circle"
              :title="action.title"
              :disabled="actionBtnDisabled(action.disabled, scope.row)"
              @click.native="handleAction(action.key, scope.row, action)"
            >
            <template v-if="action.label">{{ action.label }}</template>
          </el-button>
          </span>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="$scopedSlots.actionColumns || $slots.actionColumns"
          fixed="right"
          align="center"
          label="操作"
          :width="actionColumnWidth"
        >
          <template slot-scope="scope">
            <slot name="actionColumns" :row="scope.row"></slot>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="!noPagination"
        class="table-pagination"
        :layout="pagination.layout"
        :current-page="pagination.pageNum"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      <span class="el-pagination__jump" style="margin-left: 0">
        <el-input
          class="el-pagination__editor"
          :value="userInputPageNum!==null ? userInputPageNum : pagination.pageNum"
          @input="v=>userInputPageNum=+v"
          @change="v=>{userInputPageNum=null;handleCurrentChange(+v)}" />
        / {{ Math.ceil(pagination.total / pagination.pageSize) }}
      </span>
      </el-pagination>
    </div>
    <!-- el-card-footer -->
    <slot name="footer"></slot>
  </el-card>
</template>

<script>
// import XDynamicForm from '@/components/XDynamicForm'

export default {
  name: 'TableCard',
  // components: { XDynamicForm },
  inject: {
    'getPageVisualHeight': {
      default: () => {
        return () => window.innerHeight
      },
    },
    'getPageScrollHeight': {
      default: () => {
        return () => document.body.scrollHeight
      },
    },
  },
  props: {
    title: String,
    data: {
      type: Array,
      default: () => [],
    },
    getList: {
      type: Function,
    },
    size: {
      type: String,
      default: 'small',
    },
    height: {
      type: [Number, String],
      default: '441px',
    },
    minHeight: {
      type: [Number, String],
      default: 256,
    },
    // 为了减少出现多条滚动条，TableCard将根据页面的可视高度自动修正表格高度
    // 如果visualHeight=0时，不使用修正，1-100时，修正表格高度为1%-100%
    // 例：两下表格同时显示在页面时，可设visualHeight=50，
    visualHeight: {
      type: Number,
      default: 100,
    },
    labelWidth: {
      type: String,
      default: '120px',
    },
    formColSpan: {
      type: Number,
      default: 8,
    },
    selectableFn: {
      type: Function,
    },
    deleteList: {
      type: Function,
    },
    exportList: {
      type: Function,
    },
    rowClassName: [String, Function],
    form: {
      type: Array,
      default: () => [],
    },
    formValue: {
      type: Object,
      default: () => ({}),
    },
    extraParam: {
      type: Object,
      default: () => ({}),
    },
    exportParams: {
      type: Object,
      default: () => ({}),
    },
    columns: {
      type: Array,
      required: true,
    },
    paginationParam: {
      type: Object,
      default: () => ({}),
    },
    actionColumns: Array,
    actionColumnWidth: {
      type: String,
      default: '90',
    },
    extraBtns: {
      type: Array,
      default: () => [],
    },
    btnGroup: {
      type: String,
      default: '',
    },
    btnGroupSize: {
      type: String,
      default: 'mini',
    },
    showSelection: {
      type: Boolean,
      default: false,
    },
    defaultCkFirstItem: {
      type: Boolean,
      default: true,
    },
    checkFirstAfterRefresh: {
      type: Boolean,
      default: false,
    },
    tabsLabel: {
      type: Array,
      default: () => [],
    },
    tight: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: [String, Function],
      default: 'oid',
    },
    noPagination: Boolean,
    noAutoLoad: {
      type: Boolean,
      default: false,
    },
    rowChangeDisabled: {
      type: Boolean,
      default: false,
    },
    defaultCkAll: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      list: [],
      listLoading: false,
      currentRow: null,
      currentRowKey: null,
      toolBtnDisabled: false,
      selectedRows: [],
      searchVisible: false,
      tabs: this.tabsLabel[0],
      pagination: Object.assign({
        'sort': '',
        'sortOrder': '',
        'pageSizes': [10, 20, 50, 100, 300, 500, 1000],
        'pageSize': 10,
        'pageNum': 1,
        'total': 0,
        'layout': '->, prev, pager, next, jumper, total, sizes',
      }, this.paginationParam),
      userInputPageNum: null,
      visibleHeight: 0,
      searchParam: {},
    }
  },
  computed: {
    filterExtraBtns () {
      return (btns) => {
        return (btns || []).filter(btn => {
          if (typeof btn.hidden === 'function') {
            return btn.hidden() !== true
          } else {
            return btn.hidden !== true
          }
        })
      }
    },
    filterColumns () {
      return (columns) => {
        return (columns || []).filter(column => {
          if (typeof column.hidden === 'function') {
            return column.hidden() !== true
          } else {
            return column.hidden !== true
          }
        })
      }
    },
    formatter () {
      return (fn) => {
        if (typeof fn === 'function') {
          return fn
        } else if (typeof fn === 'string') {
          // 使用全局过滤器格式化单元格内
          const res = fn.match(/^([^\f\n\r]*)\(([^\f\n\r]*)\)/)
          const name = res ? res[1] : fn
          const args = res ? (res[2] !== '' ? res[2].split(',') : []) : []
          const filter = this.$options.filters[name]
          return filter ? (...val) => {
            const arr = args.map(el => {
              /* eslint-disable no-eval */
              return window.eval(el)
            })
            return filter(val[2], ...arr)
          } : console.error(`undefined filter {name}`)
        }
      }
    },
    refreshBtnVisible () {
      return this.btnGroup.indexOf('refresh') !== -1
    },
    deleteBtnVisible () {
      return (this.btnGroup.indexOf('delete') !== -1 && this.ckRoles('delete'))
    },
    searchBtnVisible () {
      return this.btnGroup.indexOf('search') !== -1
    },
    settingBtnVisible () {
      return this.btnGroup.indexOf('setting') !== -1
    },
    exportBtnVisible () {
      return this.btnGroup.indexOf('export') !== -1
    },
    hasForm () {
      return this.form.length > 0 || this.$scopedSlots.form || this.$slots.form
    },
    actionBtnShow () {
      return (hidden, row) => {
        return typeof hidden === 'function' ? !hidden(row) : !hidden
      }
    },
    actionBtnDisabled () {
      return (disabled, row) => typeof disabled === 'function' ? disabled(row) : disabled
    },
    extraBtnDisabled () {
      return (disabled, data) => typeof disabled === 'function' ? disabled(data) : disabled
    },
    extraBtnLoading () {
      return (loading) => typeof loading === 'function' ? loading() : loading
    },
    isCurrentRow () {
      return (row) => {
        return (this.currentRow || {})[this.rowKey] === row[this.rowKey]
      }
    },
    toolbarBtns () {
      return {}
    },
  },
  watch: {
    painationParam (v) {
      this.pagination = Object.assign(this.pagination, v)
    },
    columns () {
      this.$nextTick(() => {
        this.doLayout()
      })
    },
  },
  methods: {
    ckRoles (key) {
      const btnFlags = (this.$store.getters.btnFlags || '').split(',').map(btn => btn.toLowerCase())
      return !btnFlags.includes(key.toLowerCase())
    },

    doLayout () {
      this.$nextTick(() => {
        if (this.visualHeight) {
          const tableHeight = this.$refs.table.$el.offsetHeight
          if (tableHeight) {
            const vh = (this.getPageVisualHeight() - this.getPageScrollHeight() + tableHeight) * (this.visualHeight / 100)
            const minH = parseFloat(this.minHeight)
            this.visibleHeight = vh < minH ? minH : vh
          }
        }
        this.$refs.table.doLayout()
      })
    },

    fetchData (data = {}, tempParam = {}) {
      if (!this.getList) {
        return Promise.reject(new Error(''))
      }
      this.listLoading = true
      const page = this.pagination
      const query = { ...data, ...this.extraParam, ...tempParam }
      const listQuery = this.noPagination ? query : {
        ...query,
        pageSize: page.pageSize,
        pageNum: page.pageNum,
        sort: page.sort,
        sortOrder: page.sortOrder,
      }
      return this.getList(listQuery).then(res => {
        this.searchParam = Object.assign({}, listQuery)
        // 修正当前列表页所有数据数据被删除后，刷新表格空白的问题
        if (page.pageNum > 1 && res.total <= page.pageSize * (page.pageNum - 1)) {
          page.pageNum = res.total === 0 ? 1 : Math.ceil(res.total / page.pageSize)
          listQuery.pageNum = page.pageNum
          return this.getList(listQuery)
        } else {
          return res
        }
      }).then(res => {
        // 修正Id
        res.data.forEach((row, index) => {
          if (this.rowKey === 'oid' && (typeof row['oid'] === 'undefined' || row['oid'] === null)) {
          // if (this.rowKey === 'oid' && (typeof row['oid'] === 'undefined' )) {
            row['oid'] = page.pageSize * (page.pageNum - 1) + index + 1
          }
          // 对一些后台数据没有唯一键的，增加虚拟主键rownum，解决rowKey重复报错的bug 2020-12-24
          row['rownum'] = index
        })
        this.list = [] // 先清空列表，解决一些测试数据RowKey重复会报错的bug
        this.list = res.data
        page.total = res.total

        this.$nextTick(() => {
          this.list = res.data
          // 处理行的选择
          if (this.list.length) {
            // 当前行选择
            this.defaultCkFirstItem && this.$nextTick(() => {
              const currentRowKey = this.currentRowKey || (this.currentRow || {})[this.rowKey]
              const row = currentRowKey ? this.list.find(el => el[this.rowKey] === currentRowKey) : ''
              this.setCurrentRow(row || this.list[0])
            })
            // 选中全部复选框
            if (this.showSelection && this.defaultCkAll) {
              this.$refs.table.toggleAllSelection()
            } else if (this.showSelection && this.selectedRows.length > 0) {
              const selectedKeys = this.selectedRows.map(row => row[this.rowKey])
              const selectedRows = this.list.filter(item => selectedKeys.includes(item[this.rowKey]))
              this.handleTableSelectionChange(selectedRows)
            }
          } else {
            this.setCurrentRow()
            this.clearSelection()
          }
          this.$emit('input', this.list)
          this.$emit('load', this.list)
        })
        // 修正表格高度
        if (this.visualHeight && this.visibleHeight === 0) {
          this.doLayout()
        }
        return res
      }).finally(() => {
        this.listLoading = false
      })
    },

    // 查询列表
    searchForm (tempParam = {}) {
      return new Promise(resolve => {
        if (this.form.length > 0) {
          this.$refs.dynamicForm.submit().then(data => {
            this.fetchData(data, tempParam).then(resolve)
          }).catch(() => '')
        } else {
          this.fetchData({}, tempParam).then(resolve)
        }
      })
    },

    setFormData (data = {}) {
      if (this.$refs.dynamicForm) {
        this.$refs.dynamicForm.setData(data)
      }
    },

    getFormData () {
      return this.$refs.dynamicForm ? this.$refs.dynamicForm.getFieldsValue() : {}
    },

    // 删除数据
    deleteData () {
      if (!this.showSelection) {
        if (this.currentRow) {
          this.$confirm('确认要删除所选记录？', '提示', { type: 'warning' }).then(() => {
            if (this.currentRow.chkstatus === 'D') {
              this.$message({
                type: 'warning',
                message: '申报中的数据不能删除！',
              })
              return
            }
            this.deleteList(this.currentRow.oid, this.currentRow).then((res) => {
              if (res.code === 1) {
                this.$message({
                  type: 'success',
                  message: res.message || '删除成功',
                })
                this.searchForm()
              }
            }).catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败',
              })
            })
          })
        } else {
          this.$message.warning('请选择删除数据')
        }
      } else {
        if (this.selectedRows.length < 1) {
          this.$message.warning('请选择删除数据')
        } else {
          this.$confirm('确认要删除所选记录？', '提示', { type: 'warning' }).then(() => {
            let arr = []
            this.selectedRows.forEach(e => {
              arr.push(e.oid)
            })
            this.deleteList(arr.join(','), this.selectedRows).then((res) => {
              if (res.code === 1) {
                this.$message({
                  type: 'success',
                  message: res.message || '删除成功',
                })
                this.searchForm()
              }
            }).catch(e => {
              this.$message({
                type: 'error',
                message: e === '' ? '删除失败' : e,
              })
            })
          })
        }
      }
    },

    // 查询数据，重置分页
    query (tempParam) {
      this.pagination.pageNum = 1
      this.currentRow = null
      this.currentRowKey = null
      this.selectedRows = []
      this.clearSelection()
      return this.searchForm(tempParam)
    },
    // 刷新数据，分页不重置
    refresh () {
      this.currentRowKey = null
      return this.searchForm()
    },

    // 默认选中第一
    ckedFirstItem (row) {
      if (row || this.currentRow) {
        this.$refs.table.setCurrentRow(row || this.currentRow, true)
      } else {
        this.$refs.table.setCurrentRow(this.list[0], true)
      }
    },
    // 返回所有数据行
    getAllRows () {
      return this.list
    },
    // 返回选择的行
    getSelectedRows () {
      return this.selectedRows
    },
    // 返回当前行
    getCurrentRow () {
      return this.currentRow
    },

    // 通过rowID选择当前行
    setCurrentRowByKey (rowKey) {
      this.currentRowKey = rowKey
    },

    // 选择当前行
    setCurrentRow (row) {
      if (row) {
        this.currentRow = row
        this.$refs.table.setCurrentRow(row)
      } else {
        this.currentRow = null
        this.currentRowKey = null
        this.$refs.table.setCurrentRow()
      }
    },

    // 用于多选表格，清空用户的选择
    clearSelection () {
      this.$refs.table.clearSelection()
    },

    // 用于多选表格，切换某一行的选中状态
    toggleRowSelection (row, selected) {
      this.$refs.table.toggleRowSelection(row, selected)
    },

    // 重置表格数据
    resetData () {
      this.list = []
      this.currentRow = null
      this.currentRowKey = null
      this.selectedRows = []
      this.handleReset()
    },
    /* === 事件回调 === */
    handleDelete () {
      this.deleteData()
    },
    handleExport () {
      return this.exportList(this.exportParams).then(res => {
      })
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.searchForm()
    },
    handleCurrentChange (val) {
      this.pagination.pageNum = val
      this.searchForm()
    },
    handleSearch () {
      this.query().then(res => {
        this.searchVisible = false
      })
    },
    handleReset () {
      this.$refs.dynamicForm && this.$refs.dynamicForm.resetForm()
    },
    handleTableCurrentChange (currentRow, oldCurrentRow) {
      if (this.$listeners.currentChangeBefore && currentRow) {
        this.currentRowKey = null
        this.$nextTick(() => {
          this.currentRowKey = this.currentRow[this.rowKey]
        })
        this.$emit('currentChangeBefore', currentRow, () => {
          this.currentRow = currentRow
          this.$emit('currentChange', currentRow)
          this.currentRowKey = currentRow[this.rowKey]
        }, oldCurrentRow)
      } else if (currentRow) {
        this.currentRow = currentRow
        this.currentRowKey = currentRow[this.rowKey]
        this.$emit('currentChange', currentRow)
      }
    },
    handleTableSelect (selection, row) {
      this.ckedFirstItem(selection[selection.length - 1])
    },
    handleTableSelectionChange (selection) {
      this.selectedRows = selection
      this.$emit('selectionChange', selection)
    },
    handleTableSortChange ({ column, prop, order }) {
      this.pagination.sort = prop
      this.pagination.sortOrder = order
      this.searchForm()
    },
    /**
     * 操作列点击回
     * @param key
     * @param row
     */
    handleAction (key, row) {
      this.$emit('action', key, row)
    },
    /**
     * 自定义按钮点击回
     * @param key
     * @param btn
     * @param data
     */
    handleExtraBtnAction (key, btn, data) {
      this.$emit('extraBtnAction', key, btn, data)
    },
    tabsClick (item) {
      this.$emit('tabsClick', item.name)
    },
    bindSearchCollpase (event) {
      const self = this
      let e = event || window.event // 兼容ie和非ie的event
      let aim = e.srcElement || e.target // 兼容ie和非ie的事件源

      // 存在dialog弹框情况下，不作隐藏
      let dialogArr = document.getElementsByClassName('el-dialog__wrapper')
      // alert(dialogArr.length)
      for (let i = 0; i < dialogArr.length; i++) {
        if (dialogArr[i].offsetWidth > 0) {
          return
        }
      }

      if (self.searchVisible && !self.$refs.searchForm.contains(aim) && !self.$refs.searchIcon.$el.contains(aim)) {
        self.searchVisible = false
      }
    },
    handleRowDbclick (row, column, cell, event) {
      this.$emit('rowDbclick', row, column, cell, event)
    },
  },
  mounted () {
    if (!this.noAutoLoad && this.getList) {
      this.searchForm()
    } else {
      this.$watch('data', (newData) => {
        this.resetData()
        this.list = Array.isArray(newData) ? newData : []
      })
    }

    if (this.searchBtnVisible) {
      this.bindSearchCollpase.bind(this)
      document.addEventListener('click', this.bindSearchCollpase)
    }

    this.$nextTick(function () {
      if (this.list && this.defaultCkFirstItem) {
        if (this.list.length > 0) {
          this.ckedFirstItem()
        }
      }
    })

    if (this.visualHeight) {
      this.doLayout()
    }
  },
  activated () {
    this.$nextTick(() => {
      this.$refs.table.doLayout()
    })
  },
  destroyed () {
    if (this.searchBtnVisible) {
      document.removeEventListener('click', this.bindSearchCollpase)
    }
  },
}
</script>
<style lang="scss">
.x-table-card {
  margin: 0 auto;
  position: relative;

  .x-table-card__form {
    position: absolute;
    width: 100%;
    padding: 15px 10px;
    left: 0;
    top: 0;
    z-index: 999;
    border: 1px solid #e4e7ed;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    background-color: #fff;
  }

  .table-pagination {
    margin-top: 10px;
    padding: 0;
  }

  .el-pagination__rightwrapper {
    .el-select {
      display: block;

      .el-input {
        margin: 0;
      }
    }

    span:last-child {
      margin-right: 0;
    }
  }

  .x-table-card__toolbar {
    padding-bottom: 10px;
    position: relative;
    overflow: hidden;

    .toolbar-right-btn {
      float: right;
    }
  }

  .cell-radio {
    .el-radio__label {
      display: none !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.extraBtn-span {
  display: inline-block;
}

.extraBtn-span + .extraBtn-span {
  margin-left: 10px;
}

.tight-box-card::v-deep {
  border: none;

  .el-card__body {
    padding: 0;
  }
}

</style>
