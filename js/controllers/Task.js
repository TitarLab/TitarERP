define(['mithril','titar','models/Task','models/Project'], function(n,t,Task,Project){
	var BreakException = {};
    var TaskController = {
			init:{
					default:function(){
							//TaskController.clearCurrent();
							TaskController.load.list();
							TaskController.load.statusList();
					},
					new:function(){
						TaskController.clearCurrent();
					},
					current:function(id){
						TaskController.init.default();
						//TaskController.load.current(id);
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
	                    method: "get",
	                    url:"../api/task/list",
	                    withCredentials:true,
											background:true
	                }).then(function(report){
	                    if(report.code == 200){
	                        Task.list = report.result;
													TaskController.render.category("task-list");
	                    }else{

	                    }
	                });
	            },
				// current:function(id){
				// 	m.request({
				// 			method: "POST",
				// 			url:"../api/api.php",
				// 			data:{model:"task",action:"getCurrent", id:id},
				// 			withCredentials:true,
				// 	}).then(function(report){
				// 			if(report.code == 200){
				// 					Task.current = report.result
				// 			}else{
				//
				// 			}
				// 	});
				// },
						statusList:() => {
							m.request({
									method: "get",
									url:"../api/task/status/list",
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
											Task.statusList = report.result;
									}else{

									}
							});
						}
					},
						add:function(){
							m.request({
									method: "POST",
									url:"../api/project/"+Project.current.id+"/task/add",
									data:Task.current,
									withCredentials:true,
							}).then(function(report){
									if(report.code == 200){
										try{
											Project.current.categoryList.forEach((item) => {
												if(item.id == report.result.categoryId){
													item.list[report.result.id] = report.result;
													throw BreakException;
												}
											})
										}catch(e){
											 if (e !== BreakException) throw e;
										}
										TaskController.init.new();
										UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
									}else{

									}
							});
						},
						save:function(){
							if(Project.current != null){
								m.request({
										method: "POST",
										url:"../api/project/"+Project.current.id+"/task/"+Task.current.id+"/save",
										data:Task.current,
										withCredentials:true,
								}).then(function(report){
										if(report.code == 200){
											UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
										}else if(report.code == "ERROR"){
											UIkit.notification(report.info,{status:'danger'});
										}
								});
							}

						},
						addMember:function(employee, addToTask = true){
								if(addToTask == false){
									Task.current.memberList[employee.id] = employee;
								}else{
									m.request({
											method: "POST",
											url:"../api/api.php",
											data:{model:"task",action:"addMember", id:Task.current.id, value:employee.id},
											withCredentials:true,
									}).then(function(report){
											if(report.code == 200){
												Task.current.memberList[employee.id] = employee;

											}else{

											}
									});
								}
						},
						removeMember:function(employeeId){
							if(employeeId != null){
								m.request({
										method: "POST",
										url:"../api/api.php",
										data:{model:"task",action:"removeMember", id:Task.current.id, value:employeeId},
										withCredentials:true,
								}).then(function(report){
										if(report.code == 200){
											delete Task.current.memberList[employeeId];
										}else{

										}
								});
							}
						},
						remove:function(id, catId = -1){
							if(id != null){
								m.request({
										method: "delete",
										url:"../api/project/"+Project.current.id+"/task/"+id+"/remove",
										withCredentials:true,
								}).then(function(report){
										if(report.code == 200){
											UIkit.notification("<span uk-icon='icon: check'></span>"+report.info,{status:'success'});
											if(catId >= 0){
												delete Project.current.categoryList[catId].list[id];
											}

										}else{

										}
								});
							}

						},
						search:{
							byName:function(value){
								m.request({
										method: "POST",
										url:"../api/api.php",
										data:{model:"task",action:"searchCategory", value:value},
										withCredentials:true,

								}).then(function(report){
										if(report.code == 200){
											Task.status.searchList = report.result;
										}else{

										}
								});
							},

						},
						setStatus:(taskId,statusId)=>{
							if(taskId != null && statusId != null){
								m.request({
									method: "POST",
									url:"../api/api.php",
									data:{model:"task",action:"setStatus",id:taskId, value:statusId},
									withCredentials:true,

								}).then(function(report){
									if(report.code == 200){

									}else{

									}
								});
							}
						},
						clearCurrent:function(){
							if(Task.current.memberList != null){
								Task.current.memberList = {};
							}
							Task.current.id = 0;
							Task.current.statusId = 1;
							Task.current.name = "";
						},
						render:{
							clear:function(id){
								m.render(t.getById(id),m("h1"),"test")
							},
							size:function(id){
								let size = 0;
								if(Task.list != null){
									//size = Task.list[id].list.length;
									size = Object.keys(Task.list[id].list).length
								}
								m.render(t.getById("category-size-"+id),m("span",size))
							},
							category:function(id,vnode){
								m.render(t.getById(id),Task.list.map(function(category, categoryIndex){
									let tasks = [];
									let size = 0;
									if(category.list != null){
										size = category.list.length;
										size = Object.keys(category.list).length
									}
									return m("div.uk-width-1-4 uk-padding-small",[
										m("div.div.uk-flex uk-flex-middle uk-flex-between uk-margin-small-bottom",[
											m("h3.uk-margin-remove", category.listName),
											m("span.uk-badge#category-size-"+categoryIndex)
										]),
											m("ul.uk-list",{id:"category-"+categoryIndex,name:"category","data-list-id":categoryIndex,"uk-sortable":"group:tasks",style:"position: relative; min-height:20%;"},[

											])
									])
								}));



								let tempe = document.getElementsByName("category");
								Task.categoryElems = [];
								for(let i = 0; i<tempe.length; i++){
									Task.categoryElems[i] = tempe[i];
								}
								TaskController.render.tasks();
								Task.categoryElems.forEach(function(category){
									category.addEventListener("added", TaskController.render.addedEvent);
									category.addEventListener("start", function(){Task.tempCategoryId = this.getAttribute("data-list-id")});
									//category.addEventListener("removed", TaskController.render.removedEvent);
								})
								document.getElementsByName("task").forEach(function(task){
									task.addEventListener("added", function(){alert("test");});
									//category.addEventListener("removed", TaskController.render.removedEvent);
								})
								Task.list.forEach(function(item){
										TaskController.render.size(item.id-1);
								});
							},
							tasks:function(){
								if(Task != null){
									Task.list.map(function(category,categoryIndex){
										m.render(t.getById("category-"+categoryIndex),Object.keys(Task.list[categoryIndex].list).map(function(key, taskIndex){
											let task = Task.list[categoryIndex].list[key]
											if(task != null){
												return m("li",{name:"task","data-list-id":categoryIndex,"data-id":task.id},[
													m("div.uk-card uk-card-default",[
														m("div.uk-card-body",[
															m("h4.uk-margin-remove",task.name),
															m("h5.uk-margin-remove",task.project),
															m("div.uk-flex uk-margin-small-top uk-flex-column",[
																m("div.uk-flex uk-flex-middle",[
																	m("span",{"uk-icon":"icon:clock"}),
																	m("span.uk-margin-small-left",task.deadline)
																]),
																m("div.uk-flex uk-flex-middle",[
																	m("span",{"uk-icon":"icon:star"})
																])
															])
														])
													])
												])
											}

										})
										);
									})
								}


							},
							addedEvent:function(){
								 let temp = document.getElementsByClassName("uk-sortable-drag")[0];
								 let temp2 = Task.list[Task.tempCategoryId].list[temp.getAttribute("data-id")];
								// console.log(Task.list);
								// //Task.list[this.getAttribute("data-list-id")].list.push(Task.list[temp.getAttribute("data-list-id")].list[temp.getAttribute("data-id")]);
								delete Task.list[Task.tempCategoryId].list[temp.getAttribute("data-id")];

							   Task.list[this.getAttribute("data-list-id")].list[temp.getAttribute("data-id")] = temp2;
								 TaskController.render.size(Task.tempCategoryId);
								 TaskController.render.size(this.getAttribute("data-list-id"));
								// document.body.removeChild(temp);
								console.log("Рендер");
								// TaskController.render.clear("task-list");
								// TaskController.render.category("task-list");
								console.log(Task.list);
							},
							test:function(vnode){
								console.log(vnode);
							},
							removedEvent:function(){
								let temp = document.getElementsByClassName("uk-sortable-drag")[0];
								//TaskController.render.tasks("task-list")
								console.log(Task.list);

							 }
						},
    }

    return TaskController;
});
