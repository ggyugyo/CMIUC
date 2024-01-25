import GameRoom from "./GameRoom"
import style from  "./MainPage.module.css";
import { Routes, Route, Link } from "react-router-dom"

export default function RoomList() {

    const mockData = [
        {id:0, roomname: "쥐 잡을 사람"},
        {id:1, roomname: "제목 뭐하지"},
        {id:2, roomname: "졸리다.. 제정신이 아닌 듯해"},
        {id:3, roomname: "지금 자면 몇 시간 잘 수 있징"},
        {id:4, roomname: "webRTC 어케 하는 건데 흑"}
    ]

    return (
        <div>
            <div className={style.roomList}>
                <h2>방 찾기</h2>
                <h3>방 목록</h3>
                <ul>
                    {mockData.map((data) => (
                        <li key={data.id}>
                            {/* 각 방에 대한 링크 */}
                            <Link to={`/room/${data.id}`}>{data.roomname}</Link>       
                        </li>
                    ))}
                </ul>
            </div>

            
        </div>
    )
}