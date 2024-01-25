export default function Setting() {

    return (
        <div>
            <h1>개인 장비 세팅</h1>
            <h2>카메라 화면</h2>
            <div>
                <select name="카메라 세팅">
                    <option>카메라 세팅1</option>
                    <option>카메라 세팅2</option>
                    <option>카메라 세팅3</option>
                </select>
            </div>
            <div>
                <select name="마이크 세팅">
                    <option>마이크 세팅1</option> 
                    <option>마이크 세팅2</option> 
                    <option>마이크 세팅3</option> 
                </select>
            </div>
            <br />
            <button>세팅 완료</button>
        </div>
    );
} 