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
                    method: "POST",
                    url:"../api/api.php",
                    data:{model:"project",action:"get"},
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
									method: "POST",
									url:"../api/api.php",
									data:{model:"project",action:"getCurrent", id:id},
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
									method: "POST",
									url:"../api/api.php",
									data:{model:"project",action:"getNextId"},
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
							url:"../api/api.php",
							data:{model:"project",action:"add", project:Project.current},
							withCredentials:true,
					}).then(function(report){
							if(report.code == 200){
								m.route.set('/project/list/')
								UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
							}else{

							}
					});
				},
				save:function(){
					if(Project.current != null){
						m.request({
								method: "POST",
								url:"../api/api.php",
								data:{model:"project",action:"save", project:Project.current},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									m.route.set('/project/view/'+Project.current.id)
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else{

								}
						});
					}

				},
				removeTag:function(id){
					if(id != null){
						m.request({
								method: "POST",
								url:"../api/api.php",
								data:{model:"project",action:"removeTag", id:id},
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
								method: "POST",
								url:"../api/api.php",
								data:{model:"project",action:"removeCategory", id:id, projectId: Project.current.id},
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
								method: "POST",
								url:"../api/api.php",
								data:{model:"project",action:"remove", id:id},
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
								url:"../api/api.php",
								data:{model:"project",action:"addCategory", id:Project.current.id, value:Task.status.new.name},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									Project.current.categoryList = Project.current.categoryList.concat(report.result);
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
								}else{

								}
						});
					}
				},
				addTag:function(addToProject = true){
					if(Project.current.id != null && Project.tag.new.name != null && Project.tag.new.name != ""){
						m.request({
								method: "POST",
								url:"../api/api.php",
								data:{model:"project",action:"addTag", id:Project.current.id, value:Project.tag.new.name, addToProject: addToProject},
								withCredentials:true,
						}).then(function(report){
								if(report.code == 200){
									if(addToProject == true){
										Project.current.tagList[report.result.projectTagId] = {id:report.result.id, name:report.result.name}
									}else{
										Project.current.tagList[report.result.id] = {id:report.result.id, name:report.result.name}
									}
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
								url:"../api/api.php",
								data:{model:"project",action:"searchTag", value:value},
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
