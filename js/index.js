require(["config"],function(){
    require(["jquery","load","easyfader"],function($){
        $('#dowebok').easyFader();
        
        // console.log($);
        // $("header").load("/html/include/header.html",function(){
        //     $(".search :text").keyup(function(){
        //         var url =`https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&callback=?`;
        //         $.getJSON(url,function(data){
        //             console.log(data)
        //         })
        //     });    
        // });
        // $("footer").load("/html/include/footer.html")
        // //加载头部
        // $.get("/html/include/header.html",function(data){
        //     console.log(data)
        //     $("header").html(data);
        // });
        // //加载尾部
        // $.get("/html/include/footer.html",function(data){
        //     $("footer").html(data);
        // });
    });
});