package com.gugu.cmiuc.domain.game.controller;

import com.gugu.cmiuc.domain.game.dto.RoomDTO;
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


    // 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<RoomDTO> createRoom(@RequestParam(value = "name") String name) {
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

}
