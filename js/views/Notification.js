define(['mithril','models/Notification'], function(n,Notification){
    return {
        view: function(){
            return m("div",{class:"notification"},[
                m("ul",[
                    Notification.list.map(function(notification){
                        if(notification != null){
                            return m('li',{class:'alert '+notification.status},notification.text);
                        }
                    
                    })
                ])
            ])
        }
    }
    
});