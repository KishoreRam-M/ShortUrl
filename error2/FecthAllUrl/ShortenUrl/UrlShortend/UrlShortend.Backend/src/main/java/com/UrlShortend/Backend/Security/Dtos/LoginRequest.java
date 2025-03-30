package com.UrlShortend.Backend.Security.Dtos;

import lombok.Data;

import java.util.Set;
@Data
public class LoginRequest {
    private String  username;
    private String password;

}
