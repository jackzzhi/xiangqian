<template>
    <div class="ranking-main">
      <div class="cha"></div>
      <div class="ranking">
        <div class="ranking-name"><img src="../../assets/images/rankimg/4.今日富豪排行.png" alt=""></div>
        <div class="rankimg-scale">单日累计出借最高</div>
      </div>
      <div class="ranking-list">
        <div class="list">
          <div class="list-img"><img src="../../assets/images/rankimg/one.png" alt=""></div>
          <div class="list-text">
            <div class="address">{{this.one.cityNm}}</div>
            <div class="name">{{this.one.name}}</div>
            <!--<div class="num">{{this.one.value}}万元</div>-->
            <div class="num">{{this.one.value}} <span>万元</span></div>
          </div>
        </div>
        <div  class="list">
          <div class="list-img"><img src="../../assets/images/rankimg/two.png" alt=""></div>
          <div class="list-text">
            <div class="address">{{this.two.cityNm}}</div>
            <div class="name">{{this.two.name}}</div>
            <div class="num">{{this.two.value}} <span>万元</span></div>
          </div>
        </div>
        <div  class="list">
          <div class="list-img"><img src="../../assets/images/rankimg/three.png" alt=""></div>
          <div class="list-text">
            <div class="address">{{this.three.cityNm}}</div>
            <div class="name">{{this.three.name}}</div>
            <div class="num">{{this.three.value}} <span>万元</span> </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "ranking",
      data:function(){
        return {
          one:[],
          two:[],
          three:[]

        }
      },
      created(){
          this.ranking()
        setInterval(this.ranking,60000)

      },
      methods:{
          ranking(){
            this.myAjax({
              method: 'post',
              url: this.config.domain,
              dataType: 'json',
              headers: {'Content-Type': 'application/json;charset=UTF-8'},
              data:JSON.stringify({
                "token": this.config.token,
                "subjectId":"34",
                "displayMode":"12"
              }),
            }).then((res)=>{  // 请求成功

              this.one=res.data.data.dataList[0];
              this.two=res.data.data.dataList[1];
              this.three=res.data.data.dataList[2];
              // console.log(res.data.data)

            })
          }


    }
    }
</script>

<style scoped>
@import "../../assets/css/right.css";

@media screen and (min-width:2020px) {
  .ranking-list{
    /*margin-top: 5%;*/
  }
  .list-img{
    width: 60px;
  }
}
</style>
