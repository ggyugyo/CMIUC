import React from 'react';
import { useEffect } from 'react';

const CLIENT_ID = 'TeCx0qAJkrEH8VQD4l7v';
const REDIRECT_URI = 'http://localhost:5173/user/naver';
const CLIENT_SECRET = 'q6IUCTGsK9';
const { naver } = window;
 
const Naver = () => {
  const initializeNaverLogin = () => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: CLIENT_ID,
      callbackUrl: REDIRECT_URI,
      clientSecret: CLIENT_SECRET,
      isPopup: false, // popup 형식으로 띄울것인지 설정
      loginButton: { color: 'green', type: 3, height: '60' }, //버튼의 스타일, 타입, 크기를 지정
    });
    naverLogin.init();
  };
  const getNaverToken = () => {
    if (!location.hash) return;
    const token = location.hash.split('=')[1].split('&')[0];
    console.log(token);
};
 
  useEffect(() => {
    initializeNaverLogin();
    getNaverToken();
  }, []);
 
  return <div id='naverIdLogin' />;
};
 
export default Naver;