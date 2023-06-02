package learn.mideo.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;


@Document(collection="app_user")
public class AppUser implements UserDetails {

    private ObjectId id;
    private final String username;
    private final String passwordHash;
    private final boolean enabled;
    private final String role;


    @PersistenceConstructor
    public AppUser(ObjectId id, String username, String passwordHash, boolean enabled, String role) {
        this.id = id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.enabled = enabled;
        this.role = role;
    }

    public AppUser(String username, String passwordHash, boolean enabled, String role) {
        this.username = username;
        this.passwordHash = passwordHash;
        this.enabled = enabled;
        this.role = role;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        GrantedAuthority authority = new SimpleGrantedAuthority(role);
        ArrayList<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(authority);
        return authorities;
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return username;
    }

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
        return enabled;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getRole() {
        return role;
    }
}
