<template>
  <el-card
    v-bind="$attrs"
    v-on="$listeners"
    class="x-collapse-card"
    :body-style="{padding: 0}"
  >
    <template #header>
      <div class="x-header-inner" @click="toggle">
        <div class="title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="extra">
          <el-button
            v-if="visible"
            type="text" size="normal"
            icon="el-icon-arrow-up"
          />
          <el-button
            v-else
            type="text"
            size="normal"
            icon="el-icon-arrow-down"
          ></el-button>
        </div>
      </div>
    </template>

    <el-collapse-transition>
      <div class="x-collapse-card-body" v-show="visible">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </el-card>
</template>
<script>
export default {
  name: 'XCollapseCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    defaultVisible: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      visible: this.defaultVisible,
    }
  },
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    toggle () {
      this.visible = !this.visible
    },
  },
}
</script>
<style lang="scss" scoped>
.x-collapse-card::v-deep {
  & + .x-collapse-card {
    margin-top: 20px;
  }

  .el-card__header {
    padding: 0
  }
}

.x-header-inner {
  display: flex;
  padding: 12px 15px;
  align-items: center;

  .extra {
    margin-left: auto;
  }
}

.x-collapse-card-body {
  padding: 20px;
}
</style>
