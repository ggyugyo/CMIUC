import React from "react";
import Modal from "react-modal";

function AddFriendModal({
  isOpen,
  closeModal,
  nameInput,
  setNameInput,
  addFriendRequest,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      className="bg-white rounded-lg p-10 max-w-xl border border-gray-300 relative"
    >
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-black hover:text-black-700 text-2xl"
      >
        X
      </button>
      <div className="p-10 max-w-l items-center">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">친구 추가</h1>
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="친구 닉네임"
          className="border border-gray-300 px-4 py-2 rounded-md mb-6 w-full focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-end">
          <button
            onClick={addFriendRequest}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 transition duration-200 ease-in-out hover:bg-blue-600 focus:outline-none"
          >
            추가
          </button>
          <button
            onClick={closeModal}
            className="border border-gray-300 px-4 py-2 rounded-md transition duration-200 ease-in-out hover:border-gray-500 focus:outline-none"
          >
            취소
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default AddFriendModal;
