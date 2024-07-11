

import React, { useState } from 'react';
import Modal from 'react-modal';
import WindowModal from '../WindowModal/WindowModal';

import styles from "./WindowPortal.module.scss";

export default function WindowPortal(props){

    // console.log(props.children.props.children.owner);
    // console.log(props);

    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
    setModalIsOpen(true);
    };

    const closeModal = () => {
    setModalIsOpen(false);
    };

    const modalContent = (
        <div className={styles.wrap}>
            <button className={styles.btnWindowModal} onClick={closeModal}>
                <WindowModal 
                    closeWindowPortal={closeModal}
                    data={props}
                />
            </button>
        </div>
    );


    return (
        <div >
            <button className={styles.wrapPortal} onClick={openModal}>{props.children}</button>
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

