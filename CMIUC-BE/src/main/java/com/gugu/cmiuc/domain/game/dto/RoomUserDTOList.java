package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class RoomUserDTOList {//게임방에 있는 RoomUserDTO의 List
    private List<RoomUserDTO> roomUsers;

    @Builder
    public RoomUserDTOList(List<RoomUserDTO> roomUsers) {
        this.roomUsers = roomUsers;
    }
}
