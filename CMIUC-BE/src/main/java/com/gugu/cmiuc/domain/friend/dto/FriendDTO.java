package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class FriendDTO {

    private Long friendId;
    private String friendName;
    private String roomId;

    @Builder
    public FriendDTO(Long relationship, Long friendId, String friendName, String roomId) {
        this.friendId = friendId;
        this.friendName = friendName;
        this.roomId = "F_" + UUID.randomUUID().toString(); // room id는 독립적이어야하므로 UUID 사용
    }
}
