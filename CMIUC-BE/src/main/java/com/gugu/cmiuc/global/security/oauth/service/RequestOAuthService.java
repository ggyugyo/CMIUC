package com.gugu.cmiuc.global.security.oauth.service;

import com.gugu.cmiuc.global.security.oauth.entity.OAuthApiClient;
import com.gugu.cmiuc.global.security.oauth.entity.OAuthApiParams;
import com.gugu.cmiuc.global.security.oauth.entity.OAuthInfoResponse;
import com.gugu.cmiuc.global.security.oauth.entity.OAuthProvider;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class RequestOAuthService {
    private final Map<OAuthProvider, OAuthApiClient> clients;

    public RequestOAuthService(List<OAuthApiClient> clients) {
        this.clients = clients.stream().collect(
                Collectors.toUnmodifiableMap(OAuthApiClient::oAuthProvider, Function.identity())
        );
    }

    public OAuthInfoResponse requestInfo(OAuthApiParams params) {
        OAuthApiClient client = clients.get(params.oAuthProvider());
        String accessToken = client.requestAccessToken(params);
        return client.requestOauthInfo(accessToken);
    }

    public void requestUnlink(OAuthApiParams params) {
        OAuthApiClient client = clients.get(params.oAuthProvider());
        String accessToken = client.requestAccessToken(params);
        client.requestUnlink(accessToken);
    }

}
