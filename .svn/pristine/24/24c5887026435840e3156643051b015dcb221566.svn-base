<template>
  <!-- 这是因为vue的模版中只有能一个根节点，所以在<template>中插入第二个元素就会报错,将<template>中的元素用一个大的<div>包起来，这样就可以在其中添加多个元素了，可以参考以下示例： -->
  <!-- border 是否带有纵向的边框 -->
  <div class="base-care">
    <ButtonList class="btn-list"></ButtonList>
    <el-table
      :data="tableData"
      :row-style="iRowStyle"
      :cell-style="iCellStyle"
      :header-row-style="iHeaderRowStyle"
      :header-cell-style="iHeaderCellStyle"
      stripe
      border
      show-summary
      style="width: 100%; margin-top: 20px"
      height="150px"
      size="mini"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="date" label="制单日期" width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="销售合同号"
        width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120"> </el-table-column>
      <el-table-column
        prop="address"
        label="签约地址"
        width="300"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <QuerySize
      @changePageSize="changePageSize"
      @changePageIndex="changePageIndex"
      :pagequery="pagequeryData"
    ></QuerySize> -->

    <template>
      <el-pagination
        @size-change="changePageSize"
        @current-change="changePageIndex"
        :current-page="pageIndex"
        :page-sizes="[20, 50, 80, 100, 200]"
        :page-size="pageSize"
        :total="totalCount"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </template>
  </div>
</template>


  </div>
</template>

<script>
// import 一个组件
import buttonList from "@/components/ButtonList";
import QuerySize from "@/components/QuerySize";
export default {
  //需要指定导出的模块名称
  name: "inlandsale",
  components: {
    ButtonList: buttonList, // 申明这个组件
    QuerySize: QuerySize,
  },
  methods: {
    // 下方的页面检索栏，调整了当前页面的条数，并回传到父控件里面了
    changePageSize: function (val) {
      console.log(`changePageSize父控件获取值-每页 ${val} 条`);
      this.pagesize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 下方的页面检索栏，调整了当前页面的页码，并回传到父控件里面
    changePageIndex: function (val) {
      console.log(`changePageIndex父控件获取值-当前页码- ${val}`);
      this.pageIndex = val;
      this.getDataList();
    },
    // 联网获取数据
    getDataList: function () {},
    // row 行的类型需要返回函数处理
    iRowStyle: function ({ row, rowIndex }) {
      //return "{height:35px;padding:3px}";
      return "padding:3px";
    },
    iHeaderRowStyle: function ({ row, rowIndex }) {
      return "height:35px";
    },
    iCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
    iHeaderCellStyle: function ({ row, column, rowIndex, columnIndex }) {
      return "padding:0px";
    },
  },
  data() {
    return {
      //分页操作的页面 所有的list都需要
      pageIndex: 1,
      pageindex: 20,
      totalcount: 0,
      //查询的参数对象
      searchForm: {},

      pagequeryData: {
        totalcount: 1800,
        pagesize: 100,
        pageindex: 1,
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
    };
  },
};
</script>