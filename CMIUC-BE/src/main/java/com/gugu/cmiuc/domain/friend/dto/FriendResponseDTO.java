package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendResponseDTO {

    private String roomId; // 채팅방 id == Friend Entity의 id
    private Long friendId; // 내 친구의 id
    private String friendName; // 내친구의 nickname

    @Builder
    public FriendResponseDTO(String roomId, Long friendId, String friendName) {
        this.friendId = friendId;
        this.friendName = friendName;
        this.roomId = roomId;
    }
}
