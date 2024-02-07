import FriendList from "../components/lobby/FriendList";
import Header from "../components/lobby/Header";
import MyInfo from "../components/lobby/MyInfo";
import Rooms from "../components/lobby/Rooms";

export default function Lobby() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="w-3/4 p-4">
          <Rooms />
        </div>
        <div className="w-1/4 p-4">
          <MyInfo />
          <FriendList />
        </div>
      </div>
    </div>
  );
}
