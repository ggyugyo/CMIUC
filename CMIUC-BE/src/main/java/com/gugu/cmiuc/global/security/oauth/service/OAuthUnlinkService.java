package com.gugu.cmiuc.global.security.oauth.service;

import com.gugu.cmiuc.global.security.oauth.entity.OAuthApiParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthUnlinkService {
    private final RequestOAuthService requestOAuthService;

    public void unlink(OAuthApiParams params) {
        requestOAuthService.requestUnlink(params);
    }
}
