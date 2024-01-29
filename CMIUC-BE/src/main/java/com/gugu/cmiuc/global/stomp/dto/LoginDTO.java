package com.gugu.cmiuc.global.stomp.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class LoginDTO {

    private String name;
    private String token;

    @Builder
    public LoginDTO(String name, String token) {
        this.name = name;
        this.token = token;
    }
}
