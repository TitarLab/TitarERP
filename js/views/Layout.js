define(['mithril','titar','views/Menu', 'views/Notification','views/Modal'], function(n,t,Menu,Notification,Modal){
    return {
        oncreate:function(){
            //state.notificationEl = getById("notification");
        },
        view: function(){
            return m("div.uk-flex uk-flex-column",[
                m("nav.uk-navbar-container uk-light",{"uk-navbar":""},[
                    m("div.uk-navbar-left uk-background-primary uk-width-expand",[
                        m("a.uk-navbar-item uk-logo",t.global.siteTitle),
                        m(Menu)
                    ]),
                    m("div.uk-navbar-right uk-background-primary",[
                        m("ul.uk-navbar-nav",[
                            m("li",[
                                m("span.uk-navbar-item",[
                                    m("span","Volodymyr Tytarenko"),
                                    m("span.uk-navbar-item",{"uk-icon":"icon:sign-out;"})
                                ])
                            ])
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row",{id:"content","uk-height-viewport":"expand: true"},[
                    
                ])
            ])
            
//            ,m("div#wrapper",{class:"wrapper"},[
//                m("div#leftmenu",{class:"col-xs-2 nav nav-left"},[
//                    m(Menu)
//                ]),
//                m("div#content",{class:"col-xs-10"}),
//                m("div",{class:"notification"},[
//                    m(Notification)
//                ]),
//                m("div",[
//                    m(Modal)
//                ])
//                
//            ] )
        }
    }
    
});