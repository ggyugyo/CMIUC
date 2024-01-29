package com.gugu.cmiuc.global.stomp.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gugu.cmiuc.global.stomp.dto.DataDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber {

    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;


    // Redis에서 메시지가 발행(publish)되면 대기하고 있던 Redis Subscriber가 해당 메시지를 받아 처리
    public void sendMessage(String publishMessage) {
        log.info("send message to subscriber : {}", publishMessage);
        try {
            // dataDTO 객채로 맵핑
            DataDTO data = objectMapper.readValue(publishMessage, DataDTO.class);
            log.info("[서버] 메세지를 DTO에 맵핑 : {}", data.getRoomId());
            // 채팅방을 구독한 클라이언트에게 메시지 발송
            messagingTemplate.convertAndSend("/sub/friends/chat/room/" + data.getRoomId(), data);
        } catch (Exception e) {
            log.error("Exception {}", e);
        }
    }
}