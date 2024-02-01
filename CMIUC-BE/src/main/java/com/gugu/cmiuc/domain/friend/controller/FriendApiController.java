package com.gugu.cmiuc.domain.friend.controller;

import com.gugu.cmiuc.domain.friend.dto.FriendRequestRequestDTO;
import com.gugu.cmiuc.domain.friend.dto.FriendRequestResponseDTO;
import com.gugu.cmiuc.domain.friend.dto.FriendResponseDTO;
import com.gugu.cmiuc.domain.friend.repository.FriendStompRepository;
import com.gugu.cmiuc.domain.friend.service.FriendRequestService;
import com.gugu.cmiuc.domain.friend.service.FriendService;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    private final FriendRequestService friendRequestService;
    private final MemberService memberService;
    private final FriendStompRepository friendStompRepository;

    // member id로 친구 목록(채팅방 목록) 가져오기
    @GetMapping("/{memberId}")
    public ResponseEntity<?> getAllFriends(@PathVariable(value = "memberId") Long memberId) {

        List<FriendResponseDTO> friends = friendService.getAllRelationship(memberId);
        return ResponseEntity.ok(friends);
    }

    // 내 id와 친구 아이디로 친구 신청
    @PostMapping("/request")
    public ResponseEntity<?> sendFriendRequest(@RequestBody FriendRequestRequestDTO friendRequestRequestDTO) {
        log.info("친구 신청 : {} => {}", friendRequestRequestDTO.getSenderId(), friendRequestRequestDTO.getReceiverNickname());
        try {

            Member receiver = memberService.getMemberIdByNickName(friendRequestRequestDTO.getReceiverNickname());

            if (receiver == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("없는 사용자 입니다.");
            }
            boolean result = friendRequestService.sendFriendRequest(friendRequestRequestDTO.getSenderId(), receiver.getId());
            return ResponseEntity.status(HttpStatus.CREATED).body(result);

        } catch (Exception e) {
            log.error("친구 신청 실패 : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("친구 요청을 보내는데 실패했습니다.");
        }
    }

    // 내가 받은 친구 신청 목록
    @GetMapping("/{memberId}/friend-requests")
    public ResponseEntity<?> getFriendRequestList(@PathVariable("memberId") Long memberId) {

        log.info("친구 요청 리스트 : {}", memberId);

        try {
            List<FriendRequestResponseDTO> requestDTOList = friendRequestService.getFriendRequest(memberId);
            return ResponseEntity.status(HttpStatus.OK).body(requestDTOList);
        } catch (Exception e) {

            log.error(" 친구 요청 리스트를 불러오는데 실패했습니다. : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("친구 요청 리스트를 불러오는데 실패했습니다.");
        }
    }

    // 친구 수락
    @PostMapping("/accept")
    public ResponseEntity<?> acceptFriendRequest(@RequestParam("memberId") Long memberId, @RequestParam("friendId") Long friendId) {
        try {
            friendRequestService.acceptFriendRequest(memberId, friendId); // 내 id, 친구 id
            return ResponseEntity.ok("친구가 되었지요~~");
        } catch (Exception e) {
            log.error(" 친구 수락 실패 : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to accept friend request.");
        }
    }

    // 친구 요청 거절
    @PostMapping("/reject")
    public ResponseEntity<?> rejectFriendRequest(@RequestParam("memberId") Long memberId, @RequestParam("friendId") Long friendId) {
        try {
            int result = friendRequestService.rejectFriendRequest(memberId, friendId);
            log.info("친구 거절!! : {}", result);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            log.error(" 친구 수락 실패 : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to accept friend request.");
        }
    }
}
