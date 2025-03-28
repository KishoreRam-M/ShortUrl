Your `JwtUtils` class is responsible for handling **JWT token generation, validation, and extraction**. Let’s go through it **step by step**.

---

## **1️⃣ Class Overview**
- This class is a utility for **managing JWT tokens** in a **Spring Boot Security** application.
- It includes methods for:
    - **Extracting JWT from request headers**
    - **Generating a new JWT**
    - **Extracting the username from JWT**
    - **Validating JWT tokens**
    - **Getting a secret key for signing JWT**

---

## **2️⃣ Instance Variables (Configuration Values)**

```java
@Value("${jwt.secret}")
private String jwtSecret;

@Value("${jwt.expiration}")
private String jwtexpiration;
```

- `jwtSecret`: This is the **secret key** for signing JWT, loaded from `application.yml`.
- `jwtexpiration`: This defines **how long** the JWT is valid.

---

## **3️⃣ Extract JWT from Header**
```java
public String getJwtFromHeader(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (bearerToken != null && bearerToken.startsWith("Bearer")) {
        return bearerToken.substring(7);  // Remove "Bearer " prefix and return token
    }
    return null;
}
```
### **How it works:**
1. **Gets the `Authorization` header** from the HTTP request.
2. Checks if the header **exists** and starts with `"Bearer "`.
3. If valid, **removes `"Bearer "`** (7 characters) and returns the actual token.
4. If invalid, returns `null`.

🔹 **Purpose:** This method ensures that JWT tokens can be extracted from HTTP requests.

---

## **4️⃣ Generate JWT Token**
```java
public String generateToken(UserDetailsImpl userDetails) {
    String username = userDetails.getUsername();
    String roles = userDetails.getAuthorities().stream()
            .map(authorithy -> authorithy.getAuthority())
            .collect(Collectors.joining(","));  // Converts roles list into comma-separated string

    return Jwts.builder()
            .setSubject(username)  // Set username as the token subject
            .claim("roles", roles)  // Add roles as a claim
            .setIssuedAt(new Date())  // Set issue time
            .setExpiration(new Date(new Date().getTime() + jwtexpiration)) // Set expiration time
            .signWith(getKey())  // Sign the token with a secret key
            .compact();  // Build and return token
}
```
### **How it works:**
1. Gets the **username** and **roles** from `UserDetailsImpl`.
2. Builds a JWT with:
    - **Subject** = username
    - **Claim** = roles
    - **Issued At** = current time
    - **Expiration** = current time + `jwtexpiration`
    - **Signed using secret key**
3. Returns the **generated token** as a string.

🔹 **Purpose:** This method **creates and signs JWT tokens** for authentication.

---

## **5️⃣ Extract Username from JWT**
```java
public String getUserNameFromJwtToken(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getKey())  // Validate JWT signature
            .build()
            .parseClaimsJws(token)   // Parse JWT token
            .getBody()               // Extract claims (payload)
            .getSubject();           // Extract username
}
```
### **How it works:**
1. Uses `Jwts.parserBuilder()` to **decode and verify** the token.
2. **Extracts the payload (claims).**
3. Returns the **subject** (which is the username).

🔹 **Purpose:** This method **extracts the username** from the JWT.

---

## **6️⃣ Validate JWT Token**
```java
public boolean validateToken(String token) {
    try {
        Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token);
        return true;
    } catch (Exception e) {
        return false;
    }
}
```
### **How it works:**
1. Uses `Jwts.parserBuilder()` to **parse and verify** the token.
2. If parsing **succeeds**, the token is **valid** (`true`).
3. If **any error occurs** (e.g., expired, invalid), it catches the exception and returns `false`.

🔹 **Purpose:** This method **ensures the JWT is valid** before allowing access.

---

## **7️⃣ Generate Secret Key for Signing**
```java
private Key getKey() {
    return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
}
```
### **How it works:**
1. **Decodes** the `jwtSecret` from Base64.
2. **Generates an HMAC SHA key** for signing JWT tokens.
3. Returns the **secret key**.

🔹 **Purpose:** This method provides a **secure signing key** for JWT.

---

## **🔹 Summary**
### ✅ What This Class Does:
- Extracts **JWT from request headers**
- Generates **secure JWT tokens**
- Extracts **username from JWT**
- Validates **JWT tokens**
- Creates **a secure signing key**

### 🔥 **Complete JWT Workflow**
1️⃣ **User logs in** → `generateToken()` creates JWT.  
2️⃣ **Client sends JWT in requests** → `getJwtFromHeader()` extracts it.  
3️⃣ **JWT is verified** → `validateToken()` ensures it's correct.  
4️⃣ **Username is extracted** → `getUserNameFromJwtToken()` fetches it.  
5️⃣ **User is authenticated and authorized** based on roles.

Would you like me to add role-based access control (RBAC) logic? 🚀