import { useState } from "react";
import axios from "axios";


export default function ChatRoomCreation() {
    const [createdRoomId, setCreatedRoomId] = useState(null);

    const createChatRoom = async () => {
        try {
            const res = await axios.post("http://localhost:8080/room", { name: "방 이름요"});
            const createdRoom = res.data;

            console.log("Created RoomId: " + createdRoom.roomId);
            setCreatedRoomId(createdRoom.roomId);
        } catch (err) {
            console.log("Failed to create room : ", err )
        }
    }

    return(
        <div>
            <button onClick={createChatRoom}>Create Chat Room</button>
            {createdRoomId && <p>Created Room Id : {createdRoomId}</p>}
        </div>
    );
} 