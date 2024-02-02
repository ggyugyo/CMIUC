import FriendList from "../components/lobby/FriendList";
import Header from "../components/lobby/Header";
import Rooms from "../components/lobby/Rooms";

export default function Lobby() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/2 p-4">
          <Rooms />
        </div>
        <div className="w-1/2 p-4">
          <FriendList />
        </div>
      </div>
    </div>
  );
}
