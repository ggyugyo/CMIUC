package com.gugu.cmiuc.global.result.error.exception;

import com.gugu.cmiuc.global.result.error.ErrorCode;

public class EntityAlreadyExistException extends BusinessException {

    public EntityAlreadyExistException(ErrorCode errorCode) {
        super(errorCode);
    }
}
