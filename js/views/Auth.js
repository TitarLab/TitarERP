define(['mithril','titar','models/Auth','controllers/Auth'], function(n,t,Auth,AuthController){
	return {
        view: function(){
        return m("div",{class:"wrapper container"},[
            m("div",{class:"col-xs-12 auth-panel"},[
                m("div",{class:"col-xs-12 text-center"},[
                    m("img",{class:"img-responsive",src:t.global.logo}),
                    m("h4","Кошелёк - учёт финансов онлайн")
                ]),
                m("form",{onsubmit:function(){event.preventDefault();Auth.login();}},[
                    m("div",{class:"col-xs-12 text-center auth-panel-body"},[
                        m('div',{class:"auth-panel-body-inputs"},[
                            m("input#user",{required:true,class:"form-control",type:"text",placeholder:"Логин"}),
                            m("input#password",{required:true,class:"form-control",type:"password",placeholder:"Пароль"}),
                        ]),
                        m("div",{class:"auth-panel-body-inputs"},[
                            m("button",{class:"btn btn-default"},"Войти")
                        ])    
                    ])
                ])
                    
            ])
        ])
    }
}

});