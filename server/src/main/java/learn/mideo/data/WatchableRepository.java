package learn.mideo.data;

import learn.mideo.model.Watchable;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;


public interface WatchableRepository extends MongoRepository<Watchable, String> {
    Optional<Watchable> findById(String watchableId);
    Watchable findWatchableById(String id, Class<Watchable> watchableClass);
}
