package com.gugu.cmiuc.domain.friend.entity;

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
public class FriendRequest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_request_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "sender_id")
    private Member sender;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @Builder
    public FriendRequest(Member sender, Member receiver) {
        this.sender = sender;
        this.receiver = receiver;
    }
}
