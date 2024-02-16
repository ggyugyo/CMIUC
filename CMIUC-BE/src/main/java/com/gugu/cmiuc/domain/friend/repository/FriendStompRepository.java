package com.gugu.cmiuc.domain.friend.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@Slf4j
@RequiredArgsConstructor
@Repository
public class FriendStompRepository {

    //// Redis cache
    //private static final String CHAT_ROOMS = "FRIEND_CHAT_ROOM"; // 채팅룸 저장
    //public static final String ENTER_INFO = "FRIEND_ENTER_INFO"; // 채팅룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장
    //
    //// RedisTemplate 주입 (데이터를 저장하고 조회를 위함)
    //// Chat Room을 저장하는 hash
    //@Resource(name = "redisTemplate")
    //private HashOperations<String, String, FriendRoomDTO> hashOpsChatRoom;
    // 사용자의 입장 정보를 저장하는 hash
    //@Resource(name = "redisTemplate")
    //private HashOperations<String, Long, String> hashOpsEnterInfo;
    //// 채팅방에 입장한 유저 수를 저장하기 위함
    //
    //// 모든 채팅방 조회
    //public List<FriendRoomDTO> findAllRoom() {
    //    return hashOpsChatRoom.values(CHAT_ROOMS);
    //}
    //
    //// 특정 채팅방 조회
    //public FriendRoomDTO findRoomById(String id) {
    //    return hashOpsChatRoom.get(CHAT_ROOMS, id);
    //}
    //
    //// 채팅방 생성 서버간 채팅방 공유를 위해 redis hash에 저장한다.
    //public void createFriendChatRoom(FriendRoomDTO friendRoomDTO) {
    //    hashOpsChatRoom.put(CHAT_ROOMS, friendRoomDTO.getRoomId(), friendRoomDTO);
    //}

    //// 유저가 입장한 채팅방ID와 유저 세션ID 맵핑 정보 저장
    //public void setMemberEnterInfo(String roomId, Long memberId) {
    //    hashOpsEnterInfo.put(ENTER_INFO, memberId, roomId);
    //    //hashOpsEnterInfo.put(ENTER_INFO, friendRoomDTO.getSecondMemberId(), friendRoomDTO.getRoomId());
    //}
    //
    //// 유저 세션정보와 맵핑된 채팅방ID 삭제
    //public void removeMemberEnterInfo(Long memberId) {
    //    hashOpsEnterInfo.delete(ENTER_INFO, memberId);
    //}
}
