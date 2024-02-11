package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MyRecordDTO {
    private long memberId;
    private String nickname;
    private long totalRank; // 순위
    private long catRank;
    private long mouseRank;
    private Double totalWinRate; // 승률
    private Double winCatRate; // 승률
    private Double winMouseRate; // 승률
    private long totalPlayCount; // 게임 플레이 횟수
    private long totalWinCount; //  게임 승리 횟수
    private long totalLoseCount; // 게임 패 횟수
    private long winCatCount;
    private long loseCatCount;
    private long totalCatCount;
    private long winMouseCount;
    private long loseMouseCount;
    private long totalMouseCount;


    @Builder
    public MyRecordDTO(long memberId, String nickname, long totalRank, long catRank, long mouseRank,
                       Double totalWinRate, Double winCatRate, Double winMouseRate,
                       long totalPlayCount, long totalWinCount, long totalLoseCount,
                       long winCatCount, long loseCatCount, long totalCatCount,
                       long winMouseCount, long loseMouseCount, long totalMouseCount) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.totalRank = totalRank;
        this.catRank = catRank;
        this.mouseRank = mouseRank;
        this.totalWinRate = totalWinRate;
        this.winCatRate = winCatRate;
        this.winMouseRate = winMouseRate;
        this.totalPlayCount = totalPlayCount;
        this.totalWinCount = totalWinCount;
        this.totalLoseCount = totalLoseCount;
        this.winCatCount = winCatCount;
        this.loseCatCount = loseCatCount;
        this.totalCatCount = totalCatCount;
        this.winMouseCount = winMouseCount;
        this.loseMouseCount = loseMouseCount;
        this.totalMouseCount = totalMouseCount;
    }
}
