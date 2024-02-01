import styles from "./modalStyle.module.css";

export default function CreateRoomModal() {
  return (
    <div>
      <h3>방 만드는 모달입니다.</h3>
      <button className={styles.close}>X</button>

      <h4>방 이름</h4>
      <input type="text" />
      <h4>비밀방 생성</h4>
      <input type="text" />
      <h4>참여 인원</h4>
      <select name="cnt">
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
      <br />
      <button>방 생성</button>
    </div>
  );
}
