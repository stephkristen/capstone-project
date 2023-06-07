package learn.mideo.data;

import learn.mideo.model.Watchable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.query.Param;

public interface WatchableRepository extends MongoRepository<Watchable, String> {

    // @Query
//    boolean updateWatchablePersonalRating(@Param("id") String id, @Param("personalRating") int personalRating);
}
