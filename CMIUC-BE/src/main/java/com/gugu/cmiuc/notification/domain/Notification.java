package com.gugu.cmiuc.notification.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Getter
@Entity
@NoArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private Long id;

    private String checked;

    private String type;

    @CreatedDate
    private String createdAt = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy.MM.dd"));

}
