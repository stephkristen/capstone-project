package learn.mideo.data;

import learn.mideo.model.Watchable;
import learn.mideo.model.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WatchableRepository extends MongoRepository<Watchable, String> {
}
