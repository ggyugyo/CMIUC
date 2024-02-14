package com.gugu.cmiuc.domain.game.repository;

import com.gugu.cmiuc.domain.game.entity.MemberRecord;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRecordRepository extends JpaRepository<MemberRecord, Long> {

    List<MemberRecord> findTop10ByOrderByTotalWinRateDesc();

    List<MemberRecord> findTop10ByOrderByWinCatRateDesc();

    List<MemberRecord> findTop10ByOrderByWinMouseRateDesc();

    long countByTotalWinRateGreaterThan(Double totalWinRate);

    long countByWinCatRateGreaterThan(Double winCatRate);

    long countByWinMouseRateGreaterThan(Double winMouseRate);

    void deleteById(Long member);

}
