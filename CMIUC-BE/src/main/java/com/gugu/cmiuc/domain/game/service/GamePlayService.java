package com.gugu.cmiuc.domain.game.service;

import com.gugu.cmiuc.domain.game.dto.*;
import com.gugu.cmiuc.domain.game.repository.GameRoomEnterRedisRepository;
import com.gugu.cmiuc.domain.game.repository.GamePlayRepository;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@AllArgsConstructor
@Service
public class GamePlayService {
    private final GameRoomEnterRedisRepository gameRoomEnterRedisRepository;
    private final GamePlayRepository gamePlayRepository;

    public GamePlayDTO generateGame(String roomId) {
        String gameId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 10);

        gamePlayRepository.saveGameId(roomId, gameId);
        //RoomDTO room=gameRoomStompRepository.findRoomById(roomId);
        GamePlayDTO gamePlayDTO = GamePlayDTO.builder()
                .gameId(gameId)
                .round(1)
                .curTurn(randomChoiceFirstTurn())
                .cheezeCnt(0)
                .openCnt(0)
                .mousetrap(0)
                .openCardNum(0)
                .cards(generateRandomCard())
                .build();
        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);
        createGameUser(roomId, gameId);

        return gamePlayDTO;
    }

    //게임에 참여하는 gameuserDTO생성 및 값 세팅
    public void createGameUser(String roomId, String gameId) {
        log.info("gameUserDTO 생성");
        List<RoomUserDTO> roomUserDTOList = gameRoomEnterRedisRepository.getUserEnterInfo(roomId);
        List<Integer> jobChoice = randomChoiceJob();//직업 랜덤 설정
        List<Integer> cards = shuffleCard(gameId);//카드 섞음
        //gameStartEndRepository.saveGameCard(gameId, card);//초기 카드 상태 저장

        //GameUserDTO를 만들어 준다
        for (RoomUserDTO roomUserDTO : roomUserDTOList) {
            GameUserDTO gameUserDTO = new GameUserDTO();
            gameUserDTO.setOrder(roomUserDTO.getOrder());
            gameUserDTO.setNickname(roomUserDTO.getNickname());
            gameUserDTO.setMemberId(roomUserDTO.getUserId());
            gameUserDTO.setGameId(gameId);
            gameUserDTO.setJobId(jobChoice.get(gameUserDTO.getOrder()));

            //todo card List 잘 값 들어가는지 확인하기...
            gameUserDTO.setCards(generateDivideCard(cards, gameUserDTO.getOrder()));
            log.info("gameUserDTO setCard: {}", gameUserDTO.getCards());

            gamePlayRepository.saveGameUser(gameUserDTO);//레디스에 저장하기
            //gameUserDTOList.add(gameUserDTO);
        }
    }

    public int randomChoiceFirstTurn() {
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());

        return random.nextInt(6);//0~5 숫자 중 리턴
    }

    public List<GameUserDTO> findGameUserList(String gameId) {
        return gamePlayRepository.findGameUserList(gameId);
    }


    //카드 랜덤으로 섞기(최초 생성을 위함)
    public List<Integer> generateRandomCard() {
        List<Integer> list = new ArrayList<>();
        for (int i = 1; i <= 30; i++) {
            list.add(i);
        }
        Collections.shuffle(list);//섞어줌
        return list;
    }

    //랜덤 직업 배정
    public List<Integer> randomChoiceJob() {
        List<Integer> joblist = new ArrayList<>();
        //0은 쥐, 1은 고양이
        joblist.add(0);
        joblist.add(0);
        joblist.add(0);
        joblist.add(0);
        joblist.add(1);
        joblist.add(1);

        Collections.shuffle(joblist);
        return joblist;
    }

    public List<Integer> shuffleCard(String gameId) {
        GamePlayDTO gamePlayDTO = gamePlayRepository.getGamePlay(gameId);
        List<Integer> cards = gamePlayDTO.getCards();

        Collections.shuffle(cards);
        return cards;
    }

    //초기(처음 게임 시작시) 카드 생성 및 분배)
    public List<Integer> generateDivideCard(List<Integer> cards, int order) {
        List<Integer> subCard = new ArrayList<>();
        subCard = cards.subList(order * 5, order * 5 + 5);
        return subCard;
    }

    public void pickCard(String gameId, int openCardNum) {
        GamePlayDTO gamePlayDTO = gamePlayRepository.getGamePlay(gameId);
        List<Integer> cards = gamePlayDTO.getCards();

        cards.remove(openCardNum);//해당 카드 삭제
        gamePlayRepository.saveGamePlay(gameId,gamePlayDTO);

    }

    //카드 뽑힌거에 따라서 사용자의 카드 영역도 수정
    //todo 덫/치즈 카드 먼저 return 하기
    public String changeGamePlayMakeDataType(String gameId, OpenCardDTO openCardDTO) {
        GamePlayDTO gamePlayDTO = gamePlayRepository.getGamePlay(gameId);
        String dataType = null;
        gamePlayDTO.setOpenCnt(gamePlayDTO.getOpenCnt() + 1);
        if (gamePlayDTO.getOpenCnt() >= 6) {//6개 카드 뽑았다면
            if(gamePlayDTO.getRound()>=4){
                dataType="END_ROUND_CARD";
            }else
                dataType = "OPEN_NEXTROUND_CARD";
        }

        if (openCardDTO.getOpenCardNum() <= 6) {//치즈 카드
            gamePlayDTO.setCheezeCnt(gamePlayDTO.getCheezeCnt() + 1);

            if (gamePlayDTO.getCheezeCnt() == 6) {//치즈를 6개 모았을 떄
                dataType = "OPEN_MOUSE_CARD";
            }
        } else if (openCardDTO.getOpenCardNum() == 7) {//덫 카드
            gamePlayDTO.setMousetrap(1);
            dataType = "OPEN_CAT_CARD";
        } else {
            dataType = "OPEN_NORMAL_CARD";
        }

        deleteUserCard(gameId, openCardDTO);//해당 사용자 dto에서도 뽑힌 카드 제거
        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);

        return dataType;
    }

    //유저가 가지고있는 카드 삭제
    public void deleteUserCard(String gameId, OpenCardDTO openCardDTO) {
        List<GameUserDTO> gameUserDTOList = gamePlayRepository.findGameUserList(gameId);
        for (GameUserDTO gameUserDTO : gameUserDTOList) {
            if (openCardDTO.getNextTurn() == gameUserDTO.getOrder()) {
                List<Integer> removeCard = gameUserDTO.getCards();
                removeCard.remove(openCardDTO.getOpenCardNum());
                gameUserDTO.setCards(removeCard);
                break;
            }
        }
    }

    public GamePlayDTO findGamePlayByGameId(String gameId){
        return gamePlayRepository.findGamePlayByGameId(gameId);
    }

    //새 라운드 게임정보 세팅
    public GamePlayDTO setGameNewRound(String gameId){
        GamePlayDTO gamePlayDTO = gamePlayRepository.getGamePlay(gameId);
        List<Integer>cards=shuffleCard(gameId);//카드 랜덤으로 섞음

        gamePlayDTO.setCards(cards);
        gamePlayDTO.setRound(gamePlayDTO.getRound()+1);//라운드 수 추가
        gamePlayDTO.setOpenCnt(0);
        gamePlayDTO.setOpenCardNum(0);

        setCardForGameUser(gameId, gamePlayDTO);//GameUSerDTO에 각자 카드 분배

        return gamePlayDTO;

    }

