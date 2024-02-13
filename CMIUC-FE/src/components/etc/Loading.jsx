import Loadingimg from "../../assets/img/loading.gif";
import { useState, useEffect } from "react";

const Loading = ({ message = "로딩중..." }) => {
  const tip = [
    "고양이는 겁이 많아요 >< 그치만 똑똑해서 덫을 이용해 쥐를 잡는 답니다!",
    "고양이는 정체를 숨기고 쥐를 방해해야해요~ 쥐를 속여 빈 접시를 뽑게하고 덫 카드를 뽑도록 유도하세요!!",
    "아무도 믿지 마세요!! 누가 정체를 숨긴 고양이일지 모릅니다 🐭🐭🐈🐭",
    "쥐의 승리를 위해선 거짓말도 필요한 법! 승리를 위해 때론 아군도 속여야합니다 찍찍",
    "게임이 더욱 재밌게 만들어주는 특수카드!! 어떤 효과들이 있을까요? 두근두근",
    "게임은 게임일뿐! 화내지 말아요!",
    "Catch Mouse If U Cat은 여러 사람들과 게임하는 공간입니다. 서로를 존중해주세요~ :)",
  ];
  const img = [
    [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat.png",
      "Cat",
      "40",
      "40",
    ],
    [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png",
      "Cat Face",
      "40",
      "40",
    ],
    [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Mouse%20Face.png",
      "Mouse Face",
      "40",
      "40",
    ],
    [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Mouse.png",
      "Mouse",
      "40",
      "40",
    ],
    [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Blue%20Heart.png",
      "Blue Heart",
      "40",
      "40",
    ],
    [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Face%20with%20Symbols%20on%20Mouth.png",
      "Face with Symbols on Mouth",
      "40",
      "40",
    ],
    [
      "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Smiling%20Face%20with%20Hearts.png",
      "Smiling Face with Heart",
      "40",
      "40",
    ],
  ];

  const [randomIndex, setRandomIndex] = useState(
    Math.floor(Math.random() * tip.length)
  );

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * tip.length));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <img
          src={img[randomIndex][0]}
          alt={img[randomIndex][1]}
          width={img[randomIndex][2]}
          height={img[randomIndex][3]}
          className="mx-auto w-48"
        />
        <h3 className="mt-4 text-2xl text-blue-500">{tip[randomIndex]}</h3>
        {/* <img src={Loadingimg} alt="Loading" className="mx-auto w-24" /> */}
      </div>
    </div>
  );
};

export default Loading;
