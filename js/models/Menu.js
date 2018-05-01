define(['mithril','titar','models/Auth'], function(n,t,Auth){

    var Menu = {

        pages:[
            {href:"#!/client/list",name:"Клиенты",onclick:function(){}},
            {href:"#!/employee/list",name:"Работники",onclick:function(){}},
            {href:"#!/project/list",name:"Проекты",onclick:function(){}},
            {href:"#!/task/my",name:"Мои задачи",onclick:function(){}},
        ],
    }

    return Menu;
});
