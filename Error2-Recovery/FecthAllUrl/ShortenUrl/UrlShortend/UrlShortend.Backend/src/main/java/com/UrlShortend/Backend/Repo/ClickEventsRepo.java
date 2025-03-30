package com.UrlShortend.Backend.Repo;

import com.UrlShortend.Backend.Model.ClickEvents;
import com.UrlShortend.Backend.Model.Url_Mapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClickEventsRepo extends JpaRepository<ClickEvents, Long> {

    List<ClickEvents> findByUrlMappingAndClickDateBetween(Url_Mapping urlMapping, LocalDateTime startDate, LocalDateTime endDate);

    List<ClickEvents> findByUrlMappingInAndClickDateBetween( List <Url_Mapping> urlMapping, LocalDateTime startDate, LocalDateTime endDate);


}
