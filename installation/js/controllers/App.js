define(['mithril','titar','views/Layout','controllers/Installation','views/Installation'
], function(n, t, Layout, InstallationController, InstallationView){

    var App = {
        init:function(){

        },
        start:function(){
                App.init();
                App.normalStart();

        },
        normalStart:function(){
            m.mount(document.body,Layout);
            m.route(t.getById('content'), "/", {
                "/": InstallationView,
            });
        }
    }

    return App;
});
