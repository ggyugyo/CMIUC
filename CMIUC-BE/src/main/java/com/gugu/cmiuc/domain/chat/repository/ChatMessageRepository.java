package com.gugu.cmiuc.domain.chat.repository;

import com.gugu.cmiuc.domain.chat.entity.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findAllByFriendId(String roomId, Pageable pageable);
    int countByFriendId(String roomId);
}