package com.gugu.cmiuc.domain.game.repository;

import com.gugu.cmiuc.domain.game.dto.RoomDTO;
import com.gugu.cmiuc.domain.game.dto.RoomListDTO;
import com.gugu.cmiuc.domain.game.dto.RoomUserDTO;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.service.MemberService;
import com.gugu.cmiuc.global.stomp.dto.DataDTO;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import com.gugu.cmiuc.global.stomp.service.StompService;
import jakarta.annotation.Resource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;


@Slf4j
@RequiredArgsConstructor
@Repository
public class GameRoomStompRepository {

    // Redis cache
    private static final String CHAT_ROOMS = "GAME_ROOM"; // 게임룸 저장
    public static final String USER_COUNT = "USER_COUNT"; // 게임룸에 입장한 클라이언트수 저장
    public static final String ENTER_INFO = "ENTER_INFO"; // 게임룸에 입장한 클라이언트의 sessionId와 채팅룸 id를 맵핑한 정보 저장
    private final GameRoomEnterRedisRepository gameRoomEnterRedisRepository;//게임룸 입장 클라이언트 정보 관리이 대한 메소드
    private final RedisTemplate<String, Long> redisTemplate;
    private final StompService stompService;
    private final MemberService memberService;
    private final String RoomId_KEY = "UserId_RoomId";//userId로 roomId확인하는 키
    // RedisTemplate 주입 (데이터를 저장하고 조회를 위함)
    // Game Room을 저장하는 hash
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, RoomDTO> hashOpsGameRoom;
    // 사용자의 입장 정보를 저장하는 hash
    @Resource(name = "redisTemplate")
    private HashOperations<String, String, String> hashOpsEnterInfo;
    // 채팅방에 입장한 유저 수를 저장하기 위함
    @Resource(name = "redisTemplate")
    private ValueOperations<String, String> valueOps;

    // 모든 게임방 조회
    public List<RoomListDTO> findAllRoom() {
        List<RoomDTO> roomList = hashOpsGameRoom.values(CHAT_ROOMS);
        List<RoomListDTO> list = new ArrayList<>();

        //list에 방 정보 넣기
        for (RoomDTO room : roomList) {
            list.add(RoomListDTO.builder()
                    .curUserCnt(gameRoomEnterRedisRepository.getCurRoomUserCnt(room.getRoomId()))
                    .name(room.getName())
                    .roomId(room.getRoomId())
                    .build()
            );
        }

        Collections.reverse(list);
        return list;
    }

    // 게임방 생성 : 서버간 게임방 공유를 위해 redis hash에 저장한다.
    public RoomDTO createChatRoom(String name) {

        RoomDTO Room = RoomDTO.builder().name(name).build();
        hashOpsGameRoom.put(CHAT_ROOMS, Room.getRoomId(), Room);
        gameRoomEnterRedisRepository.createRoomUserInfo(Room.getRoomId());

        return Room;
    }
    public void deleteChatRoom(String roomId){
        log.info("찐으로 방도 지운다");
        hashOpsGameRoom.delete(CHAT_ROOMS,roomId);
    }

    // 특정 게임방 조회
    public RoomDTO findRoomById(String id) {
        return hashOpsGameRoom.get(CHAT_ROOMS, id);
    }

    //todo 방 존재여부 체크 및 예외처리
    public void validateRoom(String roomId) {
        RoomDTO room = findRoomById(roomId);
        if (room == null) {
            //예외처리
        }
    }

    //userId로 roomId값 넣어놓기
    public void setRoomIdForUserId(Long memberId, String roomId) {
        log.info("setRoomIdForUserId 실행");
        redisTemplate.opsForHash().put(RoomId_KEY, memberId, roomId);
        log.info("{}유저가 들어간 roomId:{}", memberId, roomId);
    }

    public void unsubscribeUser(Long memberId){
        if(memberId==null){
            return;
        }

        log.info("게임룸 퇴장 unsubscribeUser 시작");
        String roomId=getRoomIdByUserId(memberId);
        if(roomId==null){
            return;
        }

        //todo member 가져와야함
        LoginDTO loginDTO=memberService.getLoginMember(memberId);

        //퇴장 메세지 보내기
        DataDTO dataDTO=DataDTO.builder()
                .type(DataDTO.DataType.EXIT)
                .roomId(roomId)
                .data(loginDTO.getNickname()+"님이 퇴장하셨습니다")
                .build();

        stompService.sendGameChatMessage(dataDTO);

        //RoomUserDTO 관리
        gameRoomEnterRedisRepository.setUserExitInfo(roomId,loginDTO.getMemberId());

        //남은 사람 없을 경우
        boolean emptyRoom=false;
        if(gameRoomEnterRedisRepository.getCurRoomUserCnt(roomId)==0){
            log.info("방에 아무도 없어요!!! 방 지울겁니다!!!");
            emptyRoom=true;
            deleteGameRoom(roomId);
        }
        
        //data 현 상태 보내기
        dataDTO.setType(DataDTO.DataType.ROOM_CUR_USERS);
        dataDTO.setData(gameRoomEnterRedisRepository.getUserEnterInfo(roomId));
        stompService.sendGameChatMessage(dataDTO);

        log.info("roomId 삭제 시작");
        removeRoomIdForUserId(memberId);//roomId 삭제
        log.info("게임방 나가기 끝");

    }

    public String getRoomIdByUserId(Long memberId){
        if(memberId==null){
            return null;
        }
        return redisTemplate.opsForHash().get(RoomId_KEY,memberId).toString();
    }

    public void deleteGameRoom(String roomId){
        //redis에서 room 삭제
        gameRoomEnterRedisRepository.deleteGameRoomUserDTO(roomId);
        deleteChatRoom(roomId);
    }


    public void removeRoomIdForUserId(Long memberId){
        redisTemplate.opsForHash().delete(RoomId_KEY,memberId);
        //log.info("roomId 삭제 되었는가?: {}",checkExistRoom(userId));
    }

    //public boolean checkExistRoom(Long memberId){
    //    gameRoomEnterRedisRepository.getUserEnterInfo()
    //}

    //// 유저가 입장한 게임방ID와 유저 세션ID 맵핑 정보 저장
    //public void setUserEnterInfo(String sessionId, String roomId) {
    //    hashOpsEnterInfo.put(ENTER_INFO, sessionId, roomId);
    //}
    //
    //// 유저 세션으로 입장해 있는 게임방 ID 조회
    //public String getUserEnterRoomId(String sessionId) {
    //    return hashOpsEnterInfo.get(ENTER_INFO, sessionId);
    //}
    //
    //// 유저 세션정보와 맵핑된 게임방ID 삭제
    //public void removeUserEnterInfo(String sessionId) {
    //    hashOpsEnterInfo.delete(ENTER_INFO, sessionId);
    //}

    // 게임방 유저수 조회
    public long getUserCount(String roomId) {
        return Long.valueOf(Optional.ofNullable(valueOps.get(USER_COUNT + "_" + roomId)).orElse("0"));
    }

    // 게임방에 입장한 유저수 +1
    public long plusUserCount(String roomId) {
        return Optional.ofNullable(valueOps.increment(USER_COUNT + "_" + roomId)).orElse(0L);
    }

    // 게임방에 입장한 유저수 -1
    public long minusUserCount(String roomId) {
        return Optional.ofNullable(valueOps.decrement(USER_COUNT + "_" + roomId)).filter(count -> count > 0).orElse(0L);
    }
}

