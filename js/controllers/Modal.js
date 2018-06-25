define(['mithril','titar','models/Modal','views/Project/Modal/NewTask','views/Project/Modal/EditTask'], function(n,t,Modal,ModalNewTaskView,ModalEditTaskView){

    var ModalController = {
        setType:function(type){
            if(type == "accept"){
                Modal.current = ModalAccept;
            }else if(type == "newTask"){
                Modal.current = ModalNewTaskView;
            }else if(type == "editTask"){
                Modal.current = ModalEditTaskView;
            }else{
				Modal.current = ModalEditTaskView;
			}
        }
    }

    return ModalController;
});
