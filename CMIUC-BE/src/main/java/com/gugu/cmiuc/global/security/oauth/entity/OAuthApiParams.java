package com.gugu.cmiuc.global.security.oauth.entity;

import org.springframework.util.MultiValueMap;

public interface OAuthApiParams {
    OAuthProvider oAuthProvider();

    MultiValueMap<String, String> makeApiBody();

}
