package com.UrlShortend.Backend.Service;

import com.UrlShortend.Backend.Dtos.UrlMappingDTO;
import com.UrlShortend.Backend.Model.Url_Mapping;
import com.UrlShortend.Backend.Model.Users;
import com.UrlShortend.Backend.Repo.UrlMappingRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@AllArgsConstructor
public class UrlMappingService {
    private final UrlMappingRepo repo;

    public UrlMappingDTO createShortUrl(String originalUrl, Users user) {
        String shortUrl = generateShortUrl();

        Url_Mapping urlMapping = new Url_Mapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setUsers(user);
        urlMapping.setCreatedDate(LocalDateTime.now());
        urlMapping.setShortUrl(shortUrl);

        Url_Mapping savedUrlMapping = repo.save(urlMapping);
        return convertToDto(savedUrlMapping);
    }

    private UrlMappingDTO convertToDto(Url_Mapping urlMapping) {
        UrlMappingDTO dto = new UrlMappingDTO();
        dto.setOriginalUrl(urlMapping.getOriginalUrl());
        dto.setUsername(urlMapping.getUsers().getUsername());
        dto.setCreatedDate(urlMapping.getCreatedDate());
        dto.setShortUrl(urlMapping.getShortUrl());
        dto.setId(urlMapping.getId());
        dto.setClickCount(urlMapping.getClickCount());
        return dto;
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }

        return shortUrl.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(Users users) {
        return repo.findByUsers(users).stream()
                .map(this::convertToDto)
                .toList();

    }
}
