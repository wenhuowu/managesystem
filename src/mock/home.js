import Mock from "mockjs";
/* eslint-disable */

let List = [];
export default {
  getStatisticalData() {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          言情: Mock.Random.float(100, 8000, 0, 2),
          科幻: Mock.Random.float(100, 8000, 0, 2),
          悬疑: Mock.Random.float(100, 8000, 0, 2),
          喜剧: Mock.Random.float(100, 8000, 0, 2),
          // React: Mock.Random.float(100, 8000, 0, 2),
          // springboot: Mock.Random.float(100, 8000, 0, 2),
        })
      );
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: "动作",
            value: Mock.Random.float(1000, 10000, 0, 2),
          },
          {
            name: "言情",
            value: Mock.Random.float(1000, 10000, 0, 2),
          },
          {
            name: "科幻",
            value: Mock.Random.float(1000, 10000, 0, 2),
          },
          {
            name: "喜剧",
            value: Mock.Random.float(1000, 10000, 0, 2),
          },
          {
            name: "恐怖",
            value: Mock.Random.float(1000, 10000, 0, 2),
          },
          {
            name: "悬疑",
            value: Mock.Random.float(1000, 10000, 0, 2),
          },
        ],
        // 柱状图
        userData: [
          {
            date: "周一",
            new: Mock.Random.integer(80, 100),
            active: Mock.Random.integer(100, 1000),
          },
          {
            date: "周二",
            new: Mock.Random.integer(80, 200),
            active: Mock.Random.integer(100, 1000),
          },
          {
            date: "周三",
            new: Mock.Random.integer(80, 200),
            active: Mock.Random.integer(100, 1000),
          },
          {
            date: "周四",
            new: Mock.Random.integer(80, 200),
            active: Mock.Random.integer(100, 1000),
          },
          {
            date: "周五",
            new: Mock.Random.integer(80, 200),
            active: Mock.Random.integer(100, 1000),
          },
          {
            date: "周六",
            new: Mock.Random.integer(80, 100),
            active: Mock.Random.integer(100, 1000),
          },
          {
            date: "周日",
            new: Mock.Random.integer(80, 100),
            active: Mock.Random.integer(100, 1000),
          },
        ],
        // 折线图
        orderData: {
          date: ["20191001", "20191002", "20191003", "20191004", "20191005", "20191006", "20191007"],
          data: List,
        },
        tableData: [
          {
            name: "言情",
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2),
          },
          {
            name: "科幻",
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2),
          },
          {
            name: "喜剧",
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2),
          },
          {
            name: "恐怖",
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2),
          },
          {
            name: "悬疑",
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2),
          },
          {
            name: "动作",
            todayBuy: Mock.Random.float(100, 1000, 0, 2),
            monthBuy: Mock.Random.float(3000, 5000, 0, 2),
            totalBuy: Mock.Random.float(40000, 1000000, 0, 2),
          },
        ],
      },
    };
  },
};
