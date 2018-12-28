require(["config"],function(){
    require(["jquery","template","cookie","load"],function($,template){
        console.log("success")
        function List(){
            this.loadAllProducts();
            $.cookie.json =true;
        }
        $.extend(List.prototype,{
            //加载渲染所有商品
            loadAllProducts(){
                $.getJSON("http://rap2api.taobao.org/app/mock/120304/api/allprod",(data)=>{
                    // console.log(data)
                   const
                        html =  template("prod-template",{list:data.res_body.list});
                        // console.log(html)
                        $("main ul").prepend(html);
                })
             //var htmlstring = template("模版id",带渲染数据data)
            }
        });
        new List();
    });
});
   