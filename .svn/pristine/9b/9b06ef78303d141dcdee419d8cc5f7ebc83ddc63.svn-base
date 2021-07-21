<template>
  <div>
    <button id="list-button-query" @click="list_query" class="btn4">
      查询条件
    </button>
    <button id="list-button-apply" @click="list_apply" class="btn4">
      申请审批
    </button>
    <button id="list-button-add" @click="list_add" class="btn2">新增</button>
    <button id="list-button-delete" @click="list_detele" class="btn2">
      删除
    </button>
    <button id="list-button-edit" @click="list_edit" class="btn2">修改</button>
    <button id="list-button-view" @click="list_view" class="btn2">查看</button>
    <button id="list-button-export" @click="list_export" class="btn2">
      导出
    </button>
    <button id="list-button-exit" @click="list_exit" class="btn2">退出</button>
  </div>
</template>

<style>
.btn2 {
  float: right;
  margin-left: 3px;
  width: 80px;
  height: 25px;
  text-align: center;
}
.btn4 {
  float: right;
  margin-left: 3px;
  width: 80px;
  height: 25px;
  text-align: center;
}
</style>


<script>
export default {
  name: "ButtonList",
  data() {
    return {
      regData: [],
      searchBorder: "none",
      hasReg: false,
    };
  },
  methods: {
    //注册button
    regButton(regData) {
      this.regButton = true;
      this.regData = regData;
      this.createButtonList();
    },
    //创建buttonList
    createButtonList() {},
  },
  setup() {},
};
</script>