import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Lobby from "./pages/Lobby.jsx";
import { Game } from "./pages/Game.jsx";
import { Result } from "./pages/Result.jsx";
import { Final } from "./pages/Final.jsx";
import GameChatConnect from "./components/gamechat/GameChatConnect.jsx";
import KakaoRedirectPage from "./components/login/KakaoRedirectPage.jsx";
import NaverRedirectPage from "./components/login/NaverRedirectPage.jsx";
import Register from "./components/login/Register.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback/naver" element={<NaverRedirectPage />} />
        <Route path="/callback/kakao" element={<KakaoRedirectPage />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game/:roomId" element={<Game />} />
        {/* <Route path="/game/chat/:roomId" element={<GameChatConnect />} /> */}
        <Route path="/result" element={<Result />} />
        <Route path="/final" element={<Final />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
