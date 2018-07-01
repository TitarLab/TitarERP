define(['mithril','titar','controllers/Task','models/Project','models/Task'], function(n,t,TaskController,Project,Task){

    var ProjectController = {
        init:{
            default:function(){
							ProjectController.clearCurrent();
              ProjectController.load.list();
			  TaskController.load.statusList();
            },
						new:function(){
							ProjectController.init.default();
							ProjectController.load.nextId();
						},
						current:function(id){
							ProjectController.init.default();
							ProjectController.load.current(id);
							Project.list.forEach(function(item){
								if(item.id == id){
									Project.current = item;
								}
							})


						}
        },
        load:{
            list:function(){
                m.request({
                    method: "get",
                    url:"../api/project/list",
                    withCredentials:true,
                }).then(function(report){
                    if(report.code == 200){
                        Project.list = report.result;
                    }else{

                    }
                });
            },
						current:function(id){
							m.request({
									method: "get",
									url:"../api/project/"+id,
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Project.current = report.result
									}else{

									}
							});
						},
						nextId:function(){
							m.request({
									method: "get",
									url:"../api/project/next/id",
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Project.current.id = report.result;
									}else{

									}
							});
						}
        },
				add:function(){
					m.request({
							method: "POST",
							url:"../api/project/add",
							data:Project.current,
							withCredentials:true,
					}).then(function(report){
							if(report.code == 200){
								m.route.set('/project/list/')
								UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
							}else if(report.code == "ERROR"){
								UIkit.notification(report.info,{status:'danger'});
							}
					});
				},
				save:function(){
					if(Project.current != null){
						m.request({
								method: "POST",
								url:"../api/project/"+Project.current.id+"/save",
								data:Project.current,
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									m.route.set('/project/view/'+Project.current.id)
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else if(report.code == "ERROR"){
									UIkit.notification(report.info,{status:'danger'});
								}
						});
					}

				},
				removeTag:function(id){
					if(id != null){
						m.request({
								method: "delete",
								url:"../api/project/"+Project.current.id+"/tag/"+id+"/remove",
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									delete Project.current.tagList[id];
								}else{

								}
						});
					}
				},
				removeCategory:function(id, index = -1){
					if(id != null){
						m.request({
								method: "delete",
								url:"../api/project/"+Project.current.id+"/category/"+id+"/remove",
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									if(index >= 0){
										Project.current.categoryList.splice(index,1);
									}
								}else{

								}
						});
					}
				},
				remove:function(id){
					if(id != null){
						m.request({
								method: "delete",
								url:"../api/project/"+id+"/remove",
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else{

								}
						});
					}

				},
				clearCurrent:function(){
					Object.keys(Project.current).forEach(function(item){
						Project.current[item] = null;
						if(item == "tagList"){
							Project.current[item] = {}
						}
					});
				},
				addCategory:function(){
					if(Project.current.id != null && Task.status.new.name != null && Task.status.new.name != ""){
						m.request({
								method: "POST",
								url:"../api/project/"+Project.current.id+"/category/add",
								data:{name:Task.status.new.name},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									Project.current.categoryList = Project.current.categoryList.concat(report.result);
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else if(report.code == "EXIST"){
									UIkit.notification(report.info,{status:'warning'});
								}else{

								}
						});
					}
				},
				addTag:function(addToProject = true){
					if(Project.current.id != null && Project.tag.new.name != null && Project.tag.new.name != ""){
						m.request({
								method: "POST",
								url:"../api/project/"+Project.current.id+"/tag/add",
								data:{name:Project.tag.new.name, addToProject: addToProject},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									if(addToProject == true){
										Project.current.tagList[report.result.projectTagId] = {id:report.result.id, name:report.result.name}
									}else{
										Project.current.tagList[report.result.id] = {id:report.result.id, name:report.result.name}
									}
								}else if(report.code == "EXIST"){
									UIkit.notification(report.info,{status:'warning'});
								}else{

								}
						});
					}
				},
				search:{
					tag:{
						byName:function(value){
							m.request({
								method: "POST",
								url:"../api/tag/search",
								data:{value:value},
								withCredentials:true,

							}).then(function(report){
								if(report.code == 200){
									Project.tag.searchList = report.result;
								}else{

								}
							});
						},
					}

				},

    }

    return ProjectController;
});
