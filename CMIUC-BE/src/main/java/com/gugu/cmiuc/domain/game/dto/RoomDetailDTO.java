package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDetailDTO {//게임방에 필요한 정보들을 저장함
    private String name;//게임방 이름
    private List<RoomUserDTO> gameUsers;//게임방에 있는 유저정보
    private String message;
}
