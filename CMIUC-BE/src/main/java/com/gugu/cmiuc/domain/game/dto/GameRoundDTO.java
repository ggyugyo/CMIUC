package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GameRoundDTO {
    private String gameId;
    private int curTurn;
    private int round;
    private int openCnt;
    private int openCardNum;
    private int cheezeCnt;
    private int mousetrap;
    private int winJob;
    private List<GameUserDTO> gameUsers;

    @Builder
    public GameRoundDTO(String gameId, int curTurn, int round, int openCnt, int openCardNum, int cheezeCnt, int mousetrap, int winJob, List<GameUserDTO> gameUsers) {
        this.gameId = gameId;
        this.curTurn = curTurn;
        this.round = round;
        this.openCnt = openCnt;
        this.openCardNum = openCardNum;
        this.cheezeCnt = cheezeCnt;
        this.mousetrap = mousetrap;
        this.winJob = winJob;
        this.gameUsers = gameUsers;
    }
}
