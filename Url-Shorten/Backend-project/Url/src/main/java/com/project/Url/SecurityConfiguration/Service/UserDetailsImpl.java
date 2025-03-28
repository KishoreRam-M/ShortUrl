package com.project.Url.SecurityConfiguration.Service;

import com.project.Url.Model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;
    private final String username;
    private final String email;
    private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String password, String email, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public static UserDetailsImpl build(Users users) {
        GrantedAuthority authority = new SimpleGrantedAuthority(users.getRole());
        return new UserDetailsImpl(users.getUsername(), users.getPassword(), users.getEmail(), Collections.singletonList(authority));
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Change based on your logic
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Change based on your logic
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Change based on your logic
    }

    @Override
    public boolean isEnabled() {
        return true; // Change based on your logic
    }
}
