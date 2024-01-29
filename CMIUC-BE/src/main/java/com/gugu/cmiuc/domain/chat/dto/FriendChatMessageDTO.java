package com.gugu.cmiuc.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class FriendChatMessageDTO {

    private String roomId;
    private Long memberId;
    private String sender; // 메시지 보낸사람
    private String message; // 메시지

    @Builder
    public FriendChatMessageDTO(Long memberId, String roomId, String sender, String message) {
        this.roomId = roomId;
        this.memberId = memberId;
        this.sender = sender;
        this.message = message;
    }
}
