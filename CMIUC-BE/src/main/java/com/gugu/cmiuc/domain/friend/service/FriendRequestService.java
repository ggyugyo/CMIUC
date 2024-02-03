package com.gugu.cmiuc.domain.friend.service;

import com.gugu.cmiuc.domain.friend.dto.FriendRequestResponseDTO;
import com.gugu.cmiuc.domain.friend.dto.FriendRoomDTO;
import com.gugu.cmiuc.domain.friend.entity.Friend;
import com.gugu.cmiuc.domain.friend.entity.FriendRequest;
import com.gugu.cmiuc.domain.friend.repository.FriendRepository;
import com.gugu.cmiuc.domain.friend.repository.FriendRequestRepository;
import com.gugu.cmiuc.domain.friend.repository.FriendStompRepository;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FriendRequestService {

    private final FriendRepository friendRepository;
    private final FriendRequestRepository friendRequestRepository;
    private final MemberRepository memberRepository;
    private final FriendStompRepository friendStompRepository;

    // 친구 신청 테이블에 데이터 insert
    public boolean sendFriendRequest(Long senderId, Long receiverId) throws Exception {


        // 1. 이미 친구인지 확인
        if (areFriends(senderId, receiverId)) {
            return false;
        }

        // 2. 이미 친구 신청이 들어왔는지 확인
        if (hasFriendRequest(senderId, receiverId)) {
            return false;
        }

        // 3. 친구 신청 table에 삽입
        Member sender = memberRepository.findById(senderId).orElseThrow(IllegalArgumentException::new);
        Member receiver = memberRepository.findById(receiverId).orElseThrow(IllegalArgumentException::new);

        log.info("친구 신청 : {} ==> {}", sender.getId(), receiver.getId());

        friendRequestRepository.save(
                FriendRequest.builder()
                        .sender(sender)
                        .receiver(receiver)
                        .build());

        return true;
    }

    // 이미 친구 신청이 있는 지 확인
    private boolean hasFriendRequest(Long senderId, Long receiverId) {
        Member sender = memberRepository.findById(senderId).orElseThrow(IllegalArgumentException::new);
        Member receiver = memberRepository.findById(receiverId).orElseThrow(IllegalArgumentException::new);

        log.info("이미 친구 신청 {} ==> {} : {}", sender.getId(), receiver.getId(), friendRequestRepository.existsBySenderAndReceiver(sender, receiver));
        return friendRequestRepository.existsBySenderAndReceiver(sender, receiver);
    }

    // 이미 친구인지 확인
    public boolean areFriends(Long senderId, Long receiverId) {
        Member sender = memberRepository.findById(senderId).orElseThrow(IllegalArgumentException::new);
        Member receiver = memberRepository.findById(receiverId).orElseThrow(IllegalArgumentException::new);

        log.info("이미 친구 관계지롱 : {}", friendRepository.existsByFollowerAndFollowing(receiver, sender)
                || friendRepository.existsByFollowerAndFollowing(sender, receiver));

        return friendRepository.existsByFollowerAndFollowing(receiver, sender)
                || friendRepository.existsByFollowerAndFollowing(sender, receiver);
    }

    // member id로 요청받은 친구 신청 목록 조회
    public List<FriendRequestResponseDTO> getFriendRequest(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);
        List<FriendRequest> friendRequestList = friendRequestRepository.findByReceiver(member);

        List<FriendRequestResponseDTO> friendRequestRequestDTOList = new ArrayList<>();

        for (FriendRequest friendRequest : friendRequestList) {
            friendRequestRequestDTOList.add(FriendRequestResponseDTO.builder()
                    .receiverId(friendRequest.getReceiver().getId())
                    .senderId(friendRequest.getSender().getId())
                    .senderNickname(friendRequest.getSender().getNickname())
                    .build());
        }

        return friendRequestRequestDTOList;
    }

    // 친구 테이블에 데이터 insert
    // 채팅방 생성 => room Id 받아오기
    @Transactional
    public boolean acceptFriendRequest(Long myId, Long friendId) {

        log.info("친구 요청이 왔구요 내가 {}  이친구 {} 한테 요청을 받은 걸 수락 할 거임 ", myId, friendId);
        // 1. 이미 친구인지 확인
        if (areFriends(myId, friendId)) {
            // 이미 친구 입니다~
            return false;
        }

        // follower < following 되도록!!
        Long followerId = myId;
        Long followingId = friendId;
        if (myId > friendId) {
            followerId = friendId;
            followingId = myId;
        }

        // DB에 저장
        Member follower = memberRepository.findById(followerId).orElseThrow(IllegalArgumentException::new);
        Member following = memberRepository.findById(followingId).orElseThrow(IllegalArgumentException::new);

        // 새로운 친구관계 생성 == 채팅방 생성
        Friend newFriendship = friendRepository.save(Friend.builder()
                .follower(follower)
                .following(following)
                .build());

        FriendRoomDTO friendRoomDTO = FriendRoomDTO.builder()
                .roomId(newFriendship.getId())
                .firstMemberId(followerId)
                .secondMemberId(followingId)
                .build();

        // redis에 저장
        try {
            friendStompRepository.createFriendChatRoom(friendRoomDTO);
        } catch (Exception e) {
            log.error("redis에 채팅방 저장 살려주세요 : {}", e);
        }

        // 친구 신청 목록에서 관련 row 제거
        friendRequestRepository.deleteBySenderAndReceiver(follower, following);
        friendRequestRepository.deleteBySenderAndReceiver(following, follower);

        return true;
    }

    @Transactional
    public int rejectFriendRequest(Long memberId, Long friendId) {

        Member receiver = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);
        Member sender = memberRepository.findById(friendId).orElseThrow(IllegalArgumentException::new);

        // 친구가 나에게 보낸 친구 신청 제거
        return friendRequestRepository.deleteBySenderAndReceiver(sender, receiver);
    }
}
