import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import { Game } from "./pages/Game.jsx";
import { Result } from "./pages/Result.jsx";
import GameChatConnect from "./components/gamechat/GameChatConnect.jsx";
import KakaoRedirectPage from "./components/login/KakaoRedirectPage.jsx";
import NaverRedirectPage from "./components/login/NaverRedirectPage.jsx";
import Test from "./components/lobby/test.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback/naver" element={<NaverRedirectPage />} />
        <Route path="/callback/kakao" element={<KakaoRedirectPage />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game" element={<Game />} />
        <Route path="/game/chat/:roomId" element={<GameChatConnect />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
