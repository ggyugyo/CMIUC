package com.gugu.cmiuc.global.config;

import com.gugu.cmiuc.global.stomp.handler.StompHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final StompHandler stompHandler;

    // 메시지 브로커 구성을 설정
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub"); // 클라이언트가 topic을 구독하고 메시지를 수신할 수 있도록 함
        config.setApplicationDestinationPrefixes("/pub"); // 클라이언트가 메시지를 전송할 때 사용하는 목적지 prefix 설정
    }

    // STOMP endpoint 등록
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*")
                .withSockJS(); // Sockjs를 사용하기 위함 => 웹 소켓을 지원하지 않는 브라우저에서도 비슷한 경험을 제공하기 위해서
    }

    // 서버로 오는 메세지를 처리하는 채널을 구성 (클라이언트 인바운드 채널)
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(stompHandler); // StompHandler를 클라이언트 인바운드 채널에 등록하여 STOMP 메시지 처리를 수행
    }

}
