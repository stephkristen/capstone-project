package learn.mideo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection="watchlist")
public class Watchlist {

    @Id
    private String id;
    private String type;
    private List<Watchable> watchables;
    private String userId;


    @PersistenceConstructor
    public Watchlist(String id, String type, List<Watchable> watchables, String userId) {
        this.id = id;
        this.type = type;
        this.watchables = watchables;
        this.userId = userId;
    }

    public Watchlist(String type, List<Watchable> watchables, String userId) {
        this.type = type;
        this.watchables = watchables;
        this.userId = userId;
    }

    public Watchlist(String type, String userId) {
        this(type, new ArrayList<>(), userId);
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

    public List<Watchable> getWatchables() {
        return watchables;
    }

    public void setWatchables(List<Watchable> watchables) {
        this.watchables = watchables;
    }

    public String getUserId() {
        return userId;
    }
}
