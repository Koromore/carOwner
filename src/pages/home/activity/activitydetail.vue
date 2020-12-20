<template>
  <div id="activitydetail">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="loading">
      <el-scrollbar style="height:100%">
        <!-- <el-col :span="2" class="title">返回</el-col> -->
        <el-col :span="24" class="title">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <el-col :span="12">任务详情</el-col>
          <el-col :span="6" class="redact">
            <i class="el-icon-edit" @click="addactivity"></i>
          </el-col>
        </el-col>
        <el-col :span="12" class="left">
          <el-col :span="24" class="list">
            <div class="key">任务细分</div>
            <div>:</div>
            <!-- <div class="val">{{taskDetail.taskName}}</div> -->
            <div class="val">
              <span v-if="taskDetail.taskType==1">借车</span>
              <span v-else-if="taskDetail.taskType==2">素材</span>
              <span v-else-if="taskDetail.taskType==3">邀约</span>
              <span v-else-if="taskDetail.taskType==4">拍摄</span>
              <span v-else-if="taskDetail.taskType==5">发布</span>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务名称</div>
            <div>:</div>
            <div class="val">{{taskDetail.taskName}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">项目名称</div>
            <div>:</div>
            <div class="val">{{taskDetail.taskName}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">预算明细</div>
            <div>:</div>
            <div class="val">{{taskDetail.taskName}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务状态</div>
            <div>:</div>
            <div class="val">
              <span v-if="taskDetail.status==0">执行中</span>
              <span v-else-if="taskDetail.status==1">审核中</span>
              <span v-else-if="taskDetail.status==2">已完成</span>
              <span v-else-if="taskDetail.status==3">延期</span>
              <span v-else-if="taskDetail.status==4">人工延期</span>
            </div>
          </el-col>
          <!-- <el-col :span="24" class="list">
            <div class="key">品牌车型</div>
            <div>:</div>
            <div class="val">
              <template v-if="taskDetail.carSeriesName">{{taskDetail.carSeriesName}}</template>
              <template v-else>
                <span
                  v-for="(item, index) in taskDetail.listTaskOfCartype"
                  :key="index"
                >{{item.carTypeName}},</span>
              </template>
            </div>
          </el-col> -->
          <el-col :span="24" class="list">
            <div class="key">车辆来源</div>
            <div>:</div>
            <div class="val" v-if="taskDetail.listInvite.length==1">
              <!-- <template v-if="taskDetail.listInvite.length!=0"> -->
              <div v-for="(item, index) in taskDetail.listInvite" :key="index">
                <span
                  v-if="item.listOwnerType"
                >{{item.listOwnerType[0].typeName}}—{{item.listOwnerItem[0].itemName}}—{{item.realName}}</span>
              </div>
              <!-- </template> -->
            </div>
            <div class="val" v-else>
              <!-- {{taskDetail.listInvite}} -->
              <el-collapse v-model="activeNames">
                <template v-if="taskDetail.ownersList.length">
                  <el-collapse-item
                    :title="taskDetail.ownersList[0].listOwnerType[0].typeName+'-'+taskDetail.ownersList[0].realName+'-'+taskDetail.ownersList[0].listOwnerItem[0].itemName"
                    name="1"
                  >
                    <template v-if="taskDetail.ownersList.length!=0">
                      <div
                        v-for="(item, index) in taskDetail.ownersList"
                        :key="index"
                        v-show="index!=0"
                      >
                        <div v-if="item.userType==0">
                          <span>{{item.listOwnerType[0].typeName}}—{{item.listOwnerItem[0].itemName}}—{{item.realName}}</span>
                        </div>
                      </div>
                    </template>
                  </el-collapse-item>
                </template>
                <template v-else>暂无</template>
              </el-collapse>
            </div>
          </el-col>
          <template v-if="taskDetail.taskType==4">
            <el-col :span="24" class="list">
              <div class="key">摄影师</div>
              <div>:</div>
              <!-- <div class="val">{{taskDetail.num}}</div> -->
              <div class="val" v-if="taskDetail.taskToPersonList.length">
                <span
                  v-for="(item,index) in taskDetail.taskToPersonList"
                  :key="index"
                >{{item.realName}}</span>
                <!-- {{taskDetail.personName}} -->
              </div>
              <div class="val" v-else style="color: #F56C6C">未完善</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">模特</div>
              <div>:</div>
              <!-- <div class="val">{{taskDetail.num}}</div> -->
              <div class="val" v-if="taskDetail.taskToModelList.length">
                <span
                  v-for="(item,index) in taskDetail.taskToModelList"
                  :key="index"
                >{{item.realName}}</span>
              </div>
              <div class="val" v-else style="color: #F56C6C">未完善</div>
            </el-col>
            <el-col :span="24" class="list">
              <div class="key">场地</div>
              <div>:</div>
              <!-- <div class="val">{{taskDetail.num}}</div> -->
              <div class="val" v-if="taskDetail.placeName">{{taskDetail.placeName}}</div>
              <div class="val" v-else style="color: #F56C6C">未完善</div>
            </el-col>
          </template>
          
          <el-col :span="24" class="list">
            <div class="key">创建人</div>
            <div>:</div>
            <div class="val">{{taskDetail.initUserRealName}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">计划周期</div>
            <div>:</div>
            <div class="val">{{taskDetail.startTime}}---{{taskDetail.endTime}}</div>
          </el-col>
          <!-- <el-col :span="24" class="list">
            <div class="key">备注</div>
            <div>:</div>
            <div class="val">
              <template v-if="taskDetail.remark">{{taskDetail.remark}}</template>
              <template v-else>暂无</template>
            </div>
          </el-col> -->

          <el-col :span="24" class="list">
            <div class="key">完成时间</div>
            <div>:</div>
            <div class="val">{{taskDetail.endTime}}</div>
          </el-col>
        </el-col>
        <el-col :span="12" class="right">
          <el-col :span="24" class="list">
            <div class="key">发布数</div>
            <div>:</div>
            <div class="val">{{taskDetail.num}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">拍摄时间</div>
            <div>:</div>
            <div class="val">{{taskDetail.num}}</div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">任务描述</div>
            <div>:</div>
            <div class="val">
              <div>主题:</div>
              <div>时间:</div>
              <div>集合地点:</div>
              <div>成片要求:</div>
              <div>其他要求:</div>
              <!-- <template v-if="taskDetail.taskDesc">
                <pre>{{taskDetail.taskDesc}}</pre>
              </template>
              <template v-else>暂无</template> -->
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">预估费用</div>
            <div>:</div>
            <div class="val">
              <div>总费用:</div>
              <div>费用明细:</div>
            </div>
          </el-col>
          <!-- <el-col :span="24" class="list">
            <div class="key">任务文件</div>
            <div>:</div>
            <div class="val">
              <template v-if="taskDetail.listTaskFile.length!=0">
                <img
                  v-if="taskDetail.listTaskFile[0].suffix == 'doc' || taskDetail.listTaskFile[0].suffix == 'docx'"
                  src="static/images/document/word.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="taskDetail.listTaskFile[0].suffix == 'xls' || taskDetail.listTaskFile[0].suffix == 'xlsx'"
                  src="static/images/document/excle.png"
                  width="16"
                  alt
                  srcset
                />
                <img
                  v-else-if="taskDetail.listTaskFile[0].suffix == 'ppt' || taskDetail.listTaskFile[0].suffix == 'pptx'"
                  src="static/images/document/ppt.png"
                  width="16"
                  alt
                  srcset
                />
                <img v-else src="static/images/document/other.png" width="16" alt srcset />
                <el-link
                  @click="$download(taskDetail.listTaskFile[0])"
                >{{taskDetail.listTaskFile[0].fileName}}</el-link>
              </template>
              <template v-else>暂无</template>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">结算清单</div>
            <div>:</div>
            <div class="val">
              <span v-if="taskDetail.status==1||taskDetail.status==2">
                <img src="static/images/document/excle.png" width="16" alt srcset />

                <el-link @click="exportInvite(taskDetail)">{{taskDetail.taskName}}</el-link>
              </span>
              <span v-else>暂无</span>
            </div>
          </el-col>
          <el-col :span="24" class="list">
            <div class="key">完成进度</div>
            <div>:</div>
            <div class="val">{{taskDetail.inviteNumOver}}/{{taskDetail.num}}</div>
          </el-col> -->
        </el-col>
        <el-col :span="22" :offset="1">
          <el-table
            :data="taskDetail.listInvite"
            style="width: 100%;margin-bottom: 72px"
            :header-row-style="{'height': '54px','background': 'rgb(242, 242, 242)'}"
            :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
            v-loading="loading"
            @header-click="exportTaskDetail"
          >
            <el-table-column prop label width="24" show-overflow-tooltip></el-table-column>
            <el-table-column prop="authorName" label="ID" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="realName" label="车主" min-width="100" show-overflow-tooltip></el-table-column>
            <el-table-column prop="url" label="链接" min-width="100" show-overflow-tooltip>
              <template slot-scope="scope" v-if="scope.row.url">
                <el-link :href="scope.row.url" target="_blank">【原】</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" min-width="130" show-overflow-tooltip></el-table-column>
            <el-table-column prop="effectName" label="成果" min-width="80"></el-table-column>
            <el-table-column prop="publishedTime" label="发布时间" min-width="80"></el-table-column>
            <el-table-column prop label="dow" width="64">
              <template slot="header">
                <i class="el-icon-download dow"></i>
              </template>
            </el-table-column>
          </el-table>

          <el-table
            :data="taskDetail.listInvite"
            style="width: 70%;margin-bottom: 72px"
            :header-cell-style="{'color': '#000',}"
            v-loading="loading"
            @header-click="exportTaskDetail"
          >
            <el-table-column prop label width="180" show-overflow-tooltip>
              <template slot="header">
                共2笔   合计30,000元
              </template>
            </el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="realName" label="车主" show-overflow-tooltip></el-table-column>
            <el-table-column prop="url" label="链接" show-overflow-tooltip>
              <template slot-scope="scope" v-if="scope.row.url">
                <el-link :href="scope.row.url" target="_blank">【原】</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
            <el-table-column prop="effectName" label="成果"></el-table-column>
            <el-table-column prop="publishedTime" label="发布时间"></el-table-column>
            <el-table-column prop label="金额" width="64"></el-table-column>
            <el-table-column prop label="状态" width="64"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="24" class="btn">
          <el-button type="primary" @click="sendInvitation">发送邀请函</el-button>
          <el-button type="primary" @click="toAddactivity">复制任务</el-button>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
import { saveAs } from 'file-saver'
export default {
  name: 'activitydetail',
  components: {},
  data() {
    return {
      // 任务ID
      taskId: 0,
      taskDetail: {
        listTaskFile: [],
        listInvite: [
          {
            listOwnerType: [
              {
                typeName: null,
              },
            ],
            listOwnerItem: [
              {
                itemName: null,
              },
            ],
          },
        ],
      },
      loading: false,
      activeNames: [],
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    // 任务ID
    this.taskId = this.$route.query.id
    ///////// 获取任务详情 start /////////
    this.getTaskDetails()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////
    ///////// 获取任务详情 start /////////
    getTaskDetails() {
      this.loading = true
      let data = {
        taskId: this.$route.query.id,
      }
      this.$axios.post('/ocarplay/task/edit', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data.data

          // data.typeList = []
          // data.ownerItemList = []
          // data.ownerName = []
          // data.listInvite.forEach(element => {
          //   data.typeList.push(element.listOwnerType[0].typeName)
          //   data.ownerItemList.push(element.listOwnerItem[0].itemName)
          //   data.ownerName.push(element.realName)
          // })
          // data.typeList = element.typeList.join(',')
          //   data.ownerItemList = element.ownerItemList.join(',')
          //   data.ownerName = element.ownerName.join(',')
          // console.log(data)
          let ownersList = []
          data.inviteNum = data.listInvite.length
          data.inviteNumOver = 0
          data.listInvite.forEach((element) => {
            if (element.isWrite == 1) {
              data.inviteNumOver += 1
            }
            if (element.userType == 0) {
              ownersList.push(element)
            }
          })

          data.ownersList = ownersList
          this.taskDetail = data
          // console.log(data)
          this.loading = false
        }
      })
    },
    ///////// 获取任务详情 end /////////

    ///////// 跳转新增任务页面 end /////////
    toAddactivity() {
      let id = this.taskId
      this.$router.push({
        path: '/home/addactivity',
        query: { type: 2, id: id },
      })
    },
    ///////// 跳转新增任务页面 end /////////

    ///////// 发送邀请函 start /////////
    sendInvitation() {
      let data = {
        taskId: this.taskId,
      }
      this.$axios.post('/ocarplay/task/sendInvitation', data).then((res) => {
        console.log(res)
        if (res.status == 200) {
          if (res.data.errcode == 0) {
            this.$message.success(res.data.msg)
          } else {
            this.$message.error(res.data.msg)
          }
        }
      })
    },
    ///////// 发送邀请函 end /////////

    ///////// 文档下载 start /////////
    download(row) {
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      // a.setAttribute('href', 'http://218.106.254.122:8084/pmbs/' + localPath)
      a.setAttribute('href', 'http://176.10.10.233:8082/ocarplay/' + localPath)
      a.click()
    },
    ///////// 文档下载 end /////////

    ///////// 导出结算清单 end /////////
    exportInvite(prm) {
      let data = {
        taskId: prm.taskId,
      }
      this.$axios
        .post('/ocarplay/api/invite/exportInvite', data, {
          responseType: 'blob', //--设置请求数据格式
        })
        .then((res) => {
          console.log(res)
          if (res.status == 200) {
            // this.$message.success('删除任务成功！')
            // ///////// 获取任务列表 start /////////
            // this.getTaskListAjax()
            var blob = new Blob([res.data], {
              type: 'text/plain;charset=utf-8',
            })
            saveAs(blob, prm.taskName + '.xls')
          } else {
            this.$message.error('删除任务失败！')
          }
        })
    },
    ///////// 导出结算清单 end /////////
    ///////// 完成详情列表下载 start /////////
    exportTaskDetail(column, event) {
      // console.log(column.label)
      let taskDetail = this.taskDetail
      let data = {
        taskId: this.taskId * 1,
      }
      this.$axios
        .post('/ocarplay/task/exportTaskDetail', data, {
          responseType: 'blob', //--设置请求数据格式
        })
        .then((res) => {
          if (res.status == 200) {
            var blob = new Blob([res.data], {
              type: 'text/plain;charset=utf-8',
            })
            saveAs(blob, taskDetail.taskName + '结算进度.xls')
          } else {
            this.$message.error('导出失败！')
          }
        })
    },
    ///////// 完成详情列表下载 end /////////

    ///////// 修改任务 start /////////
    addactivity() {
      // this.$store.commit('taskStatus', this.status)
      this.$router.push({
        path: '/home/addactivity',
        query: { type: 1, id: this.taskId },
      })
    },
    ///////// 修改任务 end /////////
  },
}
</script>
<style lang="scss" scoped>
#activitydetail {
  height: 100%;

  .content {
    position: relative;
    height: calc(100% - 16px);
    background: white;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    border: 1px solid #e7e7e7;
    padding: 36px;
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      margin: 0;
      > div {
        height: 40px;
        line-height: 40px;
      }
      .key {
        width: 96px;
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
        height: auto;
        margin-left: 13px;
        pre {
          font-family: '微软雅黑';
          // line-height: 24px;
          font-size: 16px;
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .text {
          height: 32px;
          line-height: 32px;
        }
      }
    }
    .title {
      text-align: center;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 24px;
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
      .redact {
        text-align: right;
        padding-right: 18px;
        i {
          line-height: 54px;
          cursor: pointer;
          color: #6a92e8;
          font-size: 28px;
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
        .val {
          .text {
            line-height: 40px;
          }
        }
      }
    }
    .btn {
      position: absolute;
      bottom: 0;
      left: 0;
      text-align: center;
      background: white;
      z-index: 9;
      button {
        width: 136px;
        margin-left: 49px;
        &:nth-of-type(1) {
          margin: 0;
        }
      }
    }
  }
}
.dow {
  cursor: pointer;
  font-size: 24px;
  &:hover {
    color: #6a91e8;
  }
}
</style>
<style lang="scss">
.el-collapse {
  border: 0;
  .el-collapse-item__header {
    height: 40px;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    color: black;
  }
  .el-collapse-item__content {
    // height: 40px;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    color: black;
  }
}
</style>
