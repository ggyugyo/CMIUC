import styles from "./modalStyle.module.css";
import style from "../components/MainPage.module.css";


export default function BuddyAndChatModal({mockData}) {

    return (

        <div>
            <div>
                <h1>BUDDY AND CHATCHAT CHAP!</h1>
                <hr />
                <button className={styles.close}>X</button>
                <div className={styles.modalContainer}>
                    <div className={style.buddyListModal}>
                        <h3>Buddy List</h3>
                        <hr />
                        <ul>
                            {mockData.map((data) => { return <li key={data.id}>{data.username}</li>})}
                        </ul>
                    </div>
                    <div className={style.chatModal}>
                        <h3>Buddy Chat</h3>
                        <hr />
                        <h3>채팅용 컴포넌트 하나 더 만들어야 할 듯</h3>
                        <h3>그리고 왼쪽 친구 목록에서 대화 상대 선택하면 그 채팅용 컴포넌트가 알잘딱깔센 바뀌어야 함. 아마도</h3>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    );
}