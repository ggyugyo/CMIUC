package com.gugu.cmiuc.domain.member.repository;

import com.gugu.cmiuc.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findMemberById(Long memberId);
}
