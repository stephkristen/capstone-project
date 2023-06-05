package learn.mideo.domain;

import learn.mideo.data.WatchableRepository;
import learn.mideo.model.Watchable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchableService {
    private final WatchableRepository repository;

    public WatchableService(WatchableRepository repository) {
        this.repository = repository;
    }
    public List<Watchable> findWatchableByImdbId(String imdbId) {
        return repository.findWatchableById(imdbId);
    }
    public Watchable save(Watchable watchable) {
        return repository.save(watchable);
    }

}
