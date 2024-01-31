package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO implements Serializable {
    private String roomId;//방 코드
    private String name;//방 제목

    @Builder
    public RoomDTO(String roomId, String name) {
        this.roomId = "G_"+UUID.randomUUID().toString();
        this.name = name;
    }
}
