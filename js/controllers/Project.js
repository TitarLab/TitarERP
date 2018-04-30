define(['mithril','titar','models/Project','libs/sortable'], function(n,t,Project,Sortable){

    var ProjectController = {
        init:{
            default:function(){
							ProjectController.clearCurrent();
                ProjectController.load.list();
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
									UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
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
					});
				}
    }

    return ProjectController;
});
