package com.gugu.cmiuc.domain.chat.entity;

import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom extends BaseEntity {

    @Id
    @Column(name = "chat_room_id")
    private String id;

    @Builder
    public ChatRoom(String id) {
        this.id = id;
    }

}
