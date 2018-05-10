define(['mithril','titar','controllers/Project','controllers/Task','models/Project','models/Task'], function(n,t,ProjectController,TaskController,Project, Task){
    var ProjectModalNewTaskView = {
        oninit: function(vnode){
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
										m("h4","Новая задача"),
										m("div",[
											m("label.uk-form-label","Название"),
											m("input.uk-input",{placeholder:"Название",oninput: m.withAttr("value",function(value){Task.current.name = value;})})
										]),
										m("div",[
											m("label.uk-form-label","Статус"),
											m("select.uk-select",{oninput: m.withAttr("value",function(value){Task.current.statusId = value;})},[
												m("option",{value:"1",selected:true},"Новая"),
												m("option",{value:"2"},"В процессе"),
												m("option",{value:"3"},"Тестирование"),
												m("option",{value:"4"},"Готово"),
											]),
										]),
										m("div",[
											m("label.uk-form-label","Приоритет"),
											m("select.uk-select",{oninput: m.withAttr("value",function(value){Task.current.priority = value;})},[
												m("option","Высокий"),
												m("option",{selected:true},"Нормальный"),
												m("option","Низкий"),
											])
										]),
										m("div",[
											m("button.uk-button uk-button-primary",{onclick:function(){TaskController.add()}},"Добавить")
										]),
									])
								])
            ]

        },
    }
    return ProjectModalNewTaskView;

});
