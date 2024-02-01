package com.gugu.cmiuc.domain.friend.repository;

import com.gugu.cmiuc.domain.friend.entity.Friend;
import com.gugu.cmiuc.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, String> {

    // 유저 id로 친구 리스트 가져오기
    List<Friend> findAllByFollowerOrFollowing(Member Follower, Member Following);

    // 이미 친구인지 확인
    boolean existsByFollowerAndFollowing(Member Follower, Member Following);
}
