package com.gugu.cmiuc.domain.chat.controller;

import com.gugu.cmiuc.domain.chat.dto.FriendChatMessageDTO;
import com.gugu.cmiuc.domain.chat.dto.FriendChatRoomDTO;
import com.gugu.cmiuc.domain.chat.entity.ChatRoom;
import com.gugu.cmiuc.domain.chat.repository.ChatRoomRepository;
import com.gugu.cmiuc.domain.chat.service.FriendChatRoomService;
import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import com.gugu.cmiuc.global.stomp.repository.StompRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/friends/chat")
@CrossOrigin(origins = { "*" }, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.POST} , maxAge = 6000)
public class FriendChatRoomApiController {

    private final StompRepository stompRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomRepository roomRepository;
    private final FriendChatRoomService chatRoomService;

    // 채팅방 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<FriendChatRoomDTO>> getAllChatRooms() {
        List<FriendChatRoomDTO> chatRooms = stompRepository.findAllRoom();
        return ResponseEntity.ok(chatRooms);
    }

    // 채팅방 생성
    @PostMapping("/room")
    public ResponseEntity<FriendChatRoomDTO> createChatRoom(@RequestParam(value = "name") String name) {
        log.info("방 이름 {} : ", name);
        FriendChatRoomDTO chatRoomDTO = stompRepository.createChatRoom(name);
        roomRepository.save(ChatRoom.builder().id(chatRoomDTO.getRoomId()).build());
        return ResponseEntity.status(HttpStatus.CREATED).body(chatRoomDTO);
    }

    // 아이디로 채팅방 조회
    @GetMapping("/room/{roomId}")
    public ResponseEntity<FriendChatRoomDTO> getChatRoomById(@PathVariable(value = "roomId") String roomId) {
        FriendChatRoomDTO chatRoomDTO = stompRepository.findRoomById(roomId);
        return ResponseEntity.ok(chatRoomDTO);
    }

    // 채팅방 아이디로 채팅 메세지 100개씩 가져오기
    @GetMapping("/room/{roomId}/messages")
    public ResponseEntity<List<FriendChatMessageDTO>> getPreviousMessages(@PathVariable(value = "roomId") String roomId, Pageable pageable) {
        List<FriendChatMessageDTO> messages = chatRoomService.getPreviousChatMessage(roomId, pageable);
        return ResponseEntity.ok(messages);
    }

    // 채팅방 아이디로 해당 채팅방 전체 메세지 수 가져오기
    @GetMapping("/room/{roomId}/count")
    public ResponseEntity<Integer> getMessageCount(@PathVariable(value = "roomId") String roomId) {
        int count = chatRoomService.getMessageCount(roomId);
        return ResponseEntity.ok(count);
    }
}
