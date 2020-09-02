<template>
  <div id="addOwners">
    <!-- 内容列表 start -->
    <el-row class="content" v-loading="loading">
      <el-scrollbar style="height:100%">
        <!-- 标题 start -->
        <el-col :span="24" class="top">
          <el-col :span="6" class="previousBox">
            <div @click="previous">
              <i class="el-icon-arrow-left"></i>
              返回
            </div>
          </el-col>
          <!-- <el-col :span="12"> -->
          <!-- 类型选择 -->
          <el-col :span="6" :offset="12" class="redact" v-if="subordinate==150||adminShow||userId==193||userId==32||userId==3790">
            <i class="el-icon-edit" @click="redact"></i>
          </el-col>
          <!-- </el-col> -->
        </el-col>
        <!-- 标题 end -->

        <!-- 左侧 start -->
        <el-col :span="8" class="left">
          <el-col :span="24" class="title">基础信息</el-col>
          <el-col :span="24" class="content">
            <!-- 上传照片 -->
            <el-col :span="24" class="upladImgBox">
              <el-upload
                class="upladImg"
                action="/ocarplay/file/upload"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :file-list="fileList"
                :disabled="true"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" width="36%">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">车主姓名：</el-col>
              <el-col :span="15" class="val">{{ownersName}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">合作事项：</el-col>
              <el-col :span="15" class="val">{{eventData}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">车主性别：</el-col>
              <el-col :span="15" class="val">
                <span v-if="sex">女</span>
                <span v-else>男</span>
              </el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">车主职业：</el-col>
              <el-col :span="15" class="val" v-if="work">{{work}}</el-col>
              <el-col :span="15" class="val" v-else>暂无信息</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">出生日期：</el-col>
              <el-col :span="15" class="val" v-if="birthDate">{{$date0(birthDate)}}</el-col>
              <el-col :span="15" class="val" v-else>暂无信息</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">车主来源：</el-col>
              <el-col :span="15" class="val">{{source}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">特长：</el-col>
              <el-col :span="15" class="val" v-if="speciality">{{speciality}}</el-col>
              <el-col :span="15" class="val" v-else>暂无信息</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">用车生活：</el-col>
              <el-col :span="15" class="val">{{livelihood}}</el-col>
            </el-col>

            <el-col :span="24" class="list">
              <el-col :span="6" :class="[tabact==1 ? 'key' : 'key']">认证车型：</el-col>
              <el-col :span="15" class="val">{{carSeries}}</el-col>
            </el-col>
            <el-col :span="24" class="list">
              <el-col :span="6" class="key">所在区域：</el-col>
              <el-col :span="15" class="val">{{district}}</el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- 左侧 end -->

        <!-- 右侧 start -->
        <el-col :span="16" class="right">
          <el-col :span="24" class="box">
            <el-col :span="24" class="title">合作信息：</el-col>
            <el-col :span="12" class="box1">
              <el-col :span="24" class="list">
                <el-col :span="7" :class="[tabact!=1 ? 'key' : 'key']">签约合同：</el-col>
                <el-col :span="14" class="val">
                  <template v-if="pactFileList.length!=0">
                    <el-col :span="3" class="icon">
                      <template v-if="$matchType0(pactsuffix)=='word'">
                        <svg
                          width="24"
                          height="24"
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
                      <template v-else-if="$matchType0(pactsuffix)=='excel'">
                        <svg
                          width="24"
                          height="24"
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
                      <template v-else-if="$matchType0(pactsuffix)=='ppt'">
                        <svg
                          width="24"
                          height="24"
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
                      <template v-else-if="$matchType0(pactsuffix)=='pdf'">
                        <svg
                          width="24"
                          height="24"
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
                      <template v-else-if="$matchType0(pactsuffix)=='image'">
                        <svg
                          width="24"
                          height="24"
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
                          width="24"
                          height="24"
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
                    <el-link @click="$download(pactFileList)">{{pactName}}</el-link>
                    <!-- {{pactFileList}} -->
                  </template>
                  <template v-else>暂无信息</template>
                </el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">合作期限：</el-col>
                <el-col :span="15" class="val" v-if="timeLimit">{{timeLimit}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">合作时长：</el-col>
                <el-col :span="15" class="val" v-if="duration">{{duration}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
            </el-col>
            <el-col :span="12" class="box2">
              <el-col :span="24" class="list" v-if="tabact == 1">
                <el-col :span="8" class="key">合作概况：</el-col>
                <el-col :span="24" class="val situation">
                  <el-col :span="24" class="list" v-for="(item, index) in eventList" :key="index">
                    <el-col :span="5">{{item.itemName}}</el-col>
                    <el-col :span="6">{{item.coopNum}}</el-col>
                    <el-col :span="6">{{item.coopMoney}}</el-col>
                    <el-col :span="6">
                      <span v-if="item.period==0">按月结算</span>
                      <span v-if="item.period==1">按年结算</span>
                      <span v-if="item.period==2">按季度结算</span>
                    </el-col>
                  </el-col>
                </el-col>
              </el-col>
              <el-col :span="24" class="list" v-else-if="tabact != 1">
                <el-col :span="7" class="key">IP孵化打造：</el-col>
                <el-col :span="24" class="val hatch">
                  <el-col :span="24" class="list" v-for="(item, index) in hatchList" :key="index">
                    <el-col :span="5">{{item.plat}}</el-col>
                    <el-col :span="5">{{item.platRole}}</el-col>
                    <el-col :span="5">{{item.nickname}}</el-col>
                    <el-col :span="5">{{item.url}}</el-col>
                    <el-col :span="3"></el-col>
                  </el-col>
                </el-col>
              </el-col>
            </el-col>
            <el-col :span="24" class="title title3">详细信息：</el-col>
            <el-col :span="12" class="box1">
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">手机号：</el-col>
                <el-col :span="15" class="val" v-if="tel">{{tel}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">微信号：</el-col>
                <el-col :span="15" class="val" v-if="wx">{{wx}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">QQ号：</el-col>
                <el-col :span="15" class="val" v-if="qq">{{qq}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">汽车之家ID：</el-col>
                <el-col :span="15" class="val" v-if="carId">{{carId}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">汽车之家主页：</el-col>
                <el-col :span="15" class="val" v-if="carHome">{{carHome}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">微博ID：</el-col>
                <el-col :span="15" class="val" v-if="microblog">{{microblog}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">抖音ID：</el-col>
                <el-col :span="15" class="val" v-if="tikTokId">{{tikTokId}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">其他社交ID：</el-col>
                <el-col :span="15" class="val" v-if="socialId">{{socialId}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">车牌号：</el-col>
                <el-col :span="15" class="val" v-if="carNum">{{carNum}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">车架号：</el-col>
                <el-col :span="15" class="val" v-if="vin">{{vin}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">购车网点：</el-col>
                <el-col :span="15" class="val" v-if="branch">{{branch}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
            </el-col>
            <!-- 左右分割线 -->
            <el-col :span="12" class="box2">
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">家庭住址：</el-col>
                <el-col :span="15" class="val" v-if="address">{{address}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">收货地址：</el-col>
                <el-col :span="14" class="val">
                  <el-col :span="15" class="val" v-if="district0">{{district0}}</el-col>
                  <el-col :span="15" class="val" v-else>暂无信息</el-col>
                </el-col>
              </el-col>
              <!-- <el-col :span="24" class="list">
                <el-col :span="7" class="key"></el-col>
                <el-col :span="14" class="val">
                  <el-col :span="24">{{deliAddress}}</el-col>
                </el-col>
              </el-col>-->
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">开户行：</el-col>
                <el-col :span="15" class="val" v-if="bank">{{bank}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">银行卡号：</el-col>
                <el-col :span="15" class="val" v-if="bankCard">{{bankCard}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">备注信息：</el-col>
                <el-col :span="15" class="val" v-if="remake">{{remake}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key">车主邮箱：</el-col>
                <el-col :span="15" class="val" v-if="mail">{{mail}}</el-col>
                <el-col :span="15" class="val" v-else>暂无信息</el-col>
              </el-col>
              <el-col :span="24" class="list">
                <el-col :span="7" class="key relation">家属信息：</el-col>
                <el-col :span="16" class="val" v-if="relationList.length!=1">
                  <el-col
                    :spam="24"
                    class="relationList"
                    v-for="(item,index) in relationList"
                    :key="index"
                  >
                    <el-col :span="5">{{item.name}}</el-col>
                    <el-col :span="5">{{item.relation}}</el-col>
                    <el-col :span="10">{{item.work}}</el-col>
                    <el-col :span="3"></el-col>
                  </el-col>
                </el-col>
                <el-col :span="16" class="val" v-else>暂无信息</el-col>
              </el-col>
            </el-col>
          </el-col>
        </el-col>
        <!-- 右侧 end -->
        <!-- 签约合作信息 end -->
        <el-col :span="24" class="put">
          <el-table
            :data="ownerDetil.invites"
            style="width: 100%"
            :header-row-style="{'height': '54px','background': 'rgb(242, 242, 242)'}"
            :header-cell-style="{'color': '#000','background': 'rgb(242, 242, 242)',}"
          >
            <el-table-column prop label="序号" width="81" align="center">
              <template slot-scope="scope">0{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column prop="createTime" label="受邀时间" min-width="81" show-overflow-tooltip>
              <template slot-scope="scope">{{$date(scope.row.createTime)}}</template>
            </el-table-column>
            <el-table-column
              prop="task.taskName"
              label="受邀任务"
              min-width="180"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="itemName" label="受邀事项" min-width="81" show-overflow-tooltip></el-table-column>
            <el-table-column prop="title" label="内容标题" min-width="81" show-overflow-tooltip></el-table-column>
            <el-table-column prop="url" label="内容链接" min-width="81" show-overflow-tooltip>
              <template slot-scope="scope">
                <el-link
                  type="primary"
                  :href="'http://'+scope.row.url"
                  target="_blank"
                >{{scope.row.url}}</el-link>
              </template>
            </el-table-column>
            <el-table-column prop="addnum" label="成果" min-width="100"></el-table-column>
          </el-table>
        </el-col>
      </el-scrollbar>
    </el-row>
    <!-- 内容列表 end -->
  </div>
</template>
<script>
//ort {dateDiff} from '@/utils/dateDiff' // 引入文件格式判断方法
import cities from '@/common/cities.js' // 引入城市数据

export default {
  name: 'addOwners',
  components: {},
  data() {
    return {
      userId: this.$store.state.user.userId, // 用户ID
      deptId: this.$store.state.user.deptId, // 部门ID
      postId: this.$store.state.user.postId, // 职位ID
      subordinate: this.$store.state.user.subordinate, // 一级部门ID
      adminShow: this.$store.state.adminShow, // 一级部门ID
      
      loading: false, // 上传loading
      checked: false,
      itemDisabled: false,
      radio: '',
      input1: '',
      value1: '',
      dialogImageUrl: '',
      dialogVisible: false,
      tabact: 1,
      dialogVisible: false,
      options: [],
      value: '',

      periodList: [
        {
          value: 0,
          label: '按月结算',
        },
        {
          value: 1,
          label: '按年结算',
        },
        {
          value: 2,
          label: '按季度结算',
        },
      ],

      // 车主基础信息
      vehicleOwnerId: '', // 接口请求数据
      addType: 0,
      ownerDetil: '', // 修改回填数据
      fileList: [], // 头像回填
      handerImg: '', // 头像
      eventDataList: [], // 合作事项列表
      eventData: null, // 合作事项
      sex: '', // 车主性别
      work: '', // 车主职业
      birthDate: '', // 出生日期
      // 城市选择器数据  所在区域
      district_code: [], // 区域代码
      district: [], // 区域名称
      district_code0: [], // 收货区域代码
      district0: '', // 收货区域名称
      ownerSkilList: [], // 特长列表
      speciality: '', // 特长
      ownersName: '', // 车主姓名
      livelihood: null, // 用车生活
      livelihood0: '',
      sourceList: [], // 车主来源列表
      source: '', // 车主来源
      carSeriesList: [], // 认证车型列表
      carSeries: [], // 认证车型
      carSeriesId: '', // 认证车型回填
      mail: '', // 车主邮箱
      team: '', // 项目组
      eventList: [], // 合作概况

      // 车主详细信息
      tel: '', // 手机号
      wx: '', // 微信号
      qq: '', // QQ号
      carId: '', // 汽车之家ID
      carHome: '', // 汽车之家主页
      microblog: '', // 微博ID
      tikTokId: '', // 抖音ID
      socialId: '', // 其他社交ID
      carNum: '', // 车牌号
      vin: '', // 车架号
      branch: '', // 购车网点
      address: '', // 家庭住址
      deliAddress: '', // 收货地址
      bankCard: '',
      bank: '',
      remake: '',
      // 家属信息
      relationList: [
        {
          relationId: '',
          name: '',
          relation: '',
          birthday: '',
          work: '',
        },
      ],

      // 签约合作信息
      pactFileList: [],
      cooperatesId: '',
      pactName: '', // 合同文件名称
      pactPath: '', // 合同文件地址
      pactsuffix: '', // 合同文件后缀
      timeLimit: '', // 合作期限
      duration: '', // 合作时长
    }
  },
  // 侦听器
  watch: {},
  // 钩子函数
  beforeCreate() {},
  beforeMount() {},
  mounted() {
    ///////// 获取车主信息 start /////////
    this.getVehicleOwnerDetail()
  },
  // 方法事件
  methods: {
    ///////// 返回上一页 start /////////
    previous() {
      this.$router.go(-1) //返回上一层
    },
    ///////// 返回上一页 end /////////

    ///////// 获取车主信息 start /////////
    getVehicleOwnerDetail() {
      this.loading = true
      let query = this.$route.query
      let data = {
        typeId: query.typeId*1,
        vehicleOwnerId: query.vehicleOwnerId*1,
      }
      // console.log(data)
      this.$axios
        .post('/ocarplay/api/vehicleOwner/preEdit', data)
        .then((res) => {
          // console.log(res)
          // this.loading = false
          if (res.status == 200) {
            // console.log(res)
            let data = res.data
            this.vehicleOwnerId = data.vehicleOwnerId
            this.ownerDetil = data
            if (data.image) {
              this.handerImg = data.image
              data.image = '/ocarplay/' + data.image
              this.fileList = [{ name: '', url: data.image }]
            } else {
              this.fileList = [
                { name: '', url: 'static/images/carow/hander.png' },
              ]
            }

            this.tabact = data.typeId
            if (data.typeId == 1) {
              let eventData = ''
              data.ownerCoops.forEach((element) => {
                eventData += element.itemName
              })
              // eventData = Array.from(new Set(eventData))
              // console.log(eventData)
              this.eventData = eventData
              // console.log(this.eventData)

              let eventList = []
              data.ownerCoops.forEach((element) => {
                eventList.push({
                  coopId: element.coopId, // 合作概况ID
                  coopNum: element.coopNum, // 固定合作总量
                  coopMoney: element.coopMoney, // 固定合作总价
                  itemId: element.itemId, // 车主选择的合作事项ID
                  itemName: element.itemName, // 车主选择的合作事项Name
                  period: element.period, // 结算周期
                  timeLimit: element.timeLimit, // 合作时长
                  typeId: element.typeId,
                })
              })
              this.eventList = eventList
              // console.log(eventList)
            } else if (data.typeId == 2 || data.typeId == 3) {
              let eventData = []
              data.ipGrows.forEach((element) => {
                eventData.push(element.itemId)
              })
              eventData = Array.from(new Set(eventData))
              // console.log(eventData)
              this.eventData = eventData
              // console.log(this.eventData)

              let itemId = data.ipGrows[0].itemId
              let ipGrows = []
              data.ipGrows.forEach((element) => {
                if (element.itemId == itemId) {
                  ipGrows.push({
                    coopId: element.coopId,
                    plat: element.plat,
                    platRole: element.platRole,
                    nickname: element.nickname,
                    url: element.url,
                  })
                }
              })
              // console.log(ipGrows)
              this.hatchList = ipGrows
            }
            if (data.sex) {
              this.sex = '1'
            } else {
              this.sex = '0'
            }
            // console.log(this.sex)
            this.work = data.work
            if (data.birthday) {
              this.birthDate = new Date(data.birthday.replace(/-/g, '/'))
            }

            this.district = data.province + data.city
            this.speciality = data.skillId
            this.ownersName = data.name
            this.livelihood = data.carUse
            this.source = data.sourceName
            let carSeries = ''
            data.ownerCarSeries.forEach((element) => {
              carSeries += element.carSeriesName
            })
            this.carSeries = carSeries
            this.mail = data.email

            this.tel = data.phone
            this.wx = data.wx
            this.qq = data.qq
            this.carId = data.bbsId
            this.carHome = data.homeUrl
            this.microblog = data.weiboId
            this.tikTokId = data.dyId
            this.socialId = data.otherId
            this.carNum = data.plateNum
            this.vin = data.vinno
            this.branch = data.buycarplace
            this.address = data.homeAddress
            this.bankCard = data.bankCard
            this.bank = data.bank
            this.remake = data.remake
            // this.deliAddress = data.homeAddress
            let relationList = []
            data.relations.forEach((element) => {
              relationList.push({
                relationId: element.relationId,
                name: element.name,
                relation: element.relation,
                birthday: element.birthday,
                work: element.work,
              })
            })
            this.relationList = relationList
            if (data.cooperates.length != 0) {
              if (data.cooperates[0].localPath) {
                this.pactFileList = {
                  fileName: data.cooperates[0].fileName,
                  localPath: data.cooperates[0].localPath,
                  suffix: data.cooperates[0].suffix,
                }
              }
              this.cooperatesId = data.cooperates[0].id
              this.pactName = data.cooperates[0].fileName
              this.pactPath = data.cooperates[0].localPath
              this.pactsuffix = data.cooperates[0].suffix
              this.timeLimit =
                data.cooperates[0].startTime + '——' + data.cooperates[0].endTime

              this.duration = data.cooperates[0].timeLimit
            }
            if (data.deliveryAddresses.length) {
              this.district0 =
                data.deliveryAddresses[0].province +
                data.deliveryAddresses[0].city +
                data.deliveryAddresses[0].area

              this.deliAddress = data.deliveryAddresses[0].address
            }

            // console.log(this.district_code)
          }
          this.loading = false
        })
    },

    ///////// 跳转编辑 start /////////
    redact() {
      let query = this.$route.query
      this.$router.push({
        path: '/home/addowners',
        // name: 'addowners',
        query: {
          type: 1,
          typeId: query.typeId,
          vehicleOwnerId: query.vehicleOwnerId,
        },
        // params: {
        //   type: 1
        // }
      })
    },
    ///////// 跳转编辑 end /////////

    ///////// 头像上传 start //////////
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    ///////// 头像上传 end //////////
  },
}
</script>
<style lang="scss" scoped>
$icoColor: #6a91e8;
#addOwners {
  height: 100%;
  // background: white;
  .content {
    position: relative;
    height: 100%;
    box-sizing: border-box;
    padding: 18px 0;
    i {
      cursor: pointer;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 13px 0;
      & >>> .el-checkbox {
        margin-right: 6px;
      }
      & >>> .el-checkbox__label {
        padding-left: 6px;
      }
      .relation {
        align-self: start;
      }
      .relationList {
        margin-bottom: 9px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }
      .key {
        // width: 125px;
        height: 40px;
        line-height: 40px;
        // margin-right: 13px;
        text-align: left;
        box-sizing: border-box;
        padding: 0 9px;
      }
      .key:after {
        display: inline-block;
        content: '';
        padding-left: 100%;
      }
      .val {
        // width: 420px;
        line-height: 40px;
        .el-cascader,
        .el-select,
        .el-date-editor,
        .el-input {
          width: 100%;
        }
      }
      .situation {
        width: 100%;
        .list {
          margin: 3px 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }
      }
      .hatch {
        width: 100%;
        .list {
          margin: 3px 0;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }
      }
      .livelihood {
        height: 40px;
        line-height: 40px;
      }
    }
    .top {
      height: 54px;
      background: white;
      text-align: center;
      margin-bottom: 13px;
      padding: 0 18px;
      border: 1px solid #ddd;
      border-radius: 6px;
      .previousBox {
        height: 54px;
        line-height: 54px;
        font-size: 22px;
        text-align: left;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
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
        height: 54px;
        line-height: 54px;
        padding-right: 18px;
        i {
          line-height: 54px;
          cursor: pointer;
          color: $icoColor;
          font-size: 28px;
        }
      }
    }
    $conth: 1120px;
    .left {
      height: $conth;
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      padding: 0 36px;
      .title {
        // padding-left: 18px;
        height: 54px;
        line-height: 54px;
        font-size: 18px;
        font-weight: bold;
        border-bottom: 1px dashed #aaa;
      }
      .content {
        padding-bottom: 0;
        .upladImgBox {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 16px 0;
        }
      }
    }
    .right {
      height: $conth;
      padding-left: 24px;
      .box {
        height: 100%;
        background: white;
        border: 1px solid #ddd;
        border-radius: 6px;
        padding: 0 36px;
        .title {
          //levelProp
          // padding-left: 18px;
          height: 54px;
          line-height: 54px;
          font-size: 18px;
          font-weight: bold;
          border-bottom: 1px dashed #aaa;
          margin-bottom: 13px;
        }
        .title3 {
          margin-top: 24px;
        }
        .box1 {
          padding-right: 18px;
        }
        .box2 {
          padding-left: 18px;
        }
      }
    }

    $pad: 49px;
    .put {
      margin-top: 24px;
      text-align: center;
      background: white;
      border: 1px solid #ddd;
      border-radius: 6px;
      // padding: 3px 0;
      button {
        width: 272px;
        font-size: 18px;
      }
    }
  }
}
</style>
<style lang="scss">
.upladImg {
  width: 235px;
  height: 235px;
  overflow: hidden;
  .el-upload--picture-card {
    width: 235px;
    height: 235px;
    margin: 0 auto;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-upload-list__item {
    width: 235px;
    height: 235px;
    margin: 0 auto;
    border-radius: 50%;
  }
}
</style>
