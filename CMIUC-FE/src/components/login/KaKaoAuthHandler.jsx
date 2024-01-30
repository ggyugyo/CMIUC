import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../etc/Loading';

function KakaoCallback() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        

        const params = new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        const REST_API_KEY = `1557b38ca46b29df7ee743e427c991bc`;
        const REDIRECT_URI = 'http://localhost:5173/user/kakao/';

        axios.post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
            {},
            { headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" } }
        )
        .then((res) => {
            // 여기는 토큰이 온다
            console.log(res);
            const { access_token } = res.data;
            axios.post(
                `https://kapi.kakao.com/v2/user/me`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
                    }
                }
            )
            .then((res) => {
                // 여긴 유저 정보가 옴 res.data에
                // res.data.id 는 고유한 유저 번호임
                console.log('2번째', res);
                console.log('res.data', res.data);
                // 데이터 어따 저장하는 코드가 필요함
                // 대충 로컬 또는 상태관리에 저장하는코드
                // 데이터 잘받아왔으니까 로비로 가게끔 해줘야함
                navigate('/test');
                
            })
        })
        .catch((Error) => {
            console.log(Error)
        })
    }, [location, navigate]);
    // 뭐라도 띄워야지
    return <Loading message="로그인 중 입니다..." />
}

export default KakaoCallback;
