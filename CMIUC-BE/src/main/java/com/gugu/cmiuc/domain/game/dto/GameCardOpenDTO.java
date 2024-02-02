package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GameCardOpenDTO {
    private String gameId;
    private Long openerMemberId;
    private int cardNum;

    @Builder
    public GameCardOpenDTO(String gameId, Long openerMemberId, int cardNum) {
        this.gameId = gameId;
        this.openerMemberId = openerMemberId;
        this.cardNum = cardNum;
    }
}
