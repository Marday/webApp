function H5ComponentPolyline(name , cfg){
	var component= new H5ComponentBase(name, cfg);
	var w=cfg.width;
	var h=cfg.height;
	var data = cfg.data;

	//画网格
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
    cns.height = ctx.height =h;
	component.append(cns);
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle='#aaa';
	
	var y=0;
	var step = h/10;
	for (var i = 0; i < 11; i++) {
		y = step*i;
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
	};

	var x = 0;
	
	var row_x = w/(data.length+1);
	var text_x = row_x;
	for(i=0; i<row_x+1; i++){
		x = row_x*i;
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);

		//如果data[i]中有数据，则把text填上。
		if (data[i]!=undefined) {
			var text = $('<div class="text">');
			text.text(data[i][0]);
			text.css('width',text_x/2);
			text.css('left', (row_x*(i+1)-text_x/2)/2);
			
			component.append(text);
		};
	}
	ctx.stroke();


	//数据层
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	component.append(cns);

	var act = function(per){
		ctx.clearRect(0,0,w,h);//清空画布
		ctx.beginPath();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "#ff8878";
		
		
		var x = 0;
		var y = 0;
		//绘制圆点
		for(i in data ){
			x = row_x*i+row_x;
			y = h-data[i][1]*h*per;
			ctx.moveTo(x, y);
			ctx.arc(x,y,5,0,Math.PI*2);
		}
		//移动到第一个数据点，然后绘制线
		ctx.moveTo(row_x, h-data[0][1]*h*per);
		for(i in data ){

			x = row_x*i+row_x;
			y = h-data[i][1]*h*per;
			
			ctx.lineTo(x,y)
		}
		ctx.stroke();
		//绘制阴影面积，重新设置strokeStyle为透明
		ctx.strokeStyle =  "rgba(255, 255, 255, 0)";
		ctx.fillStyle = 'rgba(255, 136, 120, 0.2)';
		ctx.lineWidth = 1;
		ctx.lineTo(x, h);
		ctx.lineTo(row_x, h);
		ctx.fill();

		//写数据
		for( i in data){
			x = row_x*i+row_x;
			y = h-data[i][1]*h*per;
			ctx.fillStyle = data[i][2]? data[i][2] : '#595959';

			// 设置text的内容和位置，在每次line后高10偏左10px的地方
			ctx.fillText( (data[i][1]*100 >> 0) + '%', x-10, y-10 )
		}
	}
	act(0);


	component.on('onLoad',function(){
		var s = 0;
		for( i = 0; i<100;i++){
			
			setTimeout(function(){
				s+=0.01;
				act(s);
			}, i*10+500)
		}
	})
	component.on('onLeave', function(){
		var s= 1;
		for(i = 0; i<100; i++){
			
			setTimeout(function(){
				s-=0.01;
				act(s)
			}, i*10)
		}
	})
	return component
}