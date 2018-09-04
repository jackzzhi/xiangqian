<template>
  <div class="hello" style="position: relative;height: 100%;">
    <div class="logo"><img src="../assets/images/snlogo.png" alt=""></div>
    <div class="main">
      <div class="left">
        <!--今日分时出借金额-->
        <div class="left-top">
          <div class="money">
            <div class="money-name" style=""><img src="../assets/images/rankimg/1.今日分时出借金额.png" alt=""></div>
            <div class="money-scale">金额（万元）</div>
          </div>
          <moneyComponent></moneyComponent>
          <div class="c48"></div>
        </div>
        <!--今日用户活跃分时走势-->
        <div class="left-moddle">
          <div class="money">
            <div class="trend1-name"><img src="../assets/images/rankimg/2.今日用户活跃分时走势.png" alt=""></div>
            <div class="trend-scale">个数（位）</div>
          </div>
          <trendComponent></trendComponent>
          <div class="trend-login">
            <div class="trend-main">
              <div class="trend-login-left"><img class="img" src="../assets/images/yellowline.png" alt=""></div>
              <div class="trend-login-right" >
                <div class="login-right-top">{{this.zhuce}}</div>
                <div class="login-right-bottom">{{this.zhuce2}} <span>位</span></div>
              </div>
            </div>

            <div  class="trend-main ">
              <div class="trend-login-left"><img class="img" src="../assets/images/blueline.png" alt=""></div>
              <div class="trend-login-right">
                <div class="login-right-top">{{this.lend}}</div>
                <div class="login-right-bottom">{{this.lend2}} <span>位</span> </div>
              </div>
            </div>
          </div>
        </div>
        <!--本月出借金额走势-->
        <div v-if="zhucey.length > 0" class="left-bottom">
          <div style="height: 10px"></div>
          <div class="money" style="height:30px;">
            <div class="trend-name" style="position: absolute;top: 7%;left: 7%;"><img src="../assets/images/rankimg/3.本月出借金额走势.png" alt=""></div>
            <div class="lend-scale">金额（万元）</div>
          </div>
          <lendComponent></lendComponent>
          <div class="lendlist">
            <div class="lendmoney">
              <div class="lendtext">
                <div class="lendname">{{zhucey[0].name}}</div>
                <div class="lendsalse">{{zhucey[0].value}} <span>位</span></div>
              </div>

            </div>
            <div class="lendmoney">
              <div class="lendtext">
                <div class="lendname">{{zhucey[1].name}}</div>
                <div class="lendsalse">{{zhucey[1].value}}<span>位</span></div>
              </div>

            </div>
            <div class="lendmoney">
              <div class="lendtext">
                <div class="lendname">{{zhucey[2].name}}</div>
                <div class="lendsalse">{{zhucey[2].value}}<span>元</span></div>
              </div>

            </div>
            <div class="lendmoney">
              <div class="lendtext">
                <div class="lendname">{{zhucey[3].name}}</div>
                <div class="lendsalse">{{zhucey[3].value}}<span>元</span></div>
              </div>

            </div>
          </div>


        </div>
      </div>
      <div class="moddle">
        <!--今日时间-->
      <div class="moddle-top">
        <div class="top-name">今日出借金额</div>
        <div class="top-time" id="show">{{t}}</div>
      </div>
        <!--今日出借金额-->
        <div class="moddle-odoo">
          <nummoveComponent></nummoveComponent>

        </div>
        <!--累计概括-->
      <div v-if="btn.length > 0" class="moddle-list">
        <div class="moddle-list1">
          <div class="M-list-name">{{btn[0].name}}</div>
          <div class="M-list-num">{{btn[0].value}}<span>元</span></div>
        </div>
        <div class="moddle-list1">
          <div class="M-list-name">{{btn[1].name}}</div>
          <div class="M-list-num">{{btn[1].value}}<span>位</span></div>
        </div>
        <div class="moddle-list1">
          <div class="M-list-name">{{btn[2].name}}</div>
          <div class="M-list-num">{{btn[2].value}}<span>位</span></div>
        </div>
        <div class="moddle-list1">
          <div class="M-list-name">{{btn[3].name}}</div>
          <div class="M-list-num">{{btn[3].value}}<span>元</span></div>
        </div>

      </div >
        <!--交易城市-->
        <sdComponent ></sdComponent>
        <!--地图-->
        <div class="moddle-map">
          <mapComponent></mapComponent>
        </div>
      </div>
      <div class="right">
        <!--富豪排行-->
        <div class="right-top"><rankComponent></rankComponent></div>
        <!--今日业绩-->
        <div class="right-moddle">
          <perforComponent></perforComponent>
        </div>
        <!--&lt;!&ndash;今日出借计划分布&ndash;&gt;-->
        <div class="right-bottom">
          <distrComponent></distrComponent>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import $ from 'jquery'
  import'echarts'
  import moneyComponent from './money/money'
  import trendComponent from './trend/trend'
  import lendComponent from './lend/lend'
  import rankComponent from './ranking/ranking'
  import perforComponent from './perfor/perfor'
  import distrComponent from './distr/distr'
  import nummoveComponent from './nummove/nummove'
  import mapComponent from './map/map'
  import sdComponent from './trend/bannerV'
  import '../assets/js/common'
  export default {
    //2.然后,在components中写入子组件
    components: {moneyComponent,lendComponent,trendComponent,rankComponent,distrComponent,perforComponent,nummoveComponent,mapComponent,sdComponent},
    data:function(){
      return {

        t:'',
        zhuce:'',
        zhuce2:'',
        lend:'',
        lend2:'',
        zhucey:[],
        lendy:'',
        btn:[],
        zhuceyV:'',
        money:false,
        we:true,
        qing:'',
        six:'19:19'

      }
    },
    created(){
     this.btn1()
     this.lend1()
      this.zhucey1()
      setInterval(this.lend1,300000)
      setInterval(this.zhucey1,300000)
      setInterval(this.btn1,10000)
    },
    mounted(){
      setInterval(this.Time,1000)
      // if(this.qing=this.six){
      //   console.log(1)
      // }
    },

    methods:{
      // 今日出借用户，今日注册用户，本月累计概括
      lend1(){
        this.myAjax({
          method: 'post',
          url: this.config.domain,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            "token": this.config.token,
            "subjectId":"29",
            "displayMode":"11"
          }),
        }).then( (res)=>{  // 请求成功
          // console.log(res.data.data)
          this.lend=res.data.data.dataList[1].name;
          this.lend2=res.data.data.dataList[1].value;
          this.zhuce=res.data.data.dataList[0].name;
          this.zhuce2=res.data.data.dataList[0].value;

        });

      },
      zhucey1(){
        this.myAjax({
          method: 'post',
          url: this.config.domain,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            "token": this.config.token,
            "subjectId":"31",
            "displayMode":"11"
          }),
        }).then( (res)=>{  // 请求成功
          // console.log(this.zhucey)
          // debugger
          this.zhucey=res.data.data.dataList;


        });
      },
      // 累计概括
      btn1(){
        this.myAjax({
          method: 'post',
          url:this.config.domain,
          dataType: 'json',
          headers: {'Content-Type': 'application/json;charset=UTF-8'},
          data:JSON.stringify({
            "token": this.config.token,
            "subjectId":"33",
            "displayMode":"11"
          }),
        }).then( (res)=>{  // 请求成功
          this.btn=res.data.data.dataList;
          // console.log(res.data.data.dataList[0])
        })
      },
      // 时间
      Time(){

        var today=new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        month=this.checkTime(month);
        day=this.checkTime(day);
        h=this.checkTime(h);
        m=this.checkTime(m);
        s=this.checkTime(s);
        this.t=year+"/"+month+"/"+day+" "+h+":"+m+":"+s
        let qing=h+""+m+""+s
        // console.log(qing)
        if(qing === '073000' || qing === '200000' || qing === '030000'){
          // window.location.href = window.location.href
          window.location.reload(true)
        }
      },

      // 补零
      checkTime(i)
      {
        if (i<10)
        {
          i="0" + i
        }
        return i
      }
    },

  }


</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import "../assets/css/stylw.css";
.logo{width: 300px;height: 35px;position: absolute;bottom: 0;
  left: 50%;margin-left: -135px;}
  .logo img{margin: 0 auto;width: 90%;position: absolute;top: 50%;margin-top: -14px}

  @font-face {
    font-family: DINCondensedC-2;
    src: url("../assets/font/DINCondensedC-2.ttf");
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
