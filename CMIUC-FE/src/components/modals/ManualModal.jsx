import { useState, useEffect } from "react";
import Modal from "react-modal";
import ManualContent1 from "./ManualContent1";
import ManualContent2 from "./ManualContent2";
import ManualContent3 from "./ManualContent3";
import ManualContent4 from "./ManualContent4";
import ManualContent5 from "./ManualContent5";
import ManualContent6 from "./ManualContent6";
import ManualContent7 from "./ManualContent7";
import userGuideIcon from "../../assets/img/userGuideIcon.png";
import prevIcon from "../../assets/img/prevIcon.png";
import nextIcon from "../../assets/img/nextIcon.png";
import closeIcon from "../../assets/img/closeIcon.png";
import manual from "../../assets/img/manual.png";
Modal.setAppElement("#root");

const customStyles = {
  content: {
    width: "50%",
    height: "80%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
    border: "10px solid #003366",
    backgroundColor: "white",
    opacity: "0.7",
  },
};

export default function ManualModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(1); // 현재 컨텐츠 번호
  const contentCount = 7; // 총 컨텐츠 개수

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
      case 4:
        return <ManualContent4 />;
      case 5:
        return <ManualContent5 />;
      case 6:
        return <ManualContent6 />;
      case 7:
        return <ManualContent7 />;
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
      <div className="p-5">
        <div className="animate-bounce">
          <button
            onClick={openModal}
            className="w-12 h-12 bg-cover bg-no-repeat bg-center cursor-pointer"
            style={{ backgroundImage: `url(${userGuideIcon})` }}
          ></button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="모달입네다"
        style={customStyles}
      >
        <div className="mt-10">
          <h1 className="text-6xl flex justify-center">How To Play</h1>
          <hr className="mt-4" />

          <div>
            <button
              className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 rounded-md text-2xl"
              onClick={closeModal}
            >
              <img src={closeIcon} className="w-6 h-6" />
            </button>
          </div>

          <div className="">{getContentComponent()}</div>

          <div className="absolute bottom-0 left-0 w-full p-4 flex justify-between">
            <button
              className="w-12 h-12 bg-cover cursor-pointer relative"
              onClick={goToPreviousContent}
            >
              <img src={prevIcon} className="w-15 h-15" />
            </button>
            <button
              className="w-12 h-12 bg-cover cursor-pointer relative"
              onClick={goToNextContent}
            >
              <img src={nextIcon} className="w-15 h-15" />
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
