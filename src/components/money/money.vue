<template>
<div class="money22" style="height: 160px">
  <div id="myChart" :style="{height:'100%'}"></div>
</div>
</template>

<script>
  import echarts from 'echarts'

    export default {
        name: "money",
      data:function(){
        return {
          ajaxX:''
        }
      },
      created(){

      },
      mounted(){
        this.drawLine()
          setInterval(this.drawLine,300000)


      },
      methods:{
        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          $.ajax({

            url: this.config.domain,
            type: 'POST',
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json',
            sync:true,
            data: JSON.stringify({
              "token": this.config.token,
              "subjectId":"27",
              "displayMode":"32"
            }),
            success: function (response) {
              this.ajaxX=response.data.dataList[0].axisX.data;
              this.serieS=response.data.dataList[0].series[0].data;
              // console.log(response.data.dataList)

              myChart.setOption({
                tooltip: {
                  show: true
                },
                grid: {
                  top: 50,
                  bottom: 23,
                  left:100
                },
                xAxis: {
                  type: 'category',
                  //横坐标 日期
                  data:this.ajaxX,
        					// interval:1,
                  axisLabel: {
                    fontSize: 10,
                    showMaxLabel: true,
                    textStyle: {
                      color: '#6d6d6d'
                    }
                  },
                  //					x轴坐标对应标准线
                  axisTick: {
                    show: false,

                  },
                  //					各点对应点竖线配置
                  splitLine: {
                    show: false,

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
                      color: '#292929',
                      width:0.4,
                    }
                  },
                },

                series: [{

                  //纵坐标 参数
                  data:this.serieS,
                  type: 'line',
                  smooth: false,
                  //					symbol: 'emptyCircle',
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
                        color: '#ffd40d'
                      },
                      color: '#ffd40d'
                      //color: 'rgb(112,210,254)'
                    }
                  },
                  //阴影渐变
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
                }]
              });
              window.onresize = myChart.resize

            }

          })


        },

      }

    }
</script>

<style scoped>
  .money22{
    margin-top: -2%;
  }
  @media screen and (min-width:2020px) {
    .money22{
     margin-top: 3%;
    }
  }
#myChart{margin-left: -39px;margin-top: 15px;}
</style>
