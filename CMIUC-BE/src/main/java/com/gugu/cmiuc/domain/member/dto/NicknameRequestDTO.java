package com.gugu.cmiuc.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class NicknameRequestDTO {
    private String nickname;
}
