Below is a corrected version of your code with explanations for the changes:

---

### Corrected Code

```java
package com.UrlShortend.Backend.Security.Services;

import com.UrlShortend.Backend.Model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {
    private Long id;
    private String username;
    private String email;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    // Updated constructor with proper parameter order and assignments
    public UserDetailsImpl(Long id, String username, String email, String password, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password; // Corrected assignment
        this.authorities = authorities;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    // Instead of delegating to the default interface methods, we return true.
    // This means the account is not expired, not locked, credentials are valid, and the account is enabled.
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // The build method creates an instance of UserDetailsImpl based on a Users object.
    public static UserDetailsImpl build(Users user) {
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
        return new UserDetailsImpl(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(authority)
        );
    }
}
```

---

### Step-by-Step Explanation

1. **Constructor Parameter Order & Assignment:**  
   - **Issue:** The original constructor had parameters in an order that did not match how the build method was calling it. Additionally, the password assignment was incorrect (`password = password;` was assigning the parameter to itself).
   - **Fix:**  
     - Changed the constructor to use the order: **id, username, email, password, authorities**.
     - Used `this.password = password;` to properly assign the parameter to the instance variable.

2. **Boolean Methods (`isAccountNonExpired`, etc.):**  
   - **Issue:** The original code called `UserDetails.super.isXXX()`. While that may work if default methods are defined, it is more common to simply return `true` to indicate that the account is active.
   - **Fix:**  
     - Updated these methods to return `true`, meaning the account is not expired, not locked, credentials are valid, and the account is enabled.

3. **The `build` Method:**  
   - **Purpose:** This method creates a new `UserDetailsImpl` instance from a `Users` object.
   - **Fix:**  
     - Updated the parameters passed into the constructor so they match the new order (id, username, email, password, and a collection of authorities).
     - The authority is built using the user's role and wrapped in a singleton list.

---

This corrected code should now properly build a `UserDetailsImpl` instance from your `Users` object and fulfill the contract of the `UserDetails` interface.
