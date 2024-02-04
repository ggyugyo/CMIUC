package com.gugu.cmiuc.domain.game.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gugu.cmiuc.domain.game.dto.GamePlayDTO;
import com.gugu.cmiuc.domain.game.dto.GameReadyUserDTO;
import com.gugu.cmiuc.domain.game.dto.GameUserDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Repository
public class GamePlayRepository {
    private final RedisTemplate<String, String>redisTemplate;
    private final ObjectMapper objectMapper;
    private static String GAMEID_GAMEPLAY="GameId_GamePlay";
    private static String ROOMID_GAMEID="RoomId_GameId";
    private static String GAMEID_USERINFO="GameId_UserInfo";

    private static String GAMEID_CARDINFO="GameId_CardInfo";
    private static String ROOMID_READYINFO="RoomId_ReadyInfo";


    //redis에 게임데이터(GamePlayDTO) 저장
    public void saveGamePlay(String gameId, GamePlayDTO gamePlayDTO){
        String key=generateGameKey(GAMEID_GAMEPLAY, gameId);

        try{
            String jsonGamePlayDTO=objectMapper.writeValueAsString(gamePlayDTO);
            redisTemplate.opsForHash().put(key,gameId, jsonGamePlayDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //redis key 생성
    public String generateGameKey(String preFix, String gameId){
        return preFix+"_gameId:"+gameId;
    }
    public String generateRoomGameKey(String preFix, String roomId){return preFix+"_roomId:"+roomId;}

    //레디스에 roomId를 key로 gameId
    public void saveGameId(String roomId, String gameId){
        String key=generateRoomGameKey(ROOMID_GAMEID,roomId);

        //레디스에
        try{
           redisTemplate.opsForHash().put(key,roomId,gameId);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    //레디스에 gameid를 key로 gameuserDTO 저장
    public void saveGameUser(GameUserDTO gameUserDTO){
        String key=generateGameKey(GAMEID_USERINFO, gameUserDTO.getGameId());

        try{
            String jsonGameUser=objectMapper.writeValueAsString(gameUserDTO);
            redisTemplate.opsForHash().put(key,gameUserDTO.getOrder(),gameUserDTO);
        }catch(Exception e){
            e.printStackTrace();
        }
    }

    //redis에서 GameUserDTO리스트 가져오기:
    public List<GameUserDTO> findGameUserList(String gameId){
        String key=generateGameKey(GAMEID_GAMEPLAY,gameId);
        List<Object> list=redisTemplate.opsForHash().values(key);
        return changeGameUserDTO(list);
    }

    public List<GameUserDTO> changeGameUserDTO(List<Object> jsonList){
        List<GameUserDTO> gameUserDTOList=new ArrayList<>();

        for(Object json:jsonList){
            try{
                GameUserDTO gameUserDTO=objectMapper.readValue(json.toString(), GameUserDTO.class);
                gameUserDTOList.add(gameUserDTO);

            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return gameUserDTOList;
    }

    public GamePlayDTO getGamePlay(String gameId){
        String key=generateGameKey(GAMEID_GAMEPLAY, gameId);
        Object gamePlayJson=null;

        try{
            gamePlayJson=redisTemplate.opsForHash().get(key,gameId);
        }catch (Exception e){
            e.printStackTrace();
        }
        return changeGamePlayDTO(gamePlayJson);
    }

    public GamePlayDTO changeGamePlayDTO(Object jsonGamePlay){
        GamePlayDTO gamePlayDTO=new GamePlayDTO();
        try{
            gamePlayDTO=objectMapper.readValue(jsonGamePlay.toString(),GamePlayDTO.class);
        }catch (Exception e){
            e.printStackTrace();
        }

        return gamePlayDTO;
    }

    public GamePlayDTO findGamePlayByGameId(String gameId){
        String key=generateGameKey(GAMEID_GAMEPLAY, gameId);
        Object gamePlayJson = null;

        try{
            gamePlayJson=redisTemplate.opsForHash().get(key,gameId);
        }catch(Exception e){
            e.printStackTrace();
        }
         return changeFindPlayDTO(gamePlayJson);
    }

    public GamePlayDTO changeFindPlayDTO(Object gamePlayJson){
        GamePlayDTO gamePlayDTO=new GamePlayDTO();
        try{
            gamePlayDTO=objectMapper.readValue(gamePlayJson.toString(),GamePlayDTO.class);
        }catch (Exception e){
            e.printStackTrace();
        }
        return gamePlayDTO;
    }

    //게임 레디 정보 저장
    public void saveCreateReadyDTO(String roomId, GameReadyUserDTO gameReadyUserDTO){
        //레디 리스트 부르기
        List<GameReadyUserDTO>gameReadyUserDTOList= getReadyList(roomId);
        //현재 추가하는 정보를 레디
        gameReadyUserDTOList.add(gameReadyUserDTO);

        saveReadyDTO(roomId, gameReadyUserDTOList);

    }

    public void saveReadyDTO(String roomId, List<GameReadyUserDTO> gameReadyUserDTOList){

    }

    public List<GameReadyUserDTO> getReadyList(String roomId){
        String key=generateRoomGameKey(ROOMID_READYINFO, roomId);
        List<Object> objectList=new ArrayList<>();
        try{
            objectList=redisTemplate.opsForHash().values(key);
        }catch (Exception e){
            e.printStackTrace();
        }

        return toListReadyDTO(objectList);
    }

    public List<GameReadyUserDTO>toListReadyDTO(List<Object>objectList){
        List<GameReadyUserDTO>gameReadyUserDTOList=new ArrayList<>();

        for(Object object: gameReadyUserDTOList){
            try{
                GameReadyUserDTO gameReadyUserDTO=objectMapper.readValue(object.toString(), GameReadyUserDTO.class);
                gameReadyUserDTOList.add(gameReadyUserDTO);
            }catch (Exception e){
                e.printStackTrace();
            }
        }

        return gameReadyUserDTOList;
    }

    ////해당 게임방의 현재 가지고 있는 카드 list
    //public void saveGameCard(String gameId, List<Integer> card){
    //    String key=generateGameKey(GAMEID_CARDINFO, gameId);
    //
    //    try{
    //        redisTemplate.opsForHash().put(key,gameId,card);
    //    }catch (Exception e){
    //        e.printStackTrace();
    //    }
    //}
    //
    ////이게 맞나
    //public List<Integer> findGameCardList(String gameId) {
    //    String key = generateGameKey(GAMEID_CARDINFO, gameId);
    //    Object card = null;
    //    try {
    //        card = redisTemplate.opsForHash().values(key);
    //    } catch (Exception e) {
    //        e.printStackTrace();
    //    }
    //
    //    return toChangeListCard(card);
    //
    //}
    //
    //public List<Integer> toChangeListCard(Object objectCard) {
    //    List<Integer> card = new ArrayList<>();
    //    try {
    //        log.info("List card 역직렬화 시작");
    //        card = objectMapper.readValue(objectCard.toString(), List.class);
    //        log.info("이게 맞나..? List<Integer> card:{}", card);
    //    } catch (Exception e) {
    //        e.printStackTrace();
    //    }
    //    return card;
    //}

}
