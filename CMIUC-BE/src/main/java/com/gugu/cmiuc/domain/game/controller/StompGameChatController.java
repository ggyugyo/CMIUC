package com.gugu.cmiuc.domain.game.controller;

import com.gugu.cmiuc.domain.game.dto.GameChatMessageDTO;
import com.gugu.cmiuc.domain.game.dto.RoomDTO;
import com.gugu.cmiuc.domain.game.dto.RoomDetailDTO;
import com.gugu.cmiuc.domain.game.repository.GameRoomEnterRedisRepository;
import com.gugu.cmiuc.domain.game.repository.GameRoomStompRepository;
import com.gugu.cmiuc.domain.game.service.GamePlayService;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.service.MemberService;
import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.security.oauth.entity.AuthTokensGenerator;
import com.gugu.cmiuc.global.stomp.dto.DataDTO;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import com.gugu.cmiuc.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
//@RequestMapping("/games")
public class StompGameChatController {
    private final JwtTokenProvider jwtTokenProvider;
    private final StompService stompService;
    private final GameRoomStompRepository gameRoomStompRepository;
    private final GameRoomEnterRedisRepository gameRoomEnterRedisRepository;
    private final GamePlayService gamePlayService;
    private final AuthTokensGenerator authTokensGenerator;
    private final MemberService memberService;

    //게임방 입장
    @MessageMapping("/games/room/{roomId}")
    public void enterGameRoom(@DestinationVariable String roomId, @Header("accessToken") String token){
        log.info("게임방 입장(enterGameRoom)");
        log.info("게임방에 입장 했습니다!!!!!!!!! {}");
        
        Long memberId  = Long.parseLong(jwtTokenProvider.getUserNameFromJwt(token));

        //todo 현재는 닉네임만 들고옴, 추후에 user 정보를 들고오는 것으로 바꿔야함
        LoginDTO loginDTO = memberService.getLoginMember(memberId);

        log.info("게임방에 입장하는 유저:{}", loginDTO.getMemberId());

        RoomDTO room=gameRoomStompRepository.findRoomById(roomId);//들어가고자 하는 room 가져오기

        //gameRoomStompRepository.validateRoom(roomId);
        gameRoomStompRepository.setRoomIdForUserId(memberId, roomId);//유저가 해당 게임룸에 있음을 관리
        gameRoomEnterRedisRepository.enterUser(roomId,loginDTO);//게임룸 자리 관리

        //게임 레디 dto 설정
        //gamePlayService.createReadyDTO(roomId, loginDTO);

        RoomDetailDTO roomDetailDTO=RoomDetailDTO.builder()
                .name(room.getName())
                .roomUsers(gameRoomEnterRedisRepository.getUserEnterInfo(roomId))
                .message(loginDTO.getNickname()+"님이 입장하셨습니다.")
                .build();

        stompService.sendGameChatMessage(DataDTO.builder()
                .type(DataDTO.DataType.ENTER)
                .roomId(roomId)
                .data(roomDetailDTO)
                .build());

        log.info("입장 완!!");
    }

    //게임방 채팅
    @MessageMapping("/games/room/{roomId}/chat")
    public void gameMessage(@DestinationVariable String roomId, GameChatMessageDTO message, @Header("accessToken") String token){
        log.info("Game Chat 처리");

        Long memberId  = Long.parseLong(jwtTokenProvider.getUserNameFromJwt(token));
        LoginDTO loginDTO = memberService.getLoginMember(memberId);

        // 로그인 회원 정보로 대화명 설정
        message.setSender(loginDTO.getNickname());

        log.info("발신 message : {}",message);

        //DataDTO 객체 생성
        DataDTO data=DataDTO.builder()
                .type(DataDTO.DataType.GAME_CHAT)
                .roomId(roomId)
                .data(message)
                .build();

        //WebSocket에 발행된 메시지 redis로 발행
        stompService.sendGameChatMessage(data);
    }

    //방 퇴장
    @MessageMapping("/games/room/{roomId}/exit")
    public void exit(@DestinationVariable String roomId, @Header("accessToken") String token){
        log.info("방 퇴장");

        //todo 유저 정보 들고오기
        Long memberId  = Long.parseLong(jwtTokenProvider.getUserNameFromJwt(token));
        LoginDTO loginDTO = memberService.getLoginMember(memberId);

        gameRoomStompRepository.unsubscribeUser(memberId);


        log.info("방 퇴장 끝");

    }
}
