package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class CreateRoomDTO implements Serializable {
    private String name;//방 제목
    private int maxUserCnt;//최대 들어올 수 있는 사용자 수

    @Builder
    public CreateRoomDTO(String name, int maxUserCnt) {
        this.name = name;
        this.maxUserCnt=maxUserCnt;
    }
}
