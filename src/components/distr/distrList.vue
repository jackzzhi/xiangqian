<template>
    <div class="childList">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div v-for="item1 in bingN" class="swiper-slide">
            <div class="distr-list " v-for="item in item1">
              <Pie :id="item.id" :val="item.data[0].value" :val2="item.data[1].value"></Pie>
              <div class="list-t">
                <div class="list-name">{{item.name}}</div>
                <div class="list-num">{{item.value}}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import Pie from './pie.vue'
    export default {
        name: "distr-list",
      components:{Pie},
      data:function(){
        return {
          bingN:[],
        tid:null,
          arr:[]
        }
      },
      created(){
        this.Ajax()
        setInterval(this.Ajax,60000)
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

            let a = res.data.data.dataList[0].series.data.slice(1);
            let len = a.length;
            let b= []
            for (let i = 0; i< len; i++) {
              b[parseInt(i/6)] = [];
            }
            for (let i = 0; i< len; i++) {
              b[parseInt(i/6)].push(a[i])
            }
            this.bingN = b;
            setTimeout(() => {
              new Swiper('.childList .swiper-container',{
                // loop: true,
                autoplay:5000,
                speed:1000,

              })
            })

           // this.bingN2=res.data.data.dataList[0].series.data;
          })
        }
      },

    }
</script>

<style scoped>

  .childList{
    overflow: hidden;
    margin-left: -20px;
  }
  .distr-list{
    display: flex;
    width: 45%;
    float: left;
  margin-bottom: 1%;
  }
  .list-t{
    width:75%;
  }
  .distr-list .list-name{
    font-family: 微软雅黑;
    width: 65%;
    margin-left: 3%;
    font-size: 12px;
    font-weight: normal;
    font-style: italic;
    font-stretch: normal;
    line-height:17px;
    margin-top: 8%;
    color: #ffffff;
    float: left;
  }
  .distr-list .list-num{
    font-family: DINCondensedC-2;
    font-style: italic;
    font-size: 17px;
    font-weight: normal;
    color: #42b7ff;
    float: right;
    margin-right: 15%;
    margin-top: 4%;
    line-height:27px;
  }

</style>
