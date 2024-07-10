

import React, { useState } from 'react';
import Modal from 'react-modal';
import WindowModal from '../WindowModal/WindowModal';

import styles from "./WindowPortal.module.scss";

export default function ModalWindow(props){
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
    setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };

    const modalContent = (
        <div className={styles.wrap}>
            <button onClick={closeModal}>
                <WindowModal 
                    closeWindowPortal={closeModal}
                />
            </button>
        </div>
    );

    
    return (
        <div>
            <button onClick={openModal}>{props.children}</button>
            <Modal 
                isOpen={modalIsOpen} 
                onRequestClose={closeModal}
                parentSelector={() => document.querySelector('#root')}
                className={styles.Modal}
                overlayClassName={styles.Overlay}
            >
                {modalContent}
            </Modal>
        </div>
    )
};

