define(['mithril','titar','models/Client','models/Notification','libs/sortable'], function(n,t,Client,Notification,Sortable){

    var ClientController = {
        init:{
            default:function(){
                ClientController.load.list();
            }
        },
        load:{
            list:function(){
                m.request({
                    method: "POST",
                    url:"../api/api.php",
                    data:{model:"client",action:"get"},
                    withCredentials:true,
                }).then(function(report){
                    if(report.code == 200){
                        Client.list = report.result;
                    }else{
                        
                    }
                });
            }
        }
    }

    return ClientController;
});


