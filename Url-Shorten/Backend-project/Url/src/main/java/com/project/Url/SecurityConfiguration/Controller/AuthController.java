package com.project.Url.SecurityConfiguration.Controller;

import com.project.Url.Model.Users;
import com.project.Url.SecurityConfiguration.Dtos.LoginRequest;
import com.project.Url.SecurityConfiguration.Dtos.RegisterRequest;
import com.project.Url.SecurityConfiguration.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserService userService;


    @PostMapping("/public/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest)
        {

            Users user= new Users();
            user.setUsername(registerRequest.getUsername());
            user.setRole("ROLE_USER");
            user.setEmail(registerRequest.getEmail());
            user.setPassword(registerRequest.getPassword());
            userService.registerUser(user);
            return ResponseEntity.ok("User Registeer SucessFully");

        }
        
        @PostMapping("/public/login")
        public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest)
        {
            return  ResponseEntity.ok(userService.authenticateUser(loginRequest) );
        }




}
