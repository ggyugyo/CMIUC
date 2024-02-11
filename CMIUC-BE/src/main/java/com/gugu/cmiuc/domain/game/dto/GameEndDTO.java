package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GameEndDTO {
    private String gameId;
    private int winJob;
    private List<GameUserDTO> gameUsers;

    @Builder
    public GameEndDTO(String gameId, int winJob, List<GameUserDTO> gameUsers) {
        this.gameId = gameId;
        this.winJob = winJob;
        this.gameUsers = gameUsers;
    }
}
