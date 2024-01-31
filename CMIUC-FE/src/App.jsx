import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import Game from "./pages/Game.jsx";
import KakaoCallback from "./components/login/KaKaoAuthHandler.jsx";
import Test from "./components/lobby/test.jsx";
import NaverCallback from "./components/login/NaverCallback.jsx";
import FriendChat from "./components/lobbyChat/FriendChat.jsx";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/user/kakao" element={<KakaoCallback />} />
        <Route path="/user/naver" element={<NaverCallback />} />
        <Route path="/friend/chat" element={<FriendChat />} />

        <Route path="/test" element={<Test />} />
        {/* <Route path="/user/kakao" component={KakaoCallback} /> */}
        {/* <Route path={'/'} element={<MainPage />} />
          <Route path={'/room/:roomId'} element={<GameRoom />} />
          <Route path={'/settings'} element={<Setting />} /> */}
      
      </Routes>
    </Layout>
  );
}

export default App;
