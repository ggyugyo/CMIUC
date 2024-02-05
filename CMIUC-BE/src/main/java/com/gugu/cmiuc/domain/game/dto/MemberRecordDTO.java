package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRecordDTO {

    private Long memberId;
    private String job; // 고양이, 쥐
    private boolean win; // 승리여부

    @Builder
    public MemberRecordDTO(Long memberId, String job, boolean win) {
        this.memberId = memberId;
        this.job = job;
        this.win = win;
    }

}
