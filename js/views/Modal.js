define(['mithril','titar','controllers/Modal','models/Modal'], function(n,t,ModalController,Modal){
	var ViewModal = {
        type:"",
        oninit:function(){
					ModalController.setType();
            //ViewModal.changeType();
        },
        view: function(){
            return m("div#modal",{"uk-modal":""},[
							m(Modal.current)
						])
        }
    }
    return ViewModal;
});
