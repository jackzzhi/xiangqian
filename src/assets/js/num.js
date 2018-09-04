//数字滚动
;(function($, window, document) {
  "use strict";
  var defaults = {
    deVal: 0,       //传入值
    className:'dataNums',   //样式名称
    digit:''    //默认显示几位数字
  };
  function rollNumDaq(obj, options){
    this.obj = obj;
    this.options = $.extend(defaults, options);
    this.init = function(){
      this.initHtml(obj,defaults);
    }
  }
  rollNumDaq.prototype = {
    initHtml: function(obj,options){
      var strHtml = '<ul class="' + options.className + ' inrow">';
      var valLen = options.digit ||  (options.deVal + '').length;
      // console.log(valLen)
      if(obj.find('.'+options.className).length <= 0){
        for(var i = valLen-1; i>=0; i--){
          strHtml += '<li class="dataOne"><div class="dataBoc"><div class="tt" ><span class="num0"></span> <span class="num1"></span> <span class="num2"></span> <span class="num3"></span><span class="num4"></span><span class="num5"></span> <span class="num6"></span> <span class="num7"></span> <span class="num8"></span> <span class="num9"></span><span class="num0"></span> <span class="num1"></span> <span class="num2"></span> <span class="num3"></span> <span class="num4"></span><span class="num5"></span> <span class="num6"></span> <span class="num7"></span> <span class="num8"></span> <span class="num9"></span></div></div></li>';
          if (i%3==0 && i!=0) {
            strHtml += '<li class="comma"></li>';
          }
        }
        strHtml += '</ul>';
        obj.html(strHtml);
      }
      this.scroNum(options);
    },
    scroNum: function(options){
      var number = options.deVal;
      var $num_item = $('.' + options.className).find('.tt');
      var h = $('.dataBoc').height();
      $num_item.css('transition','all 2s ease-in-out');
      var numberStr = number.toString();
      // console.log(numberStr.length+'--------'+ $num_item.length)
      if(numberStr.length > $num_item.length){
       setTimeout(function () {
          $("#dataNum").html('')
        },100)
        // console.log(1)
      }


      var numberArr = numberStr.split('');
      $num_item.each(function(i, item) {
        setTimeout(function(){
          $num_item.eq(i).css('top',-parseInt(numberArr[i])*(h+3) -h*10-30 + 'px');
        },i*100)
      });
    }
  }
  $.fn.rollNumDaq = function(options){

    var $that = this;
    var rollNumObj = new rollNumDaq($that, options);

    rollNumObj.init();
  };
})(jQuery, window, document);
