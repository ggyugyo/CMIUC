package com.gugu.cmiuc.domain.game.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class GameActionDTO {
    private Long choiceAllTurn;//계속 선택할 유저Id 전송
    private ShowJobDTO showJobDTO;
    private boolean canSeeCard;//카드 맛보기 할 수 있음
    private int seeCard;

    @Builder
    public GameActionDTO(Long choiceAllTurn, ShowJobDTO showJobDTO, boolean canSeeCard, int seeCard) {
        this.choiceAllTurn = choiceAllTurn;
        this.showJobDTO = showJobDTO;
        this.canSeeCard = canSeeCard;
        this.seeCard = seeCard;
    }
}
