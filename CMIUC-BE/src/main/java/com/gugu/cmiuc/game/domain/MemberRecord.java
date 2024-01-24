package com.gugu.cmiuc.game.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class MemberRecord {

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
