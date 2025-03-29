package com.UrlShortend.Backend.Security.Services;

import com.UrlShortend.Backend.Model.Users;
import com.UrlShortend.Backend.Repo.UsersRepo;
import com.UrlShortend.Backend.Security.Dtos.LoginRequest;
import com.UrlShortend.Backend.Security.Jwt.JwtAuthenticationResponse;
import com.UrlShortend.Backend.Security.Jwt.JwtUtils;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;  // Inject JwtUtils

    @Autowired
    private UsersRepo repo;

    public Users registerUser(Users users) {
        users.setPassword(passwordEncoder.encode(users.getPassword()));
        return repo.save(users);
    }

    public JwtAuthenticationResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);

        return new JwtAuthenticationResponse(jwt);  // Corrected return statement
    }

    public Users findByUsername(String name) {
        Users user = repo.findByUsername(name);
        if (user != null) {
            System.out.println("User Does Not Exists");
        }

        return user;
    }
}
