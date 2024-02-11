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

    public GamePlayDTO generateGame(String roomId, RoomDTO roomDTO) {
        String gameId = UUID.randomUUID().toString().replaceAll("-", "").substring(0, 10);

        gamePlayRepository.saveGameId(roomId, gameId);
        gamePlayRepository.saveRoomIdByGameId(roomId, gameId);

        List<RoomUserDTO> roomUserDTOList = gameRoomEnterRedisRepository.getUserEnterInfo(roomId);


        //GamePlay전체 정보 초기 세팅
        GamePlayDTO gamePlayDTO = GamePlayDTO.builder()
                .gameId(gameId)
                .curRound(1)
                .curTurn(roomUserDTOList.get(randomChoiceFirstTurn(roomDTO.getNowUserCnt())).getMemberId())
                .cheezeCnt(0)
                .openCnt(0)
                .mousetrap(0)
                .openCardNum(0)
                .actionCnt(0)
                .normalCnt(0)
                .winJob(-1)
                .tableCards(new ArrayList<>())
                .cards(generateRandomCard(roomDTO.getNowUserCnt()))
                .build();

        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);

        return gamePlayDTO;
    }

    //게임에 참여하는 gameuserDTO생성 및 값 세팅
    public void createGameUser(String roomId, String gameId) {
        log.info("gameUserDTO 생성");
        List<RoomUserDTO> roomUserDTOList = gameRoomEnterRedisRepository.getUserEnterInfo(roomId);
        List<Integer> jobChoice = randomChoiceJob(findGameUserList(gameId).size());//직업 랜덤 설정
        List<Integer> cards = shuffleCard(gameId);//카드 섞음
        //gameStartEndRepository.saveGameCard(gameId, card);//초기 카드 상태 저장

        //GameUserDTO를 만들어 준다
        for (RoomUserDTO roomUserDTO : roomUserDTOList) {
            GameUserDTO gameUserDTO = new GameUserDTO();
            gameUserDTO.setOrder(roomUserDTO.getOrder());
            gameUserDTO.setNickname(roomUserDTO.getNickname());
            gameUserDTO.setMemberId(roomUserDTO.getMemberId());
            gameUserDTO.setGameId(gameId);
            gameUserDTO.setJobId(jobChoice.get(roomUserDTO.getOrder()));

            gameUserDTO.setCards(generateDivideCard(cards, gameUserDTO.getOrder()));
            log.info("gameUserDTO setCard: {}", gameUserDTO.getCards());

            //조용히 카드인 1번 카드를 가지고 있으면 GamePlayDTO에 muteMemberId로 해당 유저 아이디를 set
            if (gameUserDTO.getCards().contains(1)) {
                GamePlayDTO gamePlayDTO = findGamePlayByGameId(gameId);
                gamePlayDTO.setMuteMemberId(gameUserDTO.getMemberId());
                gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);
            }

            gamePlayRepository.saveGameUser(gameUserDTO);//레디스에 저장하기
        }
    }

    public int randomChoiceFirstTurn(int nowUserCnt) {
        Random random = new Random();
        random.setSeed(System.currentTimeMillis());

        return random.nextInt(nowUserCnt);//0~5 숫자 중 리턴
    }

    public List<GameUserDTO> findGameUserList(String gameId) {
        return gamePlayRepository.findGameUserList(gameId);
    }


    //카드 랜덤으로 섞기(최초 생성을 위함)
    //todo 다시 고쳐야함..........인원수 조절가능하게
    public List<Integer> generateRandomCard(int nowUserCnt) {
        List<Integer> list = new ArrayList<>();

        int maxCardCnt = nowUserCnt * 5;
        for (int i = 1; i <= maxCardCnt + 1; i++) {
            list.add(i);
        }

        list.remove(randomChoiceFirstTurn(6));//액션카드 하나 걸렀음

        Collections.shuffle(list);//섞어줌
        return list;
    }

    //랜덤 직업 배정
    public List<Integer> randomChoiceJob(int nowUserCnt) {
        //4: 3,2  //5: 4,2   //6: 4,2
        List<Integer> joblist = new ArrayList<>(Arrays.asList(0, 0, 0, 1, 1));
        //0은 쥐, 1은 고양이
        if (nowUserCnt > 4) joblist.add(0);
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
        log.info("cards 길이가 얼만대......:{}", cards.toString());
        subCard = cards.subList(order * 5, order * 5 + 5);
        return subCard;
    }

    //카드뽑기
    public void pickCard(String gameId, int openCardNum) {
        GamePlayDTO gamePlayDTO = gamePlayRepository.getGamePlay(gameId);
        List<GameRoundDivInfoDTO> gameRoundDivInfoDTOList = findGameRoundDiv(gameId);
        GameActionDTO gameActionDTO = findGameActionById(gameId);

        List<Integer> cards = gamePlayDTO.getCards();//현재까지의 카드 리스트
        if (!gameActionDTO.isCanSeeCard()) {
            for (int i = 0; i < cards.size(); i++) {

                if (cards.get(i) == openCardNum) {
                    cards.remove(i);
                    break;
                }
            }

            gamePlayDTO.setCards(cards);
            gamePlayDTO.getTableCards().add(openCardNum);//뽑은 카드 정보 List에 추가하기
            gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);//변경된 사항 저장하기

            //현재 라운드에 대한 정보 수정
            for (GameRoundDivInfoDTO gameRoundDivInfoDTO : gameRoundDivInfoDTOList) {
                if (gameRoundDivInfoDTO.getRound() == gamePlayDTO.getCurRound()) {
                    gameRoundDivInfoDTO.getCard().add(openCardNum);
                    gamePlayRepository.saveGameRoundDiv(gameId, gameRoundDivInfoDTO);
                    break;
                }
            }
        }
    }

    //카드 뽑힌거에 따라서 사용자의 카드 영역도 수정
    //todo 덫/치즈 카드 먼저 return 하기
    public String changeGamePlayMakeDataType(String gameId, OpenCardDTO openCardDTO, LoginDTO loginDTO) {
        GamePlayDTO gamePlayDTO = gamePlayRepository.getGamePlay(gameId);
        List<GameRoundDivInfoDTO> gameRoundDivInfoDTOList = gamePlayRepository.findGameRoundDiv(gameId);
        GameRoundDivInfoDTO gameRoundDivInfoDTO = new GameRoundDivInfoDTO();
        List<GameUserDTO> gameUserDTOList = findGameUserList(gameId);
        String dataType = null;

        for (GameRoundDivInfoDTO gameRoundDivInfo : gameRoundDivInfoDTOList) {
            if (gameRoundDivInfoDTO.getRound() == gamePlayDTO.getCurRound()) {
                gameRoundDivInfoDTO = gameRoundDivInfo;
                break;
            }
        }

        log.info("현재 라운드에 뽑은 카드 수:{}", gamePlayDTO.getOpenCnt());

        deleteUserCard(gameId, openCardDTO);//해당 사용자 dto에서도 뽑힌 카드 제거
        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);

        if (openCardDTO.getOpenCardNum() <= 6) {//액션 카드
            gamePlayDTO.setActionCnt(gamePlayDTO.getActionCnt() + 1);
            gameRoundDivInfoDTO.setActionCnt(gameRoundDivInfoDTO.getActionCnt() + 1);
            GameActionDTO gameActionDTO = findGameActionById(gameId);

            switch (openCardDTO.getOpenCardNum()) {
                case 1:
                    //조용히 카드
                    gamePlayDTO.setMuteMemberId(0L);
                    dataType = "MUTE_OFF";
                    break;

                case 2:
                    //선택 계속하는 카드
                    gameActionDTO.setChoiceAllTurn(openCardDTO.getNextTurn());
                    dataType = "CHOICE_ALL_TURN";
                    break;

                case 3:
                    //카드 맛보기
                    gameActionDTO.setCanSeeCard(true);
                    dataType = "CAN_SEE_CARD";
                    break;

                case 4:
                    //뽑은 치즈 빼는 카드
                    List<Integer> tableCards = gamePlayDTO.getTableCards();
                    for (int i = 0; i < tableCards.size(); i++) {
                        if (tableCards.get(i) > 7 &&
                                tableCards.get(i) <= 7 + gamePlayRepository.findGameUserList(gameId).size()) {
                            tableCards.remove(i);
                            break;
                        }
                    }
                    dataType = "DELETE_CHEEZE_CARD";
                    break;

                case 5:
                    //내 카드 다 빼기

                    for (GameUserDTO gameUserDTO : gameUserDTOList) {
                        if (Objects.equals(gameUserDTO.getMemberId(), openCardDTO.getNextTurn())) {
                            gameUserDTO.setCards(new ArrayList<>());
                            gamePlayRepository.saveGameUser(gameUserDTO);
                            break;
                        }
                    }

                    dataType="DELETE_USER_CARDS";
                    break;

                case 6:
                    //직업 보여주기
                    int job=-1;
                    for (GameUserDTO gameUserDTO : gameUserDTOList) {
                        if (Objects.equals(gameUserDTO.getMemberId(), loginDTO.getMemberId())) {
                            job = gameUserDTO.getJobId();
                            break;
                        }
                    }
                    ShowJobDTO showJobDTO=ShowJobDTO.builder()
                            .showMemeberId(openCardDTO.getNextTurn())
                            .watchMemberId(loginDTO.getMemberId())
                            .job(job)
                            .build();
                    gameActionDTO.setShowJobDTO(showJobDTO);

                    dataType="SHOW_JOB";
                    break;
            }

            gamePlayRepository.saveGameActionById(gameId, gameActionDTO);

        } else if (openCardDTO.getOpenCardNum() == 7) {//덫 카드
            gamePlayDTO.setMousetrap(1);
            gameRoundDivInfoDTO.setMousetrap(1);
            dataType = "OPEN_CARD";

        } else if (openCardDTO.getOpenCardNum() > 7 && openCardDTO.getOpenCardNum() <= 7 + findGameUserList(gameId).size()) {
            gamePlayDTO.setCheezeCnt(gamePlayDTO.getCheezeCnt() + 1);
            gameRoundDivInfoDTO.setCheezeCnt(gameRoundDivInfoDTO.getCheezeCnt() + 1);
            dataType = "OPEN_CARD";
        } else {//일반카드
            gamePlayDTO.setNormalCnt(gamePlayDTO.getNormalCnt() + 1);//빈접시 카드+1
            gameRoundDivInfoDTO.setNormalCnt(gameRoundDivInfoDTO.getNormalCnt() + 1);
            dataType = "OPEN_CARD";
        }

        gamePlayRepository.saveGameRoundDiv(gameId, gameRoundDivInfoDTO);
        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);

        return dataType;
    }

    public void setDefaultGameAction(String gameId, GameActionDTO gameActionDTO){
        gameActionDTO.setShowJobDTO(null);
        gamePlayRepository.saveGameActionById(gameId,gameActionDTO);
    }

    public GamePlayDTO setWinJob(String gameId) {
        GamePlayDTO gamePlayDTO = findGamePlayByGameId(gameId);
        if (gamePlayDTO.getCheezeCnt() == 6) {
            gamePlayDTO.setWinJob(0);
        } else {
            gamePlayDTO.setWinJob(1);
        }

        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);

        return gamePlayDTO;
    }

    public String setGameEndDataType(int winJob) {
        if (winJob == 0) {
            return "GAME_END_MOUSE_WIN";
        } else {
            return "GAME_END_CAT_WIN";
        }
    }

    public void createGameAction(String gameId){
        gamePlayRepository.createGameAction(gameId);
    }

    public GameActionDTO findGameActionById(String gameId) {
        return gamePlayRepository.findGameActionById(gameId);
    }

    //유저가 가지고있는 카드 삭제
    public void deleteUserCard(String gameId, OpenCardDTO openCardDTO) {
        List<GameUserDTO> gameUserDTOList = gamePlayRepository.findGameUserList(gameId);
        GameActionDTO gameActionDTO = findGameActionById(gameId);

        if (!gameActionDTO.isCanSeeCard()) {
            for (GameUserDTO gameUserDTO : gameUserDTOList) {
                if (Objects.equals(openCardDTO.getNextTurn(), gameUserDTO.getMemberId())) {
                    List<Integer> removeCard = gameUserDTO.getCards();

                    for (int i = 0; i < removeCard.size(); i++) {
                        if (removeCard.get(i) == openCardDTO.getOpenCardNum()) {
                            removeCard.remove(i);
                            break;
                        }
                    }

                    gameUserDTO.setCards(removeCard);
                    gamePlayRepository.saveGameUser(gameUserDTO);
                    break;
                }
            }
        }

        gameActionDTO.setCanSeeCard(false);
        gamePlayRepository.saveGameActionById(gameId, gameActionDTO);
    }

    public GamePlayDTO findGamePlayByGameId(String gameId) {
        return gamePlayRepository.findGamePlayByGameId(gameId);
    }

    //새 라운드 게임정보 세팅
    public GamePlayDTO setGameNewRound(String gameId) {
        GamePlayDTO gamePlayDTO = gamePlayRepository.getGamePlay(gameId);
        List<Integer> cards = shuffleCard(gameId);//카드 랜덤으로 섞음
        GameActionDTO gameActionDTO = findGameActionById(gameId);

        if (gameActionDTO.getChoiceAllTurn() > 0) {
            gameActionDTO.setChoiceAllTurn(0L);
            gamePlayRepository.saveGameActionById(gameId, gameActionDTO);
        }

        log.info("현 라운드 뽑은 카드 수:{}", gamePlayDTO.getOpenCnt());

        gamePlayDTO.setCards(cards);
        gamePlayDTO.setCurRound(gamePlayDTO.getCurRound() + 1);//라운드 수 추가
        gamePlayDTO.setTableCards(new ArrayList<>());
        log.info("현재 라운드:{}", gamePlayDTO.getCurRound());
        setCardForGameUser(gameId, gamePlayDTO);//GameUSerDTO에 각자 카드 분배
        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);
        return gamePlayDTO;

    }

    //  0 1 2 3/ 4 5 6 7 /8 9
    //1인당 카드 시작=(초기 5장)-(라운드-1)=>초기값-라운드+1
    public void setCardForGameUser(String gameId, GamePlayDTO gamePlayDTO) {
        List<GameUserDTO> gameUserDTOList = gamePlayRepository.findGameUserList(gameId);
        int rootIdx = 5 - gamePlayDTO.getCurRound() + 1;
        log.info("현재 라운드{}의 카드 수{}", gamePlayDTO.getCurRound(), gamePlayDTO.getCards().size());

        //유저마다 해당되는 개수만큼 카드 정보 set
        for (int i = 0; i < gameUserDTOList.size(); i++) {
            gameUserDTOList.get(i).setCards(gamePlayDTO.getCards().subList(i * rootIdx, i * rootIdx + rootIdx));
            log.info("카드 다음 라운드 분배");
            gamePlayRepository.saveGameUser(gameUserDTOList.get(i));//레디스에 현재 정보 저장
        }
    }

    public void deleteGameUser(String gameId) {
        gamePlayRepository.deleteGameUser(gameId);
    }

    public void deleteGamePlay(String gameId) {
        gamePlayRepository.deleteGamePlay(gameId);
    }

    public void deleteGameRoundDivInfo(String gameId) {
        gamePlayRepository.deleteGameRoundDivInfo(gameId);
    }

    public void deleteGameId(String gameId) {
        gamePlayRepository.deleteGameId(gameId);
    }

    //다음턴 지정해주기(다음 차례, 열었는 카드 번호)
    public void setNexTurn(String gameId, OpenCardDTO openCardDTO) {
        GamePlayDTO gamePlayDTO = findGamePlayByGameId(gameId);
        GameActionDTO gameActionDTO = findGameActionById(gameId);
        gamePlayDTO.setOpenCardNum(openCardDTO.getOpenCardNum());

        if (!gameActionDTO.isCanSeeCard()) {
            gamePlayDTO.setOpenCnt(gamePlayDTO.getOpenCnt() + 1);//열었는 카드 수 +1

            if (gameActionDTO.getChoiceAllTurn() <= 0 || (gameActionDTO.getChoiceAllTurn() > 0 && gamePlayDTO.getOpenCnt() % 6 == 0)) {
                gamePlayDTO.setCurTurn(openCardDTO.getNextTurn());
            }
        }

        //if (!gameActionDTO.isCanSeeCard()) {
        //    gamePlayDTO.setCurTurn(openCardDTO.getNextTurn());
        //    gamePlayDTO.setOpenCnt(gamePlayDTO.getOpenCnt() + 1);//열었는 카드 수 +1
        //} else if (gameActionDTO.getChoiceAllTurn() <= 0) {
        //    //계속 뽑기 액션카드가 아닌 경우에만 다음 차례 지정
        //    gamePlayDTO.setCurTurn(openCardDTO.getNextTurn());
        //    gamePlayDTO.setOpenCnt(gamePlayDTO.getOpenCnt() + 1);//열었는 카드 수 +1
        //} else if (gameActionDTO.getChoiceAllTurn() > 0 && gamePlayDTO.getOpenCnt() % 6 == 0) {
        //    gamePlayDTO.setCurTurn(openCardDTO.getNextTurn());
        //}

        gamePlayRepository.saveGamePlay(gameId, gamePlayDTO);

    }

    public void createGameRoundDiv(String gameId) {
        //일단 4라운드 모두 객체를 생성해서 초기화해줍니당.
        for (int i = 0; i < 4; i++) {
            GameRoundDivInfoDTO gameRoundDivInfoDTO = GameRoundDivInfoDTO.builder()
                    .gameId(gameId)
                    .round(i + 1)
                    .normalCnt(0)
                    .mousetrap(0)
                    .actionCnt(0)
                    .cheezeCnt(0)
                    .card(new ArrayList<>())
                    .build();

            gamePlayRepository.saveGameRoundDiv(gameId, gameRoundDivInfoDTO);
        }
    }

    public List<GameRoundDivInfoDTO> findGameRoundDiv(String gameId) {
        return gamePlayRepository.findGameRoundDiv(gameId);

    }

    public String getRoomIdByGameId(String gameId) {
        return gamePlayRepository.getRoomIdByGameId(gameId);
    }

    ////사용자 ready dto 생성=> 사용자 입장시 생성
    //public void createReadyDTO(String roomId, LoginDTO loginDTO){
    //    GameReadyUserDTO gameReadyUserDTO=GameReadyUserDTO.builder()
    //            .memberId(loginDTO.getMemberId())
    //            .roomId(roomId)
    //            .readyOn(false)
    //            .memberId(loginDTO.getMemberId())
    //            .build();
    //
    //    saveReadyDTO(roomId, gameReadyUserDTO);
    //}
    //public void saveReadyDTO(String roomId, GameReadyUserDTO gameReadyUserDTO){
    //    gamePlayRepository.saveCreateReadyDTO(roomId, gameReadyUserDTO);
    //}

}
