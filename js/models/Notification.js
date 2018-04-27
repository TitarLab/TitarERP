define(['mithril','titar'], function(n,t){

    var Notification = {
        list:[],
        push: function(text,status){
            var notification = {text:text,status:status};
            Notification.list.push(notification);
            setTimeout(Notification.pop,5000);
            m.redraw();
        },
        pop: function(){
            Notification.list.pop();
            m.redraw();
        }
    }

    return Notification;
});

