package JWTUtils;

import java.util.Date;

import io.jsonwebtoken.*;

public class JWTUtil {
	private static final String SECRET = "79c33acf-bd17-4104-a522-b2b863eaeb7e";
	private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static String generateToken(String username) {
        return Jwts.builder()
            .setSubject(username)
            .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
            .signWith(SignatureAlgorithm.HS512, SECRET)
            .compact();
    }
    public static String extractUsername(String token) {
        return Jwts.parser()
            .setSigningKey(SECRET)
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}
