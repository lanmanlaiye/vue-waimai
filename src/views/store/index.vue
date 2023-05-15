<template>
  <div class="storeDetails">
    <Header title="店铺" />
    <div class="content">
      <div class="img"></div>
      <div class="foodSort">
        <div class="name">
          {{ title }}
          <img :src="img" class="store-img" />
        </div>
        <div class="sort">
          <van-tabs color="#ffc400">
            <van-tab v-for="(item, index) in storeData" :title="item.name">
              <FoodList :index="index" :foodData="item.data" />
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon
        icon="cart-o"
        text="购物车"
        :badge="store.state.cartList.length"
        @click="goCart"
      />
      <van-action-bar-button
        type="warning"
        text="加入购物车"
        @click="handleAddCart"
      />
      <van-action-bar-button type="danger" text="立即购买" @click="goBuy" />
    </van-action-bar>
  </div>
</template>
<script>
import { reactive, toRefs, onMounted } from "vue";
import Header from "../../components/Header.vue";
import FoodList from "./components/FoodList.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import axios from "axios";
import { getApiStoreData } from "../../api/api";
export default {
  components: {
    Header,
    FoodList,
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    let storeDataRes = reactive({
      title: "鱼拿酸菜鱼",
      img: "https://img1.baidu.com/it/u=1599947592,1695977044&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=440",
      storeData: [],
    });

    const getStoreData = () => {
      getApiStoreData().then((res) => {
        storeDataRes.storeData = res;
      });
      // axios.get("/home/getStoreData").then((res) => {
      //   // console.log(res);
      //   const { data, code } = res.data;
      //   // console.log(data);
      //   if (code == 200) {
      //     storeDataRes.storeData = data;
      //   }
      // });
    };

    onMounted(() => {
      getStoreData();
    });

    const handleAddCart = (type) => {
      const newList = store.state.cartList || [];
      storeDataRes.storeData.forEach((item) => {
        item.data.items?.forEach((item) => {
          item.children.forEach((item) => {
            if (item.num > 0) {
              newList.push(item);
            }
          });
        });
      });
      if (newList.length === 0) {
        // debugger;
        Toast("请选择商品");
        return;
      }
      store.commit("ADDCART", newList);
      type === "buy" ? goCart() : "";
    };
    const goCart = () => {
      router.push("/cart");
    };
    const goBuy = () => {
      handleAddCart("buy");
    };
    return {
      handleAddCart,
      ...toRefs(storeDataRes),
      store,
      goCart,
      goBuy,
    };
  },
};
</script>

<style lang="less" scoped>
.storeDetails {
  height: 100%;
  display: flex;
  flex-flow: column;
  .content {
    flex: 1;
    overflow-y: auto;
    .img {
      background: url("../../assets/yuna.jpg") no-repeat center/cover;
      width: 100%;
      height: 150px;
    }
    .foodSort {
      height: 500px;
      background-color: #fff;
      margin-top: -30px;
      border-radius: 20px 20px 0 0;

      .sort {
        margin-top: 10px;
      }
      .name {
        display: flex;
        padding: 20px;
        justify-content: space-between;
        .store-img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
          margin-top: -30px;
        }
      }
    }
  }
}
</style>