package com.gugu.cmiuc.global.config;

import com.gugu.cmiuc.global.result.error.exception.TokenException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import static com.gugu.cmiuc.global.result.error.ErrorCode.*;

@Slf4j
@Component
public class JwtTokenProvider {

    private final Key key;

    public JwtTokenProvider(@Value("${jwt.secret-key}") String secretKey) {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generate(String subject, Date expiredAt) {
        return Jwts.builder()
                .setSubject(subject)
                .setExpiration(expiredAt)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // Jwt Token을 복호화 하여 이름을 얻음
    // todo repository 들러서 nickname 가져와야함
    public String getUserNameFromJwt(String jwt) {
        return parseClaims(jwt).getSubject();
    }


    // Jwt Token의 유효성을 체크
    public void validateToken(String jwt) {
        try {
            this.parseClaims(jwt).getExpiration().before(new Date());
        } catch (SecurityException | MalformedJwtException | IllegalArgumentException e) {
            log.error("Token validation failed due to a security or format issue: {}", e.getMessage());
            throw new TokenException(JWT_MALFORM);
        } catch (ExpiredJwtException e) {
            log.warn("Token has expired: {}", e.getMessage());
            throw new TokenException(JWT_EXPIRED);
        } catch (RuntimeException e) {
            log.error("Unexpected error during token validation: {}", e.getMessage());
            throw new TokenException(JWT_INVALID);
        }
    }

    public String extractSubject(String accessToken) {
        Claims claims = parseClaims(accessToken);
        return claims.getSubject();
    }

    private Claims parseClaims(String accessToken) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(accessToken)
                    .getBody();
        } catch (ExpiredJwtException e) {
            return e.getClaims();
        }
    }
}
