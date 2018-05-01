define(['mithril','titar','models/Task'], function(n,t,Task){

    var TaskController = {
			init:{
					default:function(){
							//TaskController.clearCurrent();
							TaskController.load.list();
					},
					new:function(){
						TaskController.init.default();
						TaskController.load.nextId();
					},
					current:function(id){
						TaskController.init.default();
						TaskController.load.current(id);
						Task.list.forEach(function(item){
							if(item.id == id){
								Task.current = item;
							}
						})


					}
			},
				load:{
            list:function(){
                m.request({
                    method: "POST",
                    url:"../api/api.php",
                    data:{model:"task",action:"get"},
                    withCredentials:true,
                }).then(function(report){
                    if(report.code == 200){
                        Task.list = report.result;
                    }else{

                    }
                });
            },
						current:function(id){
							m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"task",action:"getCurrent", id:id},
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Task.current = report.result
									}else{

									}
							});
						},
						nextId:function(){
							m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"task",action:"getNextId"},
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Task.current.id = report.result;
									}else{

									}
							});
						},
						add:function(){
							m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"task",action:"add", task:Task.current},
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
										data:{model:"task",action:"save", task:Task.current},
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
										data:{model:"task",action:"remove", id:id},
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
							Object.keys(Task.current).forEach(function(item){
								Task.current[item] = null;
							});
						}
        },
    }

    return TaskController;
});
