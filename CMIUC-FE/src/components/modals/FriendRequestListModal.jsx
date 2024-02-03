import React from "react";
import Modal from "react-modal";

function FriendRequestListModal({
  isOpen,
  closeModal,
  requests,
  acceptRequest,
  rejectRequest,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{
        overlay: {},
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          background: "#FFFFFF",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "20px",
          width: "80%",
          maxWidth: "800px",
        },
      }}
    >
      <div className="p-10">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-6 text-blue-600">
            친구 요청 목록
          </h1>
          <button
            onClick={closeModal}
            className="text-black hover:text-black-700 text-2xl"
          >
            X
          </button>
        </div>
        {requests.map((request, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-2 rounded bg-white shadow-md mb-4"
          >
            <h6 className="font-bold text-xl text-blue-700">
              {request.senderNickname}
            </h6>
            <div>
              <button
                onClick={() =>
                  acceptRequest(request.receiverId, request.senderId)
                }
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md mr-2"
              >
                수락
              </button>
              <button
                onClick={() =>
                  rejectRequest(request.senderId, request.receiverId)
                }
                className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                거절
              </button>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default FriendRequestListModal;
