<template>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="pageindex"
    :page-sizes="[20, 50, 80, 100, 200]"
    :page-size="pagesize"
    :total="totalcount"
    layout="total, sizes, prev, pager, next, jumper"
  >
  </el-pagination>
</template>

<script>
export default {
  name: "QuerySize",
  props: {
    pagequery: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      pageindex: this.pagequery.pageindex,
      totalcount: this.pagequery.totalcount,
      pagesize: this.pagequery.pagesize,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageindex = 1;
      this.$emit("changePageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("changePageIndex", val);
    },
  },
  setup() {},
};
</script>