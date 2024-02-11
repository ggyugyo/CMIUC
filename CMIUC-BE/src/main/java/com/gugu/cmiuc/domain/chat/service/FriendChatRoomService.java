package com.gugu.cmiuc.domain.chat.service;

import com.gugu.cmiuc.domain.chat.dto.FriendChatMessageDTO;
import com.gugu.cmiuc.domain.chat.entity.ChatMessage;
import com.gugu.cmiuc.domain.chat.repository.ChatMessageRepository;
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

    // 이전 채팅 메세지 불러옴
    public Page<FriendChatMessageDTO> getLastChatMessage(String roomId, Pageable pageable) {

        Page<ChatMessage> messages = chatMessageRepository.findAllByFriendId(roomId, pageable);
        return messages.map(this::convertToDTO);

    }

    public Page<FriendChatMessageDTO> getPreviousChatMessage(String roomId, Long index, Pageable pageable){
        Page<ChatMessage> messages = chatMessageRepository.findAllByRoomIdAndIdLessThan(roomId, index, pageable);
        return messages.map(this::convertToDTO);
    }

    private FriendChatMessageDTO convertToDTO(ChatMessage chatMessage) {
        return FriendChatMessageDTO.builder()
                .memberId(chatMessage.getMember().getId())
                .sender(chatMessage.getMember().getNickname())
                .message(chatMessage.getContent())
                .build();
    }

    public int getMessageCount(String roomId) {
        return chatMessageRepository.countByFriendId(roomId);
    }
}
