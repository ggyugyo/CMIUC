package com.gugu.cmiuc.domain.friend.entity;

import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class FriendRequest extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_request_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_member_id")
    private Member from_member;

    @ManyToOne
    @JoinColumn(name = "to_member_id")
    private Member to_member;

}
