package com.gugu.cmiuc.domain.friend.service;

import com.gugu.cmiuc.domain.friend.dto.FriendDTO;
import com.gugu.cmiuc.domain.friend.entity.Friend;
import com.gugu.cmiuc.domain.friend.repository.FriendRepository;
import com.gugu.cmiuc.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class FriendService {

    private final FriendRepository friendRepository;

    public List<FriendDTO> getAllRelationship(Long memberId, String roomId) {
        List<Friend> friends = friendRepository.findAllByFirstMemberIdOrSecondMemberId(memberId, memberId);
        List<FriendDTO> friendDTOList = new ArrayList<>();

        for (Friend friend : friends) {

            Member myfriend = friend.getFirstMember().getId() == memberId ?
                    friend.getSecondMember() : friend.getFirstMember();

            friendDTOList.add(FriendDTO.builder()
                    .relationship(friend.getId())
                    .friendId(myfriend.getId())
                    .friendName(myfriend.getNickname())
                    .roomId(roomId)
                    .build());
        }

        return friendDTOList;
    }
}
