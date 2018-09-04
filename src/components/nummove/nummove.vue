<template>
  <div class="nummove">
  <div id="dataNum">
  </div>
    <div class="pp"><img src="../../assets/images/number/lo.png" alt=""></div>
  </div>

</template>

<script>
  import '../../assets/js/jquery'
  import '../../assets/js/num'
    export default {
        name: "nummove",
      data:function(){
        return {
          deVal:'',
          flages:true
        }
      },
      created(){
this.move()
      },
      mounted(){
          // $('.num1').

        setInterval(this.move,10000)
      },
      methods:{
          move(){
            this.myAjax({
              method: 'post',
              url:this.config.domain,
              dataType: 'json',
              headers: {'Content-Type': 'application/json;charset=UTF-8'},
              data:JSON.stringify({
                "token": this.config.token,
                "subjectId":"32",
                "displayMode":"11"
              }),
            }).then( (res)=>{  // 请求成功

              var deVal1=res.data.data.dataList[0].value;
              // console.log(res.data.data)
              this.deVal= deVal1.replace(/,/g,'')

              this.numMove()
            })

          },
          numMove(){
            $("#dataNum").rollNumDaq({
              deVal:this.deVal
            });

          }
      }
    }
</script>

<style>
.nummove{

  margin-left: 12%;
}
.pp{float: left;
  width: 60px;
  height: 60px;
  margin-top: 8px;
}
.pp img{
  width: 110%;

}
  li{list-style: none}
  .inrow>li,.inrow span{display:inline-block; }
  .dataNums{ text-align:center;float: left; margin-top: 1%;}
  .dataNums .dataOne{ width:55px;height: 66px;line-height: 64px;}
  .dataNums .dataBoc {position: relative; width: 110%; height: 100%; overflow: hidden;}
  .dataNums .dataBoc .tt {position: absolute; top: 0;  left: 0; width: 100%;  height: 100%;}
  .dataNums .tt span{ display:inline-block;width:100%;height:100%;}
/*.dataNums .tt .num1{width: 30px;height: 100%;}*/
  .dataNums .num0{background:url(../../assets/images/number/0.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num1{background:url(../../assets/images/number/1.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num2{background:url(../../assets/images/number/2.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num3{background:url(../../assets/images/number/3.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num4{background:url(../../assets/images/number/4.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num5{background:url(../../assets/images/number/5.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num6{background:url(../../assets/images/number/6.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num7{background:url(../../assets/images/number/7.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num8{background:url(../../assets/images/number/8.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .num9{background:url(../../assets/images/number/9.png) no-repeat;background-size: 100%;background-position: center;}
  .dataNums .comma{width:24px;height:60px;background:url(../../assets/images/number/comma.png) no-repeat;background-size:96%;background-position: center center;}

</style>
