package com.gugu.cmiuc.domain.game.service;

import com.gugu.cmiuc.domain.game.dto.MemberRecordDTO;
import com.gugu.cmiuc.domain.game.dto.MemberRecordResponseDTO;
import com.gugu.cmiuc.domain.game.dto.MyRecordDTO;
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

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.IntStream;

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

    // 전체 순위
    public List<MemberRecordResponseDTO> getTopPlayersByTotal() {

        List<MemberRecord> topPlayers = memberRecordRepository.findTop10ByOrderByTotalWinRateDesc();
        List<MemberRecordResponseDTO> topRecordDTOList = new ArrayList<>();

        AtomicReference<Integer> tieRank = new AtomicReference<>(1);
        AtomicReference<Double> previousTotalWinRate = new AtomicReference<>((double) 101);

        IntStream.range(0, topPlayers.size())  // 1부터 10까지의 순위를 생성
                .forEach((rank) -> {

                    MemberRecord record = topPlayers.get(rank);
                    MemberRecordResponseDTO memberRecordResponseDTO = convertToDTO(record);

                    double currentTotalWinRate = memberRecordResponseDTO.getTotalWinRate();
                    if (previousTotalWinRate.get() > currentTotalWinRate) {
                        previousTotalWinRate.set(currentTotalWinRate);
                        tieRank.set(rank + 1);
                    }
                    memberRecordResponseDTO.setRank(tieRank.get());

                    topRecordDTOList.add(memberRecordResponseDTO);
                });

        return topRecordDTOList;
    }


    // 고양이 순위
    public List<MemberRecordResponseDTO> getTopPlayersByCat() {

        List<MemberRecord> topPlayers = memberRecordRepository.findTop10ByOrderByWinCatRateDesc();
        List<MemberRecordResponseDTO> topCatRecordDTOList = new ArrayList<>();

        AtomicReference<Integer> tieRank = new AtomicReference<>(1);
        AtomicReference<Double> previousWinCatRate = new AtomicReference<>((double) 101);

        IntStream.range(0, topPlayers.size())  // 1부터 10까지의 순위를 생성
                .forEach((rank) -> {

                    MemberRecord record = topPlayers.get(rank);
                    MemberRecordResponseDTO memberRecordResponseDTO = convertToDTO(record);

                    double currentWinCatRate = memberRecordResponseDTO.getWinCatRate();
                    if (previousWinCatRate.get() > currentWinCatRate) {
                        previousWinCatRate.set(currentWinCatRate);
                        tieRank.set(rank + 1);
                    }
                    memberRecordResponseDTO.setRank(tieRank.get());

                    topCatRecordDTOList.add(memberRecordResponseDTO);
                });

        return topCatRecordDTOList;
    }


    // 쥐 순위
    public List<MemberRecordResponseDTO> getTopPlayersByMouse() {

        List<MemberRecord> topPlayers = memberRecordRepository.findTop10ByOrderByWinMouseRateDesc();
        List<MemberRecordResponseDTO> topMouseRecordDTOList = new ArrayList<>();

        AtomicReference<Integer> tieRank = new AtomicReference<>(1);
        AtomicReference<Double> previousWinMouseRate = new AtomicReference<>((double) 101);

        IntStream.range(0, topPlayers.size())  // 1부터 10까지의 순위를 생성
                .forEach((rank) -> {

                    MemberRecord record = topPlayers.get(rank);
                    MemberRecordResponseDTO memberRecordResponseDTO = convertToDTO(record);

                    double currentWinMouseRate = memberRecordResponseDTO.getWinMouseRate();
                    if (previousWinMouseRate.get() > currentWinMouseRate) {
                        previousWinMouseRate.set(currentWinMouseRate);
                        tieRank.set(rank + 1);
                    }
                    memberRecordResponseDTO.setRank(tieRank.get());

                    topMouseRecordDTOList.add(memberRecordResponseDTO);
                });

        return topMouseRecordDTOList;
    }

    public MemberRecordResponseDTO convertToDTO(MemberRecord record) {

        Member member = memberRepository.findByMemberRecord(record)
                .orElseThrow(() -> new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        long totalPlayCount = record.getTotalCatCount() + record.getTotalMouseCount();
        long totalWinCount = record.getWinCatCount() + record.getWinMouseCount();

        return MemberRecordResponseDTO.builder()
                .memberId(member.getId())
                .nickname(member.getNickname())
                .totalWinRate(record.getTotalWinRate())
                .winCatRate(record.getWinCatRate())
                .winMouseRate(record.getWinMouseRate())
                .totalPlayCount(totalPlayCount) // 전체
                .totalWinCount(totalWinCount)
                .totalLoseCount(totalPlayCount - totalWinCount)
                .winCatCount(record.getWinCatCount()) // 고양이
                .loseCatCount(record.getTotalCatCount() - record.getWinCatCount())
                .totalCatCount(record.getTotalCatCount())
                .winMouseCount(record.getWinMouseCount()) // 쥐
                .loseMouseCount(record.getTotalMouseCount() - record.getWinMouseCount())
                .totalMouseCount(record.getTotalMouseCount())
                .build();

    }

    // 내 순위 조회
    public MyRecordDTO getMyRanking(Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));

        MemberRecord myRecord = member.getMemberRecord();

        // 전체
        long totalRank = memberRecordRepository.countByTotalWinRateGreaterThan(myRecord.getTotalWinRate()) + 1;

        log.info("내 정보 조회: {}", totalRank);

        // 고양이
        long catRank = memberRecordRepository.countByWinCatRateGreaterThan(myRecord.getWinCatRate()) + 1;

        // 쥐
        long mouseRank = memberRecordRepository.countByWinMouseRateGreaterThan(myRecord.getWinMouseRate()) + 1;


        // DTO 변환
        long totalPlayCount = myRecord.getTotalCatCount() + myRecord.getTotalMouseCount();
        long totalWinCount = myRecord.getWinCatCount() + myRecord.getWinMouseCount();

        return MyRecordDTO.builder()
                .memberId(memberId)
                .nickname(member.getNickname())
                .totalRank(totalRank)
                .catRank(catRank)
                .mouseRank(mouseRank)
                .totalWinRate(myRecord.getTotalWinRate())
                .winCatRate(myRecord.getWinCatRate())
                .winMouseRate(myRecord.getWinMouseRate())
                .totalPlayCount(totalPlayCount) // 전체
                .totalWinCount(totalWinCount)
                .totalLoseCount(totalPlayCount - totalWinCount)
                .winCatCount(myRecord.getWinCatCount()) // 고양이
                .loseCatCount(myRecord.getTotalCatCount() - myRecord.getWinCatCount())
                .totalCatCount(myRecord.getTotalCatCount())
                .winMouseCount(myRecord.getWinMouseCount()) // 쥐
                .loseMouseCount(myRecord.getTotalMouseCount() - myRecord.getWinMouseCount())
                .totalMouseCount(myRecord.getTotalMouseCount())
                .build();
    }
}

