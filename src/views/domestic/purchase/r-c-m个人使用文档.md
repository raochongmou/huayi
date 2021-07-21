  ```js
  fetchData() {
    //   return new Promise(resolve => {
    //     resolve({
    //       data: [
    //         {
    //           assessmentId: "1",
    //           serialNo: 11,
    //           itemName: "长江三峡水坝修建",
    //           itemType: "建筑工程",
    //           content: "是否漏水",
    //           weight: 57,
    //           assessmentType: "类型",
    //           assessmentMode: "计算方式/交付要求",
    //           description: "项目界定/指标说明",
    //           remark: "备注",
    //           dataSource: "数据来源",
    //           createBy: "创建人",
    //           createTime: "创建时间",
    //           updateBy: "更新人",
    //           updateTime: "更新时间"
    //         },
    //         {
    //           assessmentId: "2",
    //           serialNo: 12,
    //           itemName: "长江三峡水坝修建",
    //           itemType: "建筑工程",
    //           content: "是否漏水",
    //           weight: 55,
    //           assessmentType: "类型",
    //           assessmentMode: "计算方式/交付要求",
    //           description: "项目界定/指标说明",
    //           remark: "备注",
    //           dataSource: "数据来源",
    //           createBy: "创建人",
    //           createTime: "创建时间",
    //           updateBy: "更新人",
    //           updateTime: "更新时间"
    //         },
    //         {
    //           assessmentId: "3",
    //           serialNo: 13,
    //           itemName: "长江三峡水坝修建",
    //           itemType: "建筑工程",
    //           content: "是否漏水",
    //           weight: 53,
    //           assessmentType: "类型",
    //           assessmentMode: "计算方式/交付要求",
    //           description: "项目界定/指标说明",
    //           remark: "备注",
    //           dataSource: "数据来源",
    //           createBy: "创建人",
    //           createTime: "创建时间",
    //           updateBy: "更新人",
    //           updateTime: "更新时间"
    //         },
    //         {
    //           assessmentId: "4",
    //           serialNo: 14,
    //           itemName: "长江三峡水坝修建",
    //           itemType: "建筑工程",
    //           content: "是否漏水",
    //           weight: 54,
    //           assessmentType: "类型",
    //           assessmentMode: "计算方式/交付要求",
    //           description: "项目界定/指标说明",
    //           remark: "备注",
    //           dataSource: "数据来源",
    //           createBy: "创建人",
    //           createTime: "创建时间",
    //           updateBy: "更新人",
    //           updateTime: "更新时间"
    //         },
    //         {
    //           assessmentId: "5",
    //           serialNo: 15,
    //           itemName: "长江三峡水坝修建",
    //           itemType: "建筑工程",
    //           content: "是否漏水",
    //           weight: 51,
    //           assessmentType: "类型",
    //           assessmentMode: "计算方式/交付要求",
    //           description: "项目界定/指标说明",
    //           remark: "备注",
    //           dataSource: "数据来源",
    //           createBy: "创建人",
    //           createTime: "创建时间",
    //           updateBy: "更新人",
    //           updateTime: "更新时间"
    //         },
    //         {
    //           assessmentId: "6",
    //           serialNo: 16,
    //           itemName: "长江三峡水坝修建",
    //           itemType: "建筑工程",
    //           content: "是否漏水",
    //           weight: 52,
    //           assessmentType: "类型",
    //           assessmentMode: "计算方式/交付要求",
    //           description: "项目界定/指标说明",
    //           remark: "备注",
    //           dataSource: "数据来源",
    //           createBy: "创建人",
    //           createTime: "创建时间",
    //           updateBy: "更新人",
    //           updateTime: "更新时间"
    //         }
    //       ],
    //       meta: {
    //         status: "200",
    //         msg: "success"
    //       }
    //     });
    //   });
    },




    fetchData() {
      return new Promise(resolve => {
        resolve({
          data: [
            {
              itemName: "长江三峡水坝修建",
              itemType: "建筑工程",
              content: "是否漏水",
              weight: 57,
            },
            {
              itemName: "长江三峡水坝修建",
              itemType: "建筑工程",
              content: "是否漏水",
              weight: 55,
            },
            {
              itemName: "长江三峡水坝修建",
              itemType: "建筑工程",
              content: "是否漏水",
              weight: 53,
            },
            {
              itemName: "长江三峡水坝修建",
              itemType: "建筑工程",
              content: "是否漏水",
              weight: 54,
            },
            {
              itemName: "长江三峡水坝修建",
              itemType: "建筑工程",
              content: "是否漏水",
              weight: 51,
            },
            {
              itemName: "长江三峡水坝修建",
              itemType: "建筑工程",
              content: "是否漏水",
              weight: 52,
            }
          ],
          meta: {
            status: "200",
            msg: "success"
          }
        });
      });
    },