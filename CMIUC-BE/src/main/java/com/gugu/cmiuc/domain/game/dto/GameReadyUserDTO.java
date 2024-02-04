package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
@RequiredArgsConstructor
public class GameReadyUserDTO implements Serializable {
    private Long memberId;
    private boolean readyOn;

    @Builder
    public GameReadyUserDTO(Long memberId, boolean readyOn) {
        this.memberId = memberId;
        this.readyOn = readyOn;
    }
}
