import Modal from "react-modal";
import { Window, WindowContent, GroupBox } from "react95";

const customStyles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "500px",
    height: "500px",
    boxSizing: "border-box",
    padding: "0px",
    border: "none",
  },
};

export const GameStart = () => {
  return (
    <Modal isOpen={true} ariaHideApp={false} style={customStyles}>
      <div className="flex justify-center justify-items-center content-center">
        <Window className="w-[480px]">
          <WindowContent>
            <GroupBox label="게임시작" className="flex justify-center">
              타이머
              <span role="img" aria-label="😍">
                😍
              </span>
            </GroupBox>
          </WindowContent>
        </Window>
      </div>
    </Modal>
  );
};
