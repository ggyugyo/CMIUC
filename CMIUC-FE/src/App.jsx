import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import { Game } from "./pages/Game.jsx";
import { Result } from "./pages/Result.jsx";
import KakaoCallback from "./components/login/KaKaoAuthHandler.jsx";
import Test from "./components/lobby/test.jsx";
import NaverCallback from "./components/login/NaverCallback.jsx";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/result" element={<Result />} />
        <Route path="/user/kakao" element={<KakaoCallback />} />
        <Route path="/user/naver" element={<NaverCallback />} />
        <Route path="/test" element={<Test />} />
        {/* <Route path="/user/kakao" component={KakaoCallback} /> */}
        {/* <Route path={'/'} element={<MainPage />} />
          <Route path={'/room/:roomId'} element={<GameRoom />} />
          <Route path={'/settings'} element={<Setting />} /> */}
      </Routes>
    </MainLayout>
  );
}

export default App;
