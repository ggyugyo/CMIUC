package com.gugu.cmiuc.domain.friend.repository;

import com.gugu.cmiuc.domain.friend.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long> {

    // 유저 id로 친구 리스트 가져오기
    List<Friend> findAllByFollowerIdOrFollowingId(Long followerId, Long followingId);

}
