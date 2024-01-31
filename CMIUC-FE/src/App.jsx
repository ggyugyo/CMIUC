import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import Home from "./pages/Home.jsx";
import KakaoCallback from "./components/login/KaKaoAuthHandler.jsx";
import Test from "./components/lobby/test.jsx";
import NaverCallback from "./components/login/NaverCallback.jsx";
import { Game } from "./pages/Game.jsx";
import { GameLayout } from "./layouts/GameLayout.jsx";
import { GameStart } from "./components/game/GameStart.jsx";
import { GameCard } from "./components/game/GameCard.jsx";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/game"
          element={
            <GameLayout>
              <Game />
            </GameLayout>
          }
        />
        <Route
          path="/game/start"
          element={
            <GameLayout>
              <GameStart />
            </GameLayout>
          }
        />
        <Route
          path="/game/card"
          element={
            <GameLayout>
              <GameCard />
            </GameLayout>
          }
        />
        <Route path="/user/kakao" element={<KakaoCallback />} />
        <Route path="/user/naver" element={<NaverCallback />} />

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
