function H5ComponentRing(name, cfg){
    cfg.type = 'pie';//改变type，用pie组件初始化
    var component = new H5ComponentPie(name, cfg);
    var mask = $('<div class="mask">');//添加饼图中间的遮罩使其看起来像环图
    component.addClass('h5_component_ring');
    component.append(mask);
    var text = component.find('.text');
    text.attr('style','');//清空饼图对于style的定义，使其通过css属性实现居中
    if(cfg.data[0][2]){
        text.css('color', cfg.data[0][2]);
    }
    mask.append(text);
    return component;
}