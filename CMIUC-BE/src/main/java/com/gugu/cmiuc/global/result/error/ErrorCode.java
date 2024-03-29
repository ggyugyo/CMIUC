package com.gugu.cmiuc.global.result.error;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    // Global
    INTERNAL_SERVER_ERROR(500,  "내부 서버 오류입니다."),
    METHOD_NOT_ALLOWED(405,  "허용되지 않은 HTTP method입니다."),
    INPUT_VALUE_INVALID(400,  "유효하지 않은 입력입니다."),
    INPUT_TYPE_INVALID(400, "입력 타입이 유효하지 않습니다."),
    HTTP_MESSAGE_NOT_READABLE(400, "request message body가 없거나, 값 타입이 올바르지 않습니다."),
    HTTP_HEADER_INVALID(400, "request header가 유효하지 않습니다."),
    FORBIDDEN_ERROR(403,"작업을 수행하기 위한 권한이 없습니다."),

    //JWT
    JWT_INVALID(401, "유효하지 않은 토큰입니다."),
    JWT_BADTYPE(401, "Bearer 타입 토큰이 아닙니다."),
    JWT_EXPIRED(403, "만료된 토큰입니다."),
    JWT_MALFORM(401, "토큰값이 올바르지 않습니다."),
    BLACK_TOKEN(401,"접근이 차단된 토큰입니다."),
    TOKEN_ALIVE(400,  "유효기간이 만료되지 않은 토큰입니다."),
    REFRESH_INVALID(400,"리프레시 토큰이 유효하지 않습니다."),

    // Member
    LOGIN_FAIL(400, "로그인에 실패했습니다."),
    MEMBER_NOT_FOUND(404, "해당 유저를 찾을 수 없습니다."),
    NO_NICKNAME(404, "닉네임을 변경한 적이 없습니다."),
    DUPLICATION_NICKNAME(400, "중복된 닉네임입니다.")
    ;

    private final int status;
    private final String message;

}