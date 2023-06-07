package learn.mideo.data;

import learn.mideo.model.Watchable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;


public interface WatchableRepository extends MongoRepository<Watchable, String> {

    Optional<Watchable> findById(String watchableId);

    Watchable save(Watchable watchable);
}
