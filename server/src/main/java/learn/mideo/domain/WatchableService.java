package learn.mideo.domain;

import com.mongodb.client.MongoDatabase;
import learn.mideo.data.WatchableRepository;
import learn.mideo.model.Watchable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WatchableService {

    private final WatchableRepository repository;

    public WatchableService(WatchableRepository repository) {
        this.repository = repository;
    }
//    public List<Watchable> findWatchableByImdbId(String imdbId) {
//        return repository.findWatchableByImdbId(imdbId);
//    }

    public Watchable save(Watchable watchable) {
        return repository.save(watchable);
    }

    public Optional<Watchable> findWatchableById(String id) {
        return repository.findById(id);
    }

    public void addWatchable(Watchable watchable) {
        repository.save(watchable);
    }

    public void deleteWatchable(String id) {
        repository.deleteById(id);
    }
}

