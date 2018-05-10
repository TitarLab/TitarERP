define(['mithril','titar','models/Modal','views/Project/Modal/NewTask'], function(n,t,Modal,ModalNewTaskView){

    var ModalController = {
        setType:function(type){
            if(type == "accept"){
                Modal.current = ModalAccept;
            }else{
                Modal.current = ModalNewTaskView;
            }
        }
    }

    return ModalController;
});
