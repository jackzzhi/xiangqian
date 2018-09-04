<template>
<div style="height: 150px" class="r">

  <div id="mytrend" :style="{height:'100%'}"> </div>
</div>
</template>

<script>
  import echarts from 'echarts'
    export default {
        name: "money",
      mounted(){
    this.drawLines()
        setInterval(this.drawLines,300000)
      },
      methods:{
        drawLines(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('mytrend'))
          // 绘制图表
          $.ajax({
            url: this.config.domain,
            type: 'POST',
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            sync: true,
            data: JSON.stringify({
              "token": this.config.token,
              "subjectId":"28",
              "displayMode":"32"
            }),
            success: function (response) {
              this.ajaxX = response.data.dataList[0].axisX.data;
              this.series1 = response.data.dataList[0].series[0].data;
              this.series2 = response.data.dataList[0].series[1].data;

              myChart.setOption({

                title: {
                  right: 0,
                  textStyle: {
                    fontSize: 14,
                    color: '#ccc'
                  }
                },


                tooltip: {
                  trigger: 'axis',
                  show: true,
                  axisPointer: {
                    type: 'none'
                  }
                },
                grid: {
                  top: 50,
                  bottom: 23,
                  left:50
                },
                xAxis: {
                  type: 'category',
                  data: this.ajaxX,
                  splitNumber: 2,
                  scale: true,
                  axisLine: {
                    show: false
                  },
                  axisLabel: {
                    color: '#6d6d6d',
                    fontSize: 10,
                    showMaxLabel: true,
                  },
                  axisTick: {
                    show: false,
                    lineStyle: {
                      color: '#acaeaf'
                    }
                  },
                  splitLine: {
                    show: false,
                    lineStyle: {
                      type: 'dotted',
                      color: 'rgb(132,173,255)'
                    }
                  },
                  boundaryGap: false,
                },
                yAxis: {
                  type: 'value',
                  scale: false,
                  show: true,
                  splitNumber:2,
                  axisLabel: {
                    formatter: '{value}',
                    fontSize: 10,
                    textStyle: {
                      color: '#6d6d6d'
                    }
                  },
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    show: false
                  },
                  splitLine: {
                    show: true,
                    lineStyle:{
                      color: '#2a2a2a',
                      width:0.4,
                    }
                  },
                },
                series: [{
                  name: '今日注册用户',
                  data: this.series1,
                  type: 'line',
                  smooth: false,
                  symbol: 'circle',
                  symbolSize: '4',
                  markPoint: {
                    symbol:'path://../../assets/images/back.png',
                    symbolSize:20,
                    itemStyle:{
                      // opacity:0
                    },
                    label:{
                      position:[-8,-20],
                      color:'#fff',
                      fontSize:14
                    },
                    data: [
                      {type: 'max', name: '最大值'}
                    ]
                  },
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        width:2,
                        color: '#ffff21'
                        //								color: 'rgb(84,185,157)'
                      },
                      color: '#ffd40d'
                      //							color: 'rgb(179,241,224)'
                    }
                  },
                  areaStyle: {
                    normal: {
                      opacity: 0.8,
                      color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1, [{
                          offset: 0,
                          color: '#c57200'
                        },
                          {
                            offset: 1,
                            color: '#0c0a02'
                          }

                        ]
                      )
                    }
                  }
                }, {
                  name: '今日出借用户',
                  data: this.series2,
                  type: 'line',
                  smooth: false,
                  symbol: 'circle',
                  symbolSize: '3',
                  markPoint: {
                    symbol:'path://../../assets/images/back.png',
                    symbolSize:20,
                    itemStyle:{
                      // opacity:0
                    },
                    label:{
                      position:[-8,-20],
                      color:'#fff',
                      fontSize:14
                    },
                    data: [
                      {type: 'max', name: '最大值'}
                    ]
                  },
                  itemStyle: {
                    normal: {
                      lineStyle: {
                        width:2,
                        color: '#17ffff'
                        //								color: 'rgb(255,105,104)'
                      },
                      color: '#17ffff'
                      //							color: 'rgb(254,194,158)'
                    }
                  },
                  areaStyle: {
                    normal: {
                      opacity: 0.8,
                      color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1.3, [{
                          offset: 0,
                          color: '#1796ba'
                        },
                          {
                            offset: 1,
                            color: '#000000'
                          }

                        ]
                      )
                    }
                  }
                }]
              });
              window.onresize = myChart.resize
            }
          })


        }
      }

    }
</script>

<style scoped>
  @media screen and (min-width: 1920px) {

   .r{height: 250px}
  }
  #mytrend{
    margin-left: 11px;
    margin-top: 15px;
  }
  .chart-num{
    color: #fff;
    position: absolute;
    right: 7%;
    top:20%;
  }
  @media screen and (min-width:2020px) {
    .r{
    margin-top: 4%;
      /*padding: 100px 0;*/
    }
  }
</style>
