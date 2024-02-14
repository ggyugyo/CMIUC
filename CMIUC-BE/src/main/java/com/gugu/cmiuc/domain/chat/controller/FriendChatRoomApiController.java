package com.gugu.cmiuc.domain.chat.controller;

import com.gugu.cmiuc.domain.chat.dto.FriendChatMessageDTO;
import com.gugu.cmiuc.domain.chat.dto.FriendChatRoomDTO;
import com.gugu.cmiuc.domain.chat.service.FriendChatRoomService;
import com.gugu.cmiuc.global.stomp.repository.StompRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("/api/friends/chat")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.POST}, maxAge = 6000)
public class FriendChatRoomApiController {

    private final StompRepository stompRepository;
    private final FriendChatRoomService chatRoomService;

    // 채팅방 조회
    @GetMapping("/rooms")
    public ResponseEntity<List<FriendChatRoomDTO>> getAllChatRooms() {
        List<FriendChatRoomDTO> chatRooms = stompRepository.findAllRoom();
        return ResponseEntity.ok(chatRooms);
    }

    //// 채팅방 아이디로 채팅 메세지 100개씩 가져오기
    //@GetMapping("/room/{roomId}/messages")
    //public ResponseEntity<?> getPreviousMessages(@PathVariable(value = "roomId") String roomId, Pageable pageable) {
    //    Page<FriendChatMessageDTO> messages = chatRoomService.getLastChatMessage(roomId, pageable);
    //    return ResponseEntity.ok(messages);
    //}

    // 마지막 메세지 id로 다음 채팅 기록 가져오기
    @GetMapping("/room/{roomId}/messages/{lastIdx}")
    public ResponseEntity<?> getPreviousMessages(@PathVariable("roomId") String roomId, @PathVariable("lastIdx") Long lastIdx, Pageable pageable) {

        try {
            Page<FriendChatMessageDTO> messages = chatRoomService.getPreviousChatMessage(roomId, lastIdx, pageable);
            return ResponseEntity.ok(messages);

        } catch (Exception e) {
            log.error("다음 채팅 기록을 가져오는데 실패했습니다. : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("다음 채팅 기록을 가져오는데 실패했습니다.");
        }

    }

    // 채팅방 아이디로 해당 채팅방 마지막 메세지 id 가져오기
    @GetMapping("/room/{roomId}/count")
    public ResponseEntity<?> getMessageCount(@PathVariable(value = "roomId") String roomId) {
        
        log.info("마지막 메세지 아이디 조회 : {}", roomId);
        try {
            Long count = chatRoomService.getMessageIndex(roomId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            log.error("채팅 메세지 id를 가져오는데 실패");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("채팅 메세지 id를 가져오는데 실패했습니다.");
        }
    }
}
