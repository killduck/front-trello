

import { useState } from 'react';
import Modal from 'react-modal';
import WindowModal from '../WindowModal/WindowModal';

import styles from "./WindowPortal.module.scss";
import Button from '../ui/Button/Button';
import Icons from '../ui/Icons/Icons';

export default function WindowPortal(props){

    // console.log(props.children.props.children.owner);
    // console.log(props);

    let idElem = props.idElem;
    let typeElem = props.typeElem;
    let task = props.task;
    let column = props.column;
    let updateFunc = props.updateFunc;

    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const closeModalHandle = (evt) => {
        console.log(evt);
        if(evt.target.className === "WindowPortal_wrap__DtBsC"){
          console.log('"windowNameHandleKeyPress", ура!');
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
                    updateFunc = {updateFunc}
                >
                    <Button
                        className={styles.btnWindowModal}
                        clickAction={closeModal}
                    >
                        <Icons
                            className={styles.Icons}
                            name={'CloseIcon'}
                        >
                        </Icons>
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

