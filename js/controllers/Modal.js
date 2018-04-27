define(['mithril','titar','models/Modal','views/ModalStandart','views/ModalAccept'], function(n,t,Modal,ModalStandart,ModalAccept){

    var ModalController = {
        setType:function(type){
            if(type == "accept"){
                Modal.current = ModalAccept;
            }else{
                Modal.current = ModalStandart;
            }
        }
    }

    return ModalController;
});

