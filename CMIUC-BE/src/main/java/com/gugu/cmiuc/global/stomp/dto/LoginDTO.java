package com.gugu.cmiuc.global.stomp.dto;

import com.gugu.cmiuc.global.security.oauth.entity.AuthTokens;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginDTO {

    private String name;
    private AuthTokens token;

    @Builder
    public LoginDTO(String name, AuthTokens token) {
        this.name = name;
        this.token = token;
    }
}
