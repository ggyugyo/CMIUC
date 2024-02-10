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
    //전체 정보들
    private String gameId;
    private Long curTurn;
    private int curRound;
    private int openCnt;
    private int openCardNum;
    private int cheezeCnt;
    private int mousetrap;
    private int normalCnt;//빈접시 카드 개수
    private int actionCnt;//액션 카드 개수
    private int winJob;//직업 승리 유무 -1:승패 결정X, 0: 쥐 승리, 1: 고양이 승리
    private Long muteMemberId;
    private List<Integer>dummyCard;
    private List<Integer> cards;//현재 뽑히지 않은 카드들(다음 라운드 세팅 시 사용용도)
    private List<Integer>tableCards;//테이블에 놓을카드(이번라운드에 뽑힌 카드)

    @Builder
    public GamePlayDTO(String gameId, Long curTurn, int curRound, int openCnt, int openCardNum, int cheezeCnt, int mousetrap, int normalCnt, int actionCnt, int winJob, List<Integer> dummyCard, List<Integer> cards, List<Integer> tableCards, Long muteMemberId) {
        this.gameId = gameId;
        this.curTurn = curTurn;
        this.curRound = curRound;
        this.openCnt = openCnt;
        this.openCardNum = openCardNum;
        this.cheezeCnt = cheezeCnt;
        this.mousetrap = mousetrap;
        this.normalCnt = normalCnt;
        this.actionCnt = actionCnt;
        this.winJob = winJob;
        this.dummyCard = dummyCard;
        this.cards = cards;
        this.tableCards = tableCards;
        this.muteMemberId=muteMemberId;
    }
}
