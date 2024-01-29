package com.gugu.cmiuc.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
public class ChatRoomDTO implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    public enum RoomType {
        FRIEND, GAME
    }

    private RoomType type;
    private String roomId;
    private String name;

    @Builder
    public ChatRoomDTO(String name) {
        this.roomId = UUID.randomUUID().toString(); // room id는 독립적이어야하므로 UUID 사용
        this.name = name;
    }
}
