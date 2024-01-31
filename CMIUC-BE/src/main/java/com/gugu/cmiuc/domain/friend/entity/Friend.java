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
public class Friend extends BaseEntity {

    @Id
    @Column(name = "friend_id")
    private String id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "follower_id")
    private Member follower;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "following_id")
    private Member following;

    @Builder
    public Friend(String id, Member follower, Member following) {
        this.id = id;
        this.follower = follower;
        this.following = following;
    }

}
