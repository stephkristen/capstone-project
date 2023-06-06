package learn.mideo.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final JwtConverter converter;
    private final UserDetailsService userDetailsService;

    public SecurityConfig(JwtConverter converter, UserDetailsService userDetailsService) {
        this.converter = converter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
     public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationConfiguration authConfig) throws Exception {
         http.csrf().disable();

         http.cors();

         //TODO May need to change GET, POST, PUT, and DELETE paths later
         http.authorizeRequests()
                 .antMatchers("/authenticate").permitAll()
                 .antMatchers("/create_account").permitAll()
                 .antMatchers("/refresh_token").authenticated()
                 //TODO Change paths in controller later
                 // .antMatchers(HttpMethod.GET, "/mideo/**").permitAll()
                 .antMatchers(HttpMethod.GET,
                         "/watchlist").permitAll()
                 .antMatchers(HttpMethod.POST,
                         "/search").hasAnyAuthority("USER", "ADMIN")
                 .antMatchers(HttpMethod.PUT,
                         "/watchlist").hasAnyAuthority("USER", "ADMIN")
                 .antMatchers(HttpMethod.DELETE,
                         "/watchlist").hasAnyAuthority("USER", "ADMIN")
                 //TODO Change to .denyAll() later
                 .antMatchers("/**").permitAll()
                 .and()
                 .addFilter(new JwtRequestFilter(authenticationManager(authConfig), converter))
                 .sessionManagement()
                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

         return http.build();
     }

     @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
         return config.getAuthenticationManager();
     }
}
