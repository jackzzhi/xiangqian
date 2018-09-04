<template>
  <div class="money22">

    <div id="myMap" :style="{width:'1000px',height:'750px'}"></div>
  </div>
</template>
<script>
  import echarts from 'echarts'
  import 'echarts/map/js/china'
  export default {
    name: "money",
    data:function () {
      return{
        map1:null,
         map:[],
        setInBoot:false,
        a:""
      }
    },
    mounted(){
      // this.swiper()
      this.drawLine();
      setInterval(this.drawLine,10000);
    },
    methods:{

      abs(){
        if(this.setInBoot==true){
          this.setInBoot=false;
          this.a=setInterval(this.drawLine,10000);
        }

      },
      drawLine(){
        this.setInBoot=true;
        let vm = this;
        // 基于准备好的dom，初始化echarts实例
        let myChart =echarts.init(document.getElementById('myMap'))
        // 绘制图表
        this.myAjax({
          method: 'post',
          url:this.config.domain,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            "token": this.config.token,
            "subjectId":"37",
            "displayMode":"51"
          }),
        }).then( (res)=>{  // 请求成功
          // clearInterval(vm.a);
          // vm.abs();
          this.map1=res.data.data.dataList[0].incrMapItem;

          var map=res.data.data.dataList[0].fullMapItem;
          // console.log(this.map1)
          var option={
            // backgroundColor:'',
            roamController: {//控制地图的上下左右放大缩小 图上没有显示
              show: false,
              x: 'right',
              mapTypeControl: {
                'china': true
              }
            },
            geo: {
              map: 'china',
              label: {
                emphasis: {
                  show: false
                }
              },
              roam: false,
              itemStyle: {
                normal: {
                  areaColor: 'rgba(0, 0, 0, 1)',
                  // background-color: ,
                  borderColor: '#115c8e',
                  // borderWidth:1,
                },
                emphasis: {
                  label:{show:false},
                  areaColor: '#ffff23'
                }
              }
            },
            series : [
              {

                type: 'map',
                mapType: 'china',

                itemStyle:{//地图区域的多边形 图形样式
                  normal:{//是图形在默认状态下的样式
                    borderColor:"#115c8e",
                    borderWidth:0.5,
                    areaColor:'#094677',
                    label:{
                      show:false,//是否显示标签
                      textStyle: {
                        color: "rgb(249, 249, 249)"
                      }
                    }
                  },
                  emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                    label:{show:false},
                    areaColor:'#0f6ab2',
                    opacity: 0.8,
                  }
                }
              },{
                type: 'scatter',
                coordinateSystem: 'geo',
                data:map,
                symbolSize: 7,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false,

                  },
                  emphasis: {

                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ffff23'
                  }
                },
                textStyle: {
                  fontSize: '2',
                  // fontWeight: 'bold'
                }
              },
              {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: this.map1,
                symbolSize: 7,
                showEffectOn: 'render',
                rippleEffect: {
                  brushType: 'fill',
                  scale:5,
                  // period:1
                },
                hoverAnimation: true,
                label: {
                  normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#ffff23',
                    shadowBlur: 10,
                    shadowColor: '#333'
                  }
                },
                zlevel: 1
              }
            ]
          };
          myChart.setOption(option);
          setTimeout(function () {
            this.map1=null;

            myChart.setOption({
              geo: {
                map: 'china',
                label: {
                  emphasis: {
                    show: false
                  }
                },
                roam: false,
                itemStyle: {
                  normal: {
                    areaColor: '#323c48',
                    borderColor: '#115c8e',
                    // borderWidth:3,
                  },
                  emphasis: {
                    label:{show:false},
                    areaColor: '#2a333d'
                  }
                }
              },
              series : [
                {

                  type: 'map',
                  mapType: 'china',
                  // zoom: 1.25,
                  itemStyle:{//地图区域的多边形 图形样式
                    normal:{//是图形在默认状态下的样式
                      borderColor:"#115c8e",
                      borderWidth:0.5,
                      areaColor:'#094677',
                      label:{
                        show:false,//是否显示标签
                        textStyle: {
                          color: "rgb(249, 249, 249)"
                        }
                      }
                    },
                    emphasis:{//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
                      label:{show:false},
                      areaColor:'#0f6ab2'
                    }
                  }
                },{
                  type: 'scatter',
                  coordinateSystem: 'geo',
                  data:map,
                  symbolSize: 7,
                  label: {
                    normal: {
                      formatter: '{b}',
                      position: 'right',
                      show: false,

                    },
                    emphasis: {

                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#ffff23 '
                    }
                  },
                  textStyle: {
                    fontSize: '2',
                    // fontWeight: 'bold'
                  }
                },{
                  type: 'effectScatter',
                  coordinateSystem: 'geo',
                  data: this.map1,
                  symbolSize: 7,
                  showEffectOn: 'render',
                  rippleEffect: {
                    brushType: 'fill',
                    scale:5,
                    // period:1
                  },
                  hoverAnimation: true,
                  label: {
                    normal: {
                      formatter: '{b}',
                      position: 'right',
                      show: false
                    }
                  },
                  itemStyle: {
                    normal: {
                      color: '#ffff23',
                      shadowBlur: 10,
                      shadowColor: '#333'
                    }
                  },
                  zlevel: 1
                }
              ]
            });
            window.onresize = myChart.resize
          },3000);

        })
      }
    }

  }
</script>

<style scoped>

  #ooo{
    color: #ffffff;
  }
  .money22{
    position: relative;
    overflow: hidden;

  }


</style>
