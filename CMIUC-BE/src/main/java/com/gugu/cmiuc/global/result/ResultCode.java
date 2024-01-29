package com.gugu.cmiuc.global.result;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultCode {
    // Member
    REGISTER_SUCCESS(201,  "회원가입에 성공하였습니다."),
    MEMBER_FIND_SUCCESS(200,  "회원정보 조회에 성공하였습니다."),
    MEMBER_UPDATE_SUCCESS(200,  "회원정보 수정에 성공하였습니다."),
    MEMBER_DELETE_SUCCESS(200,  "회원 탈퇴에 성공하였습니다."),
    LOGIN_SUCCESS(200,  "로그인에 성공하였습니다."),
    LOGOUT_SUCCESS(200,  "로그아웃에 성공하였습니다."),
    CHECK_MEMBER_OF_JWT(200,  "JWT토큰의 멤버 정보조회에 성공했습니다.");

    private final int status;
    private final String message;
}