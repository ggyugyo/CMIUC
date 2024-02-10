package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ShowJobDTO {//직업 보여주기 action카드 발동
    private Long showMemeberId;
    private Long watchMemberId;
    private int job;

    @Builder
    public ShowJobDTO(Long showMemeberId, Long watchMemberId, int job) {
        this.showMemeberId = showMemeberId;
        this.watchMemberId = watchMemberId;
        this.job = job;
    }
}
