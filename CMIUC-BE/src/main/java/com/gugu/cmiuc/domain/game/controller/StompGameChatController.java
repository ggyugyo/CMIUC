package com.gugu.cmiuc.domain.game.controller;

import com.gugu.cmiuc.domain.game.dto.GameChatMessageDTO;
import com.gugu.cmiuc.domain.game.dto.RoomDTO;
import com.gugu.cmiuc.domain.game.repository.GameRoomStompRepository;
import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.stomp.dto.DataDTO;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import com.gugu.cmiuc.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Slf4j
@Controller
@RequiredArgsConstructor
public class StompGameChatController {
    private final JwtTokenProvider jwtTokenProvider;
    private final StompService stompService;
    private final GameRoomStompRepository gameRoomStompRepository;

    //게임방 채팅
    @MessageMapping("/chat/{roomId}/chat")
    public void gameMessage(@DestinationVariable String roomId, GameChatMessageDTO message, @Header("token") String token){
        log.info("Game Chat 처리");

        String nickname=jwtTokenProvider.getUserNameFromJwt(token);
        // 로그인 회원 정보로 대화명 설정
        message.setSender(nickname);

        log.info("발신 message : {}",message);

        //DataDTO 객체 생성
        DataDTO data=DataDTO.builder()
                .type(DataDTO.DataType.GAME_CHAT)
                .roomId(roomId)
                .data(message)
                .build();

        //WebSocket에 발행된 메시지 redis로 발행
        stompService.sendChatMessage(data);
    }


    //todo 게임방 입장 마무리 해야함
    //게임방 입장
    @MessageMapping(value = "/chat/{roomId}/enter")
    public void enterGameRoom(@DestinationVariable String roomId, @Header("token") String token){
        log.info("게임방 입장(enterGameRoom)");

        String nickname=jwtTokenProvider.getUserNameFromJwt(token);//유저 nickname 가져옴
        RoomDTO room=gameRoomStompRepository.findRoomById(roomId);//들어가고자 하는 room 가져오기

        gameRoomStompRepository.validateRoom(roomId);



    }
}
