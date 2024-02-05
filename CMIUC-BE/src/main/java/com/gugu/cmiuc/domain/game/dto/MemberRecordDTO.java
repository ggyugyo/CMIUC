package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRecordDTO {

    private Long memberId;
    private int job; // 고양이: 1, 쥐: 0
    private boolean win; // 승리여부

    @Builder
    public MemberRecordDTO(Long memberId, int job, boolean win) {
        this.memberId = memberId;
        this.job = job;
        this.win = win;
    }

}
