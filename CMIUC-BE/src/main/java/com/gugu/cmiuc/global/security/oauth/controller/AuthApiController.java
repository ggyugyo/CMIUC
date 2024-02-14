package com.gugu.cmiuc.global.security.oauth.controller;

import com.gugu.cmiuc.global.result.ResultCode;
import com.gugu.cmiuc.global.result.ResultResponse;
import com.gugu.cmiuc.global.security.oauth.entity.AuthTokens;
import com.gugu.cmiuc.global.security.oauth.infra.kakao.KakaoApiParams;
import com.gugu.cmiuc.global.security.oauth.infra.naver.NaverApiParams;
import com.gugu.cmiuc.global.security.oauth.service.OAuthLoginService;
import com.gugu.cmiuc.global.security.oauth.service.OAuthUnlinkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthApiController {
    private final OAuthLoginService oAuthLoginService;
    private final OAuthUnlinkService oAuthUnlinkService;

    @PostMapping("/kakao")
    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoApiParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @PostMapping("/naver")
    public ResponseEntity<AuthTokens> loginNaver(@RequestBody NaverApiParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @DeleteMapping("/kakao")
    public ResponseEntity unlinkKakao(@RequestBody KakaoApiParams params) {
        oAuthUnlinkService.unlink(params);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResultResponse.of(ResultCode.MEMBER_DELETE_SUCCESS));
    }

    @DeleteMapping("/naver")
    public ResponseEntity unlinkNaver(@RequestBody NaverApiParams params) {
        oAuthUnlinkService.unlink(params);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResultResponse.of(ResultCode.MEMBER_DELETE_SUCCESS));
    }

}
