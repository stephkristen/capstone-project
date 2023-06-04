package learn.mideo.domain;

import learn.mideo.data.WatchlistRepository;
import learn.mideo.model.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {
    private final WatchlistRepository repository;

    public WatchlistService(WatchlistRepository repository) {
        this.repository = repository;
    }

    public List<Watchlist> findAll() {
        return repository.findAll();
    }

    public List <Watchlist> findByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    public Watchlist findByType(String userId, String type) {
        return repository.findByType(userId, type);
    }

    public Watchlist save(Watchlist watchlist) {
        return repository.save(watchlist);
    }
}
