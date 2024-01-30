import {
  Window,
  WindowHeader,
  Button,
  WindowContent,
  ScrollView,
  Frame,
  Counter,
  Separator,
} from "react95";
import { GameCardList } from "./GameCardList.jsx";

export const GameCard = () => {
  return (
    <Window className="window flex w-[1400px]">
      <WindowHeader className="window-title flex justify-between text-[30px]">
        {/* 카드 리스트 span 동적할당 */}
        <span>카드 리스트</span>
      </WindowHeader>
      <WindowContent className="flex flex-col justify-center">
        <Counter
          value={123}
          minLength={3}
          size="lg"
          className="justify-center"
        />

        <Separator />
        <Frame variant="well" className="flex justify-center">
          {<GameCardList />}
        </Frame>
      </WindowContent>
    </Window>
  );
};

{
  /* 동적렌더링 */
}
{
  /* <Frame variant="well" className="footer size-full">
  <div className="flex justify-center">
    <span>카드를 한번 뽑아보십시다~</span>
  </div>
</Frame> */
}
