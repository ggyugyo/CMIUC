package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GamePlayDTO implements Serializable{//게임진행에 필요한 정보들
    private String gameId;
    private int curTurn;
    private int round;
    private int openCnt;
    private int openCardNum;
    private int cheezeCnt;
    private int mousetrap;
    private List<Integer> cards;

    @Builder
    public GamePlayDTO(String gameId, int curTurn, int round, int openCnt, int openCardNum, int cheezeCnt, int mousetrap, List<Integer> cards) {
        this.gameId = gameId;
        this.curTurn = curTurn;
        this.round = round;
        this.openCnt = openCnt;
        this.openCardNum = openCardNum;
        this.cheezeCnt = cheezeCnt;
        this.mousetrap = mousetrap;
        this.cards = cards;
    }
}
