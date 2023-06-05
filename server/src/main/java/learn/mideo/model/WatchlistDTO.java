package learn.mideo.model;

import java.util.List;

public class WatchlistDTO {

    private String id;
    private String type;
    private List<Watchable> watchables;
    private final AppUser user;


    public WatchlistDTO(String id, String type, List<Watchable> watchables, AppUser user) {
        this.id = id;
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

    public List<Watchable> getWatchables() {
        return watchables;
    }

    public void setWatchables(List<Watchable> watchables) {
        this.watchables = watchables;
    }

    public AppUser getUser() {
        return user;
    }

}
