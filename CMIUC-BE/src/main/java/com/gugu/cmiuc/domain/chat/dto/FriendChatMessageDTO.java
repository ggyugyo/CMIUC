package com.gugu.cmiuc.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FriendChatMessageDTO {

    private Long memberId;
    private String sender; // 메시지 보낸사람
    private Long messageId;
    private String message; // 메시지

    @Builder
    public FriendChatMessageDTO(Long memberId, String sender, Long messageId, String message) {
        this.memberId = memberId;
        this.sender = sender;
        this.messageId = messageId;
        this.message = message;
    }
}
