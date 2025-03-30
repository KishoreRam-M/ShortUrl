package com.UrlShortend.Backend.Dtos;

import com.UrlShortend.Backend.Model.Users;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UrlMappingDTO {
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount;
    private LocalDateTime createdDate;
    private String username;

}
