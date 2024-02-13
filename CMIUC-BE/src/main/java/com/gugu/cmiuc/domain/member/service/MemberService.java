package com.gugu.cmiuc.domain.member.service;

import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
import com.gugu.cmiuc.global.result.error.ErrorCode;
import com.gugu.cmiuc.global.result.error.exception.CustomException;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public LoginDTO getLoginMember(Long memberId) {
        Member member = memberRepository.findById(memberId).get();
        return LoginDTO.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .point(member.getPoint())
                .build();

    }

    public Member getMemberIdByNickName(String senderNickName) {
        log.info("닉네임으로 사용자 id 조회 : {}", senderNickName);
        return memberRepository.findByNickname(senderNickName).orElse(null);
    }

    public boolean checkFirstLogin(Long memberId) {
        log.info("닉네임 수정 여부 확인");

        Member member = memberRepository.findById(memberId).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
        log.info("시간이 같나요? {} vs {} == {}", member.getCreatedAt(), member.getModifiedAt(), member.getCreatedAt().isEqual(member.getModifiedAt()));

        return member.getCreatedAt().isEqual(member.getModifiedAt());
    }

    public boolean checkDuplicationNickname(String nickname) {
        log.info("닉네임 중복 확인");
        return memberRepository.existsByNickname(nickname);
    }

    @Transactional
    public Member setNickname(Long memberId, String newNickname) {
        log.info("닉네임 변경!");

        Member member = memberRepository.findById(memberId).orElse(null);

        if (member != null) {
            member.upddateNickname(newNickname);
            if(member.getPoint() >= 5000L) { // 신규회원이 아니라면
                member.payPoint(5000L);
            }
        }
        return member;
    }

}
