<template>
  <el-select
      v-model="val"
      v-bind="$attrs"
      ref="vcEl"
      class="x-filter-select"
      filterable
      clearable
      :multiple="multiple"
      :disabled="disabled"
      :default-first-option="true"
      :filter-method="handleFilter"
      @visible-change="handleVisibleChange"
      @change="handleChange"
      @clear="handleClear"
      @blur="handleBlur"
  >
    <el-option
        v-for="(item, index) in options"
        :key="item[valueKey] + index"
        :label="item[labelKey]"
        :value="item[valueKey]">
      <span v-if="hiddenId || (item[labelKey] === item[valueKey])" style="float: left">{{ item[labelKey] }}</span>
      <span v-else style="float: left">{{ item[valueKey] }}--{{ item[labelKey] }}</span>
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'XFilterSelect',
  inject: {
    elForm: {
      default: '',
    },
    elFormItem: {
      default: '',
    },
  },
  props: {
    value: [String, Number],
    list: {
      type: Array,
      default: () => [],
    },
    valueKey: {
      type: String,
      default: 'id',
    },
    labelKey: {
      type: String,
      default: 'text',
    },
    hiddenId: {
      type: Boolean,
      default: false,
    },
    // 当value, list变更后触发change事件
    changeOnInit: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      options: [],
    }
  },
  computed: {
    val: {
      get () {
        return this.multiple ? ([null, '', undefined].includes(this.value) ? [] : this.value.split(',')) : this.value
      },
      set (v) {
        this.$emit('input', Array.isArray(v) ? v.join(',') : v)
      },
    },
  },
  watch: {
    list (v) {
      this.initData()
    },
    value (v) {
      this.initData()
    },
  },
  methods: {
    initData () {
      this.$nextTick(() => {
        this.handleFilter(this.val)
        if (this.changeOnInit) {
          this.change()
        }
      })
    },

    focus () {
      this.$refs.vcEl.focus()
      this.$emit('focus')
    },

    blur () {
      this.$refs.vcEl.blur()
      this.$emit('blur')
    },

    change () {
      this.handleChange(this.value)
    },

    handleFilter (val) {
      const bakData = (this.list || [])
      const result = val ? bakData.filter((el) => {
        const fOptionString = (el[this.valueKey] + el[this.labelKey] + '').toLowerCase()
        const fVal = typeof val === 'string' ? val.toLowerCase() : (val + '').toLowerCase()
        return fOptionString.indexOf(fVal) >= 0
      }) : bakData
      this.options = Object.freeze(result.slice(0, 50))
    },

    handleClear () {
      this.initData()
    },

    handleVisibleChange (v) {
      this.$emit('visible-change', [v, this.val])
      if (v) {
        this.handleFilter()
      }
    },

    handleChange (value) {
      const option = this.list.find(item => item[this.valueKey] === value)
      const label = option ? (option[this.labelKey] || value) : value
      this.$emit('change', value, label, option)
    },

    handleBlur () {
      this.$emit('blur')
    },
  },
  mounted () {
    this.initData()
  },
}
</script>
