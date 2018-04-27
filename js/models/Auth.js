define(['mithril','titar','controllers/Auth'], function(n,t,AuthController){

    var Auth = {
        status:false,
        login:function(){
            var user = t.getById("user").value;
            var password = t.getById("password").value;
            password = encodeURIComponent(password);

            m.request({
                method: "POST",
                url:'api/login.php',
                data:{user:user,password:password},
                withCredentials:false,
            })
            .then(function(result){
                if(result == "1"){
                    var date = new Date(new Date().getTime() + 60 * 10000);
                    document.cookie = "user="+user+"; path=/; expires=" + date.toUTCString();
                    Auth.status = true;
                    AuthController.normalStart();
                }else{
                    t.getById("user").value = "";
                    t.getById("password").value = "";
                }
                
            });
        }
    }

    return Auth;
});