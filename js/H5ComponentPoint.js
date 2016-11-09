function H5ComponentPoint(name, cfg){
	var component = new H5ComponentBase(name, cfg);
	var base = cfg.data[0][1];//把第一个数据作为百分比的大小，其他以此作为比较
	var w = cfg.width;
	var h = cfg.height;
	var data = cfg.data;
	var colors = ['#eee','#453','#987'];
	$.each(data, function(index, item){
		var point = $('<div class ="point point_'+index+'">');
		var rate = $('<div class="per" >'+item[1]*100+'%</div>');
		var name = $('<div class="name" >'+item[0]+'</div>');
		var per = item[1]/base*100;
		var color = item[2]?item[2]:colors.pop();
		name.append(rate);
		point.append(name);
		component.append(point);
		point.css({'width': per+'%','height': per+'%','backgroundColor':color});
		if (item[3]!= undefined) {
			point.css('left', item[3]);
		};
		if (item[4]!= undefined) {
			point.css('top', item[4]);
		};
		point.css('transition', 'all 1s '+index*.5+'s');
	})
	component.find('.point').on('click',function(){

        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus');

        return false;  //阻止冒泡
   }).eq(0).addClass('point_focus')


	return component
}
