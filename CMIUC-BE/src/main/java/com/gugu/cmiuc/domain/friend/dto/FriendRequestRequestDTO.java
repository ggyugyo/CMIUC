package com.gugu.cmiuc.domain.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class FriendRequestRequestDTO {

    private Long senderId; // 요청을 보낸 사람 id
    private String receiverNickname; // 요청을 받은 사람 nickname

    @Builder
    public FriendRequestRequestDTO(Long senderId, String receiverNickname) {
        this.senderId = senderId;
        this.receiverNickname = receiverNickname;
    }
}
