package com.gugu.cmiuc.domain.game.controller;

import com.gugu.cmiuc.domain.game.dto.RoomDTO;
import com.gugu.cmiuc.domain.game.repository.GameRoomEnterRedisRepository;
import com.gugu.cmiuc.domain.game.repository.GameRoomStompRepository;
import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/chat")
public class GameRoomApiController {
    private final JwtTokenProvider jwtTokenProvider;
    private final GameRoomStompRepository gameRoomStompRepository;
    private final GameRoomEnterRedisRepository gameRoomEnterRedisRepository;


    // 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<RoomDTO> createRoom(@RequestParam(value = "name") String name) {//todo 현재는 테스트용으로 방제만 들어옴, 나중에 RoomDTO로 값이 와야함
        log.info("게임 방 이름 {} : ", name);
        RoomDTO room=gameRoomStompRepository.createChatRoom(name);//Redis에 방 생성

        return ResponseEntity.ok(room);
    }

    // 전체 게임방 조회
    @GetMapping("/rooms")
    public ResponseEntity<?> getRooms() {
        log.info("게임 방 리스트");
        return ResponseEntity.ok(gameRoomStompRepository.findAllRoom());
    }

    // roomId로 게임방 조회
    @GetMapping("/room/{roomId}")
    public ResponseEntity<?> roomInfo(@PathVariable(value = "roomId") String roomId) {
        return ResponseEntity.ok(gameRoomStompRepository.findRoomById(roomId));
    }

    // 로그인한 회원의 id 및 jwt 토큰 정보를 조회할 수 있도록 함
    @GetMapping("/user")
    public ResponseEntity<LoginDTO> getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();
        LoginDTO user=LoginDTO.builder().name(name).token(jwtTokenProvider.generateToken(name)).build();
        return  ResponseEntity.ok(user);
    }

    //선택한 방에 입장이 가능한지
    @GetMapping(value = "/{roomId}")
    public ResponseEntity<RoomDTO>RoomCheck(@PathVariable(value = "roomId")String roomId){
        log.info("방 입장 roomId:{}",roomId);

        if(gameRoomEnterRedisRepository.getCurRoomUserCnt(roomId)>=6){
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok().build();
    }

    //todo 방삭제 어떻게 처리할지 생각하기

}
