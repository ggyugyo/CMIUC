package com.gugu.cmiuc.domain.friend.controller;

import com.gugu.cmiuc.domain.friend.dto.FriendDTO;
import com.gugu.cmiuc.domain.friend.service.FriendService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/friends")
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.POST}, maxAge = 6000)
public class FriendApiController {

    private final FriendService friendService;

    // member id로 친구 목록(채팅방 목록) 가져오기
    @GetMapping("/{memberId}")
    public ResponseEntity<?> getAllFriends(@PathVariable(value = "memberId") Long memberId) {

        List<FriendDTO> friends = friendService.getAllRelationship(memberId);

        return ResponseEntity.ok(friends);
    }
}
