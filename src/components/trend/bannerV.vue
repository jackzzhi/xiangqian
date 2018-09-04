<template>
  <div class="moddle-a" >
    <div class="swiper-container1 swiper-container swiper-no-swiping">
      <div class="swiper-wrapper swiper-wrapper1"></div>
    </div>
    </div>
</template>

<script>

  import $ from 'jquery'
  import  '../../assets/js/queue'
  export default {

      data:function(){
        return {
          tyu:[],
          time:null,
          i:0,
          queue:null,
          lists:null,
          myswiper:null
        }
      },
      created(){

      },
      mounted(){

        this.sd()
        setInterval(this.sd,10000)
        function Queue(size) {
          var list = [];
          //向队列中添加数据
          this.push = function(data) {
            if (data==null) {
              return false;
            }
            //如果传递了size参数就设置了队列的大小
            if (size != null && !isNaN(size)) {
              if (list.length == size) {
                this.pop();
              }
            }
            list.unshift(data);
            return true;
          }
          //从队列中取出数据
          this.pop = function() {
            // debugger;
            if (list.length > 0) {
              return list.pop();
            } else {
              return false
            }
          }
          //返回队列的大小
          this.size = function() {
            return list.length;
          }
          //返回队列的内容
          this.quere = function() {
            return list;
          }
        }
      //初始化没有参数的队列
       this.queue = new Queue();
        // console.log(myswiper)
      },
      methods: {

        sd(){
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

            this.tyu= res.data.data.dataList[0].incrMapItem;
            for (var i = 0; i <= this.tyu.length-1; i++) {
              this.queue.push(this.tyu[i]);//入队
            }
            //第一次加载
            if(this.queue.size()>0 && (this.i == 0 || $(".swiper-wrapper1 .swiper-slide").length <= 0)){
              var flag = true;
              var a=0;
              while(flag){
                if(this.queue.size() - 1 <= 0){flag = false;this.i = 1;}

                  var pop=this.queue.pop();
                  var stHtml = '<div class="swiper-slide"><div class="map-city" style="font-family: ReeJi-BigRuixain-BoldGB;font-size: 30px;font-weight: normal;font-style: italic;font-stretch: normal;text-align: center;background:linear-gradient(to bottom,#fffe5b, #f9da4c);-webkit-background-clip: text;color: transparent;">' + pop.name + '</div><div class="map-money" style="font-family: DINCondensedC-2;font-size: 40px;font-weight: normal;font-style: italic;font-stretch: normal;text-align: center;background:linear-gradient(to bottom,#fffe5b, #f9da4c);-webkit-background-clip: text;color: transparent;">+' + pop.value[2] + '<span style="font-family: ReeJi-BigRuixain-BoldGB;font-size: 38px">元</span></div></div>'
                  $(".swiper-wrapper1").append(stHtml);//出队


              }
              //交易城市数据滚动效果
              this.myswiper= new Swiper('.swiper-container1',{
                direction : 'vertical',
                speed: 500,
                autoplay:500,
                loop:false,
                calculateHeight : true,
                observer:true,
                observeParents:true,
                onReachEnd: (swiper)=>{

                  var _this=this;
                  var a=0;
                  if($(".swiper-wrapper1 .swiper-slide").length=1){
                    setTimeout(function () {
                      $(".swiper-wrapper1").html('');
                    },3000)
                  }else if($(".swiper-wrapper1 .swiper-slide").length > 0){


                    setTimeout(function(){
                      $(".swiper-wrapper1").html('');
                      if(_this.queue != null && _this.queue.size() > 0){
                        var flag = true;
                        while(flag){
                          if(a<50){
                            // console.log(a)
                            // debugger;
                            var pop=_this.queue.pop();
                            if (pop) {
                              // if (!pop) {
                              var stHtml = '<div class="swiper-slide" style="height:80px"><div class="map-city" style="font-family: PangMenZhengDao;font-size: 30px;font-weight: normal;font-style: italic;font-stretch: normal;text-align: center;background:linear-gradient(to bottom,#fffe5b, #f9da4c);-webkit-background-clip: text;color: transparent;">' + pop.name + '</div><div class="map-money" style="font-family: PangMenZhengDao;font-size: 40px;font-weight: normal;font-style: italic;font-stretch: normal;text-align: center;background:linear-gradient(to bottom,#fffe5b, #f9da4c);-webkit-background-clip: text;color: transparent;">+' + pop.value[2] + '元</div></div>'
                              _this.myswiper.appendSlide(stHtml);
                            } else {
                              flag = false;
                            }
                            //   debugger
                            // }
                          }else{
                            flag = false;
                          }
                          a++;

                        }
                        _this.myswiper.stopAutoplay()
                        _this.myswiper.init();
                      }
                    },1000)
                  }
                }
              })
            }

          })

        },
      }
    }
</script>

<style scoped>
.swiper-container{
  height: 80px;
}
  .moddle-a{
    width: 300px;
    height: 80px;
    overflow: hidden;
    position: absolute;
    top: 30%;
    left: 33%;
    /*margin-left: 100px;*/
  }


</style>
