package com.gugu.cmiuc.domain.chat.repository;

import com.gugu.cmiuc.domain.chat.entity.ChatMessage;
import com.gugu.cmiuc.domain.friend.entity.Friend;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findAllByFriendId(String roomId, Pageable pageable);

    // 가장 최근 메시지 내역 조회
    Page<ChatMessage> findByFriendIdOrderByCreatedAtDesc(String roomId, Pageable pageable);

    // 아이디로 이전 채팅 메세지 조회
    Page<ChatMessage> findByFriendIdAndIdLessThanOrderByCreatedAtDesc(String friendId, Long chatMessageId, Pageable pageable);

    Long countByFriendId(String roomId);

    // 마지막 메시지 조회
    Optional<ChatMessage> findFirstByFriendIdOrderByCreatedAtDesc(String friendId);

    // 해당 친구관계의 모든 메세지 제거
    void deleteAllByFriend(Friend friend);

}