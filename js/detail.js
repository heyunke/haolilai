require(["config"], function() {
	require(["jquery", "template", "load", "cookie","layer","zoom"], function($, template) {
		function Details() {
			this.render();
			this.carouselHandler();
			$.cookie.json = true;
		}
		$.extend(Details.prototype, {
			// 加载并渲染列表页面
			render() {
				// 获取当前待加载商品的 id
				const _id = location.search.slice(location.search.lastIndexOf("=")+1);
				// console.log(_id)
				// 假数据接口
				$.getJSON("http://rap2api.taobao.org/app/mock/120304/api/details?id="+_id, (data)=>{
					// console.log(data)
					//  console.log(data.res_body.list[0].size_price[0].price)
					const {chtitle,img_right,ustitle,detail_images,id,size_price,zoomImgs} = data.res_body.list[0];
					const html = template("detail-template", {"id": id, "chtitle": chtitle, "zoomImgs":zoomImgs,"img_right": img_right, "ustitle": ustitle, "detail_images": detail_images,"size_price":size_price})
					// console.log(html)
					 $("main").prepend(html);
					 //添加放大镜效果
					 $(".zoom-img").elevateZoom({
						gallery:'gal1',
						cursor: 'pointer',
						galleryActiveClass: 'active'
					}); 
					 // 添加事件监听
					 this.addListener(); 
				});
			},	
			// 添加事件监听
			addListener(){
				$("#size_choice").on("mouseenter",this.sizeChooseMouseenter);//鼠标滑入>规格
				$(".cakesize").on("click",this.siezeChooseHandler);//选择规格
				$("#size_choice").on("mouseleave",this.sizeChooseMouseleave);//鼠标滑出>规格
				$("#tableware_choice").on("mouseenter",this.tablewareMouseenter);//鼠标滑入>餐具
				$(".tablewares").on("click",this.tablewareHandler);//选择餐具
				$("#tableware_choice").on("mouseleave",this.tablewareMouseleave);//鼠标滑出>餐具
				$(".amount").on("click",".decrease,.increase",this.amountHandler);//选择数量
				$(".amount").on("blur", ".count", this.amountHandler);//输入数量
				$(".add_to_cart").on("click",this.addToCartHandler);//加入购物车
				$(".buy_now").on("click",this.buyNowHandler);//立即购买
				$(".popout h4 a").on("click",this.cancelHandler);//点击xx取消事件
			},
			//鼠标滑入>规格
			sizeChooseMouseenter(){
				$("#size_selec").show();
			},
			//选择规格
			siezeChooseHandler(){
				// console.log(this);
				const	
					$amount = Number($(".count").val()),
					$price =Number($(this).find(".cake_price b").text()),
					$size =$(this).find(".cake_size").text();
					// console.log($amount);
					$("#text").text($size).data("size", $size);
					$("#text").text($size).data("price", $price);
					// console.log($("#text").data("price"));
					$(".choo_middle b").text("￥"+$price*$amount);
					$("#size_selec").hide();
			},
			//鼠标滑出>规格	
			sizeChooseMouseleave(){
				$("#size_selec").hide();
			},
			//鼠标滑入>餐具
			tablewareMouseenter(){
				$("#tableware_selec").show();
			},
			//选择餐具
			tablewareHandler(){
				$("#text1").text($(this).find("span").text());
				$("#tableware_selec").hide();
			},
			//鼠标滑出>餐具
			tablewareMouseleave(){
				$("#tableware_selec").hide();
			},
			// //选择数量
			amountHandler(event){
				// console.log(event.target)
				let
					$src =$(event.target),
					$amount = Number($(".count").val()),
					$price = $("#text").data("price") || Number($($(".cakesize").find("b")[0]).text());
					// console.log($price)
					if ($src.is(".increase")) // 加
					$amount++;
				else if ($src.is(".decrease")) { // 减
					if ($amount <= 1) // 商品数量最小减到1
						return;
					$amount--;
				} else if ($src.is(".count")) { // 输入修改
					// 获取输入的数量值
					// 判断是否符合数字合法格式
					const reg = /^[1-9]\d*$/;
					if (!reg.test($amount)) {
						$amount=1;
					}
				}	
				$(".count").val($amount);	
				$(".choo_middle b").text("￥"+$price*$amount);
			},
			//加入购物车
			addToCartHandler(event){
				const 
					$parent = $(".choose");
				const 
					currentProduct = {
						id : $parent.find(".currid").text(),
						chtitle : $parent.find(".choo_middle h4").text(),
						price : $parent.find("#text").data("price") || Number($($parent.find(".cakesize b")[0]).text()),
						img : $parent.find(".choo_top img").attr("src"),
						amount : Number($parent.find(".count").val()),
						size :  $parent.find("#text").data("size") || $($parent.find(".cakesize")[0]).find(".cake_size").text()
					};
				//加入购物车确认框
				if(!$parent.find("#text").data("price")){
					confirm("请选择规格")
				}else{
					$(".popout").show();
					// 获取在 cookie 中已保存的购物车数组	
					const cart = $.cookie("cart") || [];
					// 判断在 cart 数组中是否存在当前选购的商品对象
					const has = cart.some((curr)=>{
						if (curr.id == currentProduct.id && curr.size == currentProduct.size &&curr.price == currentProduct.price) { // 已有选购
							curr.amount=curr.amount+currentProduct.amount; // 增加数量
							return true;
						}else{
							return false;
						}
					});
					// 如果未选购过
					if (!has){
						cart.push(currentProduct); 
					}
					// 将购物车的数组保存到 cookie 中
					$.cookie("cart",cart,{expires:10,path:"/"});
					console.log($.cookie("cart"));
				}
			},
			//点击xx取消事件
			cancelHandler(){
				$(".popout").hide();
			},
			//立即购买
			buyNowHandler(){
				const 
					$parent = $(".choose");
				const 
					currentProduct = {
						id : $parent.find(".currid").text(),
						chtitle : $parent.find(".choo_middle h4").text(),
						price : $parent.find("#text").data("price") || Number($($parent.find(".cakesize b")[0]).text()),
						img : $parent.find(".choo_top img").attr("src"),
						amount : Number($parent.find(".count").val()),
						size :  $parent.find("#text").data("size") || $($parent.find(".cakesize")[0]).find(".cake_size").text()
					};
				if(!$parent.find("#text").data("price")){
					confirm("请选择规格")
				}else{
					console.log("in")
					// 获取在 cookie 中已保存的购物车数组	
					const cart = $.cookie("cart") || [];
					// 判断在 cart 数组中是否存在当前选购的商品对象
					const has = cart.some((curr)=>{
						if (curr.id == currentProduct.id & curr.size == currentProduct.size &&curr.price == currentProduct.price) { // 已有选购
							curr.amount=curr.amount+currentProduct.amount; // 增加数量
							return true;
						}else{
							return false;
						}
					});
					// 如果未选购过
					if (!has){
						cart.push(currentProduct); 
					}
					// 将购物车的数组保存到 cookie 中
					$.cookie("cart",cart,{expires:10,path:"/"});
					console.log($.cookie("cart"));
					open("/haolilai/html/cart.html");
				}
			},
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
			}	
		});
		new Details();
	});
});