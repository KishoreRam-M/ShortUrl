package com.UrlShortend.Backend.Service;

import com.UrlShortend.Backend.Dtos.ClickEventDTO;
import com.UrlShortend.Backend.Dtos.UrlMappingDTO;
import com.UrlShortend.Backend.Model.ClickEvents;
import com.UrlShortend.Backend.Model.Url_Mapping;
import com.UrlShortend.Backend.Model.Users;
import com.UrlShortend.Backend.Repo.ClickEventRepo;
import com.UrlShortend.Backend.Repo.UrlMappingRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {
    private final UrlMappingRepo repo;
    private ClickEventRepo crepo;

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


    public List<UrlMappingDTO> getUrlsByUser(Users user) {
        return repo.findByUsers(user).stream()
                .map(this::convertToDto)
                .toList();
    }


    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        Url_Mapping urlMapping = repo.findByShortUrl(shortUrl);

        if (urlMapping == null) {
            return List.of(); // Return an empty list instead of null
        }

        return crepo.findByUrlMappingAndClickDateBetween(urlMapping, start, end)
                .stream()
                .collect(Collectors.groupingBy(
                        click -> click.getClickDate().toLocalDate(), // Grouping by Date
                        Collectors.counting() // Counting clicks per day
                ))
                .entrySet()
                .stream()
                .map(entry -> {
                    ClickEventDTO clickDTO = new ClickEventDTO();
                    clickDTO.setClickDate(entry.getKey().atStartOfDay()); // Setting the date
                    clickDTO.setCount(entry.getValue()); // Setting the click count
                    return clickDTO;
                })
                .toList();
    }


    public Map<LocalDate, Long> getTotalClicksByUserAndDate(Users user, LocalDateTime start, LocalDateTime end) {
        List<Url_Mapping> urlMappings = repo.findByUsers(user);
        List<ClickEvents> clickEvents = crepo.findByUrlMappingInAndClickDateBetween(urlMappings, start, end);
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));
    }
}
