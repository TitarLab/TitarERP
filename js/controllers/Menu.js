define(['mithril','titar','models/Menu','views/Menu'], function(n,t,Menu,MenuView){

    var MenuController = {
        checkStatus:function(){
            Auth.checkStatus();
        },
        setTitle:function(title){
            document.title = title;
        }
    }

    return MenuController;
});

