package com.project.Url.Model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Generated;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class UrlMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY
    )
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount = 0;
    private LocalDateTime createdDate;
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;
    @OneToMany(mappedBy = "UrlMapping")
    private List<ClickEvents> clickEvents;

}
