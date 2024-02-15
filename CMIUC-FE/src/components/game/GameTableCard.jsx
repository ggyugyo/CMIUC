import { GameTableCardList } from "./GameTableCardList";
import { playSFX, SFX_LIST } from "../../settings/SoundSetting";

export const GameTableCard = () => {
  playSFX(SFX_LIST.CHEEZE);

  return (
    <>
      <GameTableCardList />
    </>
  );
};
