package com.gugu.cmiuc.domain.member.repository;

import com.gugu.cmiuc.domain.game.entity.MemberRecord;
import com.gugu.cmiuc.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findByEmail(String email);

    Optional<Member> findByNickname(String Nickname);

    boolean existsByNickname(String nickname);

    Optional<Member> findByMemberRecord(MemberRecord record);
}
