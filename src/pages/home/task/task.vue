<template>
  <div id="task">
    <!-- 头部选项框 start -->
    <el-row class="top">
      <el-col :span="12" class="left">
        <!-- 邀约对象 -->
        <el-select v-model="value" clearable placeholder="邀约对象" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约事项 -->
        <el-select v-model="value" clearable placeholder="邀约事项" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 邀约车型 -->
        <el-select v-model="value" clearable placeholder="邀约车型" size="small">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>

      <el-col :span="12" class="right">
        <el-button-group>
          <el-button type="success" size="medium">执行中</el-button>
          <el-button type="danger" size="medium">延期</el-button>
          <el-button type="warning" size="medium">结算中</el-button>
          <el-button type="info" size="medium">已完成</el-button>
        </el-button-group>
        <div class="add_task" @click="addTask">
          <i class="el-icon-circle-plus-outline"></i>
          <br />新建任务
        </div>
      </el-col>
    </el-row>
    <!-- 头部选项框 end -->

    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-table
          :data="tableData"
          style="width: 100%"
          :header-row-style="{'height': '70px','background': 'rgb(242, 242, 242)'}"
          :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          height="100%"
        >
          <el-table-column prop="name" label="任务名称" width="360"></el-table-column>
          <el-table-column prop="type" label="邀约对象" width="240"></el-table-column>
          <el-table-column prop="matter" label="邀约事项" width="240"></el-table-column>
          <el-table-column prop="vehicle" label="邀约车型" width="160"></el-table-column>
          <el-table-column prop="state" label="状态" width="130"></el-table-column>
          <el-table-column prop="taskNum" label="任务量" width="100"></el-table-column>
          <el-table-column prop="carNum" label="车主数量" width="180"></el-table-column>
          <el-table-column prop="expertTime" label="预计时间" width="180" sortable></el-table-column>
          <el-table-column prop="address" label="操作">
            <template>
              <i class="el-icon-edit"></i>
              <i class="el-icon-timer"></i>
              <i class="el-icon-circle-check"></i>
              <i class="el-icon-circle-close"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="total, prev, pager, next ,sizes"
          :total="100"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'task',
  components: {},
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: '',
      // 表格数据
      tableData: [
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        },
        {
          name: '2020年6月-长城-#校服女神#日常超精拍摄邀约',
          type: '拍摄型车主',
          matter: '日常素材',
          vehicle: '长城哈佛H6',
          state: '执行中',
          taskNum: '6',
          carNum: '6',
          expertTime: '20-06-01'
        }
      ]
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {
    ///////// 添加任务 start /////////
    addTask(){
      this.$router.push({ path: '/home/addtask' })
    },
    ///////// 添加任务 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
    }
    ///////// 分页 end /////////
  }
}
</script>
<style lang="scss" scoped>
$white: #fff;
$icoColor: rgb(106, 145, 232);
body {
  .el-table {
    th.gutter {
      display: table-cell !important;
    }
  }
}
body>>>.gutter{display: none !important;}
#task {
  height: 100%;
  .top {
    height: 88px;
    margin-bottom: 9px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .left {
      box-sizing: border-box;
      padding-left: 32px;
      .el-select {
        width: 160px;
      }
    }
    .right {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-end;
      box-sizing: border-box;
      padding-right: 24px;
      .el-button-group {
        margin-right: 49px;
        button {
          width: 81px;
        }
      }
      .add_task {
        text-align: center;
        color: $icoColor;
        font-size: 13px;
        cursor: pointer;
        i {
          font-size: 26px;
          font-weight: bold;
        }
      }
    }
  }
  .content {
    height: calc(100% - 97px);
    background: #fff;
    .table_list {
      height: calc(100% - 64px);
      .el-table {
        .el-table__header {
          th {
            background: none;
          }
        }
      }
      i {
        font-size: 24px;
        color: $icoColor;
        cursor: pointer;
        margin-right: 13px;
      }
    }
    .paging {
      height: 64px;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;
      // flex-wrap: wrap;
      // align-items: center;
      // justify-content: center;
    }
  }
}
</style>
