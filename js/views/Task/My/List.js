define(['mithril','controllers/Task','models/Task'], function(n,TaskController,Task){
    var TaskMyListView = {
				start: 0,
        oninit: function(){
            TaskController.init.default();

        },
				oncreate:function(vnode){
					TaskController.render.test(vnode);
				},
        view : function(){
            return[
                m("div.uk-flex uk-flex-column uk-width-expand",[
                    m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
                        m("h3.uk-margin-remove","Мои задачи"),
                        m("div.uk-flex uk-flex-right",[
                            m("div.uk-button-group",[
                                m("div.uk-search uk-search-default",[
                                    m("span",{"uk-search-icon":""}),
                                    m("input.uk-search-input",{"type":"search", "placeholder":"Поиск..."})
                                ])
                            ])
                        ])

                    ]),

                    m("div.uk-flex uk-flex-row#task-list",{"uk-height-viewport":"expand: true"},[
                    ])
                ]),

            ]

        },
    }
    return TaskMyListView;

});
