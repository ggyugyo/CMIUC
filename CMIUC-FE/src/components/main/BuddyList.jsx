import { useState } from "react";
import BuddyAndChatModal from "../modals/BuddyAndChatModal";
import Modal from "react-modal";
import styles from "../modals/buddyModalStyle.module.css";
import style from "./MainPage.module.css";


export default function BuddyList() {

    const [buddyListOpen, setBuddyListOpen] = useState(false);

    const mockData = [
        {id:0, username: "Gaedol"},
        {id:1, username: "Doldol"},
        {id:2, username: "Chapsal"},
        {id:3, username: "Gaedol"},
        {id:4, username: "Doldol"},
        {id:5, username: "Chapsal"},
        {id:6, username: "Gaedol"},
        {id:7, username: "Doldol"},
        {id:8, username: "Chapsal"},
        {id:9, username: "Gaedol"},
        {id:10, username: "Doldol"},
        
    ]    

    const onClickBuddyList = () => {
        setBuddyListOpen(true);
    }

    const closeModal = () => {
        setBuddyListOpen(false);
    };


    return (
        <div>
            <div className={style.buddyList} onClick={onClickBuddyList}>
                <h2>친구 목록</h2>
                <ul>
                    {mockData.map((data) => {
                        return <li key={data.id}>{data.username}</li>
                    })}
                </ul>

                <Modal isOpen={buddyListOpen} onRequestClose={closeModal} className={styles.container}>
                    <BuddyAndChatModal mockData={mockData} />
                </Modal>
            </div>
        </div>
    )
}