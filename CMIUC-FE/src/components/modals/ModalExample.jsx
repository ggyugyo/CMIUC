import { useState } from 'react';
import Modal from 'react-modal';
import styles from "./modalStyle.module.css";


export default function ModalExample() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal}>모달 열기</button>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
                <h2>모달 제목</h2>
                <p>모달 내용</p>
                <button onClick={closeModal}>모달 닫기</button>
            </Modal>
        </div>
    );
}