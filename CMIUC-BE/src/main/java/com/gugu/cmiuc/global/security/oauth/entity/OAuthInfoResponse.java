package com.gugu.cmiuc.global.security.oauth.entity;

public interface OAuthInfoResponse {
    String getEmail();

    String getNickname();

    OAuthProvider getOAuthProvider();
}
