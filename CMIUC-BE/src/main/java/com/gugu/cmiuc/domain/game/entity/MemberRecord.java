package com.gugu.cmiuc.domain.game.entity;

import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRecord extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_record_id")
    private Long id;

    private Long winMouseCount;

    private Long totalMouseCount;

    private Double winMouseRate;

    private Long winCatCount;

    private Long totalCatCount;

    private Double winCatRate;

    private Double totalWinRate;

}
