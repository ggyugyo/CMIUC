package com.gugu.cmiuc.domain.game.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gugu.cmiuc.domain.game.dto.GameReadyUserDTO;
import com.gugu.cmiuc.domain.game.dto.RoomDTO;
import com.gugu.cmiuc.domain.game.dto.RoomUserDTO;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Repository
@AllArgsConstructor
public class GameRoomEnterRedisRepository {
    private final RedisTemplate<String, String> redisTemplate;
    private final ObjectMapper objectMapper;
    private static String ENTER_INFO = "ENTER_INFO";


    //게임방의 유저DTO 껍대기 생성
    public void createRoomUserInfo(String roomId) {
        for (int i = 0; i < 6; i++) {
            RoomUserDTO roomUserDTO = new RoomUserDTO();
            roomUserDTO.setOrder(i);//순서 지정
            roomUserDTO.setState(0);//상태 생성-> 0:유저 없는 상태 1:유저정보 들어온 상태
            roomUserDTO.setReady(false);//게임 ready값 false 상태
            save(roomId, roomUserDTO);//생성시킨 DTO 객체를 레디스에 저장
        }
    }

    //유저 정보를 json형식으로 변환하여 레디스에 저장
    public void save(String roomId, RoomUserDTO roomUserDTO) {
        String key = generateKey(roomId);
        try {
            String jsonUserInfo = objectMapper.writeValueAsString(roomUserDTO);//객체를 스트링 형식 json으로 변환
            redisTemplate.opsForHash().put(key, Integer.toString(roomUserDTO.getOrder()), jsonUserInfo);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //방별로 유저정보를 레디스에 저장할때의 key값 생성
    public String generateKey(String roomId) {
        return ENTER_INFO + "roomId_" + roomId;
    }

    //레디스에 저장된 roomUser정보를 json->DTO로 변환
    public List<RoomUserDTO> changeToRoomUserDTO(List<Object> jsonList) {
        List<RoomUserDTO> roomUserDTOList = new ArrayList<>();
        for (Object json : jsonList) {
            try {
                RoomUserDTO roomUserDTO = objectMapper.readValue(json.toString(), RoomUserDTO.class);
                roomUserDTOList.add(roomUserDTO);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return roomUserDTOList;
    }


    //{roomId}에 해당하는 유저정보 리스트 뽑기
    public List<RoomUserDTO> getUserEnterInfo(String roomId) {
        String key = generateKey(roomId);
        List<Object> list = redisTemplate.opsForHash().values(key);
        return changeToRoomUserDTO(list);
    }

    //현재 해당룸에 있는 유저 수 구하기
    public int getCurRoomUserCnt(String roomId) {
        List<RoomUserDTO> roomUserDTOList = getUserEnterInfo(roomId);
        int userCnt = 0;

        for (RoomUserDTO roomUserDTO : roomUserDTOList) {
            if (roomUserDTO.getState() == 1) {//현재 유저가 있는 상태라면
                userCnt++;//방에 있는 유저수를 +1
            }
        }
        return userCnt;
    }

    //
    public RoomUserDTO enterUser(String roomId, LoginDTO loginDTO) {
        String key = generateKey(roomId);
        List<RoomUserDTO> roomUserDTOList = getUserEnterInfo(roomId);
        roomUserDTOList.sort(RoomUserDTO::compareTo);

        log.info(roomUserDTOList.toString());
        for (RoomUserDTO roomUserDTO : roomUserDTOList) {
            log.info("roomUserDTO:{}", roomUserDTO.getState());
            if (roomUserDTO.getState() == 0) {
                roomUserDTO.setUserId(loginDTO.getMemberId());
                roomUserDTO.setNickname(loginDTO.getNickname());
                roomUserDTO.setState(1);
                roomUserDTO.setReady(false);

                save(roomId, roomUserDTO);
                return roomUserDTO;
            }
        }
        //todo 빈자리가 없을때 예외처리 해야함
        return null;
    }

    //방에서 나갈때 roomuserDTO의 user 정보 지우기
    public void setUserExitInfo(String roomId, Long memberId) {
        String key = generateKey(roomId);
        List<RoomUserDTO> roomUserDTOList = getUserEnterInfo(roomId);

        for (RoomUserDTO roomUserDTO : roomUserDTOList) {
            if (roomUserDTO.getUserId() == memberId) {
                roomUserDTO.setState(0);
                roomUserDTO.setUserId(0L);
                roomUserDTO.setNickname("");
                roomUserDTO.setReady(false);
                save(roomId, roomUserDTO);
            }
        }
    }

    public void deleteGameRoomUserDTO(String roomId) {
        String key = generateKey(roomId);
        redisTemplate.delete(key);
    }

    //ready 유무 값 설정 및 레디스에 저장
    public List<RoomUserDTO> setUserReady(String roomId, GameReadyUserDTO gameReadyUserDTO) {
        List<RoomUserDTO> roomUserDTOList = getUserEnterInfo(roomId);

        for(RoomUserDTO roomUserDTO: roomUserDTOList){
            if(roomUserDTO.getUserId()==gameReadyUserDTO.getMemberId()){
                roomUserDTO.setReady(gameReadyUserDTO.isReadyOn());
                save(roomId, roomUserDTO);
                break;
            }
        }
        return roomUserDTOList;
    }

    public int getUserReadyCnt(List<RoomUserDTO>roomUserDTOList){
        int cnt=0;

        for(RoomUserDTO roomUserDTO:roomUserDTOList){
            if(roomUserDTO.isReady())
                cnt++;
        }
        return cnt;
    }

}
