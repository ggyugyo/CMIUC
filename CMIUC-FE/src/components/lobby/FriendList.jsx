import React, { useEffect, useState } from 'react';
import axios from 'axios';

// 이후에 소켓 연결해서 지속적으로 방 목록을 받아오도록 해야겠지?
function FriendList() {
    const [friends, loadFriends] = useState([{roomId:'fjafak24214', name:'가즈아', userCount:4}])
    
    const findAllFriends = () => {
        axios.get('친구 목록 불러오는 백 주소 넣어야 합니다.', {
    
        }).then(response => {
            if (Object.prototype.toString.call(response.data) === "[object Array]") {
                console.log(response.data)
                // 받아온 데이터를 rooms 담아준다.
                loadFriends(response.data);
            }
        });
    };
    useEffect(() =>{
        findAllFriends();
    }, []);


    const openChat = (변수1, 변수2) => {
        alert("기능구현중입니다.");
       // 이거는 백 해놓은거 확인하고 어떻게 요청하고 받고 그래야 하는디
       // 모달로 해야하니까 모달도 추가해야하고 모달 열리면 스톰프 연결도 해야함
       // ㅇㅇㅇ....
    };


    return (
        <div className="border p-4 flex flex-col space-y-4 bg-blue-50">
            <h1 className="text-2xl font-bold mb-4 text-blue-600">친구 목록</h1>
            {friends.map((friend, index) => (
                <div key={index} className="flex justify-between items-center border p-2 rounded bg-white shadow-md">
                    <h6 className="font-bold text-xl text-blue-700">{friend.name}</h6>
                    <button onClick={() => openChat(friend.roomId, friend.name)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">채팅방 입장</button>
                </div>
            ))}
        </div>
    );
}

export default FriendList;
