package com.gugu.cmiuc.domain.game.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RoomUserDTO implements Comparable<RoomUserDTO> {//게임방 안에 있는 user에 대한 정보
    private String roomId;//
    private int order;//순서
    private long memberId;//유저아이디(유저번호)
    private String nickname;
    private int state;//상태=>현 객체에 사용자가 있는지 유무 확인 가능
    private boolean ready;//레디 상태

    @Override
    public int compareTo(RoomUserDTO o) {//사용자 순서 정렬
        return this.order - o.order;
    }

    public RoomUserDTO update(RoomUserDTO roomUserDTO) {
        this.roomId = roomUserDTO.roomId;
        this.order = roomUserDTO.order;
        this.memberId = roomUserDTO.memberId;
        this.nickname = roomUserDTO.nickname;
        this.state = roomUserDTO.state;

        return this;
    }

    @Builder
    public RoomUserDTO(String roomId, int order, long memberId, String nickname, int state, boolean ready) {
        this.roomId = roomId;
        this.order = order;
        this.memberId = memberId;
        this.nickname = nickname;
        this.state = state;
        this.ready = ready;
    }
}
