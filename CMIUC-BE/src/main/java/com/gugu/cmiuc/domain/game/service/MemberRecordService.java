package com.gugu.cmiuc.domain.game.service;

import com.gugu.cmiuc.domain.game.dto.MemberRecordDTO;
import com.gugu.cmiuc.domain.game.entity.MemberRecord;
import com.gugu.cmiuc.domain.game.repository.MemberRecordRepository;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.domain.member.repository.MemberRepository;
import com.gugu.cmiuc.global.result.error.ErrorCode;
import com.gugu.cmiuc.global.result.error.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberRecordService {

    private final MemberRecordRepository memberRecordRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void setMemberRecord(List<MemberRecordDTO> memberRecordDTOList) {

        for (MemberRecordDTO memberRecordDTO : memberRecordDTOList) {

            Member member = memberRepository.findById(memberRecordDTO.getMemberId())
                    .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
            MemberRecord myRecord = member.getMemberRecord();

            updateMemberRecord(memberRecordDTO, myRecord);

        }

    }

    @Transactional
    public void updateMemberRecord(MemberRecordDTO memberRecordDTO, MemberRecord myRecord) {

        MemberRecord newRecord = memberRecordRepository.findById(myRecord.getId()).orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));

        // 쥐팀인데 이김
        if (memberRecordDTO.getJob() == 0 && memberRecordDTO.isWin()) {
            log.info("쥐팀 승리");
            newRecord.updateWinMouse();
            log.info("내 승률 : {}", newRecord.getTotalWinRate());
            return;
        }
        // 고양이팀인데 이김
        if (memberRecordDTO.getJob() == 1 && memberRecordDTO.isWin()) {
            newRecord.updateWinCat();
            log.info("내 승률 : {}", newRecord.getTotalWinRate());
            return;
        }
        if (memberRecordDTO.getJob() == 0) {
            newRecord.updateLoseMouse();
            log.info("내 승률 : {}", newRecord.getTotalWinRate());
            return;
        }
        if (memberRecordDTO.getJob() == 1) {
            newRecord.updateLoseCat();
            log.info("내 승률 : {}", newRecord.getTotalWinRate());
        }

    }

}
