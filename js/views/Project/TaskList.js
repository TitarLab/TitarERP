define(['mithril','titar','controllers/Project','controllers/Task','models/Project','models/Task'], function(n,t,ProjectController,TaskController,Project, Task){
    var ProjectTaskListView = {
        oninit: function(vnode){
  				ProjectController.init.current(vnode.attrs.id);
        },
				oncreate:function(vnode){
					//TaskController.render.test(vnode);
				},
        view : function(){
            return[
                m("div.uk-flex uk-flex-column uk-width-expand",[
                    m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
                        m("h3.uk-margin-remove",Project.current.name),
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
											m("ul.uk-flex uk-flex-row uk-list",{"uk-sortable":"handle: .uk-sortable-handle", "uk-height-viewport":"expand: true"},[
												[{}].map(function(){
													if(Project.current.caregoryList != null){
														return Project.current.caregoryList.map(function(category, categoryIndex){
															let size = 0;
															if(category.list != null){
																size = category.list.length;
																size = Object.keys(category.list).length
															}
															return m("li.uk-flex uk-flex-column uk-background-default t-border-right uk-margin-remove-top uk-visible-toggle",[
																m("div.uk-width-medium uk-padding-small  uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
																	m("div.uk-flex uk-flex-middle",[
																		m("ul.uk-hidden-hover uk-iconnav uk-padding-remove-left",[
																			m('li',[
																				m("span.uk-margin-small-right uk-sortable-handle",{"uk-icon":"icon:table"}),
																			])
																		]),
																		m("h3.uk-margin-remove", category.list_name),
																	]),
																	m('div.uk-flex uk-flex-middle',[
																		m("span.uk-badge#category-size-"+categoryIndex, size),
																		m("a",[
																			m("span.uk-margin-small-right",{"uk-icon":"icon:plus"}),
																		])
																	])

																]),
																	m("ul.uk-list uk-flex-stretch",{id:"category-"+categoryIndex,name:"category","data-list-id":categoryIndex,"uk-sortable":"group:tasks",style:"position: relative; min-height:20%;"},[

																	])
															])
														})
													}
												}),
												m("li.uk-flex uk-flex-stretch uk-background-default",{"uk-height-viewport":"expand: true"},[
													m("div.uk-width-medium uk-padding-small t-border-right",[
														m("div.uk-flex uk-flex-middle uk-margin-small-bottom",[
															m("a.uk-flex uk-flex-middle",[
																m("span.uk-margin-small-right",{"uk-icon":"icon:plus"}),
																m("h4.uk-margin-remove", "Новая колонка"),
															])
														]),
														m("div.uk-button-group",[
															m("input.uk-input",{placeholder:"Название",value:Task.status.new.name, oninput: m.withAttr("value",function(value){
																if(value.length >= 3){
																	TaskController.search.byName(value);
																	UIkit.dropdown(t.getById("input-dropdown")).show();
															}else{
																Task.status.searchList = [];
																UIkit.dropdown(t.getById("input-dropdown")).hide();
															}
															Task.status.new.name = value;
														})}),
															m("div#input-dropdown",{"uk-dropdown":"mode:none"},[
																m("ul.uk-nav uk-iconnav uk-dropdown-nav uk-padding-remove-left",[
																	Task.status.searchList.map(function(item){
																		return m("li",[
																			m("a",{onclick:function(){Task.status.new.name = item.name;}},item.name)
																		])
																	})
																])
															]),
															m("button.uk-button uk-button-primary",{onclick:function(){{ProjectController.addCategory();}}},"Добавить"),

														]),

													])
												]),

											])

                    ])
                ]),

            ]

        },
    }
    return ProjectTaskListView;

});
