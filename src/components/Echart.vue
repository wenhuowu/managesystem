<template>
  <div ref="echar">echar</div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xAxis: {},
          series: {}
        };
      }
    },
    isAxiosChart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      echart: null,
      axiosOption: {
        grid: {
          left: "15%"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: { type: "plain" },
        xAxis: {
          type: "category",
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          },
          axisLabel: {
            color: "#333"
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#17b3a3"
            }
          }
        },
        series: [],
        color: [
          "#2ec7c9",
          "#b6a2de",
          "#5ab1ef",
          "#ffb980",
          "#d87a80",
          "#8d98b3",
          "#e5cf0d",
          "#97b552",
          "#95706d",
          "#dc69aa",
          "#07a2a4",
          "#9a7fd1",
          "#588dd5",
          "#f5994e",
          "#c05050",
          "#59678c",
          "#c9ab00",
          "#7eb00a",
          "#6f5553",
          "#c14089"
        ]
      },
      normalOption: {
        tooltip: {
          trigger: "item"
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf"
        ],
        series: []
      }
    };
  },
  computed: {
    option() {
      return this.isAxiosChart ? this.axiosOption : this.normalOption;
    },
    iscollapse() {
      return this.$store.state.tab.iscollapse;
    }
  },
  watch: {
    chartData: {
      handler: function() {
        this.initChart();
      },
      deep: true
    },
    iscollapse() {
      setTimeout(this.resizeChart, 300);
    }
  },
  methods: {
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.option);
      } else {
        this.echart = echarts.init(this.$refs.echar);
        this.echart.setOption(this.option);
      }
    },
    initChartData() {
      if (this.isAxiosChart) {
        this.axiosOption.xAxis.data = this.chartData.xData.data;
        this.axiosOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
    resizeChart() {
      this.echart ? this.echart.resize() : "";
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeChart);
  },
  destroyed() {
    window.removeEventListener("resize", this.resizeChart);
  }
};
</script>

<style></style>
