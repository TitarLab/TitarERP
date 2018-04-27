define(['mithril','titar','models/Auth','views/Auth'], function(n,t,Auth,AuthView){

    var AuthController = {
        getView:function(){
            return AuthView;
        },
        login:function(){
            
        },
        logout:function(){
            var date = new Date(new Date().getTime());
            document.cookie = "user=; path=/; expires=" + date.toUTCString();
            window.location = "https://wallet.titarlab.com";
        },
        normalStart:function(){
            window.location = "https://wallet.titarlab.com";
        },
        checkStatus:function(){
            if(!document.cookie.match("user")){
                Auth.status = false;
            }else{
                Auth.status = true;
            }
            return Auth.status;
        }
    }

    return AuthController;
});

