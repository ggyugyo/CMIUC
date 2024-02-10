package com.gugu.cmiuc.global.security.oauth.entity;

public interface OAuthApiClient {
    OAuthProvider oAuthProvider();

    String requestAccessToken(OAuthApiParams params);

    OAuthInfoResponse requestOauthInfo(String accessToken);

    void requestUnlink(String accessToken);

}
