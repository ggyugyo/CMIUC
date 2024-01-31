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

    public List<FriendDTO> getAllRelationship(Long memberId) {
        List<Friend> friends = friendRepository.findAllByFollowerIdOrFollowingId(memberId, memberId);
        List<FriendDTO> friendDTOList = new ArrayList<>();

        for (Friend friend : friends) {

            Member myfriend = friend.getFollower().getId() == memberId ?
                    friend.getFollowing() : friend.getFollower();

            friendDTOList.add(FriendDTO.builder()
                    .friendId(myfriend.getId())
                    .friendName(myfriend.getNickname())
                    .roomId(friend.getId())
                    .build());
        }

        return friendDTOList;
    }
}
