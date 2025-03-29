package com.UrlShortend.Backend.Dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ClickEventDTO {

    private LocalDateTime clickDate;
    private Long count;

}
