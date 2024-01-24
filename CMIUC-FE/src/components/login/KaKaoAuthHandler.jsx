import axios from 'axios'
import { useEffect } from 'react'
import styled from 'styled-components'
// import { KAKAO_ADD_PROPERTIES } from "./kakaoAuth"

const KakaoAuthHandler = (props) => {
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get('code')
    const kakaoLogin = async () => {
      await axios
        .get(`http://localhost:8080/user/kakao/callback?code=${code}`)
        .then((res) => {
             // 요청 성공시 백에서 토큰 받아서 로컬스토리지에 저장
          localStorage.setItem('token', res.headers.authorization)
          // " /경로로 이동 하는 코드인듯"
          window.location.href = "/";
        })
    }
    kakaoLogin()
  }, [props.history])

  return (
    <>
      <Container></Container>
    </>
  )
}

export default KakaoAuthHandler

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`