package com.gugu.cmiuc.domain.friend.service;

import com.gugu.cmiuc.domain.friend.dto.FriendRequestResponseDTO;
import com.gugu.cmiuc.domain.friend.entity.FriendRequest;
import com.gugu.cmiuc.domain.friend.repository.FriendRepository;
import com.gugu.cmiuc.domain.friend.repository.FriendRequestRepository;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
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

    // 친구 신청 테이블에 데이터 insert
    public boolean sendFriendRequest(Long receiverId, Long senderId) throws Exception {


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
}
