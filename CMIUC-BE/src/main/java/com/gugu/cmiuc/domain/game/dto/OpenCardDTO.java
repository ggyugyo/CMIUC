package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class OpenCardDTO implements Serializable {
    private int nextTurn;
    private int openCardNum;

    @Builder
    public OpenCardDTO(int nextTurn, int openCardNum) {
        this.nextTurn = nextTurn;
        this.openCardNum = openCardNum;
    }
}
