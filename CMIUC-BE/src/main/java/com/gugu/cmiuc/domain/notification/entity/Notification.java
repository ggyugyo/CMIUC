package com.gugu.cmiuc.domain.notification.entity;

import com.gugu.cmiuc.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class Notification extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    private String checked;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

}
