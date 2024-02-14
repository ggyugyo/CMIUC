package com.gugu.cmiuc.global.security.oauth.controller;

import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.result.ResultCode;
import com.gugu.cmiuc.global.result.ResultResponse;
import com.gugu.cmiuc.global.security.oauth.entity.AuthTokens;
import com.gugu.cmiuc.global.security.oauth.infra.kakao.KakaoApiParams;
import com.gugu.cmiuc.global.security.oauth.infra.naver.NaverApiParams;
import com.gugu.cmiuc.global.security.oauth.service.OAuthLoginService;
import com.gugu.cmiuc.global.security.oauth.service.OAuthUnlinkService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/auth")
public class AuthApiController {
    private final OAuthLoginService oAuthLoginService;
    private final OAuthUnlinkService oAuthUnlinkService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/kakao")
    public ResponseEntity<AuthTokens> loginKakao(@RequestBody KakaoApiParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @PostMapping("/naver")
    public ResponseEntity<AuthTokens> loginNaver(@RequestBody NaverApiParams params) {
        return ResponseEntity.ok(oAuthLoginService.login(params));
    }

    @DeleteMapping("/kakao")
    public ResponseEntity unlinkKakao(@RequestBody KakaoApiParams params, @RequestHeader("AUTHORIZATION") String accessToken) {

        String token = accessToken.substring(7);
        log.info("샥제할 유저 token 확인 : {}", token);

        Long memberId = Long.parseLong(jwtTokenProvider.getUserNameFromJwt(token));

        try {
            oAuthUnlinkService.unlink(params, memberId);
        } catch (Exception e) {
            log.error("탈퇴 실패 : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("탈퇴를 실패했습니다.");
        }

        log.info("회원 탈퇴 끝");
        return ResponseEntity.status(HttpStatus.CREATED).body(ResultResponse.of(ResultCode.MEMBER_DELETE_SUCCESS));
    }

    @DeleteMapping("/naver")
    public ResponseEntity unlinkNaver(@RequestBody NaverApiParams params, @RequestHeader("AUTHORIZATION") String accessToken) {

        String token = accessToken.substring(7);
        log.info("샥제할 유저 token 확인 : {}", token);

        Long memberId = Long.parseLong(jwtTokenProvider.getUserNameFromJwt(token));

        try {
            oAuthUnlinkService.unlink(params, memberId);
        } catch (Exception e) {
            log.error("탈퇴 실패 : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("탈퇴를 실패했습니다.");
        }

        log.info("회원 탈퇴 끝");
        return ResponseEntity.status(HttpStatus.CREATED).body(ResultResponse.of(ResultCode.MEMBER_DELETE_SUCCESS));
    }

}
