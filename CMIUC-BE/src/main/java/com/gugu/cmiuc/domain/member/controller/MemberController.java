package com.gugu.cmiuc.domain.member.controller;

import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
import com.gugu.cmiuc.domain.member.service.MemberService;
import com.gugu.cmiuc.global.result.error.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class MemberController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<List<Member>> findAll() {
        return ResponseEntity.ok(memberRepository.findAll());
    }

    @GetMapping("/login-info")
    public ResponseEntity<?> findByAccessToken(@AuthenticationPrincipal Member member) {
        log.info(" 내 정보 조회 : {} ", member.getNickname());

        if (member != null) {
            return ResponseEntity.ok(member);
        } else {
            return ResponseEntity.status(ErrorCode.MEMBER_NOT_FOUND.getStatus()).body(ErrorCode.MEMBER_NOT_FOUND.getMessage());
        }
    }

    @GetMapping("/init")
    public ResponseEntity<?> checkFirstConnect(@AuthenticationPrincipal Member member) {
        log.info(" 최초 로그인인지 확인 : {} ", member.getNickname());

        if (memberService.checkFirstLogin(member)) { // 최초 로그인!
            return ResponseEntity.status(ErrorCode.NO_NICKNAME.getStatus()).body(ErrorCode.NO_NICKNAME.getMessage());
        } else {
            return ResponseEntity.ok(true);
        }
    }

    @PostMapping("/nickname")
    public ResponseEntity<?> setNickname(@AuthenticationPrincipal Member requestMember, @RequestParam("nickname") String nickname) {
        log.info("새로운 닉네임 변경 요청 : {}", nickname);

        log.info("로그인 멤버 정보 : {} point {} 일자 {}", requestMember.getId(), requestMember.getPoint(), requestMember.getCreatedAt());

        if (!memberService.checkDuplicationNickname(nickname)) { // 중복이 아니라면
            Member responseMember = memberService.setNickname(requestMember.getId(), nickname);
            return ResponseEntity.ok(responseMember);
        } else { // 중복 에러
            return ResponseEntity.status(ErrorCode.DUPLICATION_NICKNAME.getStatus()).body(ErrorCode.DUPLICATION_NICKNAME.getMessage());
        }
    }
}
