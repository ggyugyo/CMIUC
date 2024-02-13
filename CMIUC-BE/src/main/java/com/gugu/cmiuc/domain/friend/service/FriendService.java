package com.gugu.cmiuc.domain.friend.service;

import com.gugu.cmiuc.domain.chat.repository.ChatMessageRepository;
import com.gugu.cmiuc.domain.friend.dto.FriendResponseDTO;
import com.gugu.cmiuc.domain.friend.entity.Friend;
import com.gugu.cmiuc.domain.chat.entity.ChatMessage;
import com.gugu.cmiuc.domain.friend.repository.FriendRepository;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
import com.gugu.cmiuc.global.result.error.ErrorCode;
import com.gugu.cmiuc.global.result.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional(readOnly = true)
public class FriendService {

    private final FriendRepository friendRepository;
    private final MemberRepository memberRepository;
    private final ChatMessageRepository chatMessageRepository;

    public List<FriendResponseDTO> getAllRelationship(Long memberId) {

        Member loginMember = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        List<Friend> friends = friendRepository.findAllByFollowerOrFollowing(loginMember, loginMember);
        List<FriendResponseDTO> friendResponseDTOList = new ArrayList<>();

        for (Friend friend : friends) {

            Member myfriend = friend.getFollower().getId() == memberId ?
                    friend.getFollowing() : friend.getFollower();

            friendResponseDTOList.add(FriendResponseDTO.builder()
                    .friendId(myfriend.getId())
                    .friendName(myfriend.getNickname())
                    .roomId(friend.getId())
                    .build());
        }

        return friendResponseDTOList;
    }

    // 회원 탈퇴시, 친구 삭제
    @Transactional
    public void removeRelationship(Long memberId) {

        Member removeMember = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        // 친구 목록
        List<Friend> friends = friendRepository.findAllByFollowerOrFollowing(removeMember, removeMember);
        
        // 친구 메세지 삭제
        for(Friend friend: friends){
            //chatMessageRepository.deleteAllByFriend(friend);

            // 해당 친구와 관련된 모든 채팅 메시지를 삭제
            List<ChatMessage> chatMessages = chatMessageRepository.findAllByFriend(friend);
            chatMessageRepository.deleteAll(chatMessages);
        }

    }
}
