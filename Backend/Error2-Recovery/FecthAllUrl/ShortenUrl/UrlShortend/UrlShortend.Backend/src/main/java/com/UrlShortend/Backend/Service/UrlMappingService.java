package com.UrlShortend.Backend.Service;

import com.UrlShortend.Backend.Dtos.ClickEventDTO;
import com.UrlShortend.Backend.Dtos.UrlMappingDTO;
import com.UrlShortend.Backend.Model.ClickEvents;
import com.UrlShortend.Backend.Model.Url_Mapping;
import com.UrlShortend.Backend.Model.Users;
import com.UrlShortend.Backend.Repo.ClickEventsRepo;
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
    private final ClickEventsRepo clickEventsRepo;

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
        return repo.findByUsers(users).stream().map(this::convertToDto).toList();

    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        Url_Mapping urlMapping = repo.findByShortUrl(shortUrl);
        if (urlMapping != null) {
            return clickEventsRepo.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream().collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting())).entrySet().stream().map(entry -> {
                ClickEventDTO clickEventDTO = new ClickEventDTO();
                clickEventDTO.setClickDate(entry.getKey());
                clickEventDTO.setCount(entry.getValue());
                return clickEventDTO;
            }).collect(Collectors.toList());

        }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(Users user, LocalDate start, LocalDate end) {

        List<Url_Mapping> urlMappings = repo.findByUsers(user);
        List<ClickEvents> clickEvents=clickEventsRepo.findByUrlMappingInAndClickDateBetween(urlMappings,start.atStartOfDay(),end.plusDays(1).atStartOfDay());
        return  clickEvents.stream()
                .collect(Collectors.groupingBy(click->click.getClickDate().toLocalDate(),Collectors.counting()));
    }

    public Url_Mapping getOriginalUrl(String shortUrl) {
        Url_Mapping urlMapping=repo.findByShortUrl(shortUrl);
        if (urlMapping!=null)
        {
            urlMapping.setClickCount(urlMapping.getClickCount()+1);
            repo.save(urlMapping);
            ClickEvents clickEvents= new ClickEvents();
            clickEvents.setClickDate(LocalDateTime.now());
            clickEvents.setUrlMapping(urlMapping);
            clickEventsRepo.save(clickEvents);
        }


        return urlMapping;
    }
}
