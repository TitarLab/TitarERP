define(['mithril','titar','controllers/Project','models/Project','controllers/Client','models/Client'], function(n,t,ProjectController,Project,ClientController,Client){
    var ProjectView = {
        oninit: function(vnode){
			ClientController.init.default();
            ProjectController.init.current(vnode.attrs.id);
			//alert(JSON.stringify(t.localisation));
        },
        view : function(){
            return [
							m("div.uk-flex uk-flex-column uk-width-expand",[
								m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
									m("div.uk-flex",[
										m("input.uk-input",{value:Project.current.name, oninput: m.withAttr("value",function(value){Project.current.name = value;})}),

									]),
									m("div.uk-flex uk-flex-right",[
										m("div.uk-button-group",[
											m("a.uk-button uk-button-default",{href:"#!/project/view/"+Project.current.id},t.localisation.dictionary.BACK),
											m("button.uk-button uk-button-primary",{onclick:()=>{ProjectController.save();}},t.localisation.dictionary.SAVE)
										])
									])
								]),
								m("div.uk-flex uk-flex-row",{"uk-height-viewport":"expand: true"},[
									m("div.uk-width-1-6 t-border-right",[
										m("div.uk-flex uk-flex-column uk-padding-small", {"uk-margin":"margin:uk-margin-small-top"},[
											m("div.uk-flex uk-flex-middle uk-flex-center",[
												[{}].map(function(){
													let tempStyle;
													if(Project.current.photo != null){
														tempStyle = "background-image:url("+Project.current.photo+"); background-size:cover; background-position:center";
													}
													return m("div.uk-background-muted uk-inline uk-border-rounded uk-flex uk-flex-center uk-flex-middle",{style:"width:100%; padding-top: 100%;" + tempStyle},[
														[{}].map(function(){
															if((Project.current.photo == null || Project.current.photo.length == 0 )&& Project.current.name != null){
																return m("span.uk-overlay uk-position-center",{style:"font-size:64px"},Project.current.name.substr(0,2).toUpperCase())
															}
														})
													])
												}),
											]),
											m("div",[
												m("ul.uk-list",[
													m("label.uk-form-label","TAGS"),
													m("div",[
														m("button.uk-button uk-button-primary uk-width-1-1",{onclick:function(){{ProjectController.addTag();}}},"Добавить"),
														m("input.uk-input uk-width-1-1",{placeholder:"Название",value:Project.tag.new.name, oninput: m.withAttr("value",function(value){
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
													]),
													[{}].map(function(){
														if(Project.current.tagList != null){
															return Object.keys(Project.current.tagList).map(function(tag){
																return m("li",[
																	m("span.uk-badge"),
																	m("span",Project.current.tagList[tag].name),
																	m("span.uk-link",{"uk-icon":"icon:close", onclick:() => {ProjectController.removeTag(tag)}})
																])
															})
														}
													})

												])
											]),
											m("div",[
												m("ul.uk-list",[
													m("li",[
														m("div.uk-form-stacked",[
															m("div.uk-margin",[
																m("label.uk-form-label",t.localisation.dictionary.CLIENT),
																m("select.uk-select",{oninput: m.withAttr("value",function(value){Project.current.clientId = value;})},[
																	m("option",{value:0},"Отсутствует"),
																	[{}].map(() => {
																		if(Client.list != null){
																			return Client.list.map((item) => {
																				let selected = false;
																				if(item.id == Project.current.clientId){
																					selected = true;
																				}
																				return m("option",{value:item.id, selected:selected},item.firstname + " " + item.lastname);
																			})
																		}

																	})
																])
															]),
														]),
													]),
												])
											]),
											m("div",[
												m("ul.uk-list",[
													m("li",[
														m("div.uk-form-stacked",[
															m("div.uk-margin",[
																m("label.uk-form-label",t.localisation.dictionary.SITE),
																m("input.uk-input",{placeholder:t.localisation.dictionary.SITE, oninput: m.withAttr("value",function(value){Project.current.url = value;}),value:Project.current.url})
															]),
														]),
													]),
												])

											]),
										])
									]),
									m("div.uk-width-expand",[
										m("div.uk-flex uk-flex-column uk-padding-small",{"uk-margin":""},[
											m("div.uk-flex uk-flex-column")
										])
									])
								])
							]),
						]
  			},
    }
    return ProjectView;

});
