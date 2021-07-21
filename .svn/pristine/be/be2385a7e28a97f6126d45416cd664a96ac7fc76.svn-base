<template>
  <section ref="elAppPage" class="app-page" :class="{'app-page--body-scroll': bodyScroll}">
    <header v-if="hasHeader" class="app-page__header" :style="hdStyle">
      <div v-if="$slots.headerExtra||isBack||title" class="app-page__header-inner">
        <div v-if="$slots.headerExtra" class="actions">
          <slot name="headerExtra"></slot>
        </div>
        <el-button
          v-if="isBack"
          class="back-btn"
          size="mini"
          icon="el-icon-back"
          @click="handleBack"
        />
        <span v-if="title" class="title">{{ title }}</span>
      </div>
      <slot name="header"></slot>
      <div v-if="tabList">
        <el-menu :default-active="tabActive" mode="horizontal" @select="handleTabChange">
          <el-menu-item :index="item.key" v-for="item in tabList" :key="item.key">{{ item.tab }}</el-menu-item>
        </el-menu>
      </div>
    </header>
    <div class="app-page__toolbar" v-if="$slots.toolbar">
      <slot name="toolbar"></slot>
    </div>
    <div class="app-page__body" :style="bdStyle">
      <slot></slot>
    </div>
    <footer class="app-page__footer" :style="ftStyle" v-if="$slots.footer">
      <slot name="footer"></slot>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'ThePage',
  components: {},
  provide () {
    return {
      getPageVisualHeight: () => {
        const scrollParent = (el) => {
          const pEl = el.parentElement
          if (pEl && ['auto', 'scroll'].includes(window.getComputedStyle(pEl).overflowY)) {
            return pEl
          } else if (pEl) {
            return scrollParent(pEl)
          } else {
            return null
          }
        }
        const scrollBox = scrollParent(this.$refs.elAppPage)
        return scrollBox ? scrollBox.clientHeight : window.innerHeight
      },
      getPageScrollHeight: () => {
        return this.$refs.elAppPage.offsetHeight
      }
    }
  },
  props: {
    isBack: Boolean, // 是否显示返回
    title: String, // 标题
    tabList: Array, // tab列表[{key:'id', tab:'title'}]
    tabActive: String, // 当前tabKey
    headerHeight: {
      type: String,
      default: '60px'
    },
    footerHeight: {
      type: String,
      default: '60px'
    },
    bodyStyle: Object,
    bodyScroll: Boolean
  },
  data () {
    return {}
  },
  computed: {
    hasHeader () {
      return this.$slots.header || this.isBack || this.title || this.tabList
    },
    bdStyle () {
      const bs = this.bodyStyle || {}
      if (this.bodyScroll) {
        const hh = this.hasHeader ? this.headerHeight : '0px'
        const fh = this.$slots.footer ? this.footerHeight : '0px'
        const bh = { 'height': ` calc(100% - ${hh} - ${fh})` }
        return { ...bh, ...bs }
      } else {
        return { ...bs }
      }
    },
    hdStyle () {
      return this.bodyScroll && this.hasHeader ? { 'height': this.headerHeight } : {}
    },
    ftStyle () {
      return this.bodyScroll && this.$slots.footer ? { 'height': this.footerHeight } : {}
    }
  },
  methods: {
    handleBack () {
      if (this.$listeners.back) {
        this.$emit('back')
      } else {
        this.$router.back()
      }
    },
    handleTabChange (key) {
      this.$emit('tabChange', key)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.app-page {
  width: 100%;
}

.app-page--body-scroll {
  height: 100%;
}

.app-page__header-inner {
  padding: 0 20px;

  .actions {
    float: right;
  }
}

.app-page__toolbar {
  padding: 20px 20px 0;

  & + .app-page__body {
    padding-top: 10px;
  }
}

.app-page--body-scroll .app-page__body {
  overflow-y: auto;
}

.app-page__body {
  padding: 20px;
  margin: 0 auto;
}

.app-page__body {
  @media (min-width: 1900px) {
    max-width: 1840px;
  }
}
</style>
