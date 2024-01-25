import { useState } from "react";
import RoomList from "./RoomList";
import CreateRoomModal from "../modals/CreateRoomModal";
import Modal from "react-modal";
import BuddyList from "./BuddyList";
import styles from "../modals/modalStyle.module.css";
import style from "./MainPage.module.css";




export default function MainPage() {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const onCreateRoomBtn = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    
    

    return (
        <div className={style.parentContainer}>
            <h1>Catch Mouse If You Cat</h1>
            <br />
            <div className={style.container}>
                <RoomList />
                <br />
                <BuddyList />
            </div>
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.container}>
                <CreateRoomModal />
            </Modal> 

            <br />
            <button onClick={onCreateRoomBtn}>방 만들기</button>
        </div>
    )
}