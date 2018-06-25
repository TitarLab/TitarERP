define(['mithril','titar','controllers/Project','controllers/Task','controllers/Modal','models/Project','models/Task'], function(n,t,ProjectController,TaskController,ModalController,Project, Task){
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
                    m("div.uk-flex uk-flex-row",{style:"overflow-x: auto; overflow-y: hidden;","uk-height-viewport":"expand: true"},[
											m("ul.uk-flex uk-flex-row uk-list",{"uk-sortable":"handle: .uk-sortable-handle", "uk-height-viewport":"expand: true"},[
												[{}].map(function(){
													if(Project.current.categoryList != null){
														return Project.current.categoryList.map(function(category, categoryIndex){
															let size = 0;
															if(category.list != null){
																size = category.list.length;
																size = Object.keys(category.list).length
															}
															return m("li.uk-width-medium uk-padding-small uk-flex uk-flex-column uk-background-default  uk-margin-remove-top uk-visible-toggle",[
																m("div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
																	m("div.uk-flex uk-flex-middle",[
																		m("h3.uk-margin-remove uk-sortable-handle", category.name),
																		m("span.uk-link",{"uk-icon":"icon: more-vertical"}),
																		m("div.uk-width-medium",{"uk-dropdown":"mode: click"},[
																			m("div",[
																				m("div",[
																					m("ul.uk-nav uk-dropdown-nav uk-padding-remove-left",[
																						m("li.uk-margin-small-bottom"),
																						m("li",[
																							m("a",{onclick:()=>{ProjectController.removeCategory(category.id, categoryIndex)}},"Удалить"),
																						]),
																						// m("li",[
																						// 	m("a",{href:"#"},"Закрыть"),
																						// ]),
																					])
																				])
																			])
																		]),



																	]),
																	m('div.uk-flex uk-flex-middle',[

																		m("a",[
																			m("span",{"uk-icon":"icon:plus","uk-toggle":"target: #modal", onclick:function(){ModalController.setType("newTask");Task.current.categoryId = category.id}}),
																		])
																	])

																]),
																m("div.uk-flex uk-flex-right uk-flex-middle",[
																	m("span.uk-badge#category-size-"+categoryIndex, size),
																]),
																m("ul.uk-list uk-flex-stretch uk-padding-remove-left",{id:"category-"+categoryIndex,name:"category","data-list-id":categoryIndex,"uk-sortable":"",style:"position: relative; min-height:20%;"},[
																	[{}].map(function(){
																		if(category.list != null){
																			return Object.keys(category.list).map(function(key, taskIndex){
																				let task = category.list[key]
																				if(task != null){
																					return m("li",{name:"task","data-list-id":categoryIndex,"data-id":task.id},[
																						m("div.uk-card uk-card-default",[
																							m("div.uk-card-body",[
																								m("div.uk-flex uk-flex-middle uk-flex-between",[
																									m("h4.uk-margin-remove",task.name),
																									m("span.uk-link",{"uk-icon":"icon: more-vertical"}),
																									m("div.uk-width-medium",{"uk-dropdown":"mode: click"},[
																										m("div",[
																											m("div",[
																												m("ul.uk-nav uk-dropdown-nav uk-padding-remove-left",[
																													m("li",[
																														m("a","Подробнее"),
																													]),
																													m("li",[
																														m("a",{"uk-toggle":"target: #modal",onclick:()=>{Task.current = task;ModalController.setType("editTask");}},"Редактировать"),
																													]),
																													m("li.uk-width-1-1",[
																														m("a",[
																															m("div.uk-width-1-1 uk-flex uk-flex-between",[
																																m("span","Изменить статус"),
																																m("span",{"uk-icon":"icon:triangle-right"})
																															])
																														]),
																														m("div",{"uk-dropdown":"pos: right-center; offset: 0"},[
																															m("ul.uk-nav uk-dropdown-nav uk-padding-remove-left",[
																																[{}].map(() =>{
																																	if(Task.statusList != null){
																																		return Task.statusList.map((item) => {
																																			let actived = "";
																																			if(task.status == item.name){
																																				actived = "uk-active"
																																			}
																																			return m("li"+actived,{class:actived},[
																																				m("a",{onclick:()=>{TaskController.setStatus(task.id,item.id);task.status = item.name;}},item.name)
																																			])
																																		})
																																	}
																																})
																															])
																														])
																													]),
																													m("li.uk-margin-small-bottom"),
																													m("li",[
																														m("a",{onclick:()=>{TaskController.remove(task.id, categoryIndex)}},"Удалить"),
																													]),
																													// m("li",[
																													// 	m("a",{href:"#"},"Закрыть"),
																													// ]),
																												])
																											])
																										])
																									]),
																								]),
																								// m("h5.uk-margin-remove",task.project),
																								m("div.uk-flex uk-margin-small-top uk-flex-column",[
																									// m("div.uk-flex uk-flex-middle",[
																									// 	m("span",{"uk-icon":"icon:clock"}),
																									// 	m("span.uk-margin-small-left",task.deadline),
																									// ]),
																									// m("div.uk-flex uk-flex-middle",[
																									// 	m("span",{"uk-icon":"icon:star"}),
																									// 	m("span.uk-badge uk-margin-left"),
																									// 	m("span.uk-margin-left",task.status)
																									// ]),
																									m("div.uk-flex uk-flex-middle",[
																										[{}].map(()=>{
																											if(task.memberList != null){
																												return Object.keys(task.memberList).map((id) => {
																													let employee = task.memberList[id];
																													return m("div",{style:"width:25px;height:25px; background:black; border-radius:100%; background-image:url("+employee.photo+"); background-size:cover"})
																												})
																											}
																										})
																									]),
																								])
																							])
																						])
																					])
																				}

																			})
																		}
																	})
																])
															])
														})
													}
												}),
												m("li.uk-flex uk-flex-stretch uk-background-default uk-margin-remove-top",{"uk-height-viewport":"expand: true"},[
													m("div.uk-width-medium uk-padding-small  ",[
														m("div.uk-flex uk-flex-middle uk-margin-small-bottom",[
															m("a.uk-flex uk-flex-middle",[
																// m("span.uk-margin-small-right",{"uk-icon":"icon:plus"}),
																m("h3.uk-margin-remove", "Новая колонка"),
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
