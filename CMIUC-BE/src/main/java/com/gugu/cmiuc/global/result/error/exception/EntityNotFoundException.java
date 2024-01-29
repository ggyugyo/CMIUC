package com.gugu.cmiuc.global.result.error.exception;

import com.gugu.cmiuc.global.result.error.ErrorCode;

public class EntityNotFoundException extends BusinessException {

    public EntityNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
