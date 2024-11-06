import Modal from 'react-modal';
import WindowModal from '../WindowModal/WindowModal';
import styles from "./WindowPortal.module.scss";
import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { setModalIsOpen, setWindowModalReloadBlur } from '../../main_state/states/windowModalState';
import { setDNDIsOn } from '../../main_state/states/taskCardState';
import { setCardLabelStatus, setLabelWindowText } from '../../main_state/states/modalCardLabel/modalCardLabel';

export default function WindowPortal(props){

  let dashboardUsers = props.dashboardUsers;
  let idElem = props.idElem;
  let typeElem = props.typeElem;
  let task = props.task;
  let column = props.column;
  let updateFunc = props.updateFunc;
  let deleteFunc = props.deleteFunc;
  let updateSetCardLabel = props.updateSetCardLabel;
  let editMode = props.editMode;
  
  const modalIsOpen = useSelector((state) => state.windowModalState.modalIsOpen); 

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(setModalIsOpen(idElem));
  };

  const closeModal = () => {
    dispatch(setModalIsOpen(false));
    dispatch(setDNDIsOn(false));
    dispatch(setLabelWindowText(''));
    dispatch(setCardLabelStatus(false));
  };

  const closeModalHandle = (evt) => {
    if(evt.target.className === "WindowPortal_wrap__DtBsC"){
      dispatch(setWindowModalReloadBlur(true));
      closeModal();
    }
  }

  const modalContent = (
    <div className={styles.wrap} onClick={closeModalHandle}>
      <WindowModal
        // closeWindowPortal={closeModal}
        // data={props}
        // onBlur={closeModal}
        idElem = {idElem}
        typeElem = {typeElem}
        task = {task}
        column = {column}
        dashboardUsers={dashboardUsers}
        updateFunc = {updateFunc}
        deleteFunc = {deleteFunc}
        updateSetCardLabel={updateSetCardLabel}
      >
        <Button
          className={'btnWindowModal'}
          clickAction={closeModal}
        >
          <Icons
            class_name={'btnModalCloseIcon'}
            name={'CloseIcon'}
          />
        </Button>
      </WindowModal>
    </div>
  );

  return (
    <div>
      <div 
        className={styles.wrapPortal} 
        onClick={ editMode === task.id ? null : ()=>openModal()}
      >
        {props.children}
      </div>
      <Modal 
        isOpen={modalIsOpen === idElem ? true : false} 
        onRequestClose={closeModal}
        parentSelector={() => document.querySelector('#root')}
        ariaHideApp={false}
        className={styles.Modal}
        overlayClassName={styles.Overlay}
      >
        {modalContent}
      </Modal>
    </div>
  )
};

