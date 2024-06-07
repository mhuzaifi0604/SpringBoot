// ------------------------------------------------------------- Delete This File Along With the Package If need Be ----------------------------------------------------------------------------


//package SpringBootPro.Demo.Application.Config;
//
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig{
//	
//	@Bean
//	SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
//		http
//		.csrf((csrf) -> csrf.disable())
//        .authorizeHttpRequests((authz) -> authz
//        		.requestMatchers("/Login").permitAll()
//        		.requestMatchers("/Signup").permitAll()
//		  .anyRequest().authenticated()
//		  
//        )
//        .httpBasic(withDefaults());
//    return http.build();
//	}
//}
// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
