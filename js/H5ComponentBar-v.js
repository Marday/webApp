function H5ComponentBar_v (name, cfg){
	var component= new H5ComponentBase(name, cfg);
	var width = (cfg.height/2/cfg.data.length) >> 0;
	$.each(cfg.data,function(index,item){
		var line= $('<div class="line">');
		var name =$('<div class="name">');
		var rate= $('<div class="rate">');
		var per= $('<div class="per">');

		var height= item[1]*100 + '%';
		var width= cfg.width/2/cfg.data.length >> 0;
		var bgColor= item[2]!= undefined ? item[2] : '';
		rate.html('<div class="bg" style="background-color:'+bgColor+'"></div>')
		.append(per);
		rate.css('height', height);
		name.text(item[0]);
		per.text(item[1]*100+'%');
		line.append(name).append(rate).width(width);
		component.append(line);
	})
	return component;
}