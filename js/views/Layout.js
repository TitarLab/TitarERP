define(['mithril','titar','views/Menu', 'views/Notification','views/Modal'], function(n,t,Menu,Notification,Modal){
    return {
        oncreate:function(){
            //state.notificationEl = getById("notification");
        },
        view: function(){
            return m("div.uk-flex uk-flex-column",[
                m("nav.uk-navbar-container uk-light",{"uk-navbar":""},[
                    m("div.uk-navbar-left uk-background-primary uk-width-expand",[
											m("span.uk-navbar-item uk-link",{"uk-icon":"icon:grid"}),
											m("div.uk-width-medium",{"uk-dropdown":"mode: click"},[
												m("div",{"uk-grid":""},[
													m("div",[
														m("ul.uk-nav uk-dropdown-nav uk-flex uk-flex-row uk-flex-wrap",[
															m("li.uk-margin-small-right",[
																m("a",{href:"#!/project/list"},[
																	m("div.uk-flex uk-flex-column uk-flex-center uk-flex-middle",[
																		m("img",{src:"../img/icons/menu/project.svg", width:64, height:64, "uk-svg":""}),
																		m("span","Проекты")
																	])
																])
															]),
															m("li.uk-margin-small-right",[
																m("a",{href:"#!/task/my"},[
																	m("div.uk-flex uk-flex-column uk-flex-center uk-flex-middle",[
																		m("img",{src:"../img/icons/menu/checklist.svg", width:64, height:64, "uk-svg":""}),
																		m("span","Мои задачи")
																	])
																])
															]),
															m("li.uk-margin-small-right",[
																m("a",{href:"#!/task/my"},[
																	m("div.uk-flex uk-flex-column uk-flex-center uk-flex-middle",[
																		m("img",{src:"../img/icons/menu/checklist.svg", width:64, height:64, "uk-svg":""}),
																		m("span","Мои задачи")
																	])
																])
															]),
														])
													])
												])
											]),
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
                m("div.uk-flex uk-flex-row",{id:"content"},[

                ]),
								m(Modal)
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
