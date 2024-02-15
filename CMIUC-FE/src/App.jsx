import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import Lobby from "./pages/Lobby.jsx";
import { Game } from "./pages/Game.jsx";
import { Result } from "./pages/Result.jsx";
import { Final } from "./pages/Final.jsx";
import KakaoRedirectPage from "./components/login/KakaoRedirectPage.jsx";
import NaverRedirectPage from "./components/login/NaverRedirectPage.jsx";
import Register from "./components/login/Register.jsx";
import { SocketProvider } from "./settings/SocketContext.jsx";
import MyPage from "./pages/MyPage.jsx";
import KakaoUnlink from "./components/login/KakaoUnlink.jsx";
import NaverUnlink from "./components/login/NaverUnlink.jsx";
function App() {
  return (
    <SocketProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback/login/naver" element={<NaverRedirectPage />} />
          <Route path="/callback/login/kakao" element={<KakaoRedirectPage />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game/:roomId" element={<Game />} />
          <Route path="/result" element={<Result />} />
          <Route path="/final" element={<Final />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/callback/unlink/kakao" element={<KakaoUnlink />} />
          <Route path="/callback/unlink/naver" element={<NaverUnlink />} />
        </Routes>
      </MainLayout>
    </SocketProvider>
  );
}

export default App;
