package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FriendRequestRequestDTO {

    private Long receiverId;
    private String senderNickname;

    @Builder
    public FriendRequestRequestDTO(Long receiverId, String senderNickname) {
        this.receiverId = receiverId;
        this.senderNickname = senderNickname;
    }
}
