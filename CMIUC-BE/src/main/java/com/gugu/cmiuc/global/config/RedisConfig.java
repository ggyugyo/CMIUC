package com.gugu.cmiuc.global.config;

import com.gugu.cmiuc.global.stomp.pubsub.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter.MessageListenerAdapter;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@RequiredArgsConstructor
@Configuration
public class RedisConfig {

    @Value("${REDIS_HOST}")
    private String redisHost;

    @Value("${REDIS_PORT}")
    private int redisPort;

    @Value("${REDIS_PASSWORD}")
    private String redisPassword;


    // GAME에 대한 모든 data를 pub/sub할 topic
    @Bean
    public ChannelTopic gameTopic() {
        return new ChannelTopic("GAME");
    }

    // FRIEND 채팅에 대한 data를 pub/sub할 topic
    @Bean
    public ChannelTopic friendTopic() {
        return new ChannelTopic("FRIEND");
    }

    // Redis 연결 설정
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        // Redis 서버의 호스트와 포트 설정
        RedisStandaloneConfiguration redisConfig = new RedisStandaloneConfiguration(redisHost, redisPort);
        redisConfig.setPassword(redisPassword);

        return new LettuceConnectionFactory(redisConfig);
    }

    // redis에 발행(publish)된 메시지 처리를 위한 리스너 설정
    @Bean
    public RedisMessageListenerContainer redisMessageListener(RedisConnectionFactory connectionFactory,
                                                              MessageListenerAdapter listenerAdapter,
                                                              ChannelTopic gameTopic,
                                                              ChannelTopic friendTopic) {
        RedisMessageListenerContainer container = new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.addMessageListener(listenerAdapter, friendTopic); // FRIEND 토픽
        container.addMessageListener(listenerAdapter, gameTopic); // GAME 토픽
        return container;
    }


    // 실제 메시지를 처리하는 subscriber 설정 추가
    @Bean
    public MessageListenerAdapter listenerAdapter(RedisSubscriber subscriber) {
        return new MessageListenerAdapter(subscriber, "sendMessage");
    }


    // 어플리케이션에서 사용할 redisTemplate 설정
    @Bean
    public RedisTemplate<?, ?> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

        // Redis 서버와의 연결 설정
        redisTemplate.setConnectionFactory(connectionFactory);
        // key에 대한 직렬화 방식 설정
        redisTemplate.setKeySerializer(new StringRedisSerializer());
        // value에 대한 직렬화 방식 설정
        redisTemplate.setValueSerializer(new Jackson2JsonRedisSerializer<>(String.class));

        return redisTemplate;
    }
}
