package com.gugu.cmiuc.global.stomp.pubsub;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gugu.cmiuc.global.result.error.ErrorCode;
import com.gugu.cmiuc.global.result.error.exception.CustomException;
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
            log.info("[서버] 메세지를 DTO에 맵핑 : {}", data.getType());

            // 친구 채팅 메세지 발송
            if (DataDTO.DataType.FRIEND_CHAT.equals(data.getType())) { // 친구 채팅
                log.info(" [친구 채팅] 구독자에게 메시지 드디어 발송");

                // 채팅방을 구독한 클라이언트에게 메시지 발송
                messagingTemplate.convertAndSend("/sub/friends/chat/" + data.getRoomId(), data);

                // 게임 시작 전 메시지 발송
            } else if (DataDTO.DataType.ENTER.equals(data.getType()) ||
                    DataDTO.DataType.START.equals(data.getType()) ||
                    DataDTO.DataType.READY.equals(data.getType()) ||
                    DataDTO.DataType.EXIT.equals(data.getType()) ||
                    DataDTO.DataType.ROOM_CUR_USERS.equals(data.getType())) {

                log.info(" [게임 room] 구독자에게 게임 시작 전 메세지 전송 : {} {}", data.getRoomId(), data.getData());
                // 게임룸을 구독한 클라이언트에게 채팅 메시지 발송
                messagingTemplate.convertAndSend("/sub/games/wait/" + data.getRoomId(), data);

                // 게임 시작 후 메세지 발송
            } else if (DataDTO.DataType.NEW_ROUND_SET.equals(data.getType()) ||
                    DataDTO.DataType.GAME_END_CAT_WIN.equals(data.getType()) ||
                    DataDTO.DataType.GAME_END_MOUSE_WIN.equals(data.getType()) ||
                    DataDTO.DataType.OPEN_CARD.equals(data.getType()) ||
                    DataDTO.DataType.MUTE_OFF.equals(data.getType()) ||
                    DataDTO.DataType.CHOICE_ALL_TURN.equals(data.getType()) ||
                    DataDTO.DataType.CAN_SEE_CARD.equals(data.getType()) ||
                    DataDTO.DataType.DELETE_CHEEZE_CARD.equals(data.getType()) ||
                    DataDTO.DataType.SHOW_JOB.equals(data.getType()) ||
                    DataDTO.DataType.DELETE_USER_CARDS.equals(data.getType()) ||
                    DataDTO.DataType.SEE_CARD.equals(data.getType())) {

                log.info(" [게임 진행] 구독자에게 data 전송 : {}", data.getData());
                messagingTemplate.convertAndSend("/sub/games/play/" + data.getRoomId(), data);

                // 게임 채팅 메세지 발송
            } else if (DataDTO.DataType.GAME_CHAT.equals(data.getType())) {

                log.info(" [게임 채팅] 구독자에게 채팅 메시지 전송 {}  {}", data.getRoomId());
                messagingTemplate.convertAndSend("/sub/games/chat/" + data.getRoomId(), data);

            }

        } catch (Exception e) {
            log.error("메시지 처리 중 에러발생 Exception {}", e);
        }
    }
}