import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateRoom from './CreateRoom';

// 이후에 소켓 연결해서 지속적으로 방 목록을 받아오도록 해야겠지?
function Rooms() {
    const [rooms, setRooms] = useState([{roomId:'fjafak24214', name:'가즈아', userCount:4}])
    const findAllRooms = () => {
        axios.get('방목록불러오는 백 주소', {
    
        }).then(response => {
            if (Object.prototype.toString.call(response.data) === "[object Array]") {
                console.log(response.data)
                // 받아온 데이터를 rooms 담아준다.
                setRooms(response.data);
            }
        });
    };
    useEffect(() =>{
        findAllRooms();
    }, []);


    const enterRoom = (roomId, roomName) => {
        localStorage.setItem('wschat.roomId', roomId);
        localStorage.setItem('wschat.roomName', roomName);
        // 아래 주소로 이동하는데 이건 나중에 수정이 필요하다        
        window.location.href = "/chat/room/enter/" + roomId;
    };



    return (
        <div className="p-4 bg-blue-50">
            <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-blue-600">게임방 목록</h1>
                    {/* 방 목록에 방 만드는 버튼이 같이 있어야 해서 넣음 */}
                    <CreateRoom />
            </div>
            <div className="grid grid-cols-3 gap-4">
                {rooms.map((room, index) => (
                    <div key={index} onClick={() => enterRoom(room.roomId, room.name)} className="rounded overflow-hidden shadow-lg p-6 text-center cursor-pointer bg-white hover:bg-gray-50 transform hover:scale-105 transition duration-200 ease-in-out">
                        <h6 className="font-bold text-xl mb-2 text-blue-700">{room.name}</h6>
                        <p className="text-gray-700 text-base"><span className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold">{room.userCount}/6</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rooms;
