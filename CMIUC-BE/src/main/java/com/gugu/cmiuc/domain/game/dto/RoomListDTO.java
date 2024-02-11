package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@Setter
@Getter
//@NoArgsConstructor
@AllArgsConstructor
public class RoomListDTO{//방 리스트 정보
    private String roomId;
    private String name;//방제
    private int curUserCnt;
    private int maxUserCnt; // 최대 인원
    private boolean gameInProgress;

}
