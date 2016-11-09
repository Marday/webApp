function H5ComponentRadar(name, cfg){
	var component = new H5ComponentBase(name , cfg);

	var w = cfg.width;
	var h = cfg.height;

	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height  = h;
	component.append(cns);

	//绘制底层
	var r = w/2;
	var data = cfg.data;
	var step = data.length;
	//  rad = 2.Math.PI/step * i;
 	//  x = a + Math.sin( rad ) * r;
  //  y = b + Math.cos( rad ) * r;

  	//绘制蜘蛛网背景
  	var isBlue = false ;
  	var rad = 0;
  	var x = 0;
  	var y = 0;
  	for (var s = 10; s > 0; s--) {
  		ctx.beginPath();

  		for(i=0; i<step; i++){
  			rad = 2*Math.PI/step * i;
  			x = r + Math.sin( rad ) * r * s/10;
  			y = r + Math.cos( rad ) * r * s/10;
  			ctx.lineTo(x ,y);
  		} 
  		ctx.closePath();
  		ctx.fillStyle = (isBlue = !isBlue)? '#99c0ff' : '#f1f9ff';
  		ctx.fill();
  	};
  	
  	//绘制文本和对角线
  	for(var i = 0 ; i<step; i++){
        rad = 2*Math.PI/step * i;
        x = r + Math.sin( rad ) * r ;
        y = r + Math.cos( rad ) * r ;
        ctx.moveTo(r,r);
        ctx.lineTo(x,y);

        var text = $('<div class="text">');
        text.text( data[i][0] );
        text.css('transition','all .5s '+ i*.1 + 's');

        if( x > r ){
            text.css('left',x/2+5);
        }else{
            text.css('right',(w-x)/2+5);
        }

        if( y > r){
            text.css('top',y/2+5);
        }else{
            text.css('bottom',(h-y)/2+5);
        }
        if( cfg.data[i][2] ){
            text.css('color',data[i][2])
        }
        text.css('opacity',0);

        component.append(text);
    }
    ctx.strokeStyle = '#e0e0e0';
    ctx.stroke();


    //绘制数据
    var cns = document.createElement('canvas');
    var ctx = cns.getContext('2d');
    cns.width = ctx.width = w;
    cns.height = ctx.height =h;
    component.append(cns);

    ctx.strokeStyle = '#f00';

    var draw = function( per ){

        if(per <= 1){
            component.find('.text').css('opacity',0);
        }
        if(per >= 1){
            component.find('.text').css('opacity',1);
        }

        ctx.clearRect(0,0,w,h);

        //  输出数据的折线
        for(var i=0;i<step;i++){
            var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;
        
            var rate  = data[i][1] * per;
        
            var x = r + Math.sin( rad ) * r * rate;
            var y = r + Math.cos( rad ) * r * rate ;

            ctx.lineTo(x,y);

        }
        ctx.closePath();
        ctx.stroke();

        //  输出数据的点
        ctx.fillStyle = '#ff7676';
        for(var i=0;i<step;i++){
            var rad = ( 2*Math.PI / 360 ) * ( 360 / step ) * i;

            var rate  = data[i][1] * per ;

            var x = r + Math.sin( rad ) * r * rate;
            var y = r + Math.cos( rad ) * r * rate ;

            ctx.beginPath();
            ctx.arc(x,y,5,0,2*Math.PI);
            ctx.fill();
            ctx.closePath();
        }
    }

    component.on('onLoad',function(){
    //  雷达图生长动画
        var s = 0;
        for( i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s);
            },i*10+500);
        }
    });
    component.on('onLeave',function(){
        //  雷达图退场动画
        var s = 1;
        for( i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s);
            },i*10);
        }
    });
  	return component;
}