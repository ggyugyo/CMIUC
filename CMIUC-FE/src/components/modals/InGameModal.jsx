import Modal from "react-modal";
import { useState } from "react";
import InGameModalContent1 from "./InGameModalContent1";
import InGameModalContent2 from "./InGameModalContent2";
import InGameModalContent3 from "./InGameModalContent3";
import prevIcon from "../../assets/img/prevIcon.png";
import nextIcon from "../../assets/img/nextIcon.png";
import actionCardIcon from "../../assets/img/actionCardIcon.png";

const customModalStyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  content: {
    backgroundColor: "rgba(210, 180, 124, 0.8)",
    width: "40%",
    height: "35%",
    top: "40px",
    left: "50px",
    zIndex: 1000,
    border: "3px solid brown",
  },
};
export default function InGameModal() {
  const [isInGameModalOpen, setIsInGameModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(1); // 현재 컨텐츠 번호
  const contentCount = 3; // 총 컨텐츠 개수

  const openModal = () => {
    setIsInGameModalOpen(true);
  };

  const closeModal = () => {
    setIsInGameModalOpen(false);
  };

  const getContentComponent = () => {
    switch (currentContent) {
      case 1:
        return <InGameModalContent1 />;
      case 2:
        return <InGameModalContent2 />;
      case 3:
        return <InGameModalContent3 />;
      default:
        return null;
    }
  };

  const goToNextContent = () => {
    setCurrentContent((prevContent) => {
      const nextContent = prevContent + 1;

      if (nextContent > contentCount) {
        return 1;
      }

      return nextContent;
    });
  };

  const goToPreviousContent = () => {
    setCurrentContent((prevContent) => {
      const previousContent = prevContent - 1;

      if (previousContent < 1) {
        return contentCount;
      }

      return previousContent;
    });
  };

  return (
    <div>
      <div
        className="flex justify-center items-center left-[20px] w-[80px] h-auto"
        onClick={openModal}
        style={{ position: "absolute", top: 5, left: 10, cursor: "pointer" }}
      >
        <img
          src={actionCardIcon}
          style={{ width: "80px", height: "auto" }}
          className="animate-pulse"
        />
      </div>
      <Modal
        isOpen={isInGameModalOpen}
        onRequestClose={closeModal}
        style={customModalStyle}
        contentLabel="How To Play"
      >
        <div className="mt-4 mr-4 flex justify-end">
          <button onClick={closeModal} className="text-black">
            닫기
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
      </Modal>
    </div>
  );
}
