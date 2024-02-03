package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FriendRequestResponseDTO {

    private Long senderId; // 요청한 사람
    private Long receiverId; // 요청받은 사람 == (나)
    private String senderNickname;

    @Builder
    public FriendRequestResponseDTO(Long senderId, Long receiverId, String senderNickname) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.senderNickname = senderNickname;
    }
}
