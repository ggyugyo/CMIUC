package com.gugu.cmiuc.domain.chat.entity;

import com.gugu.cmiuc.domain.friend.entity.Friend;
import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    @JoinColumn(name = "friend_id")
    private Friend friend;

    @Builder
    public ChatMessage(String content, Member member, boolean checked, Friend friend) {
        this.content = content;
        this.member = member;
        this.checked = checked;
        this.friend = friend;
    }

}
