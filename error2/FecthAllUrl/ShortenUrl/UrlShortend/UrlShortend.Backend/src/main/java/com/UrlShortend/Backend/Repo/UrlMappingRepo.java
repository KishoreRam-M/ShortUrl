package com.UrlShortend.Backend.Repo;

import com.UrlShortend.Backend.Model.Url_Mapping;
import com.UrlShortend.Backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UrlMappingRepo extends JpaRepository<Url_Mapping,Long> {
    Url_Mapping findByShortUrl(String shortUrl);
    List<Url_Mapping> findByUsers(Users user);
}
