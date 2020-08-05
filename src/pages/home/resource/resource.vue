<template>
  <div id="resource">
    <router-view></router-view>
  </div>
</template>
<script>
// import cityList from '@/common/city.js' // 引入城市数据

export default {
  name: 'resource',
  components: {},
  data() {
    return {}
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {},
  // 方法
  methods: {},
}
</script>
<style lang="scss">
$icoColor: #6a91e8;
#resource {
  height: 100%;
  $icoColor: #6a91e8;
  .content {
    height: calc(100% - 54px);
    // background: #fff;
    .el-scrollbar {
      height: calc(100% - 64px);
    }
    .table_list {
      height: 100%;
      // padding: 0 36px;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      .itemsBox {
        padding: 13px;
        height: 254px;
        .items {
          // width: 400px;
          height: 100%;
          min-height: 160px;
          margin-bottom: 1%;
          // margin-left: 6.25%;
          box-sizing: border-box;
          // padding: 9px;
          overflow: hidden;
          padding-top: 13px;
          border: 1px solid #e7e7e7;
          border-radius: 6px;
          background: white;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-content: space-between;
          align-items: flex-start;
          &:nth-of-type(3n + 1) {
            margin-left: 0;
          }
          .left {
            width: 49%;
            height: 72%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            .el-imageBox {
              position: relative;
              .sex {
                width: 24px;
                height: 24px;
                line-height: 24px;
                text-align: center;
                background: white;
                position: absolute;
                bottom: 8px;
                right: 8px;
                z-index: 9;
                box-sizing: border-box;
                border-radius: 50%;
                border: 1px solid #e9e9e9;
                i {
                  font-weight: bold;
                  font-size: 16px;
                  color: #ff94b8;
                }
              }
              $imgwidth: 120px;
              .el-image {
                margin: 0 auto;
                width: $imgwidth;
                height: $imgwidth;
                border-radius: 50%;
                padding: 6px;
                background: #e9e9e9;
                img {
                  width: $imgwidth;
                  height: $imgwidth;
                  border-radius: 50%;
                  object-fit: cover;
                }
              }
              .zhezhao {
                width: $imgwidth;
                height: 36px;
                line-height: 36px;
                color: white;
                background: rgba(0, 0, 0, 0.4);
                position: absolute;
                bottom: 0;
                text-align: center;
              }
            }
          }
          .right {
            width: 45%;
            height: 81%;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            > div {
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
            }
            p {
              width: 100%;
              font-size: 14px;
              i {
                color: $icoColor;
              }
              span {
                color: $icoColor;
              }
            }
            .el-image {
              width: 100%;
              height: 100%;
            }
          }
          .bottom {
            width: 100%;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: $icoColor;
            background: rgba(0, 0, 0, 0.4);
            i {
              font-size: 24px;
              color: white;
              line-height: 32px;
              cursor: pointer;
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

  .paging {
    background: none;
  }
}
</style>
