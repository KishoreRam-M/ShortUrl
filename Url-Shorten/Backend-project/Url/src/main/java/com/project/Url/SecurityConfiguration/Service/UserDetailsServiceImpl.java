package com.project.Url.SecurityConfiguration.Service;

import com.project.Url.Model.Users;
import com.project.Url.Repo.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserRepo repo;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users user=repo.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Username Does Not Exist"+username));
        return  UserDetailsImpl.build(user);
    }
}
