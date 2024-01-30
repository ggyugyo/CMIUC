import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // root element에 Modal을 설정합니다.


// /chatroom 으로 접속하면 나오는 컴포넌트 입니다.
// 마운트되면 BE에 방목록 요청
//

const ChatRooms = () => {
    const [roomName, setRoomName] = useState('');
    const [chatrooms, setChatrooms] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Modal의 상태를 관리하는 state

    useEffect(() => {
        findAllRooms();
    }, []);

    // 방 목록을 백에다 요청해서 받아옴
    const findAllRooms = () => {
        axios.get('http://localhost:8080/chat/rooms').then(response => {
            if (Object.prototype.toString.call(response.data) === "[object Array]") {
                console.log(response.data)
                // 받아온 데이터를 chatrooms에 담아준다.
                setChatrooms(response.data);
            }
        });
    };

    // 방 만드는 거
    const createRoom = () => {
        if (roomName === '') {
            alert("방 제목을 입력해 주십시요.");
            return;
        } else {
            const params = new URLSearchParams();
            params.append("name", roomName);
            axios.post('http://localhost:8080/chat/room', params)
                .then(response => {
                    alert(response.data.name + "방 개설에 성공하였습니다.");
                    setRoomName('');
                    findAllRooms();
                    setModalIsOpen(false); // 방을 만들면 모달을 닫습니다.
                    enterRoom(response.data.roomId, response.data.name); // 새로 만든 방으로 입장합니다.
                })
                .catch(response => {
                    alert("채팅방 개설에 실패하였습니다.");
                });
        }
    };

    // 방 입장
    const enterRoom = (roomId, roomName) => {
        localStorage.setItem('wschat.roomId', roomId);
        localStorage.setItem('wschat.roomName', roomName);
        // 아래 주소로 이동하는데 이건 나중에 수정이 필요한가? 뭐 암튼 그렇다.
        window.location.href = "/chat/room/enter/" + roomId;
    };

    return (
        <div className="container mx-auto px-4" id="app">
            <div className="flex items-center justify-between py-2">
                <div className="text-lg font-bold">
                    <h3>방목록</h3>
                </div>
                <div className="text-right">
                    <a className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" href="/logout">로그아웃</a>
                </div>
            </div>
            <div className="flex items-center space-x-2 my-2">
                <div className="flex items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setModalIsOpen(true)}>채팅방 개설</button>
                </div>
                <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                    <h2>방 제목을 입력해주세요</h2>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={roomName} onChange={e => setRoomName(e.target.value)} onKeyPress={event => { if (event.key === 'Enter') createRoom() }} />
                    <div className="flex justify-between mt-4">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={createRoom}>방 만들기</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={() => setModalIsOpen(false)}>닫기</button>
                    </div>
                </Modal>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {chatrooms.map((room, index) => (
                    <div key={index} onClick={() => enterRoom(room.roomId, room.name)} className="rounded overflow-hidden shadow-lg p-6 text-center cursor-pointer bg-white hover:bg-gray-50 transform hover:scale-105 transition duration-200 ease-in-out">
                        <h6 className="font-bold text-xl mb-2">{room.name}</h6>
                        <p className="text-gray-700 text-base"><span className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold">{room.userCount}/6</span></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatRooms;
