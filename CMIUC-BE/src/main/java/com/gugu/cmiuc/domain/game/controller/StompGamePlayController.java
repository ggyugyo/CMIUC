package com.gugu.cmiuc.domain.game.controller;

import com.gugu.cmiuc.domain.game.dto.*;
import com.gugu.cmiuc.domain.game.repository.GameRoomEnterRedisRepository;
import com.gugu.cmiuc.domain.game.service.GamePlayService;
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

import java.util.List;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompGamePlayController {
    private final StompService stompService;
    private final GameRoomEnterRedisRepository gameRoomEnterRedisRepository;
    private GamePlayService gamePlayService;

    private final AuthTokensGenerator authTokensGenerator;
    private final MemberService memberService;

    @MessageMapping(value = "/games/{roomId}/ready")
    public void readyGame(@DestinationVariable String roomId, GameReadyUserDTO gameReadyUserDTO, @Header("token")String token){

        List<RoomUserDTO>roomUserDTOList=gameRoomEnterRedisRepository.setUserReady(roomId,gameReadyUserDTO.getMemberId());

        int readyCnt=gameRoomEnterRedisRepository.getUserReadyCnt(roomUserDTOList);

        //6명 다 레디 했다면..?
        if(readyCnt==6){
            log.info("6명 모두 ready 했음");
            log.info("게임 시작=====>");

            GamePlayDTO game= gamePlayService.generateGame(roomId);

            log.info("GamePlayDTO:{}",game);

            stompService.sendGameChatMessage(DataDTO.builder()
                    .type(DataDTO.DataType.START)
                    .roomId(roomId)
                    .data(GameRoundDTO.builder()
                            .gameId(game.getGameId())
                            .round(game.getRound())
                            .cheezeCnt(game.getCheezeCnt())
                            .openCardNum(game.getOpenCardNum())
                            .openCnt(game.getOpenCnt())
                            .curTurn(game.getCurTurn())//첫 순서 랜덤값으로 넘겨줌
                            .mousetrap(game.getMousetrap())
                            .gameUsers(gamePlayService.findGameUserList(game.getGameId()))//게임 참여하는 유저정보
                            .build())
                    .build());

            log.info("게임 시작 끝!!!");
        }else{
            log.info("래디레디");
            stompService.sendGameChatMessage(DataDTO.builder()
                    .type(DataDTO.DataType.READY)
                    .roomId(roomId)
                    .data(roomUserDTOList)
                    .build());
        }

    }

    //게임 시작
    //@MessageMapping(value = "/games/{roomId}/start")
    //public void startGame(@DestinationVariable String roomId, @Header("token") String token){
    //    log.info("게임 시작=====>");
    //
    //   GamePlayDTO game= gamePlayService.generateGame(roomId);
    //
    //   log.info("GamePlayDTO:{}",game);
    //
    //   stompService.sendGameChatMessage(DataDTO.builder()
    //           .type(DataDTO.DataType.START)
    //           .roomId(roomId)
    //           .data(GameRoundDTO.builder()
    //                   .gameId(game.getGameId())
    //                   .round(game.getRound())
    //                   .cheezeCnt(game.getCheezeCnt())
    //                   .openCardNum(game.getOpenCardNum())
    //                   .openCnt(game.getOpenCnt())
    //                   .curTurn(game.getCurTurn())//첫 순서 랜덤값으로 넘겨줌
    //                   .mousetrap(game.getMousetrap())
    //                   .gameUsers(gamePlayService.findGameUserList(game.getGameId()))//게임 참여하는 유저정보
    //                   .build())
    //           .build());
    //
    //   log.info("게임 시작 끝!!!");
    //}

    //카드 뽑음
    @MessageMapping(value = "/games/{gameId}/pick-card")
    public void pickCard(@DestinationVariable String gameId, OpenCardDTO openCardDTO, @Header("token") String token){
        gamePlayService.pickCard(gameId, openCardDTO.getOpenCardNum());//해당 카드 삭제
        String dataType= gamePlayService.changeGamePlayMakeDataType(gameId,openCardDTO);
        GamePlayDTO game= gamePlayService.findGamePlayByGameId(gameId);

        //todo dataDTO datatype설정하기
        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.valueOf(dataType)) //데이터 타입 어카죠...?
                .roomId(gameId)
                .data(GameRoundDTO.builder()
                        .gameId(gameId)
                        .round(game.getRound())
                        .cheezeCnt(game.getCheezeCnt())
                        .openCnt(game.getOpenCnt())
                        .curTurn(game.getCurTurn())
                        .gameUsers(gamePlayService.findGameUserList(gameId))
                        .build())
                .build());
    }

    //다음 라운드 세팅 하기
    @MessageMapping(value = "/games/{gameId}/next-round")
    public void setNextTurn(@DestinationVariable String gameId){
        log.info("다음 라운드 세팅");

        GamePlayDTO gamePlayDTO= gamePlayService.setGameNewRound(gameId);
        log.info("다음 라운드 세팅 변경 후 GamePlayDTO: {}",gamePlayDTO);

        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.NEW_ROUND_SET)
                .roomId(gameId)
                .data(GameRoundDTO.builder()
                        .gameId(gameId)
                        .round(gamePlayDTO.getRound())
                        .curTurn(gamePlayDTO.getCurTurn())
                        .openCnt(gamePlayDTO.getOpenCnt())
                        .cheezeCnt(gamePlayDTO.getCheezeCnt())
                        .openCardNum(gamePlayDTO.getOpenCardNum())
                        .mousetrap(gamePlayDTO.getMousetrap())
                        .gameUsers(gamePlayService.findGameUserList(gameId))
                        .build())
                .build());
        log.info("변경 끝!");

    }

    //게임종료(쥐덫 찾음)-고양이 승리
    @MessageMapping(value ="/games/{gameId}/end-cat")
    public void gameEndCatWin(@DestinationVariable String gameId){
        log.info("고양이가 이김.");

        //GameEndDTO 생성해서 정보전달
        //이 정보를 redis에 저장할 필요가 있을까?...=>일단 저장안하는 방식으로 진행해 보겠습니다
        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.GAME_END_CAT_WIN)
                .roomId(gameId)
                .data(GameEndDTO.builder()
                        .gameId(gameId)
                        .winJob(1)
                        .gameUserDTOList(gamePlayService.findGameUserList(gameId))
                        .build())
                .build());
        log.info("고양이 이김 처리 끝!");

        //여기서 바로 게임에 관련된 모든 정보 지우기...?....
    }

    //게임종료(치즈6개 찾음)- 쥐 승리
    @MessageMapping(value = "/games/{gameId}/end-mouse")
    public void gameEndMouseWin(@DestinationVariable String gameId){
        log.info("쥐가 이김.");

        //GameEndDTO 생성해서 정보전달
        //이 정보를 redis에 저장할 필요가 있을까?...=>일단 저장안하는 방식으로 진행해 보겠습니다
        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.GAME_END_MOUSE_WIN)
                .roomId(gameId)
                .data(GameEndDTO.builder()
                        .gameId(gameId)
                        .winJob(0)
                        .gameUserDTOList(gamePlayService.findGameUserList(gameId))
                        .build())
                .build());
        log.info("쥐 이김 처리 끝!");
    }

    //게임종료(모든 라운드 끝남)-고양이 승리
    @MessageMapping(value = "/games/{gameId}/end-round")
    public void RoundEndCatWin(@DestinationVariable String gameId ){
        log.info("모든 턴안에 치즈 6개 다 못찾. 고양이가 이김.");

        //GameEndDTO 생성해서 정보전달
        //이 정보를 redis에 저장할 필요가 있을까?...=>일단 저장안하는 방식으로 진행해 보겠습니다
        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.GAME_END_CAT_WIN)
                .roomId(gameId)
                .data(GameEndDTO.builder()
                        .gameId(gameId)
                        .winJob(1)
                        .gameUserDTOList(gamePlayService.findGameUserList(gameId))
                        .build())
                .build());
        log.info("고양이 이김 처리 끝!");
    }
}
