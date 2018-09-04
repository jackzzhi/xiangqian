<template>
  <div :id="'myChart' + id" :val="val" :val2="val2" style="width: 60px;height:50px"></div>
</template>

<script>
    export default {
        name: "pie",
      props:['id','val','val2'],
      data:function(){

        return {
          bingN1:[],
          tid:null,
          arr:[],
          componentVal: this.val
        }
      },
      created(){
        this.Ajax()
        setInterval(this.Ajax,60000)
      },
      mounted(){
  if(this.val<10){
    this.componentVal=10
  }
        let myChart = this.$echarts.init(document.getElementById('myChart' + this.id));

        // 绘制图表
        myChart.setOption({
          tooltip: {},
          silent:true,
          series: [
            {

              type:'pie',
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
                  color: '#ffff24'// 0% 处的颜色
                }, {
                  offset: 1,
                  color: '#ffcf0b' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              }, '#3d3d3d'],
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '20',
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
                {value:this.componentVal},
                {value:this.val2}
              ]
            }
          ]
        });

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

            this.bingN1=res.data.data.dataList[0].series.data.slice(2,8);
            // for (let i=0;i<this.bingN1.length;i++){
            //   this.tid=this.bingN1[i].id
            // }
          })
        }
      },

    }
</script>

<style scoped>

</style>
