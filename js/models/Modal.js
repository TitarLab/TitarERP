define(['mithril','titar',], function(n,t){

    var Modal = {
        attribute:{
            
        },
        type:"",
        current:{},
        setAttribute:function(attribute){
            Modal.attribute = attribute;
        },
        show:function(){
            $('#modal').modal('show');
        },
        hide:function(){
            $('#modal').modal('hide');
        },
        accept:function(param){
            Modal.attribute.func(param);
            Modal.hide();
        },
    }

    return Modal;
});

