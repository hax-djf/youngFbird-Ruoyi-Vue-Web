//vue里面修改模板
<template>
  <div id="china_map_box">
    <el-row>
      <el-col :span="24">       
        <span
          class="span_city"
          v-for="(item, index) in cityTypeList"
          :key="index"
          @click="setMap(index)"
          >{{ item }}/</span
        >
      </el-col>
    </el-row>
    <div id="china_map" style="height: 450px"></div>
  </div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
import "@/assets/map/china.js";
// import { cityMap as cityMapX } from "@/assets/map/china.js";
export default {
  data() {
    return {
      fristname: "",
      cityTypeList: ["全国"], //保存的层级信息  
      mydata: [
        { name: "北京", value: "1000" },
        { name: "天津", value: "3000" },
        { name: "上海", value: "1200" },
        { name: "重庆", value: this.randomData() },
        { name: "河北", value: this.randomData() },
        { name: "河南", value: this.randomData() },
        { name: "云南", value: this.randomData() },
        { name: "辽宁", value: this.randomData() },
        { name: "黑龙江", value: this.randomData() },
        { name: "湖南", value: this.randomData() },
        { name: "安徽", value: this.randomData() },
        { name: "山东", value: this.randomData() },
        { name: "新疆", value: this.randomData() },
        { name: "江苏", value: this.randomData() },
        { name: "浙江", value: this.randomData() },
        { name: "江西", value: this.randomData() },
        { name: "湖北", value: this.randomData() },
        { name: "广西", value: this.randomData() },
        { name: "甘肃", value: this.randomData() },
        { name: "山西", value: this.randomData() },
        { name: "内蒙古", value: this.randomData() },
        { name: "陕西", value: this.randomData() },
        { name: "吉林", value: this.randomData() },
        { name: "福建", value: this.randomData() },
        { name: "贵州", value: this.randomData() },
        { name: "广东", value: this.randomData() },
        { name: "青海", value: this.randomData() },
        { name: "西藏", value: this.randomData() },
        { name: "四川", value: this.randomData() },
        { name: "宁夏", value: this.randomData() },
        { name: "海南", value: this.randomData() },
        { name: "台湾", value: this.randomData() },
        { name: "香港", value: this.randomData() },
        { name: "澳门", value: this.randomData() },
      ],
      optionMap: {
        backgroundColor: "#FFFFFF",
          tooltip: {
          triggerOn: "mousemove", //mousemove、click
          trigger: "item",
          padding: 8,
          borderWidth: 1,
          borderColor: "#409eff",
          backgroundColor: "rgba(255,255,255,0.7)",
          textStyle: {
            color: "#000000",
            fontSize: 13,
          },
          formatter: function (e, t, n) {
            // console.log(e, t, n);
            let data = e.data;
            let context = `
                   <p><b style="font-size:15px;">${e.name}</b> (2021年第一季度)</p>
            `;
            return context;
          },
        },

        //左侧小导航图标
        visualMap: {
          show: true,
          left: 26,
          bottom: 40,
          showLabel: true,
          pieces: [
            {
              gte: 500000,
              label: ">= 500000以上",
              color: "#27BC7F",
            },
            {
              gte: 10000,
              lt: 49999,
              label: "10000 - 49999",
              color: "#52C999",
            },
            {
              gte: 5000,
              lt: 9999,
              label: "5000 - 9999",
              color: "#7DD7B2",
            },
            {
              gte: 1000,
              lt: 4999,
              label: "1000 - 4999",
              color: "#A9E4CC",
            },
            {
              gte: 1,
              lt: 999,
              label: "1-999",
              color: "#D4F2E5",
            },
            {
              lt: 0,
              label: "0",
              color: "#E2E7E5",
            },
          ],
        },
        //配置属性
        series: [
          {
            name: "数据",
            type: "map",
            map: "china",
            roam: true,
            label: {
              normal: {
                show: true, //省份名称
              },
              emphasis: {
                //   color:'green',
                // show: false,
              },
            },
            itemStyle: {
              normal: {
                borderWidth: 0.5, //区域边框宽度
                borderColor: "#009fe8", //区域边框颜色
                areaColor: "#ffefd5", //区域颜色
              },
            },
            data: [], //数据
          },
        ],
      },
    };
  },
  methods: {
    randomData() {
      return Math.random() * 10000;
    },
    setMap(index) { //     《这个是顶部显示的 类似面包屑》
      var myChart = echarts.init(document.getElementById("china_map"));
      let name = this.cityTypeList[index];
      console.log(name);
      if (name != "全国") {
        // let cityName = cityMapX[name];
         let cityName = 'guangdong.json';
        var appData = require(`@/assets/map/${cityName}`);
        echarts.registerMap(name, appData);
        this.optionMap.series[0]["map"] = name;
      } else {
        this.optionMap.series[0]["map"] = "china";
        this.setEchartOption();
      }
      this.cityTypeList.splice(index + 1);
      myChart.setOption(this.optionMap, true);
    },
    init() {
      //初始化echarts实例
      let _this = this;
      var myChart = echarts.init(document.getElementById("china_map"));
      myChart.on("click", function (params) {
        // let cityName = cityMap.cityMap[params.name];
        // var appData = require(`@/assets/mapJson/${cityName}`);
        // let cityName = cityMapX[params.name];
        let cityName = 'guangdong.json';
        console.log(cityName);
        if (!cityName) {
          return;
        }
        var appData = require(`@/assets/map/${cityName}`);
        _this.cityTypeList.push(params.name);
        _this.optionMap.series[0]["map"] = params.name;
        echarts.registerMap(params.name, appData);
      //  _this.optionMap.series[0]["data"] = _this.mydatacity; 数据展示
        myChart.setOption(_this.optionMap, true);
      });
      //使用制定的配置项和数据显示图表
      myChart.setOption(this.optionMap);
    },
    setEchartOption() {
      this.optionMap.series[0]["data"] = this.mydata;
    },
  },
  created() {
    this.setEchartOption();
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.span_city {
  font-size: 15px;
  font-weight: 520;
  cursor: pointer;
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  -khtml-user-select: none; /*早期浏览器*/
  user-select: none;
  margin-right: 5px;
  &:hover {
    color: #32be84;
    text-decoration: #7dd7b2;
  }
}
.row_item {
    i{
      color: #8c8c8c !important;
    }
  & > span {
    width: 130px;
    text-align: right;
    /* float: inherit; */
    display: inline-block;
    margin-right: 5px;
  }
  .nums_all {
    margin-top: 10px;
    display: inline-block;
  
    span {
      background: #f2f7f7;
      font-size: 12px;
      padding: 2px 4px;
      border: 1px solid #ebebeb;
    }
  }
}
</style>