//  0 1 2 3/ 4 5 6 7 /8 9
    //1인당 카드 시작=(초기 5장)-(라운드-1)=>초기값-라운드+1
    public void setCardForGameUser(String gameId, GamePlayDTO gamePlayDTO){
        List<GameUserDTO>gameUserDTOList= gamePlayRepository.findGameUserList(gameId);
        int rootIdx=5-gamePlayDTO.getRound()+1;

        //유저마다 해당되는 개수만큼 카드 정보 set
        for(int i=0;i<gameUserDTOList.size();i++){
            gameUserDTOList.get(i).setCards(gamePlayDTO.getCards().subList(i*rootIdx,i*rootIdx+rootIdx));
            gamePlayRepository.saveGameUser(gameUserDTOList.get(i));//레디스에 현재 정보 저장
        }
    }

    //사용자 ready dto 생성=> 사용자 입장시 생성
    public void createReadyDTO(String roomId, LoginDTO loginDTO){
        GameReadyUserDTO gameReadyUserDTO=GameReadyUserDTO.builder()
                .memberId(loginDTO.getMemberId())
                .roomId(roomId)
                .readyOn(false)
                .memberId(loginDTO.getMemberId())
                .build();

        saveReadyDTO(roomId, gameReadyUserDTO);
    }
    public void saveReadyDTO(String roomId, GameReadyUserDTO gameReadyUserDTO){
        gamePlayRepository.saveCreateReadyDTO(roomId, gameReadyUserDTO);
    }

}
