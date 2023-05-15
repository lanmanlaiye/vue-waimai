<template>
  <div class="home">
    <div class="content">
      <!-- 头部 -->
      <div class="header">
        <div class="text">外卖</div>
        <div class="location">
          <van-icon name="location-o" />
          <span>jason老师分享</span>
          <van-icon name="arrow" />
        </div>
      </div>
      <!-- 主要内容 -->
      <div class="main">
        <div class="main-bg">
          <div class="search">
            <input type="text" />
            <div class="search-text">搜索</div>
          </div>
          <div class="sort">
            <div class="big-sort">
              <div v-for="(item, index) in big_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
            <div class="small-sort">
              <div v-for="(item, index) in small_sort" :key="index">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="`#${item.icon}`"></use>
                </svg>
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <van-tabs v-model:active="active" class="van-tabs">
          <van-tab
            v-for="(item, index) in centent_nav_list"
            :key="index"
            :title="item.tab"
          >
            <nav-list :navList="item.data" />
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
// @ts-nocheck

import Footer from "../../components/Footer.vue";
import NavList from "./components/NavList.vue";
import { toRefs, reactive, ref, onMounted } from "vue";
import { getApiHomeData } from "../../api/api";
export default {
  components: {
    Footer,
    NavList,
  },
  setup() {
    let data = reactive({
      big_sort: [],
      small_sort: [],
      centent_nav_list: [],
    });
    const active = ref(0);
    const getHomeData = () => {
      getApiHomeData().then((res) => {
        data.big_sort = res.big_sort;
        data.small_sort = res.small_sort;
        data.centent_nav_list = res.centent_nav_list;
      });
      // axios.get("/home/getHomeData").then((res) => {
      //   // console.log(res);
      //   const { code, homeData } = res.data;
      //   if (code == 200) {
      //     data.big_sort = homeData.big_sort;
      //     data.small_sort = homeData.small_sort;
      //     data.centent_nav_list = homeData.centent_nav_list;
      //   }
      // });
      // mockjs
    };
    onMounted(() => {
      getHomeData();
    });

    return {
      ...toRefs(data),
      active,
    };
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  flex-flow: column;
  height: 100%;
  font-size: 12px;
  .content {
    flex: 1;
    overflow-y: auto;
    .header {
      background-image: linear-gradient(#ffc400, #fff);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 40px 20px;
      .text {
        font-size: 20px;
        font-weight: 600;
      }
      .location {
        span {
          margin: 0 5px;
        }
        font-size: 14px;
      }
    }
    .main {
      margin-top: -30px;
      .main-bg {
        background-image: linear-gradient(#fff, #f5f5f5);
        padding: 10px 20px 0px 20px;
        border-radius: 30px 30px 0 0;
        // position: relative;
        .search {
          position: relative;
          input {
            width: 100%;
            border: 1px solid #ffc400;
            border-radius: 20px;
            height: 30px;
          }
          .search-text {
            position: absolute;
            background-color: #ffc400;
            right: -6px;
            top: 1px;
            width: 50px;
            height: 32px;
            border-radius: 16px;
            text-align: center;
            line-height: 32px;
            font-size: 14px;
          }
        }
        .sort {
          padding: 20px 0;
          .big-sort {
            display: flex;
            div {
              flex: 1;
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              .icon {
                width: 50px;
                height: 50px;
                margin-bottom: 5px;
              }
            }
          }
          .small-sort {
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            div {
              display: flex;
              justify-content: center;
              flex-flow: column;
              align-items: center;
              width: 20%;
            }
            .icon {
              width: 30px;
              height: 30px;
              margin: 10px;
            }
          }
        }
      }
      .van-tabs {
        padding: 0 20px 10px;
      }
    }
  }
}
/deep/ .van-tabs__wrap {
  border-radius: 10px;
}
</style>
