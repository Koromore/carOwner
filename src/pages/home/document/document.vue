<template>
  <div id="document">
    <!-- 内容列表 start -->
    <el-row class="content">
      <div class="table_list">
        <el-scrollbar style="width: 100%;height: 100%" ref="documentTable">
          <el-col :span="6" class="items" v-for="(item,index) in cooperateleListData" :key="index">
            <div class="item">
              <el-col :span="5" class="icon">
                <template v-if="matchType0(item.suffix)=='word'">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#2c2c2cff">
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 3.47 0.00 L 19.06 0.00 C 22.61 3.32 25.90 6.90 29.44 10.24 C 29.48 16.17 29.62 22.10 29.46 28.03 C 29.63 29.70 28.43 30.87 27.42 32.00 L 3.86 32.00 C 2.74 30.93 1.54 29.75 1.79 28.05 C 1.69 20.03 1.75 12.01 1.76 3.99 C 1.55 2.39 2.48 1.13 3.47 0.00 M 4.90 3.08 C 4.71 11.69 4.56 20.32 4.98 28.91 C 12.06 29.09 19.14 28.98 26.23 28.98 C 26.81 22.77 26.35 16.52 26.51 10.29 C 24.26 10.24 22.02 10.23 19.77 10.18 C 19.14 7.84 19.16 5.41 19.24 3.00 C 14.46 3.01 9.67 2.94 4.90 3.08 Z"
                      />
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 7.58 11.61 C 8.27 11.67 9.65 11.80 10.33 11.86 C 11.48 14.57 11.48 17.65 12.21 20.51 C 12.88 17.60 13.52 14.68 14.17 11.76 C 14.91 11.77 16.39 11.79 17.13 11.81 C 17.68 14.76 18.26 17.71 18.83 20.66 C 19.23 18.81 19.60 16.95 19.91 15.08 C 19.48 13.99 19.09 12.89 18.73 11.77 C 20.34 11.76 21.94 11.75 23.55 11.76 C 22.35 16.58 21.22 21.43 20.06 26.26 C 19.39 26.25 18.07 26.22 17.41 26.20 C 16.84 23.30 16.19 20.42 15.48 17.55 C 14.83 20.42 14.18 23.29 13.57 26.16 C 12.83 26.19 11.35 26.26 10.61 26.30 C 9.59 21.40 8.53 16.52 7.58 11.61 Z"
                      />
                    </g>
                  </svg>
                </template>
                <template v-else-if="matchType0(item.suffix)=='excel'">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#2c2c2cff">
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 4.01 0.00 L 19.30 0.00 C 22.79 3.29 26.10 6.77 29.50 10.14 C 29.47 16.78 29.58 23.42 29.42 30.06 C 28.88 30.55 27.81 31.52 27.27 32.00 L 3.96 32.00 C 2.71 31.01 1.46 29.81 1.77 28.06 C 1.72 19.36 1.71 10.66 1.82 1.96 C 2.54 1.30 3.27 0.64 4.01 0.00 M 4.92 3.04 C 4.70 11.65 4.53 20.30 5.01 28.90 C 12.07 29.10 19.13 28.98 26.19 28.97 C 26.85 22.76 26.36 16.49 26.46 10.26 C 24.20 10.00 21.45 10.89 19.48 9.55 C 19.03 7.40 19.28 5.18 19.25 3.01 C 14.47 3.00 9.69 2.97 4.92 3.04 Z"
                      />
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 8.07 11.77 C 9.04 11.76 10.98 11.75 11.95 11.74 C 12.89 13.04 13.81 14.35 14.74 15.66 C 15.70 14.31 16.68 12.97 17.69 11.66 C 18.62 11.69 20.46 11.76 21.39 11.79 C 19.86 14.03 18.37 16.29 16.92 18.58 C 18.70 21.12 20.46 23.68 22.20 26.25 C 20.83 26.25 19.47 26.26 18.10 26.26 C 17.05 24.75 16.00 23.25 14.96 21.75 C 14.59 22.08 13.85 22.75 13.49 23.08 C 14.50 23.87 14.96 24.92 14.88 26.23 C 12.44 26.26 9.99 26.25 7.54 26.27 C 9.29 23.71 11.05 21.15 12.80 18.59 C 11.25 16.30 9.68 14.02 8.07 11.77 Z"
                      />
                    </g>
                  </svg>
                </template>
                <template v-else-if="matchType0(item.suffix)=='ppt'">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#2c2c2cff">
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 4.02 0.00 L 19.26 0.00 C 22.71 2.88 26.11 5.82 29.52 8.76 C 29.46 15.84 29.57 22.92 29.44 30.00 C 28.89 30.50 27.78 31.50 27.23 32.00 L 4.03 32.00 C 3.29 31.37 2.56 30.74 1.83 30.09 C 1.70 20.70 1.69 11.31 1.83 1.92 C 2.55 1.27 3.28 0.63 4.02 0.00 M 4.91 3.10 C 4.71 11.69 4.54 20.31 5.00 28.90 C 12.06 29.11 19.13 28.98 26.20 28.97 C 26.85 22.76 26.35 16.50 26.48 10.26 C 24.28 10.24 22.07 10.23 19.87 10.18 C 18.94 7.90 19.26 5.41 19.24 3.00 C 14.47 3.02 9.68 2.92 4.91 3.10 Z"
                      />
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 9.01 10.25 C 11.84 10.32 14.72 9.98 17.51 10.55 C 21.11 11.54 22.01 16.85 19.12 19.08 C 17.15 20.77 14.40 20.14 12.03 20.27 C 11.70 22.15 13.10 25.97 10.15 26.06 C 9.88 25.83 9.34 25.38 9.07 25.15 C 8.87 20.19 9.06 15.22 9.01 10.25 M 12.01 11.70 C 12.00 14.16 12.00 16.62 12.01 19.09 C 14.71 19.38 18.41 18.37 18.12 14.95 C 18.19 11.81 14.39 11.49 12.01 11.70 Z"
                      />
                    </g>
                  </svg>
                </template>
                <template v-else-if="matchType0(item.suffix)=='pdf'">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#2c2c2cff">
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 3.85 0.00 L 19.29 0.00 C 22.81 3.27 26.08 6.79 29.51 10.15 C 29.42 16.14 29.65 22.13 29.46 28.11 C 29.62 29.72 28.48 30.87 27.54 32.00 L 3.97 32.00 C 2.77 30.99 1.51 29.81 1.79 28.07 C 1.70 20.03 1.70 11.98 1.79 3.94 C 1.56 2.26 2.78 1.09 3.85 0.00 M 4.89 3.04 C 4.70 11.66 4.59 20.29 4.95 28.91 C 12.05 29.09 19.16 28.99 26.26 28.97 C 26.76 22.75 26.38 16.51 26.50 10.28 C 24.19 10.11 21.61 10.72 19.48 9.64 C 19.10 7.45 19.24 5.22 19.22 3.00 C 14.45 3.00 9.67 2.98 4.89 3.04 Z"
                      />
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 13.98 14.35 C 13.25 12.09 11.13 7.42 15.06 7.22 C 17.56 8.82 16.06 11.82 15.72 14.08 C 16.72 15.43 17.74 16.75 18.82 18.03 C 20.95 17.92 23.50 17.22 25.19 18.97 C 24.96 23.32 19.44 20.56 17.00 19.77 C 16.51 18.78 15.99 17.81 15.43 16.85 C 14.81 17.65 13.40 18.73 14.34 19.80 L 14.82 20.27 C 14.70 21.25 13.95 21.79 12.57 21.88 C 10.98 23.54 9.82 26.53 7.08 26.15 C 4.40 23.34 9.59 21.65 11.47 20.42 C 12.37 18.42 13.21 16.40 13.98 14.35 Z"
                      />
                    </g>
                  </svg>
                </template>
                <template v-else-if="matchType0(item.suffix)=='image'">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#2c2c2cff">
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 4.02 0.00 L 20.56 0.00 C 23.63 2.87 26.50 5.94 29.50 8.89 C 29.44 15.27 29.61 21.66 29.47 28.04 C 29.68 29.73 28.43 30.88 27.38 32.00 L 3.94 32.00 C 2.73 30.99 1.46 29.84 1.78 28.08 C 1.71 19.36 1.71 10.64 1.82 1.91 C 2.55 1.27 3.28 0.63 4.02 0.00 M 4.92 3.04 C 4.70 11.65 4.54 20.30 5.00 28.91 C 12.07 29.10 19.14 28.98 26.21 28.97 C 26.87 22.27 26.33 15.52 26.49 8.79 C 24.79 8.74 23.06 8.89 21.38 8.53 C 20.16 7.07 21.00 4.79 20.72 3.00 C 15.45 3.01 10.18 2.97 4.92 3.04 Z"
                      />
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 17.44 10.64 C 20.69 8.97 24.62 12.70 23.28 16.06 C 22.30 19.15 17.73 19.86 15.84 17.26 C 14.06 15.23 14.91 11.62 17.44 10.64 M 18.15 13.35 C 16.59 14.65 18.91 16.98 20.26 15.57 C 21.60 14.28 19.52 11.86 18.15 13.35 Z"
                      />
                      <path
                        fill="#2c2c2c"
                        opacity="1.00"
                        d=" M 7.77 23.62 C 3.91 21.74 8.69 19.02 10.08 17.21 C 12.40 18.68 14.16 20.82 16.10 22.74 C 17.07 21.82 18.04 20.91 19.01 20.00 C 21.22 21.81 23.41 23.71 25.08 26.04 C 23.73 29.87 20.88 25.25 19.33 23.94 C 18.30 24.69 17.53 26.09 16.13 26.11 C 14.02 24.76 12.45 22.76 10.67 21.03 C 9.71 21.89 8.74 22.75 7.77 23.62 Z"
                      />
                    </g>
                  </svg>
                </template>
                <template v-else>
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="#000000ff">
                      <path
                        fill="#000000"
                        opacity="1.00"
                        d=" M 3.61 0.00 L 21.15 0.00 C 23.89 2.22 26.31 4.77 28.78 7.28 C 28.71 15.52 29.06 23.77 28.56 32.00 L 3.56 32.00 C 2.83 26.69 3.34 21.33 3.19 16.00 C 3.33 10.66 2.82 5.30 3.61 0.00 M 6.40 3.26 C 6.40 11.75 6.40 20.25 6.40 28.74 C 12.80 28.75 19.20 28.75 25.60 28.74 C 25.52 22.15 25.74 15.54 25.51 8.95 C 23.90 6.86 22.03 4.86 19.87 3.33 C 15.39 3.09 10.89 3.33 6.40 3.26 Z"
                      />
                      <path
                        fill="#000000"
                        opacity="1.00"
                        d=" M 16.02 12.76 C 16.52 10.30 14.47 5.29 17.94 4.82 C 20.24 6.55 22.44 8.55 24.05 10.95 C 23.17 14.27 18.52 12.20 16.02 12.76 Z"
                      />
                    </g>
                  </svg>
                </template>
              </el-col>
              <el-col :span="17" class="text">
                <p @click="download(item)">{{item.fileName}}</p>
                <p>{{item.carTypeName+item.coopItemsStr+item.name}}</p>
                <p>{{item.name}}</p>
              </el-col>
            </div>
          </el-col>
        </el-scrollbar>
      </div>
      <el-col :span="24" class="paging">
        <el-pagination
          @size-change="changeSize"
          @current-change="changePage"
          :current-page="1"
          :page-sizes="[20, 30, 50]"
          :page-size="pageSize"
          layout="total, prev, pager, next ,sizes"
          :total="total"
          background
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
// import { matchType } from '@/utils/matchType' // 引入文件格式判断方法
import { matchType, matchType0 } from '@/utils/matchType' // 引入文件格

