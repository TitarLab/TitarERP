define(['mithril','controllers/Task','models/Task'], function(n,TaskController,Task){
    var TaskMyListView = {
        oninit: function(){

        },
        view : function(){
            return[
                m("div.uk-flex uk-flex-column uk-width-expand",[
                    m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
                        m("h2.uk-margin-remove","Мои задачи"),
                        m("div.uk-flex uk-flex-right",[
                            m("div.uk-button-group",[
                                m("div.uk-search uk-search-default",[
                                    m("span",{"uk-search-icon":""}),
                                    m("input.uk-search-input",{"type":"search", "placeholder":"Поиск..."})
                                ])
                            ])
                        ])

                    ]),
                    m("div.uk-flex uk-flex-row",{"uk-height-viewport":"expand: true"},[
                        m("div.uk-width-1-4 uk-padding-small",[
                            m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
                                m("h3.uk-margin-remove","Новые"),
                                m("span.uk-badge","2")
                            ]),
                            m("div",[
                                m("ul.uk-list",{"uk-sortable":"group: tasks"})
                            ])
                        ])
                    ])
                ]),

            ]

        },
    }
    return TaskMyListView;

});
