package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameChatMessageDTO {
    private String sender; // 메시지 보낸사람
    private String message; // 메시지

    @Builder
    public GameChatMessageDTO(String sender, String message) {
        this.sender = sender;
        this.message = message;
    }
}
