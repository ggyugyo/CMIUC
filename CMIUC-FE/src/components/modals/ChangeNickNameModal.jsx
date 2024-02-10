import React, { useRef, useEffect } from "react";
import Modal from "react-modal";

function ChangeNicknameModal({
  modalIsOpen,
  closeModal,
  newNickname,
  setNewNickname,
  changeNickname,
}) {
  const inputRef = useRef();

  useEffect(() => {
    if (modalIsOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [modalIsOpen]);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "400px",
          backgroundColor: "#FFFFFF",
          padding: "20px",
          borderRadius: "15px",
          boxShadow:
            "0px 10px 20px rgba(0,0,0,0.19), 0px 6px 6px rgba(0,0,0,0.23)",
        },
      }}
    >
      <h2
        className="text-2xl font-bold mb-4 text-blue-600"
        style={{
          textAlign: "center",
          borderBottom: "1px solid #ddd",
          paddingBottom: "10px",
        }}
      >
        닉네임 변경
      </h2>
      <input
        ref={inputRef}
        type="text"
        placeholder="새로운 닉네임"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2 transition duration-200 ease-in-out hover:border-blue-500"
        value={newNickname}
        onChange={(e) => setNewNickname(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") changeNickname();
        }}
      />
      <div className="flex justify-between mt-4 w-full">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-200 ease-in-out mr-2"
          type="button"
          onClick={changeNickname}
        >
          150 P
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 transition duration-200 ease-in-out ml-2"
          type="button"
          onClick={closeModal}
        >
          닫기
        </button>
      </div>
    </Modal>
  );
}

export default ChangeNicknameModal;
