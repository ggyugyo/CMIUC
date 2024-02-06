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

    private Long winMouseCount = 0L;

    private Long totalMouseCount = 0L;

    private Double winMouseRate = 0.0;

    private Long winCatCount = 0L;

    private Long totalCatCount = 0L;

    private Double winCatRate = 0.0;

    private Double totalWinRate = 0.0;

    public static MemberRecord of() {
        return new MemberRecord();
    }

    public void updateWinMouse() {

        this.winMouseCount++;
        updateLoseMouse();
    }

    public void updateLoseMouse() {
        this.totalMouseCount++;
        this.winMouseRate = (double) this.winMouseCount / this.totalMouseCount;

        this.totalWinRate = (this.winMouseCount + this.winCatCount) / (double) (this.totalMouseCount + this.totalCatCount);
    }

    public void updateWinCat() {

        this.winCatCount++;
        updateLoseCat();
    }

    public void updateLoseCat() {
        this.totalCatCount++;
        this.winCatRate = (double) this.winCatCount / this.totalCatCount;

        this.totalWinRate = (this.winMouseCount + this.winCatCount) / (double) (this.winMouseCount + this.totalCatCount);
    }
}
