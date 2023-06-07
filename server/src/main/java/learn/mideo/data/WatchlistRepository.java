package learn.mideo.data;

import learn.mideo.model.Watchlist;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface WatchlistRepository extends MongoRepository<Watchlist, String> {

    List<Watchlist> findByUserId(String userId);

    @Aggregation(pipeline = {
            "{'$match':{'userId': ?0, 'type' : ?1}}",
    })
    Watchlist findByType(String userId, String type);

}
