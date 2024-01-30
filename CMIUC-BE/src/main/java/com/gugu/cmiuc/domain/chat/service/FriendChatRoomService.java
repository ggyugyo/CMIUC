package com.gugu.cmiuc.domain.chat.service;

import com.gugu.cmiuc.domain.chat.dto.FriendChatMessageDTO;
import com.gugu.cmiuc.domain.chat.entity.ChatMessage;
import com.gugu.cmiuc.domain.chat.repository.ChatMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Slf4j
@Service
public class FriendChatRoomService {

    private final ChatMessageRepository chatMessageRepository;

    // 이전 채팅 메세지 불러옴
    public List<FriendChatMessageDTO> getPreviousChatMessage(String roomId, Pageable pageable) {

        List<ChatMessage> messages = chatMessageRepository.findAllByChatRoomId(roomId, pageable).getContent();
        List<FriendChatMessageDTO> messageDTOList = new ArrayList<>();

        for (ChatMessage message : messages) {
            messageDTOList.add(FriendChatMessageDTO.builder()
                    .memberId(message.getMember().getId())
                    .sender(message.getMember().getNickname())
                    .message(message.getContent())
                    .build());
        }

        return messageDTOList;
    }

    public int getMessageCount(String roomId) {
        return chatMessageRepository.countByChatRoomId(roomId);
    }
}
