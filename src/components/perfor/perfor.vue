<template>
  <div class="perfor">
<div style="height: 21px"></div>
    <div class="perfor-name"><img src="../../assets/images/rankimg/5.今日业绩.png" alt=""></div>
    <div style="height: 102px;margin-top: 66px;" class="pe">
      <div class="perfor-main">

        <div class="perfor-num">{{this.curN2}} <span>元</span>  </div>
        <div class="name">北 部</div>
        <div id="box">

          <div id="bar"></div>
        </div>
      </div>
      <div class="perfor-main perfor-main2">

        <div class="name">西 部</div>
        <div id="box">

          <div id="bar2"></div> <span class="perfor-num2">{{this.curN}} <span>元</span> </span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>

  import $ from 'jquery'
    export default {
        name: "perfor",
      data:function(){
        return {
          total:0,//总数
          curN:'',
          curN2:'',
          perfor:''
        }
      },
      created(){
      this.per()
        setInterval(this.per,10000)
      },
      methods:{
      per(){
        this.myAjax({
          method: 'post',
          url: this.config.domain,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            "token": this.config.token,
            "subjectId":"35",
            "displayMode":"11"
          }),
        }).then( (res)=>{  // 请求成功
          this.curN2=res.data.data.dataList[0].value;
          this.curN=res.data.data.dataList[1].value;
          // console.log(res.data.data.dataList)
          this.show();
          this.show2();


        })
      },
        show(){
          var o = document.getElementById("bar2");
          var curN=this.curN.replace(/,/g,'');
          var curN2=this.curN2.replace(/,/g,'');
          o.style.width = ((curN /curN2) * 317) + 'px'; //635是外框的宽度
        },
        show2(){
          var o = document.getElementById("bar");
          var curN=this.curN.replace(/,/g,'');
          var curN2=this.curN2.replace(/,/g,'');
          o.style.width = ((curN2 /curN2) * 317) + 'px'; //635是外框的宽度
        }
    }
  }
</script>

<style scoped>
@import "../../assets/css/right.css";
@media screen and (min-width:2020px) {
.pe{margin-top: 86px;}
}
#box { width:95%;height:15px;}
@font-face {
  font-family: ReeJi-BigRuixain-BoldGB;
  src: url("../../assets/font/ReeJi-BigRuixain-BoldGB.ttf");
}
.name{
  font-family: ReeJi-BigRuixain-BoldGB;
  width: 10%;
  font-size: 15px;
  font-weight: normal;
  font-style: italic;
  font-stretch: normal;
  color: #9b9b9b;
  margin-right: 11px;
  line-height: 15px;
}
.perfor-main{
  display: flex;

}
.perfor-main2{
  margin-top: 43px;
  /*padding-bottom: 17px;*/
}
.perfor-num span,.perfor-num2 span{
  font-family: ReeJi-BigRuixain-BoldGB;
  font-size: 17px;
}
.perfor-num,.perfor-num2{
  display: inline-block;
  font-family: DINCondensedC-2;
  position: absolute;
  right:17%;
  top:28%;
  font-size: 20px;
  font-weight: normal;
  font-style: italic;
  font-stretch: normal;
  line-height: 30px;
  color: #ffffff;
}
.perfor-num2{
  font-family: DINCondensedC-2;
  position: absolute;
  right: auto;
  top: 61%;
  text-align: center;
}
#bar{float:left;width:0px;height:15px;border-bottom-right-radius:13px;  background: linear-gradient(to right,#ffff24,#ffcf0b);}
#bar2{float:left;width:0px;height:15px;border-bottom-right-radius:13px;background: linear-gradient(to right,#00ffff,#4dd8ff);}
</style>
