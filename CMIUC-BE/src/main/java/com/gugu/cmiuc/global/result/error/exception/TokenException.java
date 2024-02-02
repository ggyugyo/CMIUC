package com.gugu.cmiuc.global.result.error.exception;

import com.google.gson.Gson;
import com.gugu.cmiuc.global.result.error.ErrorCode;
import com.gugu.cmiuc.global.result.error.ErrorResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.MediaType;

import java.io.IOException;


public class TokenException extends BusinessException {
    public TokenException() {
        super(ErrorCode.JWT_MALFORM);
    }

    public TokenException(ErrorCode errorCode) {
        super(errorCode);
    }

    public void sendResponseError(HttpServletResponse response) {
        response.setStatus(this.getErrorCode().getStatus());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");

        final ErrorCode errorCode = this.getErrorCode();
        final ErrorResponse errorResponse = ErrorResponse.of(errorCode, this.getErrors());
        Gson gson = new Gson();

        try {
            response.getWriter().println(gson.toJson(errorResponse));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}