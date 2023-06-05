package learn.mideo.security;

import learn.mideo.data.AppUserRepository;
import learn.mideo.domain.Result;
import learn.mideo.domain.ResultType;
import learn.mideo.model.AppUser;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository repository;
    private final PasswordEncoder encoder;
    private int userCount = 0;

    private List<UserDetails> users;

    public AppUserService(AppUserRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;

        makeUsers();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = repository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }

        return appUser;
    }

    public Result<AppUser> create(String firstName, String lastName, String username, String password) {
        Result<AppUser> result = validate(username, password);
        if (!result.isSuccess()) {
            return result;
        }

        password = encoder.encode(password);

        AppUser appUser = new AppUser(firstName, lastName, username, password, true, "USER");

        try {
            appUser = repository.create(appUser);
            result.setPayload(appUser);
            result.setId(userCount++);
        } catch (DuplicateKeyException e) {
            result.addMessage("The provided username already exists", ResultType.INVALID);
        }

        return result;

    }

    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addMessage("username is required", ResultType.INVALID);
            return result;
        }

        if (password == null) {
            result.addMessage("password is required", ResultType.INVALID);
            return result;
        }

        if (username.length() > 50) {
            result.addMessage("username must be less than 50 characters", ResultType.INVALID);
        }

        if (!isValidPassword(password)) {
            result.addMessage("password must be at least 8 character and contain a digit," +
                    " a letter, and a non-digit/non-letter", ResultType.INVALID);
        }

        return result;
    }

    private boolean isValidPassword(String password) {
        if (password.length() < 8) {
            return false;
        }

        int digits = 0;
        int letters = 0;
        int others = 0;
        for (char c : password.toCharArray()) {
            if (Character.isDigit(c)) {
                digits++;
            } else if (Character.isLetter(c)) {
                letters++;
            } else {
                others++;
            }
        }

        return digits > 0 && letters > 0 && others > 0;
    }

    private void makeUsers() {
        UserDetails user = User.builder()
                .passwordEncoder(encoder::encode)
                .username("user")
                .password("user-password")
                .authorities("USER")
                .build();
        UserDetails admin = User.builder()
                .passwordEncoder(encoder::encode)
                .username("admin")
                .password("admin-password")
                .authorities("ADMIN")
                .build();

        users = List.of(user, admin);
    }
}
