package com.gugu.cmiuc.global.security.filter;


import com.gugu.cmiuc.global.config.JwtTokenProvider;
import com.gugu.cmiuc.global.result.error.exception.BusinessException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

import static com.gugu.cmiuc.global.result.error.ErrorCode.JWT_BADTYPE;

@Log4j2
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtTokenProvider jwtTokenProvider;
    private final UserDetailsService userDetailsService;

    @Value("${auth.whiteList}")
    private String[] whiteList;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getRequestURI();

        AntPathMatcher antPathMatcher = new AntPathMatcher();

        for (String list : whiteList) {
            if (antPathMatcher.match(list, path)) {
                //log.info("pass token filter .....");
                filterChain.doFilter(request, response);
                return;
            }
        }

        try {
            // Request Header 에서 JWT 토큰 추출
            String token = parseBearerToken(request);
            jwtTokenProvider.validateToken(token);

            // Security context에 멤버 추가
            Authentication auth = new UsernamePasswordAuthenticationToken(userDetailsService.loadUserByUsername(jwtTokenProvider.getUserNameFromJwt(token)), null, null);
            SecurityContextHolder.getContext().setAuthentication(auth);
            filterChain.doFilter(request, response);

        } catch (RuntimeException e) {  // TODO: 2023-12-24 토큰예외 메시지 수정
            response.setContentType(MediaType.APPLICATION_JSON_VALUE + ";charset=UTF-8");
            response.getWriter().println("토큰 에러");
        }
    }

    private String parseBearerToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(HttpHeaders.AUTHORIZATION))
                .filter(token -> token.substring(0, 7).equalsIgnoreCase("Bearer "))
                .map(token -> token.substring(7))
                .orElseThrow(() -> new BusinessException(JWT_BADTYPE));
    }
}