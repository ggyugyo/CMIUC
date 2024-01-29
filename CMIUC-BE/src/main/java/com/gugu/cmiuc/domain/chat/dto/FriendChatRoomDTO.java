package com.gugu.cmiuc.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class FriendChatRoomDTO implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;
    private String name;

    @Builder
    public FriendChatRoomDTO(String name) {
        this.roomId = "F_" + UUID.randomUUID().toString(); // room id는 독립적이어야하므로 UUID 사용
        this.name = name;
    }
}
