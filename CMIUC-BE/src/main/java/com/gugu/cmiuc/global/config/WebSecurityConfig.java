package com.gugu.cmiuc.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.formLogin(withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(request -> request
                        .requestMatchers("/templates/chat/**").hasRole("USER") // 해당권한을 가진 사람만 인증가능
                        .anyRequest().permitAll() // 나머지는 인증없이 접근 가능
                )
                .logout(withDefaults());

        return http.build();
    }

    // test용 사용자 인증 정보를 인메모리에 저장
    @Bean
    public InMemoryUserDetailsManager userDetailService() throws Exception {

        UserDetails user1 = //핵심 정보로 사용자의 인증 정보를 생성
                User.builder()   // 패스워드를 암호화
                        .username("sung") // usrname(id) 설정
                        .password(passwordEncoder().encode("1111"))           // password 설정
                        .roles("USER")               // 역할을 지정
                        .build();
        UserDetails user2 =
                User.builder()     // 패스워드를 암호화
                        .username("yeo") // usrname(id) 설정
                        .password(passwordEncoder().encode("1111"))                // password 설정
                        .roles("USER")               // 역할을 지정
                        .build();
        UserDetails user3 =
                User.builder()      // 패스워드를 암호화
                        .username("kim") // usrname(id) 설정
                        .password(passwordEncoder().encode("1111"))                // password 설정
                        .roles("GUEST")               // 역할을 지정
                        .build();

        return new InMemoryUserDetailsManager(user1, user2, user3); //DI하여 빈 등록
    }
}