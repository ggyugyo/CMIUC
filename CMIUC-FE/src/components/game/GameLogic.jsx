import { useEffect, useState } from "react";
import Loading from "../Loading.jsx";
import Modal from "react-modal";
import { DrawFirstPlayer } from "../modals/DrawFirstPlayer";
import { GamePlayerRole } from "./GamePlayerRole";

export const GameLogic = () => {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState("");
  const [playerInfo, setPlayerInfo] = useState([
    {
      userName: 0,
      isFisrtPlayer: false,
      userRole: 0,
      userCard: [],
    },
  ]);
  const [playerNumber, setPlayerNumber] = useState(0);
  const [firstPlayerModal, setFirstPlayerModal] = useState(false);
  const [playerRoleModal, setPlayerRoleModal] = useState(false);
  const [round, setRound] = useState(1);
  const [roundAlert, setRoundAlert] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setFirstPlayerModal(true);
    }, 3000);
  }, []);

  const roundTimer = () => {
    setTimeout(() => {
      setRoundAlert(false);
      setRound(round + 1);
    }, 3000);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <DrawFirstPlayer
        gameState={gameState}
        setGameState={setGameState}
        playerNumber={playerNumber}
        setPlayerNumber={setPlayerNumber}
        playerInfo={playerInfo}
        setPlayerInfo={setPlayerInfo}
        setFirstPlayerModal={setFirstPlayerModal}
        setRoundAlert={setRoundAlert}
      />
      <Modal
        isOpen={roundAlert}
        ariaHideApp={false}
        onRequestClose={roundTimer()}
      >
        {round}
      </Modal>
      {gameState === "DRAWROLE" && (
        <GamePlayerRole
          playerRoleModal={playerRoleModal}
          setPlayerRoleModal={setPlayerRoleModal}
          playerInfo={playerInfo}
          setPlayerInfo={setPlayerInfo}
        />
      )}
    </div>
  );
};
