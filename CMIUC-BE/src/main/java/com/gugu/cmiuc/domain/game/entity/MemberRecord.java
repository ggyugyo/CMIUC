package com.gugu.cmiuc.domain.game.entity;

import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberRecord extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_record_id")
    private Long id;

    private Long winMouseCount = 0L;

    private Long totalMouseCount = 0L;

    private Double winMouseRate = 0.0;

    private Long winCatCount = 0L;

    private Long totalCatCount = 0L;

    private Double winCatRate = 0.0;

    private Double totalWinRate = 0.0;

    @Builder
    public MemberRecord(Long winMouseCount, Long totalMouseCount, Double winMouseRate, Long winCatCount, Long totalCatCount, Double winCatRate, Double totalWinRate) {
        this.winMouseCount = winMouseCount;
        this.totalMouseCount = totalMouseCount;
        this.winMouseRate = winMouseRate;
        this.winCatCount = winCatCount;
        this.totalCatCount = totalCatCount;
        this.winCatRate = winCatRate;
        this.totalWinRate = totalWinRate;
    }
}
