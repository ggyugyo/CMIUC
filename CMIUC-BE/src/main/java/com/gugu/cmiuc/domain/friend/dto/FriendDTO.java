package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendDTO {

    private Long relationship;
    private Long friendId;
    private String friendName;
    private String roomId;

    @Builder
    public FriendDTO(Long relationship, Long friendId, String friendName, String roomId) {
        this.relationship = relationship;
        this.friendId = friendId;
        this.friendName = friendName;
        this.roomId = roomId;
    }
}
