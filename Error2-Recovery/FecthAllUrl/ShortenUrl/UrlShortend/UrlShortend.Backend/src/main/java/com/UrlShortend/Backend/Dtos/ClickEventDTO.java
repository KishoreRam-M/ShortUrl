package com.UrlShortend.Backend.Dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClickEventDTO {
    private LocalDate clickDate;
    private Long count;
}
