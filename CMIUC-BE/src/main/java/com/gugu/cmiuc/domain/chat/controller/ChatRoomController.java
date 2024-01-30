package com.gugu.cmiuc.domain.chat.controller;

import com.gugu.cmiuc.domain.chat.dto.ChatRoomDTO;
import com.gugu.cmiuc.global.stomp.repository.StompRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    private final StompRepository stompRepository;

    // 채팅방 view로 이동
    @GetMapping("/room")
    public String room(Model model) {
        return "friend/room";
    }

    // 채팅방 조회
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoomDTO> rooms() {
        List<ChatRoomDTO> chatRooms = stompRepository.findAllRoom();
        return stompRepository.findAllRoom();
    }

    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoomDTO createRoom(@RequestParam(value = "name") String name) {
        log.info("방 이름 {} : ", name);
        return stompRepository.createChatRoom(name);
    }

    // 채팅방 접속
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable(value = "roomId") String roomId) {
        model.addAttribute("roomId", roomId);
        return "friend/roomdetail";
    }

    // 아이디로 채팅방 조회
    @GetMapping("/room/{roomId}")
    @ResponseBody
    public ChatRoomDTO roomInfo(@PathVariable(value = "roomId") String roomId) {
        return stompRepository.findRoomById(roomId);
    }
}
