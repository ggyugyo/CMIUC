package com.gugu.cmiuc.domain.friend.entity;

import com.gugu.cmiuc.domain.member.entity.Member;
import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Friend extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "first_member_id")
    private Member firstMember;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "second_member_id")
    private Member secondMember;

}
