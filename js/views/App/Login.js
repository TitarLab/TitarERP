define(['mithril','titar','controllers/Auth','models/Auth'], function(n,t,AuthController,Auth){
    var LoginView = {
        oninit: function(vnode){

		},
        view : function(){
            return [
				m("div.uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-background-muted uk-background-cover",{"uk-height-viewport":"expand: true"},[
					m("img.uk-margin-medium-bottom",{src:"../img/logo.png", width:"128", height:"128"}),
					m("div",[
						m("span","login: demo"),
					]),
					m("div",[
						m("span","password: demodemo"),
					]),
					m("form.uk-width-large uk-card uk-card-default uk-form-stacked",{onsubmit:() => {event.preventDefault();AuthController.login()}},[
						m("div.uk-card-body",[
							m("div.uk-margin",[
								m("div.uk-form-controls",[
									m("input.uk-input",{type:"test",placeholder:t.localisation.dictionary.LOGIN, oninput: m.withAttr("value",function(value){Auth.login = value;}), value:Auth.login})
								]),
							]),
							m("div.uk-margin",[
								m("div.uk-form-controls",[
									m("input.uk-input",{type:"password",placeholder:t.localisation.dictionary.PASSWORD, oninput: m.withAttr("value",function(value){Auth.password = value;}), value:Auth.password})
								])
							]),

						]),
						m("button.uk-button uk-button-primary uk-width-1-1",t.localisation.dictionary.LOGIN)
					])
				])
			]
  		},
    }
    return LoginView;

});
