import { useState, useEffect } from "react";
import Modal from "react-modal";
import ManualContent1 from "./ManualContent1";
import ManualContent2 from "./ManualContent2";
import ManualContent3 from "./ManualContent3";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    display: "flex",
    justifyContent: "center",
    width: "50%",
    height: "80%",
    top: "10%",
    left: "15%",
    overflow: "hidden",
  },
};

export default function ManualModal() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState(1); // 현재 컨텐츠 번호
  const contentCount = 3; // 총 컨텐츠 개수
  const contentDuration = 3000; // 각 컨텐츠가 보여지는 시간 (밀리초)

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // 모달이 열려 있는 동안 내부 컨텐츠 3초마다 변경
  useEffect(() => {
    let intervalId;

    if (modalIsOpen) {
      intervalId = setInterval(() => {
        setCurrentContent((prevContent) => {
          const nextContent = prevContent + 1;

          // 마지막 컨텐츠일 경우 첫 번째 컨텐츠로 돌아감
          if (nextContent > contentCount) {
            return 1;
          }

          return nextContent;
        });
      }, contentDuration);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [modalIsOpen]);

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
      <h1>모달 테스트 용 - 푸시 전에 삭제할 것</h1>
      {/* 게임 내부에 버튼 만들어 쓰세요. */}
      <button onClick={openModal} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md shadow-md">게임 방법</button>
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
          <div>{getContentComponent()}</div>

          <div className="flex justify-between mt-4">
            <button
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 mr-2"
              onClick={goToPreviousContent}
            >
              이전
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              onClick={goToNextContent}
            >
              다음
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
