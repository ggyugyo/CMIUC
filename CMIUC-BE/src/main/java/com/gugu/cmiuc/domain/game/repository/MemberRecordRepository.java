package com.gugu.cmiuc.domain.game.repository;

import com.gugu.cmiuc.domain.game.entity.MemberRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRecordRepository extends JpaRepository<MemberRecord, Long> {
}
