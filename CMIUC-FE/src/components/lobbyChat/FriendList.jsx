import axios from "axios";

export default function FriendList() {

    axios.get("http://localhost:8080/api/friends")
    .then((res) => {
        console.log(res);       // 일단 찍어보자
    })

    return (
        <div>
            {/* 로그인 후 진입하는 화면에 붙일 컴포넌트(좌측) */}
            <h1>친구 리스트</h1>
        </div>
    )
}