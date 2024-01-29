package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO {
    private String roomId;
    private String title;

    @Builder
    public RoomDTO(String roomId, String title) {
        this.roomId = roomId;
        this.title = title;
    }
}
