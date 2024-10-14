

import { useState } from 'react';
import Modal from 'react-modal';
import WindowModal from '../WindowModal/WindowModal';

import styles from "./WindowPortal.module.scss";
import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';
import { useDispatch } from 'react-redux';
import { setWindowModalReloadBlur } from '../../main_state/states/windowModalReload';

export default function WindowPortal(props){

    // console.log(props.children.props.children.owner);
    // console.log(props);

    let dashboardUsers = props.dashboardUsers;
    let idElem = props.idElem;
    let typeElem = props.typeElem;
    let task = props.task;
    let column = props.column;
    let updateFunc = props.updateFunc;
    let deleteFunc = props.deleteFunc;
    let updateCardLabel = props.updateCardLabel;
    let setDNDIsOn = props.setDNDIsOn;
    let showPreloderLabel = props.showPreloderLabel;
    let setShowPreloderLabel = props.setShowPreloderLabel;
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch();

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setDNDIsOn(true);
    };

    const closeModalHandle = (evt) => {
        // console.log(evt);
        if(evt.target.className === "WindowPortal_wrap__DtBsC"){
          console.log('"windowNameHandleKeyPress", ура!');
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
                updateCardLabel={updateCardLabel}
                closeModal={closeModal}
                showPreloderLabel={showPreloderLabel}
                setShowPreloderLabel={setShowPreloderLabel}
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
            <div className={styles.wrapPortal} onClick={openModal}>{props.children}</div>
            <Modal 
                isOpen={modalIsOpen} 
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

