package com.gugu.cmiuc.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ChatMessageDTO {

    private Long memberId;
    private String sender; // 메시지 보낸사람
    private String message; // 메시지

    @Builder
    public ChatMessageDTO(Long memberId, String sender, String message) {
        this.memberId = memberId;
        this.sender = sender;
        this.message = message;
    }
}
