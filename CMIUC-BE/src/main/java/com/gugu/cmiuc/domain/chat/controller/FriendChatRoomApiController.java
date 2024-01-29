package com.gugu.cmiuc.domain.chat.controller;

import com.gugu.cmiuc.domain.chat.dto.FriendChatRoomDTO;
import com.gugu.cmiuc.domain.chat.entity.ChatRoom;
import com.gugu.cmiuc.domain.chat.repository.ChatRoomRepository;
import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import com.gugu.cmiuc.global.stomp.repository.StompRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/chat")
public class FriendChatRoomApiController {

    private final StompRepository stompRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomRepository roomRepository;

    // 로그인한 회원의 id 및 jwt 토큰 정보를 조회할 수 있도록 함
    @GetMapping("/user")
    public LoginDTO getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String name = auth.getName();

        return LoginDTO.builder().name(name).token(jwtTokenProvider.generateToken(name)).build();
    }

    // 채팅방 조회
    @GetMapping("/rooms")
    public List<FriendChatRoomDTO> rooms() {
        List<FriendChatRoomDTO> chatRooms = stompRepository.findAllRoom();
        return stompRepository.findAllRoom();
    }

    // 채팅방 생성
    @PostMapping("/room")
    public FriendChatRoomDTO createRoom(@RequestParam(value = "name") String name) {
        log.info("방 이름 {} : ", name);

        FriendChatRoomDTO chatRoomDTO = stompRepository.createChatRoom(name);
        roomRepository.save(ChatRoom.builder().id(chatRoomDTO.getRoomId()).build());

        return chatRoomDTO;
    }

    // 아이디로 채팅방 조회
    @GetMapping("/room/{roomId}")
    public FriendChatRoomDTO roomInfo(@PathVariable(value = "roomId") String roomId) {
        return stompRepository.findRoomById(roomId);
    }
}
