package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OpenCardDTO {
    private int nextTurn;
    private int openCardNum;

    @Builder
    public OpenCardDTO(int nextTurn, int openCardNum) {
        this.nextTurn = nextTurn;
        this.openCardNum = openCardNum;
    }
}
