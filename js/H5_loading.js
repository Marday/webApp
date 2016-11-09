var H5_loading = function  (images,firstPage) {
        var id = 'h5';
        if(this._images === undefined ){ //  第一次进入

            this._images = ( images || [] ).length;
            this._loaded = 0 ;


            window[id] = this;      //   把当前对象存储在全局对象 window 中，用来进行某个图片加载完成之后的回调


            for(s in images){
                var item = images[s];
                var img = new Image;
                //每次图片加载完就再调用一次loader函数
                img.onload = function(){
                     //之前没把参数传进loader方法里，导致
                     //firstPage参数没法用到后面的if判断
                    window[id].loader(images,firstPage);
                }
                img.src = item;
            }

            $('#rate').text('0%');
            return this;

        }else{
            this._loaded ++ ;
            $('#rate').text(  ( ( this._loaded / this._images  *100) >> 0 ) + '%' );

            //如果this._images大于this.loaded就return出去，
            //小于的话就执行函数后面的代码，这样加载到最后
            //一张图片时，就可以执行之后的代码。
            if(this._loaded < this._images){
                return this;
            }
        }

        window[id] = null;


        this.el.fullpage({
            onLeave:function( index, nextIndex, direction) {
                $(this).find('.h5_component').trigger('onLeave');
            },
            afterLoad:function( anchorLink, index ) {
                $(this).find('.h5_component').trigger('onLoad');
            }
        });

        //调用第一个页面的组件onload，因为刷新页面显示的是第一个页面
        this.page[0].find('.h5_component').trigger('onLoad');

        //页面一开始是隐藏的，手动显示。调用show方法
        this.el.show();
        if(firstPage){
            $.fn.fullpage.moveTo( firstPage );
        }
}
