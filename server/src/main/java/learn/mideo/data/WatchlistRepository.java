package learn.mideo.data;

import learn.mideo.model.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WatchlistRepository extends MongoRepository<Watchlist, String> {

    Watchlist findByUserId(String id);
}
