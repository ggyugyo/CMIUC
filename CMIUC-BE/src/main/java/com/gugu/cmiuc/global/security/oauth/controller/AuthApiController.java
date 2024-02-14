package com.gugu.cmiuc.global.security.oauth.controller;

import com.gugu.cmiuc.domain.friend.service.FriendRequestService;
import com.gugu.cmiuc.domain.friend.service.FriendService;
import com.gugu.cmiuc.domain.game.service.MemberRecordService;
import com.gugu.cmiuc.domain.member.service.MemberService;
import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.result.ResultCode;
import com.gugu.cmiuc.global.result.ResultResponse;
import com.gugu.cmiuc.global.security.filter.JwtFilter;
import com.gugu.cmiuc.global.security.oauth.entity.AuthTokens;
import com.gugu.cmiuc.global.security.oauth.infra.kakao.KakaoApiParams;
import com.gugu.cmiuc.global.security.oauth.infra.naver.NaverApiParams;
import com.gugu.cmiuc.global.security.oauth.service.OAuthLoginService;
import com.gugu.cmiuc.global.security.oauth.service.OAuthUnlinkService;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
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
    private final FriendService friendService;
    private final FriendRequestService friendRequestService;
    private final MemberService memberService;
    private final MemberRecordService memberRecordService;
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
    public ResponseEntity unlinkKakao(@RequestBody KakaoApiParams params, @RequestHeader("AUTHORIZATION") String token) {
        oAuthUnlinkService.unlink(params);

        token = token.substring(7);
        log.info("샥제할 유저 token 확인 : {}", token);

        Long memberId = Long.parseLong(jwtTokenProvider.getUserNameFromJwt(token));
        LoginDTO member = memberService.getLoginMember(memberId);

        log.info("회원 탈퇴 시작 : {}", member.getNickname());


        try {

            // 친구 및 메세지 삭제
            log.info("친구 및 메세지 삭제");
            friendService.removeRelationship(memberId);

            // 친구 요청 삭제
            //List<FriendRequestResponseDTO> friendRequestList =  friendRequestService.getFriendRequest(member.getId());
            log.info("친구 요청 삭제 시작 =======>");
            friendRequestService.removeFriendRequest(memberId);
            log.info("친구 요청 삭제 종료 =======>");

            // 멤버 전적 삭제
            log.info("멤버 전적 삭제 시작 =======> ");
            memberRecordService.removeMemberRecord(memberId);
            log.info("멤버 전적 삭제 종료 =======> ");

            // 멤버 삭제
            log.info("멤버 삭제 시작 =======> ");
            memberService.removeMember(memberId);
            log.info("멤버 삭제 종료 =======> ");


        } catch (Exception e) {
            log.error("탈퇴 실패 : {}", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("탈퇴를 실패했습니다.");
        }

        log.info("회원 탈퇴 끝");

        return ResponseEntity.status(HttpStatus.CREATED).body(ResultResponse.of(ResultCode.MEMBER_DELETE_SUCCESS));
    }

    @DeleteMapping("/naver")
    public ResponseEntity unlinkNaver(@RequestBody NaverApiParams params) {
        oAuthUnlinkService.unlink(params);
        return ResponseEntity.status(HttpStatus.CREATED).body(ResultResponse.of(ResultCode.MEMBER_DELETE_SUCCESS));
    }

}
