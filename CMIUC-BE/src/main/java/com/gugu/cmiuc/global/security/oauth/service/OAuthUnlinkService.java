package com.gugu.cmiuc.global.security.oauth.service;

import com.gugu.cmiuc.domain.friend.service.FriendRequestService;
import com.gugu.cmiuc.domain.friend.service.FriendService;
import com.gugu.cmiuc.domain.game.service.MemberRecordService;
import com.gugu.cmiuc.domain.member.service.MemberService;
import com.gugu.cmiuc.global.security.oauth.entity.OAuthApiParams;
import com.gugu.cmiuc.global.stomp.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class OAuthUnlinkService {
    private final RequestOAuthService requestOAuthService;
    private final FriendService friendService;
    private final FriendRequestService friendRequestService;
    private final MemberService memberService;
    private final MemberRecordService memberRecordService;

    public void unlink(OAuthApiParams params, Long memberId) {
        requestOAuthService.requestUnlink(params);

        log.info("회원 탈퇴 시작 : {}", memberId);
        LoginDTO member = memberService.getLoginMember(memberId);

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

    }
}
