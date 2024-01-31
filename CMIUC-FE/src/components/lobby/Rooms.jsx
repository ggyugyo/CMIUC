import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateRoom from './CreateRoom';
import cheese from '../../assets/img/cheese.png'

// 이후에 소켓 연결해서 지속적으로 방 목록을 받아오도록 해야겠지?
function Rooms() {
    const [rooms, setRooms] = useState([])
    const findAllRooms = () => {
        axios.get('http://localhost:8080/chat/rooms', {
    
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
        alert("기능구현중입니다.");       
        // window.location.href = "/chat/room/enter/" + roomId;
    };


    return (
        <div className="p-4 bg-blue-50">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-blue-600">게임방 목록</h1>
            {/* 방 목록에 방 만드는 버튼이 같이 있어야 해서 넣음 */}
            <CreateRoom />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rooms.map((room, index) => (
              <div
                key={index}
                onClick={() => enterRoom(room.roomId, room.name)}
                className="rounded overflow-hidden shadow-lg p-6 flex bg-white hover:bg-gray-50 transform hover:scale-105 transition duration-200 ease-in-out"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mr-4">
                  <img src={cheese} alt="이미지" className="w-12 h-12" />
                </div>

                <div>
                  <h6 className="font-bold text-xl mb-2 text-blue-700">{index}</h6>
                  <p className="font-bold text-xl text-gray-700 mb-2">{room.name}</p>
                  <div className="flex items-center">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-bold ${room.gameInProgress ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                      {room.gameInProgress ? '게임 진행중' : '대기중'}
                    </span>
                    <span className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2">
                      {room.curUserCnt}/6
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      
      
      
      
}

export default Rooms;
