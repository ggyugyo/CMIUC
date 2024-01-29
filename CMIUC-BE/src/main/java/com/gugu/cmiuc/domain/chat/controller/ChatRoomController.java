package com.gugu.cmiuc.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Slf4j
@Controller
@RequestMapping("/chat")
public class ChatRoomController {

    // 채팅방 view로 이동
    @GetMapping("/room")
    public String room(Model model) {
        return "friend/room";
    }

    // 채팅방 접속
    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable(value = "roomId") String roomId) {
        model.addAttribute("roomId", roomId);
        return "friend/roomdetail";
    }

}
