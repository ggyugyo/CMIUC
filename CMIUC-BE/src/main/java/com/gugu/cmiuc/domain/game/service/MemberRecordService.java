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

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MemberRecordService {

    private final MemberRecordRepository memberRecordRepository;
    private final MemberRepository memberRepository;

    public void setMemberRecord(List<MemberRecordDTO> memberRecordDTOList) {

        for (MemberRecordDTO memberRecordDTO : memberRecordDTOList) {

            Member member = memberRepository.findById(memberRecordDTO.getMemberId())
                    .orElseThrow(() -> new CustomException(ErrorCode.MEMBER_NOT_FOUND));
            MemberRecord myRecord = member.getMemberRecord();

            updateMemberRecord(memberRecordDTO, myRecord);

        }

    }

    private void updateMemberRecord(MemberRecordDTO memberRecordDTO, MemberRecord myRecord) {
        Long winMouseCount = myRecord.getWinMouseCount();
        Long totalMouseCount = myRecord.getTotalMouseCount();
        Double winMouseRate = myRecord.getWinMouseRate();
        Long winCatCount = myRecord.getWinCatCount();
        Long totalCatCount = myRecord.getTotalCatCount();
        Double winCatRate = myRecord.getWinCatRate();
        Double totalWinRate = myRecord.getTotalWinRate();

        // 쥐팀이 이겼고 내가 쥐팀일 때
        if (memberRecordDTO.getJob().equals("mouse")) {
            totalMouseCount++;
            if (memberRecordDTO.isWin()) {
                winMouseCount++;
            }
            winMouseRate = getJobWinRate(winMouseCount, totalMouseCount);
        } else if (memberRecordDTO.getJob().equals("cat")) {
            totalCatCount++;
            if (memberRecordDTO.isWin()) {
                winCatCount++;
            }
            winCatRate = getJobWinRate(winCatCount, totalCatCount);
        }

        totalWinRate = getTotalWinRate(winMouseCount, winCatCount, totalCatCount, totalMouseCount);


        MemberRecord newRecord = memberRecordRepository.save(MemberRecord.builder()
                .totalWinRate(totalWinRate)
                .winCatRate(winCatRate)
                .totalCatCount(totalCatCount)
                .winCatCount(winCatCount)
                .winMouseRate(winMouseRate)
                .winMouseCount(winMouseCount)
                .totalMouseCount(totalMouseCount)
                .build());


        log.info("내 기록 : {}", myRecord.getTotalWinRate());
        log.info("내 새로운 기록: {}", newRecord.getTotalWinRate());
    }

    private static Double getTotalWinRate(Long winMouseCount, Long winCatCount, Long totalCatCount, Long totalMouseCount) {
        //return (double) (winMouseCount + winCatCount) / (double)  (totalCatCount + totalMouseCount);
        return (winMouseCount + winCatCount) / (double)  (totalCatCount + totalMouseCount);
    }

    private static Double getJobWinRate(Long winJobCount, Long totalJobCount) {
        return totalJobCount == 0 ? 0.0 : (double) winJobCount / totalJobCount;
    }

}