export default {
  name: 'document',
  props: ['searchWordData'],
  components: {},
  data() {
    return {
      cooperateleListData: [],
      // 分页数据
      total: 0,
      pageNum: 1,
      pageSize: 30,
    }
  },
  // 侦听器
  watch: {
    searchWordData: function (newData, oldData) {
      // console.log(newData)
      this.getTaskListAjax()
    },
  },
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取文档列表 /////////
    this.getCooperateListAjax()
  },
  // 方法
  methods: {
    matchType,
    matchType0,
    ///////// 获取文档列表 start /////////
    getCooperateListAjax() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        cooperate: {
          fileName: this.searchWordData.value,
        },
      }
      this.$axios.post('/ocarplay/api/cooperate/listAjax', data).then((res) => {
        // console.log(res)
        if (res.status == 200) {
          let data = res.data
          this.cooperateleListData = data.items
          this.total = data.totalRows
          // console.log(this.cooperateleListData)
        }
      })
    },

    ///////// 获取文档列表 end /////////

    ///////// 分页 start /////////
    // 每页条数变化时触发事件
    changeSize(pageSize) {
      console.log(pageSize)
      this.pageSize = pageSize
      ///////// 获取文档列表 start /////////
      this.getCooperateListAjax()
    },
    // 页码变换时触发事件
    changePage(pageNum) {
      console.log(pageNum)
      this.pageNum = pageNum
      ///////// 获取文档列表 start /////////
      this.getCooperateListAjax()
    },
    ///////// 分页 end /////////

    ///////// 下载 start /////////
    download(row) {
      // console.log(row)
      let localPath = row.localPath
      let a = document.createElement('a')
      a.download = `${row.fileName}.${row.suffix}`
      a.setAttribute('href', '/ocarplay/' + localPath)
      a.click()
    },
    ///////// 下载 end /////////
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#document {
  height: 100%;
  .content {
    height: calc(100% - 16px);
    // background: #fff;
    .table_list {
      height: calc(100% - 64px);
      box-sizing: border-box;
      padding-top: 13px;
      .items {
        // background: red;
        height: 90px;
        padding: 0 13px;
        margin-bottom: 26px;
        .item {
          height: 100%;
          background: white;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          .icon {
            // width: 72px;
            // height: 72px;
            text-align: center;
          }
          .text {
            p {
              width: 100%;
              font-size: 13px;
              color: #999;
              overflow: hidden; // 超出隐藏
              white-space: nowrap; // 不换行
              text-overflow: ellipsis; // 显示省略号
              cursor: pointer;
              &:nth-of-type(1) {
                font-size: 16px;
                color: #000;
              }
              &:nth-of-type(1):hover {
                color: $icoColor;
              }
            }
          }
        }
      }
    }
    .paging {
      height: 64px;
      box-sizing: border-box;
      padding: 16px;
      text-align: center;
      background: none;
    }
  }
}
</style>
