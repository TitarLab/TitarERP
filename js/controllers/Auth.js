define(['mithril','titar','models/Auth'], function(n,t,Auth){

    var AuthController = {
        checkStatus:function(){
            if(!document.cookie.match("token")){
                Auth.status = false;
            }else{
                Auth.status = true;
				Auth.firstname = t.getCookie("firstname");
				Auth.lastname = t.getCookie("lastname");
				Auth.email = t.getCookie("email");
				Auth.userId = t.getCookie("userId");
				t.userId = Auth.userId;
            }
            return Auth.status;
        },

	login:function(){

		m.request({
			method: "POST",
			url:'api/login',
			data:{login:Auth.login,password:Auth.password},
			withCredentials:true,
		})
		.then(function(report){
			if(report.code == 200){
				if(report.result != null){
					var date = new Date(new Date().getTime() + 60 * 10000);
					document.cookie = "token="+Auth.login+"; path=/; expires=" + date.toUTCString();
					Auth.status = true;
					Auth.firstname = report.result.firstname;
					Auth.lastname = report.result.lastname;
					Auth.email = report.result.email;
					Auth.userId = report.result.id;
					t.userId = Auth.userId;
					document.cookie = "firstname="+Auth.firstname+"; path=/; expires=" + date.toUTCString();
					document.cookie = "lastname="+Auth.lastname+"; path=/; expires=" + date.toUTCString();
					document.cookie = "email="+Auth.email+"; path=/; expires=" + date.toUTCString();
					document.cookie = "userId="+Auth.userId+"; path=/; expires=" + date.toUTCString();
					window.location = t.global.host;
				}

			}else{
				Auth.login = "";
				Auth.password = "";
			}

		});
	},
	logout:function(){
		var date = new Date(new Date().getTime());
		document.cookie = "token=; path=/; expires=" + date.toUTCString();
		window.location = t.global.host;
	}
};

    return AuthController;
});
