package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class FriendRoomDTO implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId; // 채팅방 id == Friend Entity의 id
    private Long firstMemberId; // 내 친구의 id
    private Long secondMemberId;

    @Builder
    public FriendRoomDTO(Long firstMemberId, Long secondMemberId, String roomId) {
        this.firstMemberId = firstMemberId;
        this.secondMemberId = secondMemberId;
        this.roomId = roomId;
    }
}
