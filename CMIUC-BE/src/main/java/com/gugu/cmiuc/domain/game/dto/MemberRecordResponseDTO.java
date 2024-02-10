package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRecordResponseDTO {
    private Long memberId;
    private String nickname;
    private int rank; // 순위
    private Double totalWinRate;
    private Double winCatRate;
    private Double winMouseRate;

    @Builder
    public MemberRecordResponseDTO(Long memberId, String nickname, int rank, Double totalWinRate, Double winCatRate, Double winMouseRate) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.rank = rank;
        this.totalWinRate = totalWinRate;
        this.winCatRate = winCatRate;
        this.winMouseRate = winMouseRate;
    }
}
