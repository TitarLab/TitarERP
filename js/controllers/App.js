define(['mithril','titar','controllers/Auth','views/Layout','views/TransactionList','views/Client/List','views/Client/New'], function(n, t, AuthController, Layout, TransactionList, ClientList, ClientNew){

    var App = {
        init:function(){

        },
        start:function(){
            //if(AuthController.checkStatus() == false){
                //m.mount(document.body,AuthController.getView());
            //}else{
                App.init();
                App.normalStart();
                //test();
           // }
        },
        normalStart:function(){
            m.mount(document.body,Layout);
            m.route(t.getById('content'), "/client/list", {
                "/client/list": ClientList,
                "/client/new": ClientNew,
            });
        }
    }

    return App;
});
