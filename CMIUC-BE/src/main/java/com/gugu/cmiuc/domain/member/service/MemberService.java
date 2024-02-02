package com.gugu.cmiuc.domain.member.service;

import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
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
}
