define(['mithril','titar','controllers/Project','controllers/Task','controllers/Employee','models/Project','models/Task', 'models/Employee'], function(n,t,ProjectController,TaskController,EmployeeController,Project, Task,Employee){

    var ProjectModalNewTaskView = {
        oninit: function(vnode){
			TaskController.init.new();
			Task.current.statusId = 1;
        },
				oncreate:function(vnode){
					//TaskController.render.test(vnode);
				},
        view : function(){
            return[
                m("div.uk-modal-dialog uk-modal-body",[
									m("button.uk-modal-close-outside",{"uk-close":""}),
									m("div.uk-form-stacked",{"uk-margin":""},[
										m("h4",t.localisation.dictionary.TASK_NEW),
										m("div.uk-margin",[
											m("label.uk-form-label",t.localisation.dictionary.TITUL),
											m("input.uk-input",{placeholder:t.localisation.dictionary.TITUL,oninput: m.withAttr("value",function(value){Task.current.name = value;})})
										]),
										m("div.uk-margin",[
											m("label.uk-form-label",t.localisation.dictionary.EMPLOYEE_ATTACH),
											m("div.uk-button-group",[
												m("input.uk-input",{placeholder:t.localisation.dictionary.EMPLOYEE, oninput: m.withAttr("value",function(value){
													if(value.length >= 3){
														EmployeeController.search(value);
														UIkit.dropdown(t.getById("new-member-dropdown")).show();
													}else{
														Employee.searchList = [];
														UIkit.dropdown(t.getById("new-member-dropdown")).hide();
													}
											})}),
												m("div#new-member-dropdown",{"uk-dropdown":"mode:none"},[
													m("ul.uk-nav uk-iconnav uk-dropdown-nav uk-padding-remove-left",[
														Employee.searchList.map(function(item){
															return m("li",[
																m("a",{onclick:function(){TaskController.addMember(item,false);}},item.firstname + " " + item.lastname)
															])
														})
													])
												]),
											]),
											m('ul.uk-list',[
												Object.keys(Task.current.memberList).map((id) => {
													return m("li", [
														m("span",Task.current.memberList[id].firstname + " " + Task.current.memberList[id].lastname),
														m("span.uk-link",{"uk-icon":"icon:close", onclick:() => {delete Task.current.memberList[id]}})
													])
												})
											])
										]),
										m("div.uk-margin",[
											m("label.uk-form-label",t.localisation.dictionary.STATUS),
											m("select.uk-select",{oninput: m.withAttr("value",function(value){Task.current.statusId = value;})},[
												m("option",{value:"1",selected:true},"Новая"),
												m("option",{value:"2"},"В процессе"),
												m("option",{value:"3"},"Тестирование"),
												m("option",{value:"4"},"Готово"),
											]),
										]),
										// m("div",[
										// 	m("label.uk-form-label","Приоритет"),
										// 	m("select.uk-select",{oninput: m.withAttr("value",function(value){Task.current.priority = value;})},[
										// 		m("option","Высокий"),
										// 		m("option",{selected:true},"Нормальный"),
										// 		m("option","Низкий"),
										// 	])
										// ]),
										m("div.uk-margin",[
											m("button.uk-button uk-button-primary uk-modal-close",{onclick:function(){TaskController.add()}},t.localisation.dictionary.ADD)
										]),
									])
								])
            ]

        },
    }
    return ProjectModalNewTaskView;

});
