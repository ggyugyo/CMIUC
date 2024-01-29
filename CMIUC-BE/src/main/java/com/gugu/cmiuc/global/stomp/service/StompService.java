package com.gugu.cmiuc.global.stomp.service;

import com.gugu.cmiuc.domain.chat.dto.FriendChatMessageDTO;
import com.gugu.cmiuc.domain.chat.entity.ChatMessage;
import com.gugu.cmiuc.domain.chat.entity.ChatRoom;
import com.gugu.cmiuc.domain.chat.repository.ChatMessageRepository;
import com.gugu.cmiuc.domain.chat.repository.ChatRoomRepository;
import com.gugu.cmiuc.global.stomp.dto.DataDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;


@Slf4j
@RequiredArgsConstructor
@Service
public class StompService {

    private final ChannelTopic friendTopic;
    private final ChannelTopic gameTopic;
    private final RedisTemplate redisTemplate;
    private final ChatMessageRepository chatMessageRepository;
    private final ChatRoomRepository chatRoomRepository;

    // destination 정보에서 roomId 추출하여 유저의 채팅방 구독을 관리
    public String getRoomId(String destination) {
        log.info("destination {} : ", destination);
        int lastIndex = destination.lastIndexOf('/');
        if (lastIndex != -1) {
            log.info("get roomId index : {}", lastIndex);
            return destination.substring(lastIndex + 1);
        } else
            return "";
    }

    // 게임채팅: 지정된 Websocket 세션에 메세지 발송
    public void sendGameChatMessage(DataDTO dataDTO) {

        log.info("stomp send message : {}", dataDTO);

        redisTemplate.convertAndSend(gameTopic.getTopic(), dataDTO);
    }

    // 친구채팅: 지정된 Websocket 세션에 메세지 발송
    public void sendFriendChatMessage(DataDTO dataDTO) {

        log.info("친구채팅!! stomp send message : {}", dataDTO);

        redisTemplate.convertAndSend(friendTopic.getTopic(), dataDTO);
    }

    // 친구채팅: 메세지를 DB에 저장
    public void saveFriendChatMessage(FriendChatMessageDTO friendChatMessageDTO, String roomId) {
        log.info("DB에 메세지 저장 : {}", friendChatMessageDTO);

        if (roomId != null) {

            ChatRoom chatRoom = chatRoomRepository.findById(roomId)
                    .orElseThrow(() -> new IllegalArgumentException("ChatRoom이 존재하지 않습니다: "));

            chatMessageRepository.save(ChatMessage.builder()
                    .content(friendChatMessageDTO.getMessage())
                    .checked(false) // 읽음 여부
                    .chatRoom(chatRoom)
                    .build());

        } else {
            // 주어진 ID가 null인 경우에 대한 처리를 수행
            log.error("주어진 ID가 null입니다.");
        }
    }
}