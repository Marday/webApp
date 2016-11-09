function H5ComponentBar(name, cfg){
	var component= new H5ComponentBase(name, cfg);
	$.each(cfg.data, function(index, item){
		var line= $('<div class="line">');
		var name= $('<div class="name">');
		var rate= $('<div class="rate">');
		var per= $('<div class="per">');
		var height= cfg.height/2/(2*cfg.data.length-1) >> 0;
		var width= item[1]*100*2/3 +'%'; 
		var bgColor= item[2]!= undefined ? item[2] : '';
		rate.html('<div class="bg" style="background-color:'+bgColor+'"></div>')
		.height(height).css('width', width);
		
		name.text(item[0]);
		per.text(item[1]*100+'%').css('lineHeight',height+'px');
		line.append(name).append(rate).append(per).height(height).css('marginBottom',height+'px');
		component.append(line);
	})
	return component;
}