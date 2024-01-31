package com.gugu.cmiuc.global.stomp.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class  DataDTO {

    public enum DataType {
        CREATE, QUIT,
        ENTER, EXIT,
        FRIEND_CHAT, GAME_CHAT,
        START, END, GAME,
        MOTION, SETTING
    }

    private DataType type;
    private String roomId; // game roomId, friend chat roomId
    private Object data;

    @Builder
    public DataDTO(DataType type, String roomId, Object data) {
        this.type = type;
        this.roomId = roomId;
        this.data = data;
    }
}
