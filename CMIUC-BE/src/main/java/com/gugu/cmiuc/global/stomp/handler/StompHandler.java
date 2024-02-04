package com.gugu.cmiuc.global.stomp.handler;

import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.stomp.repository.StompRepository;
import com.gugu.cmiuc.global.stomp.service.StompService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
public class StompHandler implements ChannelInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    // websocket을 통해 들어온 요청이 처리 되기전 실행된다.
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT == accessor.getCommand()) { // websocket 연결요청

            //log.info("payload : {}", message);
            //
            //String jwtToken = accessor.getFirstNativeHeader("token");
            //log.info("CONNECT {}", jwtToken);

            // Header의 jwt token 검증
            //jwtTokenProvider.validateToken(jwtToken);

        } else if (StompCommand.SUBSCRIBE == accessor.getCommand()) { // 채팅룸 구독요청

            log.info("SUBSCRIBED!!!!");

        } else if (StompCommand.DISCONNECT == accessor.getCommand()) { // Websocket 연결 종료

            log.info("DISCONNECTED!!!!");

        } else if (StompCommand.UNSUBSCRIBE == accessor.getCommand()) {

            log.info("UNSUBSCRIBE!!!!!");

        }
        return message;
    }
}
