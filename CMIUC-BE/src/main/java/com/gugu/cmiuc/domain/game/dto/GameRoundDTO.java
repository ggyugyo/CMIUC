package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GameRoundDTO {
    //Data에 들어갈 값
    private GamePlayDTO gamePlayDTO;
    private List<GameUserDTO> gameUsers;
    private List<GameRoundDivInfoDTO> gameAllRound;

    @Builder
    public GameRoundDTO(GamePlayDTO gamePlayDTO, List<GameUserDTO> gameUsers, List<GameRoundDivInfoDTO> gameAllRound) {
        this.gamePlayDTO = gamePlayDTO;
        this.gameUsers = gameUsers;
        this.gameAllRound = gameAllRound;
    }
}
