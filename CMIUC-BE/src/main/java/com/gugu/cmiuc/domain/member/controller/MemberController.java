package com.gugu.cmiuc.domain.member.controller;

import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
import com.gugu.cmiuc.global.result.error.ErrorCode;
import com.gugu.cmiuc.global.security.oauth.entity.AuthTokensGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {
    private final MemberRepository memberRepository;

    @GetMapping
    public ResponseEntity<List<Member>> findAll() {
        return ResponseEntity.ok(memberRepository.findAll());
    }

    @GetMapping("/myinfo")
    public ResponseEntity<?> findByAccessToken(@AuthenticationPrincipal Member member) {
        log.info(" 내 정보 조회 : {} ", member.getNickname());

        if (member != null) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.status(ErrorCode.MEMBER_NOT_FOUND.getStatus()).body("토큰에서 멤버를 찾을 수 없습니다. ");
        }
    }
}
