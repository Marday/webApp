function H5ComponentBase(name, cfg){
	var cfg=cfg||{};
	var id=('h5_c_'+Math.random()).replace('.','_');

	//把当前的组件类型添加到样式中进行标记
	var cls= ' h5_component_'+cfg.type;
	var component=$('<div class="h5_component '+cls+' h5_component_name_'+name+'" id="'+id+'">')

	//通过&&判断是否需要下一步操作
	cfg.text && component.text(cfg.text);
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2)
	cfg.css && component.css(cfg.css)
	cfg.bg && component.css('backgroundImage', 'url('+cfg.bg+')');

	//判断是否居中
	if( cfg.center===true){
		component.css({
			marginLeft: (cfg.width/4 * -1)+'px',
			left:'50%'
		})
	}

	//判断是否有onclick的事件
	if( typeof cfg.onclick==='function'){
		component.on('click', cfg.onclick);
	}

	//加载时触发的动画
	component.on('onLoad',function(){
		setTimeout(function(){
			component.addClass(cls+'_load').removeClass(cls+'_leave');
			cfg.animateIn && component.animate(cfg.animateIn);
		},cfg.delay || 0)
		return false
	})

	//组件离开时的动画
	component.on('onLeave', function(){
		setTimeout(function(){
			component.addClass(cls+'_leave').removeClass(cls+'_load');
			cfg.animateOut && component.animate(cfg.animateOut)
		},cfg.delay||0)
		return false
	})

	//返回组件
	return component
}