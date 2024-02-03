package com.gugu.cmiuc.domain.chat.controller;

import com.gugu.cmiuc.domain.chat.dto.FriendChatMessageDTO;
import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.security.oauth.entity.AuthTokensGenerator;
import com.gugu.cmiuc.global.stomp.dto.DataDTO;
import com.gugu.cmiuc.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
@Slf4j
public class StompFriendChatController {

    private final JwtTokenProvider jwtTokenProvider;
    private final StompService stompService;
    private final AuthTokensGenerator authTokensGenerator;

    /*
     websocket "/pub/friends/{roomId}/chat"로 들어오는 메세지를 처리한다.
     이때 클라이언트에서는 /pub/friends/{roomId}/chat 로 요청하게 되고 이것을 controller 가 받아서 처리한다. (pub)
     처리가 완료되면 /sub/friends/chat/room/{roomId} 로 메시지가 전송된다. (sub)
     */
    @MessageMapping("/friends/chat/{roomId}") // websocket으로 들어오는 메세지 발행을 처리한다.
    public void friendMessage(@DestinationVariable String roomId, FriendChatMessageDTO message, @Header("accessToken") String token) {

        log.info("friend chat 처리");
        log.info("메세지 전송 유저 아이디 : {}", message.getMemberId());

        String nickname = jwtTokenProvider.getUserNameFromJwt(token);

        // 로그인 회원 정보로 대화명 설정
        message.setSender(nickname);

        log.info("발신 message : {}", message);

        // DataDTO 객체 생성
        DataDTO data = DataDTO.builder()
                .type(DataDTO.DataType.FRIEND_CHAT)
                .roomId(roomId)
                .data(message)
                .build();

        // WebSocket에 발행된 메시지를 redis로 발행
        stompService.sendFriendChatMessage(data);
        // 메세지를 DB에 저장
        stompService.saveFriendChatMessage(message, roomId);
    }

    // 채팅방 입장!!!
    @MessageMapping("/friends/{roomId}/enter")
    public void enterFriendRoom(@DestinationVariable String roomId, @Header("AUTHORIZATION") String token) {
        Long memberId = authTokensGenerator.extractMemberId(token);
        log.info("ENTER === 친구 채팅방에 입장 : {} ", memberId);

        stompService.subscribeFriendRoom(roomId, memberId);

        log.info("입장 처리 끝============");
    }

    // 채팅방 퇴장!!
    @MessageMapping(value = "/friends/{roomId}/exit")
    public void exitFriendRoom(@Header("AUTHORIZATION") String token) {
        log.info("EXIT === 친구 채팅방 퇴장");

        Long memberId = authTokensGenerator.extractMemberId(token.replace("Bearer ", ""));
        stompService.unsubscribeFriendRoom(memberId);

        log.info("퇴장 처리 끝============");
    }

}
