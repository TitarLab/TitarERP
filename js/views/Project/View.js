define(['mithril','controllers/Project','models/Project'], function(n,ProjectController,Project){
    var ProjectView = {
        oninit: function(vnode){
            ProjectController.init.current(vnode.attrs.id);
        },
        view : function(){
            return [
							m("div.uk-flex uk-flex-column uk-width-expand",[
								m("div.uk-flex uk-flex-between uk-flex-middle uk-width-1-1 uk-padding-small t-border-bottom",[
									m("div.uk-flex",[
										m("h3.uk-margin-remove",Project.current.name),
									]),
									m("div.uk-flex uk-flex-right",[
										m("div.uk-button-group",[
											m("a.uk-button uk-button-primary",{href:"#!/project/view/"+Project.current.id+"/task/list"},"Задачи")
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
												m("ul.uk-iconnav",[

													[{}].map(function(){
														if(Project.current.tagList != null){
															return Project.current.tagList.map(function(tag){
																return m("li",[
																	m("span.uk-badge"),
																	m("span",tag.name)
																])
															})
														}
													})

												])
											])
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
