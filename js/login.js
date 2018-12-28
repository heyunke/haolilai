require(["config"], function() {
	require(["jquery","load","cookie","layer"], function($) {
		function Login(){
			this.addListener();
			$.cookie.json = true;
		}
		$.extend(Login.prototype,{
			addListener(){
				$(".login_form").on("focus","input",this.focusHandler);//鼠标移入事件
				$(".login_form").on("blur","input",$.proxy(this.blurHandler,this));//鼠标移出事件
				$(".login_form").on("click",".commit",this.loginHandler);//点击登录事件
			},
			focusHandler(event){
				$(event.target).parents("dd").find(".prompt").show();
			},
			blurHandler(){
				$(event.target).parents("dd").find(".prompt").hide();
			},
			loginHandler(){
				const
					_phone = $(".login_name input").val(),
					reg_phone = /^1[34578]\d{9}$/,
					_pass = $(".login_password input").val(),
					reg_pass = /^[a-zA-Z]\w{5,17}$/;
				if(!reg_phone.test(_phone)){
					alert("电话号码格式有误");
					return;
					// layer.msg("电话号码格式不正确");
				}else{
					if(!reg_pass.test(_pass)){
						alert("密码格式有误");
						// layer.msg('密码格式有误');
						return;
					}else{
						const data = $(".login_form").serialize();
						$.post("http://127.0.0.1/php/api/login.php", data, (res)=>{
							if(res.res_body.status == 1){
								console.log(res)
								const _phone = res.res_body.info.userphone;
								const userphone = [{phone : _phone}];
								$.cookie("userphone",userphone,{expires : 1,path :"/"})
								console.log($.cookie("userphone"))
								alert("登录成功，点击确定开始选购");
								location = "/index.html";
							}else if(res.res_body.status == 0){
								alert("帐号或者密码错误");
								return;
							}else{
								alert("登录失败");
								return;
							}
						},"json");
					}
				}
			},
		});
		new Login();
	});
});