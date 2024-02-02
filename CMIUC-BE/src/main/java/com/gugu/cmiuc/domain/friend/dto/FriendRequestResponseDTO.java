package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FriendRequestResponseDTO {

    private Long senderId;
    private Long receiverId;
    private String senderNickname;

    @Builder
    public FriendRequestResponseDTO(Long senderId, Long receiverId, String senderNickname) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderNickname = senderNickname;
    }
}
