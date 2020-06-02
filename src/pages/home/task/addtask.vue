<template>
  <div id="addTask">
    <!-- 内容列表 start -->
    <el-row class="content">
      <el-col :span="24" class="title">
        <el-col :span="6" class="previousBox">
          <div @click="previous">
            <i class="el-icon-arrow-left"></i>
            返回
          </div>
        </el-col>
        <el-col :span="12">{{title}}</el-col>
      </el-col>
      <el-col :span="12" class="left">
        <el-col :span="24" class="list">
          <div class="key">任务名称</div>
          <div class="val">
            <el-input placeholder="请输入内容" v-model="input1" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">任务对象</div>
          <div class="val">
            <el-cascader :options="options2" :props="props" v-model="input2" clearable></el-cascader>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">品牌车型</div>
          <div class="val">
            <el-cascader :options="options2" :props="props" v-model="input2" clearable></el-cascader>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">计划周期</div>
          <div class="val">
            <el-date-picker
              v-model="input4"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">计划邀约量</div>
          <div class="val">
            <el-input placeholder="请输入内容" v-model="input5" clearable></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">任务文件</div>
          <div class="val">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </div>
        </el-col>
      </el-col>
      <el-col :span="12" class="right">
        <el-col :span="24" class="list">
          <div class="key">任务描述</div>
          <div class="val valList">
            <div class="miKey">邀约目的:</div>
            <el-input placeholder="请输入内容" v-model="input1"></el-input>
            <div class="miKey">参与资格:</div>
            <el-input placeholder="请输入内容" v-model="input1"></el-input>
            <div class="miKey">字数要求:</div>
            <el-input placeholder="请输入内容" v-model="input1"></el-input>
            <div class="miKey">帖子类型:</div>
            <el-input placeholder="请输入内容" v-model="input1"></el-input>
            <div class="miKey">费用情况:</div>
            <el-input placeholder="请输入内容" v-model="input1"></el-input>
            <div class="miKey">其他说明:</div>
            <el-input placeholder="请输入内容" v-model="input1"></el-input>
          </div>
        </el-col>
        <el-col :span="24" class="list">
          <div class="key">备注</div>
          <div class="val">
            <el-input placeholder="请输入内容" v-model="input" clearable></el-input>
          </div>
        </el-col>
      </el-col>
      <el-col :span="24" class="put">
        <el-button type="primary">提交</el-button>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法

export default {
  name: 'addTask',
  components: {},
  data() {
    return {
      // 页面类型
      type: 0,
      title: '新建任务',
      // 任务名称
      input: '',
      input1: '',
      // 任务对象选择数据
      input2: '',
      textarea: '',
      props: { multiple: true },
      options2: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: 2,
              label: '上海',
              children: [
                { value: 3, label: '普陀' },
                { value: 4, label: '黄埔' },
                { value: 5, label: '徐汇' }
              ]
            },
            {
              value: 7,
              label: '江苏',
              children: [
                { value: 8, label: '南京' },
                { value: 9, label: '苏州' },
                { value: 10, label: '无锡' }
              ]
            },
            {
              value: 12,
              label: '浙江',
              children: [
                { value: 13, label: '杭州' },
                { value: 14, label: '宁波' },
                { value: 15, label: '嘉兴' }
              ]
            }
          ]
        },
        {
          value: 17,
          label: '西北',
          children: [
            {
              value: 18,
              label: '陕西',
              children: [
                { value: 19, label: '西安' },
                { value: 20, label: '延安' }
              ]
            },
            {
              value: 21,
              label: '新疆维吾尔族自治区',
              children: [
                { value: 22, label: '乌鲁木齐' },
                { value: 23, label: '克拉玛依' }
              ]
            }
          ]
        }
      ],
      // 品牌车型
      input3: '',
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
      // 计划周期
      input4: '',
      // 计划邀约量
      input5: '',
      // 文件上传
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        },
        {
          name: 'food2.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ]
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    this.getQuery()
  },
  // 方法事件
  methods: {
    ///////// 接受页面传参 start /////////
    getQuery(){
      let type = this.$route.query.type
      this.type = type
      if (type == 0) {
        this.title = '新建任务'
      }else if (type == 1) {
        this.title = '编辑任务'
      }
      // console.log(type)
    },
    ///////// 接受页面传参 end /////////

    ///////// 返回上一页 start /////////
    previous() {
      this.$router.push({
        path: '/home/task'
      })
    },
    ///////// 返回上一页 end /////////

    // 文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>
<style lang="scss" scoped>
#addTask {
  height: 100%;
  background: white;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 36px;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 16px 0;
      .key {
        width: 96px;
        height: 40px;
        line-height: 40px;
        margin-right: 13px;
        text-align: justify;
        box-sizing: border-box;
      }
      .key:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
      .val {
        width: 420px;
        .el-cascader,
        .el-select,
        .el-date-editor,
        .el-input {
          width: 100%;
        }
      }
    }
    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 13px;
      .previousBox {
        font-size: 22px;
        text-align: left;
        // padding-left: 36px;
        div {
          cursor: pointer;
          text-align: left;
          font-weight: 100;
          height: 37px;
          line-height: 37px;
        }
        i {
          font-weight: bold;
        }
      }
    }
    $pad: 49px;
    .left {
      padding-right: $pad;
      .list {
        justify-content: flex-end;
      }
    }
    .right {
      padding-left: $pad;
      .list {
        justify-content: flex-start;
        .valList {
          box-sizing: border-box;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          padding: 16px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          > div {
            margin-bottom: 9px;
          }
          .miKey{
            font-size: 14px;
            color: #aaa;
          }
          .el-input {
            width: calc(100% - 64px);
          }
        }
      }
    }
    .put {
      position: absolute;
      bottom: 24px;
      left: 0;
      text-align: center;
      button {
        width: 136px;
      }
    }
  }
}
</style>
<style lang="scss">
.right {
  .list {
    .valList {
      .el-input {
        .el-input__inner {
          border: none;
        }
      }
    }
  }
}
</style>
