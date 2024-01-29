package com.gugu.cmiuc.domain.chat.entity;

import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
public class ChatMessage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_message_id")
    private Long id;

    private String content;

    private boolean checked; // 메시지 확인 여부

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @Builder
    public ChatMessage(String content, Member member, boolean checked, ChatRoom chatRoom) {
        this.content = content;
        this.member = member;
        this.checked = checked;
        this.chatRoom = chatRoom;
    }

}
