package com.UrlShortend.Backend.Security.Jwt;

import com.UrlShortend.Backend.Security.Services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.GrantedAuthority;

import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtils {
    // Renamed variable to jwtSecret (spelling correction)
    private String jwtSecret = "78ac86baf026822c6c672539ed3650c25563e52214775b698e167c1e504b2a5cc1bc2391752fd41f5bb9021814e2d9a92cf840e9d5657dd0b802a12b2900931a1306c89f6babd4b747bf9e6b77f4228489497e2b0e47ba25c487dd564401ce45d160519a49ae934b001c22ad38ef23f4f56f7913bbc583031c20308a6bd248e0bba5d9681b8eb238a23ab1c096c5c43f4c4248f1cceff54757746aa4a89a93b6b9b6d3f58a024cc81f144d8bbb1eadeef7b07480c961c3c68307348282ea09da101fa26579db4d1c9ea0be43174a19c64116733b264e771ab1a59f3c60d19a7fa3219bd551c658e5e8b55cbad9aa7e3fa80503f69599283dab2626d899db388108fe46dd4ba84916674bf34980760904c4aa39108205630580b85a31839eb19601f463df5b4887cf8bb953d856895b7a21a11ec82809fbc051c1ab37eb00c952651dc331001c94e297802cab8ad04325762f54d3174ce939513577cb0d14848dd1e55d20ffefce274a79bb927f48b14bbb3cdc2d64d52ce12c8f7394146a50c2b563028735508c948d2ab650809312dc3e0c8eb11134d845b2993bf1ddce2c1e78b95746f3ba88023bc9771bd20ea73bdf2dc70730ea6aa4f7bfece78151b6f3702858446cb7fd02b1403660d3e6d6f8deb3dbdf6510041cbd8e935c39fdb232982807341e4d39840ba0cfe25ee0d2f50082e6a556c2fdfdf63123dc608b312e";

    // Fixed the order of null-check and startsWith
    public String getJwtFromHeader(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String generateToken(UserDetailsImpl user) {
        String username = user.getUsername();
        String role = user.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .setSubject(username)
                .claim("Roles", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 172800000)) // 2 days in milliseconds
                .signWith(generateKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public Key generateKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(generateKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    /**
     * Validates the JWT token.
     * <p>
     * It attempts to parse the token with the signing key. If the token is valid, it returns true;
     * otherwise, it catches the exception and returns false.
     *
     * @param token the JWT token to validate.
     * @return true if the token is valid; false otherwise.
     */
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(generateKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
