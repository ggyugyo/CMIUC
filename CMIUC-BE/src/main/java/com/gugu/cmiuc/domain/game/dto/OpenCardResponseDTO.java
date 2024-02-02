package com.gugu.cmiuc.domain.game.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OpenCardResponseDTO {
    private int nextTurn;
    private int openCardNum;
    
}
