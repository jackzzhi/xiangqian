<template>
<div class="distr">
    <div style="height: 21px"></div>
    <div class="distr-name"><img src="../../assets/images/rankimg/6.今日出借计划分布.png" alt=""></div>
  <div class="distr-main" style="margin-top:11%">
    <div id="mydistr"></div>
    <div class="distr-max" >
      <div class="max-name">{{this.bingN1}}</div>
      <div class="max-num">最高占比</div>
    </div>
    <div class="distr-num">{{this.bingV1}}</div>
  </div>
  <div class="distrList">
    <listComponent></listComponent>
  </div>
</div>
</template>

<script>
  import echarts from 'echarts'
  import listComponent from './distrList'
  export default {

    components:{listComponent},
    data:function(){
      return {
        bingN1:'',
        bingV1:'',
        formatter1:'',
        formatter11:'',

      }
    },
    created(){
      this.Ajax()
      setInterval(this.Ajax,60000)
    },
    mounted(){


    },
    methods:{
      Ajax(){
        this.myAjax({
          method: 'post',
          url: this.config.domain,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            "token": this.config.token,
            "subjectId":"36",
            "displayMode":"42"
          }),
        }).then((res)=>{  // 请求成功
        this.bingN1=res.data.data.dataList[0].series.data[0].name;
        this.bingV1=res.data.data.dataList[0].series.data[0].value;
        this.formatter1=res.data.data.dataList[0].series.data[0].data[0].value;
        this.formatter11=res.data.data.dataList[0].series.data[0].data[1].value;
        this.myperfor();
        // console.log(res.data.data.dataList[0].series.data[0])

      })
      },
      myperfor(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('mydistr'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            formatter: "{d}%"
          },
          series: [
            {

              type:'pie',
              // zoom: 2,
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0.4,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: '#ffcf0b'// 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#ffff24' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }, '#3d3d3d'],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
            itemStyle:{},
              data:[
                {value:this.formatter1},
                {value:this.formatter11}
              ]
            }
          ]
        });
      },
      // myperfor1(){
      //   // 基于准备好的dom，初始化echarts实例
      //   let myChar2 = this.$echarts.init(document.getElementById('mydistrlist1'));
      //   // 绘制图表
      //   myChar2.setOption({
      //     tooltip: {
      //       formatter: "{d}%"
      //     },
      //
      //     series: [
      //       {
      //
      //         type:'pie',
      //         // zoom: 2,
      //         radius: ['50%', '70%'],
      //         avoidLabelOverlap: false,
      //         color: [{
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0.4,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0,
      //             color: '#ffda15'// 0% 处的颜色
      //           }, {
      //             offset: 1,
      //             color: '#fa8a03' // 100% 处的颜色
      //           }],
      //           globalCoord: false // 缺省为 false
      //         }, '#3d3d3d'],
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'right'
      //           },
      //           emphasis: {
      //             show: false,
      //             textStyle: {
      //               fontSize: '30',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         labelLine: {
      //           normal: {
      //             // show: false
      //           }
      //         },
      //         itemStyle:{},
      //         data:[
      //           {value:this.formatter2},
      //           {value:this.formatter22}
      //         ]
      //       }
      //     ]
      //   });
      // },
      // myperfor2(){
      //   // 基于准备好的dom，初始化echarts实例
      //   let myChar2 = this.$echarts.init(document.getElementById('mydistrlist2'));
      //   // 绘制图表
      //   myChar2.setOption({
      //     tooltip: {
      //       formatter: "{d}%"
      //     },
      //
      //     series: [
      //       {
      //
      //         type:'pie',
      //         radius: ['50%', '70%'],
      //         avoidLabelOverlap: false,
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '30',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         color: [{
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0.4,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0,
      //             color: '#ffda15'// 0% 处的颜色
      //           }, {
      //             offset: 1,
      //             color: '#fa8a03' // 100% 处的颜色
      //           }],
      //           globalCoord: false // 缺省为 false
      //         }, '#3d3d3d'],
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data:[
      //           {value:this.formatter3},
      //           {value:this.formatter33}
      //         ]
      //       }
      //     ]
      //   });
      // },
      // myperfor3(){
      //   // 基于准备好的dom，初始化echarts实例
      //   let myChar2 = this.$echarts.init(document.getElementById('mydistrlist3'));
      //   // 绘制图表
      //   myChar2.setOption({
      //     tooltip: { formatter: "{d}%"},
      //
      //     series: [
      //       {
      //
      //         type:'pie',
      //         radius: ['50%', '70%'],
      //         avoidLabelOverlap: false,
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '30',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         color: [{
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0.4,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0,
      //             color: '#ffda15'// 0% 处的颜色
      //           }, {
      //             offset: 1,
      //             color: '#fa8a03' // 100% 处的颜色
      //           }],
      //           globalCoord: false // 缺省为 false
      //         }, '#3d3d3d'],
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data:[
      //           {value:this.formatter4},
      //           {value:this.formatter44}
      //         ]
      //       }
      //     ]
      //   });
      // },
      // myperfor4(){
      //   // 基于准备好的dom，初始化echarts实例
      //   let myChar2 = this.$echarts.init(document.getElementById('mydistrlist4'));
      //   // 绘制图表
      //   myChar2.setOption({
      //     tooltip: { formatter: "{d}%"},
      //
      //     series: [
      //       {
      //
      //         type:'pie',
      //         radius: ['50%', '70%'],
      //         avoidLabelOverlap: false,
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '30',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         color: [{
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0.4,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0,
      //             color: '#ffda15'// 0% 处的颜色
      //           }, {
      //             offset: 1,
      //             color: '#fa8a03' // 100% 处的颜色
      //           }],
      //           globalCoord: false // 缺省为 false
      //         }, '#3d3d3d'],
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data:[
      //           {value:this.formatter5},
      //           {value:this.formatter55}
      //         ]
      //       }
      //     ]
      //   });
      // },
      // myperfor5(){
      //   // 基于准备好的dom，初始化echarts实例
      //   let myChar2 = this.$echarts.init(document.getElementById('mydistrlist5'));
      //   // 绘制图表
      //   myChar2.setOption({
      //     tooltip: { formatter: "{d}%"},
      //
      //     series: [
      //       {
      //
      //         type:'pie',
      //         radius: ['50%', '70%'],
      //         avoidLabelOverlap: false,
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '30',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         color: [{
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0.4,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0,
      //             color: '#ffda15'// 0% 处的颜色
      //           }, {
      //             offset: 1,
      //             color: '#fa8a03' // 100% 处的颜色
      //           }],
      //           globalCoord: false // 缺省为 false
      //         }, '#3d3d3d'],
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data:[
      //           {value:this.formatter6},
      //           {value:this.formatter66}
      //         ]
      //       }
      //     ]
      //   });
      // },
      // myperfor6(){
      //   // 基于准备好的dom，初始化echarts实例
      //   let myChar2 = this.$echarts.init(document.getElementById('mydistrlist6'));
      //   // 绘制图表
      //   myChar2.setOption({
      //     tooltip: { formatter: "{d}%"},
      //
      //     series: [
      //       {
      //
      //         type:'pie',
      //         radius: ['50%', '70%'],
      //         avoidLabelOverlap: false,
      //         label: {
      //           normal: {
      //             show: false,
      //             position: 'center'
      //           },
      //           emphasis: {
      //             show: true,
      //             textStyle: {
      //               fontSize: '30',
      //               fontWeight: 'bold'
      //             }
      //           }
      //         },
      //         color: [{
      //           type: 'linear',
      //           x: 0,
      //           y: 0,
      //           x2: 0.4,
      //           y2: 1,
      //           colorStops: [{
      //             offset: 0,
      //             color: '#ffda15'// 0% 处的颜色
      //           }, {
      //             offset: 1,
      //             color: '#fa8a03' // 100% 处的颜色
      //           }],
      //           globalCoord: false // 缺省为 false
      //         }, '#3d3d3d'],
      //         labelLine: {
      //           normal: {
      //             show: false
      //           }
      //         },
      //         data:[
      //           {value:this.formatter7},
      //           {value:this.formatter77}
      //         ]
      //       }
      //     ]
      //   });
      // },

    }
    }
</script>

<style scoped>
@import "../../assets/css/right.css";
  #mydistr{
    width: 100px;
    height: 105px;
    margin-top: -10px;
    margin-left: -6%;
  }
/*.distr{position: relative}*/
.distrList{margin-top: 3%}
@media screen and (min-width:2020px) {
  .distrList{
    position: absolute;
    top: 940%;
  }
  .distr-name{top:130%}
  .distr-main{
    position: absolute;
    top: 200%;
  }

}
</style>
