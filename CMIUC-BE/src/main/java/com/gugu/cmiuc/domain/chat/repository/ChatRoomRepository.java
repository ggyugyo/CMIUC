package com.gugu.cmiuc.domain.chat.repository;

import com.gugu.cmiuc.domain.friend.entity.Friend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRoomRepository extends JpaRepository<Friend, String> {
    Optional<Friend> findById(String roomId);
}
