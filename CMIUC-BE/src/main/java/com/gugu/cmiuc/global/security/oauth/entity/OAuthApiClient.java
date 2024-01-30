package com.gugu.cmiuc.global.security.oauth.entity;

public interface OAuthApiClient {
    OAuthProvider oAuthProvider();

    String requestAccessToken(OAuthLoginParams params);

    OAuthInfoResponse requestOauthInfo(String accessToken);
}
