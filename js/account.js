require(["config"],function(){
    require(["jquery","template","cookie","load"],function($,template){
        function Account(){
            this.render();
        }
        $.extend(Account.prototype,{
            render(){
                console.log("aaa")
            }
        });
        new Account();
    });
});