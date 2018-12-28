require(["config"],function(){
    require(["jquery","template","cookie","load"],function($,template){
        function Cart(){
            //购物车数组结构
            this.cart = [];
            //配置cookie自动在js和json值之间转换
            $.cookie.json = true;
            //渲染页面
            this.render();
            //注册事件监听
            this.addListener();
            //底部轮播图
            this.carouselHandler();
        }
        $.extend(Cart.prototype,{
            //购物车页面渲染
            render(){
                //获取cookie中保存的购物车数据
                const cart = this.cart = $.cookie("cart") || [];
                // console.log(this.cart)
                //判断购物车是否为空
                if(cart.length === 0){
                    $(".pro_list").hide();
                    return;
                }else{
                    $(".empty").hide();
                }
                //art-template渲染数据 
                const html = template("cart_template",{"cart" : cart});
                $(".pro_list tbody").html(html);
            },
            //添加事件监听
            addListener(){
                $(".pro_list").on("click",".dele",$.proxy(this.deleteHandler,this));//删除
                $(".pro_list").on("click",".dele_checked",$.proxy(this.deleteCheckedHandler,this));//删除选中商品
                $(".amount").on("click",".decrease,.increase",$.proxy(this.amountHandler,this));//修改数量
                $(".amount").on("blur", ".count",$.proxy (this.amountHandler,this));//输入数量
                $(".check_all").on("click",this.checkAllHandler);// 全选
                $(".check").on("click",$.proxy(this.checkHandler,this));//部分选中
                $(".pro_list").on("click",".check_all, .check, .dele, .decrease, .increase, .dele_checked",this.calculateTotalHandler);//计算总金额
            },
            //删除
            deleteHandler(event){
                //所在行
                const $tr = $(event.target).parents("tr");
                //待删除商品id及size
                const
                    id = $tr.find(".left span").text(),
                    size = $tr.find(".size").text(),
                    price = $tr.find(".price").text();
                    // console.log(price)
                //将数组中当前商品移除
                    this.cart = this.cart.filter((curr)=>(curr.id != id || curr.size != size||curr.price != price));
                    // console.log(this.cart)
                //将修改后的数组存回cookie
                    $.cookie("cart",this.cart,{expires:10,path:"/"});
                //页面DOM树中删除
                    $tr.remove();
            },
            //修改数量
            amountHandler(){
                // console.log(event.target)
                //所在行
                const 
                    $src = $(event.target),
                    $tr = $src.parents("tr");
                //当前商品id和size
                const
                    id = $tr.find(".left span").text(),
                    size = $tr.find(".size").text(),
                    price = $tr.find(".price").text();
                //对应商品对象
                const prod = this.cart.filter((curr)=>(curr.id == id && curr.size == size && curr.price == price))[0];
                //修改数量
                if ($src.is(".increase")){ // 加
                    prod.amount++;
                }else if ($src.is(".decrease")){ // 减
                    if (prod.amount <= 1){// 商品数量最小减到1
                    return;
                    }else{
                        prod.amount--;
                    }
                }else if($src.is(".count")){ // 输入修改
                // 获取输入的数量值
                    const num = $src.val();
                // 判断是否符合数字合法格式
                    const reg = /^[1-9]\d*$/;
                    if (!reg.test(num)){
                        $src.val(prod.amount);
                        return;
                    }else{
                        prod.amount = Number(num);
                    } 
                }
                console.log(prod)
                //保存cookie
                $.cookie("cart",this.cart,{expires:10,path:"/"});
                //显示修改后的数量
                $tr.find(".count").val(prod.amount);
                //显示修改后的小计金额
                $tr.find(".subtotal span").text((prod.price*prod.amount).toFixed(2));
            },
            //部分选中
            checkHandler(){
                // 获取商品行前选中的复选框个数
				const num = $(".check:checked").length;
				// 设置“全选”选中状态
				$(".check_all").prop("checked", num === this.cart.length);
            },
            // 全选
            checkAllHandler(event){
                console.log(this)
                // 获取当前“全选”复选框选中状态
				// checked、selected、disabled 通常使用 .prop() 方法获取/设置
				const status = $(event.target).prop("checked");
				// 让每行前的复选框与“全选”状态保持一致
				$(".check").prop("checked", status);
            },
            //删除选中商品
            deleteCheckedHandler(){
                console.log("aaa")
                $(".check:checked").each((qwer, element)=>{
                    $(element).parents("tr").remove();
                });
            },
            // 计算合计金额
			calculateTotalHandler(){
                console.log("ccc")
				let sum = 0;
				$(".check:checked").each((qwer, element)=>{
                    sum +=  Number($(element).parents("tr").find(".subtotal span").text());
                });
				$(".total2").text(sum.toFixed(2));
            },
            //底部轮播图
            carouselHandler(){
                let result = -1;
                let time = setInterval(function(){
                    result = result * (-1);
                    if(result === 1){
                        $(".list").animate({left:0},1000)
                    }else{
                        $(".list").animate({left:-335},2000)
                    }
                },4000);
                // let 
                //     lis = $(".list li"),
                //     len = lis.length,
                //     ul = $(".list")[0],
                //     liWidth = lis[0].offsetWidth,
                //     currIndex = 1,
                //     nextIndex = 2;
                // let first = lis[0].cloneNode(true),
                //     last = lis[len - 1].cloneNode(true);
                // ul.appendChild(first);
                // ul.insertBerore(last,lis[0])    
                // console.log(first,last,ul)
            }
        });
        new Cart();
    });
});