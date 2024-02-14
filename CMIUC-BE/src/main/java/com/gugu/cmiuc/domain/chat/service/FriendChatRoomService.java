package com.gugu.cmiuc.domain.chat.service;

import com.gugu.cmiuc.domain.chat.dto.FriendChatMessageDTO;
import com.gugu.cmiuc.domain.chat.entity.ChatMessage;
import com.gugu.cmiuc.domain.chat.repository.ChatMessageRepository;
import com.gugu.cmiuc.domain.friend.repository.FriendRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class FriendChatRoomService {

    private final ChatMessageRepository chatMessageRepository;
    private final FriendRepository friendRepository;

    // 이전 채팅 메세지 불러옴
    //public Page<FriendChatMessageDTO> getLastChatMessage(String roomId, Pageable pageable) {
    //
    //    //Page<ChatMessage> messages = chatMessageRepository.findAllByFriendId(roomId, pageable);
    //    Page<ChatMessage> messages = chatMessageRepository.findByFriendIdOrderByCreatedAtDesc(roomId, pageable);
    //    return messages.map(this::convertToDTO);
    //
    //}

    // 이전 채팅 메세지 불러옴
    public Page<FriendChatMessageDTO> getPreviousChatMessage(String roomId, Long index, Pageable pageable) {

        if (index == 0) {
            //log.info("총 메시지 수 : {}", getMessageCount(roomId));
            index = getMessageIndex(roomId) + 1;
            log.info("이게뭐람...{}", index);
        }

        Page<ChatMessage> messages = chatMessageRepository.findByFriendIdAndIdLessThanOrderByCreatedAtDesc(roomId, index, pageable);
        return messages.map(this::convertToDTO);
    }

    private FriendChatMessageDTO convertToDTO(ChatMessage chatMessage) {
        return FriendChatMessageDTO.builder()
                .memberId(chatMessage.getMember().getId())
                .sender(chatMessage.getMember().getNickname())
                .messageId(chatMessage.getId())
                .message(chatMessage.getContent())
                .build();
    }

    public Long getMessageIndex(String roomId) {
        return chatMessageRepository.findFirstByFriendIdOrderByCreatedAtDesc(roomId).get().getId();
    }
}
