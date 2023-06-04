package learn.mideo.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection="watchlist")
public class Watchlist {

    @Id
    private String id;
    private String type;
    private List<String> watchables;
    private final AppUser user;


    @PersistenceConstructor
    public Watchlist(String id, String type, List<String> watchables, AppUser user) {
        this.id = id;
        this.type = type;
        this.watchables = watchables;
        this.user = user;
    }

    public Watchlist(String type, List<String> watchables, AppUser user) {
        this.type = type;
        this.watchables = watchables;
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getWatchables() {
        return watchables;
    }

    public void setWatchables(List<String> watchables) {
        this.watchables = watchables;
    }

    public AppUser getUser() {
        return user;
    }
}
