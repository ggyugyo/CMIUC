package com.gugu.cmiuc.global.stomp.dto;

import com.gugu.cmiuc.global.security.oauth.entity.AuthTokens;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginDTO {

    private Long memberId;
    private String nickname;
    private  Long point;
    private AuthTokens token;

    @Builder

    public LoginDTO(Long memberId, String nickname, Long point, AuthTokens token) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.point = point;
        this.token = token;
    }
}
