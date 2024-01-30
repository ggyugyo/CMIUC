import Kakaoimg from '../../assets/img/kakao_login_medium_wide.png'

function KakaoLogin() {
    // 나중에 .env 파일에 담으면 되려나?
    const CLIENT_ID = '1557b38ca46b29df7ee743e427c991bc'

    const REDIRECT_URI = 'http://localhost:5173/user/kakao/'
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

    const Login = () => {
        window.location.href = KAKAO_AUTH_URL;
    }

    return (
        <button onClick={Login} type="button" 
            style={{ 
            backgroundImage: `url(${Kakaoimg})`, 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '300px', // 버튼의 너비를 지정
            height: '45px' // 버튼의 높이를 지정
        }} 
        className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300">
</button>

    );
}

export default KakaoLogin;