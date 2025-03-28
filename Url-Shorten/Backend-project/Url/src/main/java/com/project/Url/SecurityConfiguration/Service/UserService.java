package com.project.Url.SecurityConfiguration.Service;

import com.project.Url.Model.Users;
import com.project.Url.Repo.UserRepo;
import com.project.Url.SecurityConfiguration.Dtos.LoginRequest;
import com.project.Url.SecurityConfiguration.Security.JwtAuthenticationResponse;
import com.project.Url.SecurityConfiguration.Security.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder= new BCryptPasswordEncoder(12);
    private final UserRepo repo;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public Users registerUser(Users user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);

        return new JwtAuthenticationResponse(jwt); // Correct return type
    }
}
