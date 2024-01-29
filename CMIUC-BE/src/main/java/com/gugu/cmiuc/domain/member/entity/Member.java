package com.gugu.cmiuc.domain.member.entity;

import com.gugu.cmiuc.domain.game.entity.MemberRecord;
import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.FetchType.LAZY;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String nickname;

    private Long point;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_record_id")
    private MemberRecord memberRecord;

}