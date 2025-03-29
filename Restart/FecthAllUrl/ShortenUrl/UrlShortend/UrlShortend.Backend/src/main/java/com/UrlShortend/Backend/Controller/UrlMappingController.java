package com.UrlShortend.Backend.Controller;

import com.UrlShortend.Backend.Dtos.UrlMappingDTO;
import com.UrlShortend.Backend.Model.Users;
import com.UrlShortend.Backend.Security.Services.UserService;
import com.UrlShortend.Backend.Service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/Urls")
@AllArgsConstructor
public class UrlMappingController {
    private UrlMappingService urlMappingService;
    private UserService userService;

    @PostMapping("/shorten")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UrlMappingDTO> createShortUrl(@RequestBody Map<String, String> request, Principal principal) {
        String originalUrl = request.get("originalUrl");
        Users user = userService.findByUsername(principal.getName());
      UrlMappingDTO urlMappingDTO=  urlMappingService.createShortUrl(originalUrl,user);
      return ResponseEntity.ok(urlMappingDTO);

    }

    @GetMapping ("/myurls")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<UrlMappingDTO>> getUserUrls(Principal principal)
    {
        Users users= userService.findByUsername(principal.getName());
        List<UrlMappingDTO> url=urlMappingService.getUrlsByUser(users);
        return  ResponseEntity.ok(url);
    }
























}
