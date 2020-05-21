<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover" class="left-top">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">文火</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登录时间：
            <span>2020-02-20</span>
          </p>
          <p>
            上次登录地点：
            <span>深圳</span>
          </p>
        </div>
      </el-card>
      <el-card shadow="hover" class="left-bottom">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            :prop="key"
            :label="val"
            v-for="(val, key) in tableLabel"
            :key="key"
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="right-top">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          class="right-top-card"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="right-top-card-p">
            <p class="num">￥ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover" class="right-middle">
        <Echart style="height:280px" :chartData="chartData.order"></Echart>
      </el-card>
      <div class="right-bottom">
        <el-card shadow="hover">
          <Echart style="height:260px" :chartData="chartData.user"></Echart>
        </el-card>
        <el-card shadow="hover">
          <Echart style="height:260px" :chartData="chartData.video" :isAxiosChart="false"></Echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "@/components/Echart";
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require("@/assets/images/user.png"),
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ],
      tableLabel: {
        name: "类型",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      tableData: [],
      //chart数据
      chartData: {
        order: {
          xData: {},
          series: []
        },
        user: {
          xData: {},
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  methods: {
    getTableData() {
      this.$http.get("/home/getData").then(res => {
        res = res.data;
        this.tableData = res.data.tableData;
        //console.log(res);
        //折线图数据 拿到x轴数据
        const Order = res.data.orderData;
        this.chartData.order.xData.data = Order.date;
        //y轴数据
        let keyArray = Object.keys(Order.data[0]);
        keyArray.forEach(key => {
          this.chartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: Order.data.map(v => v[key]),
            type: "line"
          });
        });
        //user数据 拿到x轴数据
        const User = res.data.userData;
        this.chartData.user.xData.data = User.map(v => v.date);
        this.chartData.user.series.push({
          name: "new",
          data: User.map(v => v.new),
          type: "bar"
        });
        this.chartData.user.series.push({
          name: "active",
          data: User.map(v => v.active),
          type: "bar"
        });
        // 视频饼图
        this.chartData.video.series.push({
          data: res.data.videoData,
          type: "pie"
        });
      });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/home.scss";
</style>
