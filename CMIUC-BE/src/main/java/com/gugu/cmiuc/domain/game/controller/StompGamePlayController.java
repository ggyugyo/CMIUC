package com.gugu.cmiuc.domain.game.controller;

import com.gugu.cmiuc.domain.game.dto.*;
import com.gugu.cmiuc.domain.game.repository.GameRoomEnterRedisRepository;
import com.gugu.cmiuc.domain.game.repository.GameRoomStompRepository;
import com.gugu.cmiuc.domain.game.service.GamePlayService;
import com.gugu.cmiuc.domain.game.service.MemberRecordService;
import com.gugu.cmiuc.domain.member.service.MemberService;
import com.gugu.cmiuc.global.security.oauth.entity.AuthTokensGenerator;
import com.gugu.cmiuc.global.stomp.dto.DataDTO;
import com.gugu.cmiuc.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompGamePlayController {
    private final StompService stompService;
    private final GameRoomEnterRedisRepository gameRoomEnterRedisRepository;
    private final MemberRecordService memberRecordService;
    private final GameRoomStompRepository gameRoomStompRepository;
    private final GamePlayService gamePlayService;

    private final AuthTokensGenerator authTokensGenerator;
    private final MemberService memberService;

    @MessageMapping(value = "/games/{roomId}/ready")
    public void readyGame(@DestinationVariable String roomId, GameReadyUserDTO gameReadyUserDTO, @Header("accessToken") String token) {
        log.info("레디합니다 레디합니다 레디합니다");
        List<RoomUserDTO> roomUserDTOList = gameRoomEnterRedisRepository.setUserReady(roomId, gameReadyUserDTO);
        int readyCnt = gameRoomEnterRedisRepository.getUserReadyCnt(roomUserDTOList);
        RoomDTO roomDTO = gameRoomStompRepository.findRoomById(roomId);

        log.info("현재 있는 인원수 모두 ready");
        log.info("게임 시작=====>");

        GamePlayDTO game = gamePlayService.generateGame(roomId, roomDTO);
        gamePlayService.createGameUser(roomId, game.getGameId());
        gamePlayService.createGameRoundDiv(game.getGameId());

        log.info("GamePlayDTO:{}", game);
        List<GameUserDTO> gameUserDTOList = gamePlayService.findGameUserList(game.getGameId());
        Collections.sort(gameUserDTOList);//order 순서로 정렬합니다.
        List<GameRoundDivInfoDTO> gameRoundDivInfoDTOList = gamePlayService.findGameRoundDiv(game.getGameId());

        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.START)
                .roomId(roomId)
                .data(GameRoundDTO.builder()
                        .gamePlayDTO(game)
                        .gameAllRound(gameRoundDivInfoDTOList)
                        .gameUsers(gameUserDTOList)
                        .build())
                .build());

        log.info("게임 시작 끝!!!");

        //todo 놔두세요 놔두세요 놔두세요 놔두세요 놔두세요
        //6명 다 레디 했다면..?
        //if (readyCnt == roomDTO.getNowUserCnt()) {
        //    log.info("현재 있는 인원수 모두 ready");
        //    log.info("게임 시작=====>");
        //
        //    GamePlayDTO game = gamePlayService.generateGame(roomId, roomDTO);
        //    gamePlayService.createGameUser(roomId, game.getGameId());
        //    gamePlayService.createGameRoundDiv(game.getGameId());
        //
        //    log.info("GamePlayDTO:{}", game);
        //    List<GameUserDTO> gameUserDTOList = gamePlayService.findGameUserList(game.getGameId());
        //    Collections.sort(gameUserDTOList);//order 순서로 정렬합니다.
        //    List<GameRoundDivInfoDTO> gameRoundDivInfoDTOList = gamePlayService.findGameRoundDiv(game.getGameId());
        //
        //    stompService.sendGameChatMessage(DataDTO.builder()
        //            .type(DataDTO.DataType.START)
        //            .roomId(roomId)
        //            .data(GameRoundDTO.builder()
        //                    .gamePlayDTO(game)
        //                    .gameAllRound(gameRoundDivInfoDTOList)
        //                    .gameUsers(gameUserDTOList)
        //                    .build())
        //            .build());
        //
        //    log.info("게임 시작 끝!!!");
        //} else {
        //    log.info("래디레디");
        //    log.info("아직 6명 다 레디된건 아님요");
        //    stompService.sendGameChatMessage(DataDTO.builder()
        //            .type(DataDTO.DataType.READY)
        //            .roomId(roomId)
        //            .data(roomUserDTOList)
        //            .build());
        //}
    }

    //카드 뽑음
    //여기는 뽑은 카드 처리만 할거임
    @MessageMapping(value = "/games/{gameId}/pick-card")
    public void pickCard(@DestinationVariable String gameId, OpenCardDTO openCardDTO, @Header("accessToken") String token) {
        log.info("카드 뽑은거 처리 시작!");

        gamePlayService.pickCard(gameId, openCardDTO.getOpenCardNum());//해당 카드 삭제
        gamePlayService.setNexTurn(gameId, openCardDTO);
        gamePlayService.changeGamePlayMakeDataType(gameId, openCardDTO);

        GamePlayDTO gamePlayDTO = gamePlayService.findGamePlayByGameId(gameId);
        int jobIdx = -1;

        List<GameUserDTO> gameUsers = gamePlayService.findGameUserList(gameId);

        //open card를 datatype에서 구분하기/ 값 자체에서 구분하기=>고르기
        //if (dataType.equals("NEW_ROUND_SET")) {
        //    gamePlayDTO = gamePlayService.setGameNewRound(gameId);
        //    gameUsers = gamePlayService.findGameUserList(gameId);
        //
        //}

        //    gamePlayDTO = gamePlayService.findGamePlayByGameId(gameId);

        //if (dataType.equals("GAME_END_CAT_WIN")) {
        //    //1은 고양이
        //
        //    jobIdx = 1;
        //    updateMemberRecord(gameUsers, jobIdx);
        //
        //} else if (dataType.equals("GAME_END_MOUSE_WIN")) {
        //    //0은 쥐
        //    jobIdx = 0;
        //
        //    updateMemberRecord(gameUsers, jobIdx);
        //} else {
        //    jobIdx = -1;
        //}


        gamePlayDTO.setWinJob(jobIdx);

        GameRoundDTO gameRoundDTO = GameRoundDTO.builder()
                .gamePlayDTO(gamePlayDTO)
                .gameUsers(gameUsers)
                .gameAllRound(gamePlayService.findGameRoundDiv(gameId))
                .build();

        //GameRoundDTO gameRoundDTO = GameRoundDTO.builder()
        //        .gameId(gameId)
        //        .round(gamePlayDTO.getCurRound())
        //        .curTurn(gamePlayDTO.getCurTurn())
        //        .openCnt(gamePlayDTO.getOpenCnt())
        //        .cheezeCnt(gamePlayDTO.getCheezeCnt())
        //        .openCardNum(gamePlayDTO.getOpenCardNum())
        //        .mousetrap(gamePlayDTO.getMousetrap())
        //        .winJob(jobIdx)
        //        .gameUsers(gameUsers)
        //        .build();

        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.OPEN_CARD)
                .roomId(gameId)
                .data(gameRoundDTO)
                .build());

        log.info("내가 보낸 DataRoundDTO:{}", gameRoundDTO);
        log.info("변경 끝!");

        //if(dataType.equals("GAME_END_CAT_WIN") || dataType.equals("GAME_END_MOUSE_WIN")){
        //    //게임 종료 휴 다 삭제
        //    String roomId=gamePlayService.getRoomIdByGameId(gameId);
        //    gamePlayService.deleteGamePlay(gameId);
        //    gamePlayService.deleteGameRoundDivInfo(gameId);
        //    gamePlayService.deleteGameUser(gameId);
        //    gamePlayService.deleteGameId(gameId);
        //
        //    gameRoomEnterRedisRepository.setUserReadyFalse(roomId);
        //}

        //todo 게임이 끝날 때 게임정보 삭제
        //오류 날 수도 있으니까 밑에 오류 잠시 좀 나둬주세용
    }

    @MessageMapping("/games/{gameId}/new-round")
    public void setNewRound(@DestinationVariable String gameId) {
        log.info("다음 라운드 세팅 시작");
        //카드는 다 정리함
        //다음라운드 세팅만 하면 됨
        GamePlayDTO gamePlayDTO = gamePlayService.setGameNewRound(gameId);
        List<GameUserDTO> gameUsers = gamePlayService.findGameUserList(gameId);

        int jobIdx = -1;
        gamePlayDTO.setWinJob(jobIdx);

        GameRoundDTO gameRoundDTO = GameRoundDTO.builder()
                .gamePlayDTO(gamePlayDTO)
                .gameUsers(gameUsers)
                .gameAllRound(gamePlayService.findGameRoundDiv(gameId))
                .build();

        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.NEW_ROUND_SET)
                .roomId(gameId)
                .data(gameRoundDTO)
                .build());

        log.info("다음 라운드 세팅 끝");


    }

    @MessageMapping("/games/{gameId}/game-end")
    public void gameEnd(@DestinationVariable String gameId) {
        log.info("게임 끝 처리 시작");
        List<GameUserDTO> gameUsers = gamePlayService.findGameUserList(gameId);
        //카드 확인하기
        GamePlayDTO gamePlayDTO = gamePlayService.setWinJob(gameId);
        String dataType = gamePlayService.setGameEndDataType(gamePlayDTO.getWinJob());
        log.info("게임 승리 dataType:{}", dataType);

        updateMemberRecord(gameUsers, gamePlayDTO.getWinJob());

        //GameRoundDTO gameRoundDTO = GameRoundDTO.builder()
        //        .gamePlayDTO(gamePlayDTO)
        //        .gameUsers(gameUsers)
        //        .gameAllRound(gamePlayService.findGameRoundDiv(gameId))
        //        .build();

        GameEndDTO gameEndDTO = GameEndDTO.builder()
                .gameId(gameId)
                .gameUserDTOList(gameUsers)
                .winJob(gamePlayDTO.getWinJob())
                .build();

        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.valueOf(dataType))
                .roomId(gameId)
                .data(gameEndDTO)
                .build());
        log.info("결과 처리 끝");
    }

    // 멤버 전적 갱신
    public void updateMemberRecord(List<GameUserDTO> gameUsers, int winId) {
        List<MemberRecordDTO> memberRecordDTOList = new ArrayList<>();

        for (GameUserDTO gameUser : gameUsers) {

            boolean isWin = gameUser.getJobId() == winId ? true : false; // 고양이 1 == 1 이면 true

            memberRecordDTOList.add(MemberRecordDTO.builder()
                    .memberId(gameUser.getMemberId())
                    .job(gameUser.getJobId())
                    .win(isWin)
                    .build());
        }
        memberRecordService.setMemberRecord(memberRecordDTOList);
    }

    ////다음 라운드 세팅 하기
    //@MessageMapping(value = "/games/{gameId}/next-round")
    //public void setNextTurn(@DestinationVariable String gameId){
    //    log.info("다음 라운드 세팅");
    //
    //    GamePlayDTO gamePlayDTO= gamePlayService.setGameNewRound(gameId);
    //    log.info("다음 라운드 세팅 변경 후 GamePlayDTO: {}",gamePlayDTO);
    //
    //    stompService.sendGameChatMessage(DataDTO.builder()
    //            .type(DataDTO.DataType.NEW_ROUND_SET)
    //            .roomId(gameId)
    //            .data(GameRoundDTO.builder()
    //                    .gameId(gameId)
    //                    .round(gamePlayDTO.getRound())
    //                    .curTurn(gamePlayDTO.getCurTurn())
    //                    .openCnt(gamePlayDTO.getOpenCnt())
    //                    .cheezeCnt(gamePlayDTO.getCheezeCnt())
    //                    .openCardNum(gamePlayDTO.getOpenCardNum())
    //                    .mousetrap(gamePlayDTO.getMousetrap())
    //                    .gameUsers(gamePlayService.findGameUserList(gameId))
    //                    .build())
    //            .build());
    //    log.info("변경 끝!");
    //
    //}
    //
    ////게임종료(쥐덫 찾음)-고양이 승리
    //@MessageMapping(value ="/games/{gameId}/end-cat")
    //public void gameEndCatWin(@DestinationVariable String gameId){
    //    log.info("고양이가 이김.");
    //
    //    //GameEndDTO 생성해서 정보전달
    //    //이 정보를 redis에 저장할 필요가 있을까?...=>일단 저장안하는 방식으로 진행해 보겠습니다
    //    stompService.sendGameChatMessage(DataDTO.builder()
    //            .type(DataDTO.DataType.GAME_END_CAT_WIN)
    //            .roomId(gameId)
    //            .data(GameEndDTO.builder()
    //                    .gameId(gameId)
    //                    .winJob(1)
    //                    .gameUserDTOList(gamePlayService.findGameUserList(gameId))
    //                    .build())
    //            .build());
    //    log.info("고양이 이김 처리 끝!");
    //
    //    //여기서 바로 게임에 관련된 모든 정보 지우기...?....
    //}
    //
    ////게임종료(치즈6개 찾음)- 쥐 승리
    //@MessageMapping(value = "/games/{gameId}/end-mouse")
    //public void gameEndMouseWin(@DestinationVariable String gameId){
    //    log.info("쥐가 이김.");
    //
    //    //GameEndDTO 생성해서 정보전달
    //    //이 정보를 redis에 저장할 필요가 있을까?...=>일단 저장안하는 방식으로 진행해 보겠습니다
    //    stompService.sendGameChatMessage(DataDTO.builder()
    //            .type(DataDTO.DataType.GAME_END_MOUSE_WIN)
    //            .roomId(gameId)
    //            .data(GameEndDTO.builder()
    //                    .gameId(gameId)
    //                    .winJob(0)
    //                    .gameUserDTOList(gamePlayService.findGameUserList(gameId))
    //                    .build())
    //            .build());
    //    log.info("쥐 이김 처리 끝!");
    //}
    //
    ////게임종료(모든 라운드 끝남)-고양이 승리
    //@MessageMapping(value = "/games/{gameId}/end-round")
    //public void RoundEndCatWin(@DestinationVariable String gameId ){
    //    log.info("모든 턴안에 치즈 6개 다 못찾. 고양이가 이김.");
    //
    //    //GameEndDTO 생성해서 정보전달
    //    //이 정보를 redis에 저장할 필요가 있을까?...=>일단 저장안하는 방식으로 진행해 보겠습니다
    //    stompService.sendGameChatMessage(DataDTO.builder()
    //            .type(DataDTO.DataType.GAME_END_CAT_WIN)
    //            .roomId(gameId)
    //            .data(GameEndDTO.builder()
    //                    .gameId(gameId)
    //                    .winJob(1)
    //                    .gameUserDTOList(gamePlayService.findGameUserList(gameId))
    //                    .build())
    //            .build());
    //    log.info("고양이 이김 처리 끝!");
    //}
}
