package com.gugu.cmiuc.domain.friend.repository;

import com.gugu.cmiuc.domain.friend.entity.FriendRequest;
import com.gugu.cmiuc.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

    List<FriendRequest> findByReceiver(Member receiver);

    boolean existsBySenderAndReceiver(Member sender, Member receiver);

    int deleteBySenderAndReceiver(Member sender, Member receiver);
}
