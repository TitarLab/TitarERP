define(['mithril','titar','models/Modal'], function(n,t,Modal){
	return {
        oninit:function(){
            
        },
        view: function(){
            return [
                m('div.modal-header',[
                    m('h4','Действительно хотите удалить клиента?')
                ]),
                m("div.modal-body",[
                    m('button.btn btn-default',{onclick:function(){Modal.accept(Modal.attribute.id)}},"Да"),
                    m('button.btn btn-default',{onclick:function(){Modal.hide()}},"Нет"),
                ])
            ]   
        }
    }

});