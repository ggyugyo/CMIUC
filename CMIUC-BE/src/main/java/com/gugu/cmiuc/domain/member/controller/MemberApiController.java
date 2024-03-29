package com.gugu.cmiuc.domain.member.controller;

import com.gugu.cmiuc.domain.game.dto.MemberRecordResponseDTO;
import com.gugu.cmiuc.domain.game.dto.MyRecordDTO;
import com.gugu.cmiuc.domain.game.service.MemberRecordService;
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
public class MemberApiController {

    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final MemberRecordService memberRecordService;

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

        if (memberService.checkFirstLogin(member.getId())) { // 최초 로그인!
            return ResponseEntity.status(ErrorCode.NO_NICKNAME.getStatus()).body(ErrorCode.NO_NICKNAME.getMessage());
        } else {
            return ResponseEntity.ok(member);
        }
    }

    @PostMapping("/nickname")
    public ResponseEntity<?> setNewNickname(@AuthenticationPrincipal Member requestMember, @RequestParam("nickname") String nickname) {
        log.info("새로운 닉네임 변경 요청 : {}", nickname);

        log.info("로그인 멤버 정보 : {} point {} 일자 {}", requestMember.getId(), requestMember.getPoint(), requestMember.getCreatedAt());

        if (!memberService.checkDuplicationNickname(nickname)) { // 중복이 아니라면
            Member responseMember = memberService.setNickname(requestMember.getId(), nickname);
            return ResponseEntity.ok(responseMember);
        } else { // 중복 에러
            return ResponseEntity.status(ErrorCode.DUPLICATION_NICKNAME.getStatus()).body(ErrorCode.DUPLICATION_NICKNAME.getMessage());
        }
    }

    @PostMapping("/point/nickname")
    public ResponseEntity<?> updateNickname(@AuthenticationPrincipal Member requestMember, @RequestParam("nickname") String nickname){
        log.info("기존 멤버 닉네임 변경 오청 : {}", nickname);
        log.info("로그인 멤버 정보 : {} point {} 일자 {}", requestMember.getId(), requestMember.getPoint(), requestMember.getCreatedAt());

        if(requestMember.getPoint() >= 5000L){
            if (!memberService.checkDuplicationNickname(nickname)) { // 중복이 아니라면
                Member responseMember = memberService.setNickname(requestMember.getId(), nickname);
                log.info("왜 포인트 차감이 안되냐고 point : {}", responseMember.getPoint());
                return ResponseEntity.ok(responseMember);
            } else { // 중복 에러
                return ResponseEntity.status(ErrorCode.DUPLICATION_NICKNAME.getStatus()).body(ErrorCode.DUPLICATION_NICKNAME.getMessage());
            }
        }
        else {
            return ResponseEntity.status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()).body("포인트가 부족합니다.");
        }

    }

    @GetMapping("/total-rank")
    public ResponseEntity<?> getTop10() {
        log.info("[total] 전체 멤버 top 10!!");

        try {
            List<MemberRecordResponseDTO> memberRecordResponseDTOList = memberRecordService.getTopPlayersByTotal();
            return ResponseEntity.ok(memberRecordResponseDTOList);
        } catch (Exception e) {
            log.error("top 10 실패 : {}", e);
            return ResponseEntity.status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()).body("top 10 멤버 정보를 불러오는데 실패했습니다.");
        }
    }

    @GetMapping("/cat-rank")
    public ResponseEntity<?> getCatTop10() {
        log.info("[cat] 전체 멤버 top 10!!");

        try {
            List<MemberRecordResponseDTO> memberRecordResponseDTOList = memberRecordService.getTopPlayersByCat();
            return ResponseEntity.ok(memberRecordResponseDTOList);
        } catch (Exception e) {
            log.error("top 10 실패 : {}", e);
            return ResponseEntity.status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()).body("top 10 멤버 정보를 불러오는데 실패했습니다.");
        }
    }

    @GetMapping("/mouse-rank")
    public ResponseEntity<?> getMouseTop10() {
        log.info("[mouse] 전체 멤버 top 10!!");

        try {
            List<MemberRecordResponseDTO> memberRecordResponseDTOList = memberRecordService.getTopPlayersByMouse();
            return ResponseEntity.ok(memberRecordResponseDTOList);
        } catch (Exception e) {
            log.error("top 10 실패 : {}", e);
            return ResponseEntity.status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()).body("top 10 멤버 정보를 불러오는데 실패했습니다.");
        }
    }

    @GetMapping("/my-rank")
    public ResponseEntity<?> getMyRank(@AuthenticationPrincipal Member member) {

        log.info("[내 랭킹] 내 랭킹 조회 : {}", member.getNickname());

        try {
            MyRecordDTO myRecord = memberRecordService.getMyRanking(member.getId());
            log.info("내 순위는 ? : {}", myRecord.getCatRank());
            return ResponseEntity.ok(myRecord);
        } catch (Exception e) {
            log.error("내 순위 실패 : {}", e);
            return ResponseEntity.status(ErrorCode.INTERNAL_SERVER_ERROR.getStatus()).body("내 순위 정보를 불러오는데 실패했습니다.");
        }
    }

}
