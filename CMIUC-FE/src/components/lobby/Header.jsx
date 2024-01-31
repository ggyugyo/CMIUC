import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// 이후에 소켓 연결해서 지속적으로 방 목록을 받아오도록 해야겠지?
function Header() {
    const [myInfo, loadMyInfo] = useState([])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newNickname, setNewNickname] = useState("");
    const nickname = localStorage.getItem('nickname')
    const point = localStorage.getItem('point')

    const logOut = () => {
        localStorage.clear()
        location.href="/";
        // axios.get('로그아웃?? 백 주소', {
    
        // }).then(response => {
        //     if (Object.prototype.toString.call(response.data) === "[object Array]") {
        //         console.log(response.data)
        //         // 받아온 데이터를 rooms 담아준다.
        //         setRooms(response.data);
        //     }
        // });
    };

    const openModal = () => {
        setModalIsOpen(true);
    }

    const closeModal = () => {
        setModalIsOpen(false);
    }

    const changeNickname = () => {
        if(point > 150) {
            // 닉네임 변경 로직
            //axios 요청 때리고
            // 정보 다시받아서 렌더링 해야할듯?
            // localStorage.setItem('nickname', newNickname);
            closeModal();
        } else {
            alert("포인트가 부족합니다.");
        }
    }


    return (
        <div className="border p-4 flex justify-between items-center h-16">
            <div className="flex items-center space-x-4 ">
                <img src="../../../public/logo.svg" alt="" width="45px" height="45px" />
                <h1>Catch Mouse If You CAT!</h1>
            </div>
            <div className="flex justify-end items-center space-x-4">
                <div className="flex items-center space-x-4">
                    <h2 onClick={openModal}>{nickname}</h2>
                    <p>포인트 : {point}</p>
                </div>
                <button onClick={logOut} className="ml-4">로그아웃</button>
            </div>
            <Modal 
            isOpen={modalIsOpen} 
            onRequestClose={closeModal}
            style={{
                content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  width: '400px',
                  backgroundColor: '#f5f5f5', // 배경색 변경
                  padding: '20px', // 패딩 추가
                  borderRadius: '15px', // 테두리 둥글게
                  boxShadow: '0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)', // 그림자 추가
                }
            }}>
                    <h2 
                    className="text-2xl font-bold mb-4 text-blue-600"
                    style={{textAlign: "center"}}>
                        변경할 닉네임을 입력해주세요
                    </h2>
                    <input 
                        type="text" 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2" 
                        value={newNickname} 
                        onChange={e => setNewNickname(e.target.value)}
                        onKeyDown={event => { if (event.key === 'Enter') changeNickname()}} 
                    />
                    <div className="flex justify-between mt-4 w-full">
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2" 
                            type="button" 
                            onClick={changeNickname}
                        >
                            변경
                        </button>
                        <button 
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2" 
                            type="button" 
                            onClick={closeModal}>
                            닫기
                        </button>
                    </div>
            </Modal>
        </div>
    );
    
    
}

export default Header;
