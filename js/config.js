require.config({
    baseUrl:"/haolilai/",//webserver的根目录
    paths:{//模块短名称路径配置
        jquery:"lib/jquery/jquery-1.12.4.min",
        load:"js/load-header-and-footer",
        template:"lib/art-template/template-web",
        cookie:"lib/jquery-plugins/jquery.cookie",
        layer:"lib/layer/layer",
        easyfader:"lib/jquery-plugins/jquery.easyfader",
        zoom:"lib/jquery-plugins/jquery.elevatezoom",
    },
    shim: {
		easyfader: { // 这是jQuery插件，依赖于 jQuery 模块
			deps: ["jquery"]
        },
        zoom: {
            deps:["jquery"]
        },
        layer: {
            deps:["jquery"]
        }
	}
});