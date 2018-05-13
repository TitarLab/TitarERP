define(['mithril','titar'], function(n,t){
    return {
        oncreate:function(){
            //state.notificationEl = getById("notification");
        },
        view: function(){
            return m("div.uk-flex uk-flex-column",[
                m("nav.uk-navbar-container uk-light",{"uk-navbar":""},[
                    m("div.uk-navbar-left uk-background-primary uk-width-expand",[
                        m("a.uk-navbar-item uk-navbar-center  uk-logo",t.global.siteTitle),
                    ]),
                ]),
                m("div",{id:"content"},[

                ]),
            ])
        }
    }

});
