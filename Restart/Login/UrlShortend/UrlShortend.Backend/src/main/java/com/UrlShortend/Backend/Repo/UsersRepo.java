package com.UrlShortend.Backend.Repo;

import com.UrlShortend.Backend.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepo extends JpaRepository<Users,Long> {
    Users findByUsername(String username);
}
