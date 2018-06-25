define(['mithril','titar','controllers/Project','models/Project','controllers/Client','models/Client'], function(n,t,ProjectController,Project,ClientController,Client){
    var EmployeeNewView = {
        oninit: function(){
			ClientController.init.default();
            ProjectController.init.new();
        },
        view : function(){
            return m("div.uk-width-expand uk-padding-small",[
                m("div.uk-margin-small-left uk-margin-small-bottom uk-margin-small-top uk-margin-small-right uk-flex uk-flex-row uk-flex-middle uk-flex-between",[
                    m("div",[
                        m("h3",t.localisation.dictionary.PROJECT_NEW)
                    ]),
                    m("div",[
                        m("div.uk-button-group",[
                            m("button.uk-button uk-button-primary",{onclick:function(){ProjectController.add();}},t.localisation.dictionary.ADD)
                        ])
                    ])
                ]),
                m("div.uk-flex uk-flex-row uk-flex-top",[
									m("div.uk-card uk-card-default uk-width-1-1",[
										m("div.uk-card-header",[
											m("h3",t.localisation.dictionary.PROJECT)
										]),
										m("div.uk-card-body",[
											m("div.uk-form-stacked",[
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.TITUL),
													m("input.uk-input",{placeholder:t.localisation.dictionary.TITUL, oninput: m.withAttr("value",function(value){Project.current.name = value;}),value:Project.current.name})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.SITE),
													m("input.uk-input",{placeholder:t.localisation.dictionary.SITE, oninput: m.withAttr("value",function(value){Project.current.url = value;}),value:Project.current.url})
												]),
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.CLIENT),
													m("select.uk-select",{oninput: m.withAttr("value",function(value){Project.current.clientId = value;})},[
														m("option",{value:"0"},t.localisation.dictionary.NONE),
														[{}].map(function(){
															if(Client.list != null){
																return Client.list.map(function(item){
																	return m("option",{value:item.id,},item.firstname + " " + item.lastname)
																})
															}
														})
													])
												]),
												m("div.uk-margin",[
													m("label.uk-form-label",t.localisation.dictionary.TAGS),
													m("div.uk-button-group",[
														m("input.uk-input",{placeholder:t.localisation.dictionary.TITUL,value:Project.tag.new.name, oninput: m.withAttr("value",function(value){
															if(value.length >= 3){
																ProjectController.search.tag.byName(value);
																UIkit.dropdown(t.getById("input-dropdown")).show();
															}else{
																Project.tag.searchList = [];
																UIkit.dropdown(t.getById("input-dropdown")).hide();
															}
														Project.tag.new.name = value;
													})}),
														m("div#input-dropdown",{"uk-dropdown":"mode:none"},[
															m("ul.uk-nav uk-iconnav uk-dropdown-nav uk-padding-remove-left",[
																Project.tag.searchList.map(function(item){
																	return m("li",[
																		m("a",{onclick:function(){Project.tag.new.name = item.name;}},item.name)
																	])
																})
															])
														]),
														m("button.uk-button uk-button-primary",{onclick:function(){{ProjectController.addTag(false);}}},t.localisation.dictionary.ADD),
													]),
													m('ul.uk-list',[
														Object.keys(Project.current.tagList).map((tag) => {
															return m("li", [
																m("span",Project.current.tagList[tag].name),
																m("span.uk-link",{"uk-icon":"icon:close", onclick:() => {delete Project.current.tagList[tag]}})
															])
														})
													])
												])
											])
										])
									]),
                ])
            ]);
        },
    }
    return EmployeeNewView;

});
