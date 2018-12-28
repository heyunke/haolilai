require(["config"], function() {
	require(["jquery","load","cookie","layer"], function($){
		function Register(){
			this.verificationCode();
			// this.verifyPhone();
			// this.varyfyCode();
			// this.varifyPassword();
			// this.varifyConfirmPassword();
			this.addListener();
			$.cookie.json = true;

		}
		$.extend(Register.prototype,{
			//生成验证码
			verificationCode(){
				let verify_code = "";//初始化验证码
				do{
					//获取随机字符
					let code = String.fromCharCode(Math.ceil(Math.random()*122)),
						reg = /[a-zA-Z0-9]/;
					//判断字符是否在数字和字母之中
					if(reg.test(code)){
						verify_code += code;
					}
				//有四个字符时退出循环
				} while (verify_code.length < 4)
				//将验证字符填入页面
				$(".code em").text(verify_code);
			},
			//验证手机号码格式
			//注册时间监听
			addListener(){
				//鼠标移入事件
				$(".register_form").on("focus",".blur",this.focusHandler);
				//鼠标移出事件
				$(".register_form").on("blur",".blur",$.proxy(this.blurHandler,this));
				//点击切换验证码
				$(".register_form").on("click",".code",$.proxy(this.changeCodeHandler,this));
				//点击注册事件
				$(".register_form").on("click",".commit",this.commitHandler);
			},
			focusHandler(event){
				$(event.target).parents("dd").find(".prompt").show();
			},
			blurHandler(){
				$(event.target).parents("dd").find(".prompt").hide();
				if(event.target == $(".phone_num")[0]){//电话栏
					const 
						_phone = $(".phone_num").val(),
						reg = /^1[34578]\d{9}$/;
					if(reg.test(_phone)){
						$(event.target).parents("dd").find(".check").show();  
					}else{
						layer.msg("请输入正确的电话号码");
						$(event.target).parents("dd").find(".check").hide();
						// $(".phone_num").val("");
					} 
				}
				if(event.target == $(".varify_co")[0]){
					const _code = $(".varify_co").val().toUpperCase();
					if(_code == $(".code em").text().toUpperCase()){
						$(event.target).parents("dd").find(".check").show(); 
					}else{
						layer.msg("请输入正确的验证码");
						$(event.target).parents("dd").find(".check").hide();
						// $(".varify_co").val("");
					}
				}
				if(event.target == $(".pass")[0]){
					const 
						_pass = $(".pass").val(),
						reg = /^[a-zA-Z]\w{5,17}$/;
					if(reg.test(_pass)){
						$(event.target).parents("dd").find(".check").show(); 
					}else{
						layer.msg("密码格式错误");
						$(event.target).parents("dd").find(".check").hide();
						$(".pass").val("");
					}	
				}
				if(event.target == $(".confirm_pass")[0]){
					const 
						_pass = $(".pass").val(),
						_confirm = $(".confirm_pass").val();
						if(_pass == ""){
							layer.msg("请先输入密码");
							$(".pass").focus();
							$(".confirm_pass").val("");
						}else{
							if(_pass === _confirm){
								$(event.target).parents("dd").find(".check").show();
							}else{
								layer.msg("两次密码不一致");
								$(event.target).parents("dd").find(".check").hide();
							}
						} 
				}
			},
			changeCodeHandler(){
				this.verificationCode();
			},
			commitHandler(){
				const
					_phone = $(".phone_num").val(),
					reg_phone = /^1[34578]\d{9}$/,
					_code_input = $(".varify_co").val().toUpperCase(),
					_code = $(".code em").text().toUpperCase(),
					_pass = $(".pass").val(),
					reg_pass = /^[a-zA-Z]\w{5,17}$/,
					_confirm = $(".confirm_pass").val(),
					_checked = $(".checked:checked")[0];
				//检验手机号
				if(!reg_phone.test(_phone)){
					layer.msg("请输入最正确电话号码");
					return false;
				}else{//手机号符合、检验验证码
					if(_code_input != _code){
						layer.msg("验证码有误");
						return false;
					}else if(_code_input == _code){//验证码正确、检验密码
						if(!reg_pass.test(_pass)){
							layer.msg("密码格式有误")
							$(".pass").focus();
							return false;
						}else{//密码格式正确
							if(_pass != _confirm){
								layer.msg("两次密码不一致")
								return false;
							}else{//密码一致，服务条款
								if(!_checked){
									layer.msg("请阅读服务条款")
									return false;
								}else{//全部通过，进入数据库
									// 获取注册信息
									const data = $(".blur").serialize();
									//console.log(data);
									// POST请求注册API
									$.post("http://127.0.0.1/php/api/register.php", data, (res)=>{
										console.log(res.res_body.message.trim())
										if (res.res_body.status === 1) { // 注册成功
											console.log(res)
											const _userphone = res.res_body.userphone;	
											const userphone = [{phone : _userphone}];
											$.cookie("userphone",userphone,{expires : 1,path :"/"})
											console.log($.cookie("userphone"))
											alert("注册成功，点击确定开始选购");
											location = "/index.html";
										}else{ // 注册失败
											const 
												res_msg = res.res_body.message.trim().split(" ").slice(3).join("");
												console.log(res_msg)
												if(res_msg == "forkey2"){
													layer.msg('手机号已注册');
												}else{
													layer.msg("注册失败，请检测网络")
												}
										}
									}, "json");
									return false;	
								}
							}
						}
					}
				}        
			}
		});
		new Register();
	});
});