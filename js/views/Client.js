define(['mithril','titar','models/Client','models/Map','models/Modal','controllers/Modal'], function(n,t,Client,Map,Modal,ModalController){
	return {
        oninit: function(vnode){
            Client.loadList();
            Client.search.byId(vnode.attrs.id);
        },
        oncreate: function(vnode){
            if(Client.current.name == null){
                Client.loadList(vnode.attrs.id);
            }
            if(Client.current.location != null &&  Client.current.location.lat != null && Client.current.location.lng != null){
                Map.initMapPos("map",parseFloat(Client.current.location.lat),parseFloat(Client.current.location.lng));
            }
            
                
        },
        onupdate:function(){
            if(t.getById("map").innerHTML == ""){
                if(Client.current.location != null &&  Client.current.location.lat != null && Client.current.location.lng != null){
                    Map.initMapPos("map",parseFloat(Client.current.location.lat),parseFloat(Client.current.location.lng));
                }
            }
        },
        view : function(vnode){
        return[
            m("h3","Клиент"),
            m("a.btn btn-default",{href:"#!/client/edit/"+Client.current.id},"Редактировать"),
            m("button.btn btn-default",{onclick:function(){ModalController.setType('accept');Modal.setAttribute({id:Client.current.id,func:Client.remove});Modal.show();}},"Удалить клиента"),
            m('div',[
                m('span',"Наименование: " + Client.current.name),
            ]),
            m('div',[
                m('span',"Адрес: " + Client.current.address),
            ]),
            m('div',[
                m('span',"Телефон: " + Client.current.phone),
            ]),
            m('div#map',{class:"map"},""),
        ]
        
    }
}

});