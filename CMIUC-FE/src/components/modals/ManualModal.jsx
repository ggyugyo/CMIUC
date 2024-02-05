import { useState, useEffect } from "react";
import Modal from "react-modal";
import ManualContent1 from "./ManualContent1";
import ManualContent2 from "./ManualContent2";
import ManualContent3 from "./ManualContent3";
import gameinfo from "../../assets/img/gameinfo.png";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "50%",
    height: "65%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  },
};

export default function ManualModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(1); // 현재 컨텐츠 번호
  const contentCount = 3; // 총 컨텐츠 개수

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 모달이 열려 있는 동안 내부 컨텐츠 3초마다 변경

  const getContentComponent = () => {
    switch (currentContent) {
      case 1:
        return <ManualContent1 />;
      case 2:
        return <ManualContent2 />;
      case 3:
        return <ManualContent3 />;
      default:
        return null;
    }
  };

  // 버튼을 이용해 이전/다음 컨텐츠로 이동(컴포넌트 변경)
  const goToNextContent = () => {
    setCurrentContent((prevContent) => {
      const nextContent = prevContent + 1;

      // 마지막 컨텐츠일 경우 첫 번째 컨텐츠로 돌아감
      if (nextContent > contentCount) {
        return 1;
      }

      return nextContent;
    });
  };

  const goToPreviousContent = () => {
    setCurrentContent((prevContent) => {
      const previousContent = prevContent - 1;

      // 첫 번째 컨텐츠일 경우 마지막 컨텐츠로 이동
      if (previousContent < 1) {
        return contentCount;
      }

      return previousContent;
    });
  };
  return (
    <div>
      <button
        onClick={openModal}
        className="w-12 h-12 bg-cover bg-no-repeat bg-center cursor-pointer"
        style={{ backgroundImage: `url(${gameinfo})` }}
      ></button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="모달달달모"
        style={customStyles}
      >
        <div className="mt-10">
          <h1 className="text-6xl flex justify-center">How To Play</h1>
          <hr className="mt-4" />

          <div>
            <button
              className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 rounded-md text-2xl bg-blue-500 text-white hover:bg-blue-600"
              onClick={closeModal}
            >
              닫기
            </button>
          </div>

          <div className="flex justify-between">
            <button
              className="w-12 h-12 my-auto bg-cover bg-no-repeat bg-center cursor-pointer relative bg-blue-500 text-white hover:bg-blue-600"
              onClick={goToPreviousContent}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
                &lt;
              </span>
            </button>
            <div className="">{getContentComponent()}</div>
            <button
              className="w-12 h-12 my-auto bg-cover bg-no-repeat bg-center cursor-pointer relative bg-blue-500 text-white hover:bg-blue-600"
              onClick={goToNextContent}
            >
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl">
                &gt;
              </span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
