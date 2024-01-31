import React, {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Loading from '../etc/Loading';

const NaverRedirectPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // 네이버에서 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
    const handleOAuthNaver = async (code) => {
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/naver`, {
                authorizationCode: code
            });
            alert("로그인 성공: ")
            console.log(response.data)
            const accessToken = response.data.accessToken
            const refreshToken = response.data.refreshToken

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            // const myData = await axios.get(`http://localhost:8080/api/members/${accessToken}`, {
            // });
            // console.log('내정보')
            // console.log(myData.data)

            navigate("/lobby");
        } catch (error) {
            alert("로그인 실패 ")
            navigate("/");
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');  // 네이버에서 Redirect 시키면서 code를 쿼리 스트링으로 준다.
        if (code) {
            alert("CODE = " + code)
            // 네이버에서 제공한 코드를 가지고 백엔드에게 요청
            handleOAuthNaver(code);
        }
    }, [location]);

    return (
        <div>
            <Loading message="로그인 중 입니다..." />
        </div>
    );
};

export default NaverRedirectPage;