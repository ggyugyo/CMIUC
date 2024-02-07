package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GameRoundDivInfoDTO implements Comparable<GameRoundDivInfoDTO>{
    //라운드별 정보를 저장해줌
    private String gameId;
    private int round;//해당 라운드
    //private int openCardNum;//
    private int cheezeCnt;//해당라운드에 나온 치즈 개수
    private int mousetrap;//쥐덫
    private int normalCnt;//해당 라운드 빈접시 카드 개수
    private int actionCnt;//해당 라운드 액션 카드 개수
    private List<Integer> card;//해당 라운드에 뽑혀진 카드 list

    @Builder
    public GameRoundDivInfoDTO(String gameId, int round, int cheezeCnt, int mousetrap, int normalCnt, int actionCnt, List<Integer> card) {
        this.gameId = gameId;
        this.round = round;
        //this.openCardNum = openCardNum;
        this.cheezeCnt = cheezeCnt;
        this.mousetrap = mousetrap;
        this.normalCnt = normalCnt;
        this.actionCnt = actionCnt;
        this.card = card;
    }

    @Override
    public int compareTo(GameRoundDivInfoDTO o) {
        return this.round-o.round;
    }
}
