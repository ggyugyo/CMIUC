package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
public class RoomDTO implements Serializable{
    private static final long serialVersionUID = 6494678977089006639L;

    private String roomId;//방 코드
    private String name;//방 제목
    private int maxUserCnt;//최대 들어올 수 있는 사용자 수
    private int nowUserCnt;
    private boolean gameInProgress;

    @Builder
    public RoomDTO(String roomId, String name, int maxUserCnt, int nowUserCnt, boolean gameInProgress) {
        this.roomId = UUID.randomUUID().toString().replaceAll("-", "").substring(0,6);
        this.name = name;
        this.maxUserCnt=maxUserCnt;
        this.nowUserCnt=nowUserCnt;
        this.gameInProgress=gameInProgress;
    }
}
