function H5ComponentPie(name, cfg){
	var component= new H5ComponentBase(name, cfg);

	//绘制网络格背景层
	var w= cfg.width,
	h=cfg.height;

	//加入一个画布
	var cns = document.createElement('canvas');
	var ctx= cns.getContext('2d');
	cns.width = ctx.width= w;
	cns.height= ctx.height = h;
	$(cns).css('zIndex', 1);
	component.append(cns);

	var r= w/2;

	// 加入一个底图层
	ctx.beginPath();
	ctx.fillStyle='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth = 1;
	ctx.arc(r,r,r,0,2*Math.PI);
	ctx.fill();
	ctx.stroke();

	//绘制一个数据层
	var cns =document.createElement('canvas');
	var ctx= cns.getContext('2d');
	cns.width= ctx.width= w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex', 2);
	component.append(cns);

	var colors = [ '#875' ,'#a77','red', 'green', 'blue' , '#a00', 'orange'];
	var sAngle = 1.5*Math.PI; //开始角度
	var eAngle = 0; //结束角度;
	var aAngle = Math.PI*2;//保存2PI

	var step = cfg.data.length;
	for (var i = 0; i < step; i++) {
		var item = cfg.data[i];
		var color = item[2] || (item[2] = colors.pop());//如果没有传颜色参数，就用于被的color数组里的颜色
		//按给定数据的比例画结束位置
		eAngle = sAngle + aAngle*item[1];
		
		ctx.beginPath();
		ctx.fillStyle= color;
		ctx.strokeStyle= color;
		ctx.lineWidth= .1;

		ctx.moveTo(r,r);
		ctx.arc(r,r,r,sAngle,eAngle);
		ctx.fill();
		ctx.stroke();

		//画完后把开始角度换成这次结束角度，用于下一次
		sAngle = eAngle;

		//加入所有项目文本以及百分比
		var text = $('<div class="text">');
		text.text(item[0]);
		var per = $('<div class="per">');
		per.text(item[1]*100+'%');
		text.append(per);

		//计算坐标
		var x= r + Math.cos(sAngle)*r;
		var y= r + Math.sin(sAngle)*r;

		//判断具体在圆的哪个位置，再确定text的位置
		if (x > w/2) {
			text.css('left', x/2);
		}else{
			text.css('right', (w-x)/2);
		}
		if (y> h/2) {
			text.css('top', y/2)
		} else{
			text.css('bottom', (h-y)/2);
		}
		text.css({'color':color,'opacity':0});

		component.append(text);
	};

	//加入一个蒙板层，蒙板作用在于展示动画效果。
	var cns = document.createElement('canvas');
	var ctx = cns.getContext('2d');
	cns.width = ctx.width = w;
	cns.height = ctx.height = h;
	$(cns).css('zIndex', '3');
	component.append(cns);

	ctx.fillStyle='#eee';
	ctx.strokeStyle='#eee';
	ctx.lineWidth= 1;

	//动画
	var act = function(per){
	//每次执行前先清除掉之前画好的蒙板
		ctx.clearRect(0,0,w,h);
		ctx.beginPath();
		ctx.moveTo(r,r);
		if(per <=0){
			ctx.arc(r,r,r,0,2*Math.PI); //当为0时，蒙板为一个圆
			component.find('.text').css('opacity',0);
		}else{
			//当per不为0时，蒙板层为sAngle+2*Math.PI*per这个饼图
			//这时的sAngle就是上面数据板的结束角度也就是3.5PI
			ctx.arc(r,r,r,sAngle,sAngle+2*Math.PI*per,true);
		}

		ctx.fill();
		ctx.stroke();

		if (per >=1) {
			//为了让文字的位移及时变化所以设置时间为0，如果设置为其他时间造成延迟会
			//引起后续代码出现循环非常多次，导致网页卡住
			component.find('.text').css('transition','all 0s');
			H5ComponentPie.reSort(component.find('.text'));//把有重叠的文本进行一下检查重排
			component.find('.text').css('transtion', 'all 1s');//重新设置动画时间，为opacity0》1的动画效果
			component.find('.text').css('opacity', 1);

			//由于逆时针画圆会有一些bug，比如在sAngle为1.5PI时，画
			//出来的圆是一条线；为2.5PI时会是一个整圆。因此增加一
			//个clearReact方法，用以消除这两种情况带来的差别。
			//虽然本例子在值为3.5PI时如同我们想要的那样
			ctx.clearRect(0,0,w,h)
		};
	}
	act(0);
	component.on('onLoad', function(){
		var s=0;
		for(i=0;i<100;i++){
			setTimeout(function(){
				s+= .01;
				act(s)
			},i*10+500)
		}
	})
	component.on('onLeave', function(){
		var s=1;
		for (var i = 0; i < 100; i++) {
			setTimeout(function(){
				s-=.01;
				act(s)
			},i*10)
		};
	})
	return component
}
H5ComponentPie.reSort=function(list){console.log("2")
	var compare =function(domA,domB){ //检查相交
		var offsetA= $(domA).offset(); //offset()方法可以返回一个元素的left和top值
		var offsetB= $(domB).offset();

		var areaA_x= [offsetA.left, $(domA).width() + offsetA.left];
		var areaA_y= [offsetA.top, $(domA).height() + offsetA.top];
		var areaB_x= [offsetB.left, $(domB).width() + offsetB.left];
		var areaB_y= [offsetB.top, $(domB).height() + offsetB.top];
		
		var intersect_x=(areaA_x[0] > areaB_x[0] && areaA_x[0] < areaB_x[1]) || (areaA_x[1] > areaB_x[0] && areaA_x[1] < areaB_x[1])
		var intersect_y=(areaA_y[0] > areaB_y[0] && areaA_y[0] < areaB_y[1]) || (areaA_y[1] > areaB_y[0] && areaA_y[1] < areaB_y[1])
		return intersect_x && intersect_y  //返回确认是否两者面积重叠
	}

	//重排
	var reset =function(domA,domB){
		if($(domA).css('top') != 'auto'){//当是依靠top值来确定位置时
			$(domA).css('top', parseInt($(domA).css('top')) + $(domB).height()/2);
		}
		if ($(domA).css('bottom')!= 'auto') {//当依靠bottom值来确定位置
			$(domA).css('bottom', parseInt($(domA).css('bottom')) + $(domB).height()/2);
		};
	}

	var willReset = [list[0]];
	var checked=[list[0]];
	$.each(list,function(index,target){
		if (checked[checked.length-1]!=target) {
			if (compare(checked[checked.length-1],target)) {
				reset(checked[checked.length-1],target);
				willReset.push(target)
			};
			checked.push(target);
		};
	});

	//做完第一遍位置调整，还需要再重新检查一下，因为紧挨着的
	//几个text排在最后的那个text可能会对下一个产生交错。
	//只有当willReset里面没有元素，才能百分比保证没有交错的
	//元素
	if (willReset.length>1) {
		H5ComponentPie.reSort(willReset)
	};
}
