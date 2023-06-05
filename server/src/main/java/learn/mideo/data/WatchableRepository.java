package learn.mideo.data;

import learn.mideo.model.Watchable;
import learn.mideo.model.Watchlist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface WatchableRepository extends MongoRepository<Watchable, String> {

    List<Watchable> findWatchableById(String watchableId);
}
