package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class GameUserDTO implements Comparable<GameUserDTO>{
    private String gameId;
    private Long memberId;
    private String nickname;
    private int order;
    private int jobId;
    private List<Integer> cards;

    @Builder
    public GameUserDTO(String gameId, Long memberId, String nickname, int order, int jobId, List<Integer> cards) {
        this.gameId = gameId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.order = order;
        this.jobId = jobId;
        this.cards = cards;
    }

    @Override
    public int compareTo(GameUserDTO o) {
        return this.order-o.order;
    }
}
