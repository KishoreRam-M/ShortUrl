package com.UrlShortend.Backend.Security.Controller;

import com.UrlShortend.Backend.Model.Users;
import com.UrlShortend.Backend.Security.Dtos.LoginRequest;
import com.UrlShortend.Backend.Security.Dtos.RegisterRequest;
import com.UrlShortend.Backend.Security.Services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {
    private UserService userService;

    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        Users user = new Users();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(registerRequest.getPassword());
        user.setRole("ROLE_USER");
        userService.registerUser(user);
        return ResponseEntity.ok("User Register Sucessfully");
    }


    @PostMapping("/public/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest LoginRequest) {
        return ResponseEntity.ok(userService.authenticateUser(LoginRequest));
    }
}
