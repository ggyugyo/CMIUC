import { useEffect } from "react";
import Modal from "react-modal";

export const GamePlayerRole = ({
  playerRoleModal,
  setPlayerRoleModal,
  playerInfo,
  setPlayerInfo,
}) => {
  useEffect(() => {
    setPlayerRoleModal(true);
  }, []);

  const role = () => {
    switch (playerInfo.length) {
      case 4:
        return [0, 0, 0, 1, 1];
      case 5:
        return [0, 0, 0, 0, 1, 1];
      default:
        return [0, 0, 0, 0, 1, 1];
    }
  };

  const shuffle = () => {
    let roleCard = role();
    let shuffled = [];
    for (let i = 0; roleCard.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * roleCard.length);
      shuffled = shuffled.concat(roleCard.splice(randomIndex, 1));
    }
    return shuffled;
  };

  const shuffledRoleCard = shuffle();

  const onClickHandler = () => {
    const newPlayerInfo = playerInfo.map((player, index) => {
      return {
        ...player,
        userRole: shuffledRoleCard[index],
      };
    });
    console.log(newPlayerInfo);
    setPlayerInfo(newPlayerInfo);
    setPlayerRoleModal(false);
  };

  return (
    <Modal
      isOpen={playerRoleModal}
      ariaHideApp={false}
      onRequestClose={() => setPlayerRoleModal(false)}
    >
      <div>플레이어 역할 배정</div>
      <div>{shuffledRoleCard}</div>
      <button onClick={onClickHandler}></button>
    </Modal>
  );
};
