package com.gugu.cmiuc.global.stomp.service;

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
    private final RedisTemplate redisTemplate;

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

    // 지정된 Websocket 세션에 메세지 발송
    public void sendChatMessage(DataDTO dataDTO) {

        log.info("stomp send message : {}", dataDTO);

        if(DataDTO.DataType.FRIEND_CHAT.equals(dataDTO.getType())){

        }

        redisTemplate.convertAndSend(friendTopic.getTopic(), dataDTO);
    }
}