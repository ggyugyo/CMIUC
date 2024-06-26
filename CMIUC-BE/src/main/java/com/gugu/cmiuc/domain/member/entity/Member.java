package com.gugu.cmiuc.domain.member.entity;

import com.gugu.cmiuc.domain.game.entity.MemberRecord;
import com.gugu.cmiuc.global.entity.BaseEntity;
import com.gugu.cmiuc.global.security.oauth.entity.OAuthProvider;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

import static jakarta.persistence.FetchType.EAGER;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member extends BaseEntity implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    private String email;

    private String nickname;

    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;

    private Long point = 0L;

    //@JsonIgnore
    @OneToOne(fetch = EAGER, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "member_record_id")
    private MemberRecord memberRecord;

    @Builder
    public Member(String email, String nickname, MemberRecord memberRecord, OAuthProvider oAuthProvider) {
        this.email = email;
        this.nickname = nickname;
        this.memberRecord = memberRecord;
        this.oAuthProvider = oAuthProvider;
    }

    public void upddateNickname(String newNickname) {
        this.nickname = newNickname;
    }

    public void addPoint(long point) {
        this.point = this.point + point;
    }

    public void payPoint(long point){
        this.point = this.point - point;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}
