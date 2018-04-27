define(['mithril','titar','models/Modal'], function(n,t,Modal){
	var ViewModal = {
        type:"",
        oninit:function(){
            Modal.current = {view:function(){return m('div')}};
            //ViewModal.changeType();
        },
        view: function(){
            return m("div.modal fade",{id:"modal",tabindex:"-1",},[
                m("div.modal-dialog",[
                    m("div.modal-content",[
                        m("div",Modal.type),
                        m(Modal.current)
                    ])
                ])
            ])
        }
    }
    return ViewModal;
});