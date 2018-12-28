/*j加载头部和尾部 */
//定义模块。复用
define(["jquery","cookie"], function($) {
    //构造函数
    // console.log($)
    function HeaderAndFooter(){
        this.init();
        $.cookie.json = true;
    }
    //扩展原型
    $.extend(HeaderAndFooter.prototype, {
        // 初始化
        init(){
            this.loadHeader();
            this.loadFooter();
        },
        //加载头部
        loadHeader(){
            $.get("/haolilai/html/include/header.html",(data) => {
                $("header").html(data);
                //头部加载完成并渲染完成后，还需要添加交互
                this.headerHandler();
            });
        },
        //加载尾部
        loadFooter(){
            $.get("/haolilai/html/include/footer.html",(data) => {
                $("footer").html(data);
                //尾部加载完成后，添加交互效果
                this.footerHandler();
            });
        },
        //添加头部交互
        headerHandler(){
            //点击注销事件
            $(".logout").on("click",this.logoutHandler);
            //搜索提示
            $(".search :text").on("keyup",this.suggestHandler);
            $(".suggest").on("click","div",(event)=>{
                $(".search :text").val($(event.target).text());
                $(".suggest").hide();
            });
             //登录人信息
            const userphone =  $.cookie("userphone");
                if(!userphone){
                    $(".head_ul .logout").hide(); 
                }else if(userphone.length == 1){
                    $(".head_ul .login a").html("Hi!用户"+userphone[0].phone);
                    $(".head_ul .logout").show();
                }   
        },
        logoutHandler(){
            $.removeCookie("userphone",{path:"/haolilai/"});
            alert("您已退出");
            location = "/haolilai/index.html";
        },
        //搜索提示
        suggestHandler(event){
            const 
                word = $(event.target).val(),//<==>$(this).val()<==>tis.value//获取文本框值
                url =`https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=?`;//jsonp接口URL
                $.getJSON(url,function(data){//jsonp跨域请求淘宝建议接口
                    let html = "";
                    data.result.forEach(element => {
                        html += `<div>${element[0]}</div>`
                    });
                    console.log(html)
                    $(".suggest").html(html);
                });
        },
        //添加尾部交互
        footerHandler(){
            this.helpHandler();
            this.wechatHandler();
        },
        //帮助中心交互效果
        helpHandler(){
            $(".links").hide();
            let dis=true;
            $(".help h5").on("click",function(event){
                if(dis){
                    $(this).find("span").css("background","url(/haolilai/images/home_page/bg.png) no-repeat -23px -87px");
                    $(".links").slideDown("slow");
                    dis=false;
                }else{
                    $(this).find("span").css("background","url(/haolilai/images/home_page/bg.png) no-repeat -3px -87px");
                    $(".links").slideUp("slow");
                    dis=true;
                }   
            });
        },
        //微信图片交互效果
        wechatHandler(){
            $(".right a").on("mouseover",function(event){
                $(".wechat").slideDown();
                $(".right a").on("mouseleave",function(){
                    $(".wechat").slideUp();
                });
            });
        }
    });
    return new HeaderAndFooter();
});