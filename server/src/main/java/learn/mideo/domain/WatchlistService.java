package learn.mideo.domain;

import learn.mideo.data.AppUserRepository;
import learn.mideo.data.WatchlistRepository;
import learn.mideo.model.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistService {
    private final WatchlistRepository repository;
//    private final AppUserRepository userRepository;

    public WatchlistService(WatchlistRepository repository) {
        this.repository = repository;
    }

    public List<Watchlist> findAll() {
        return repository.findAll();
    }

    public Watchlist findByUserId(String id) {
        return repository.findByUserId(id);
    }

    public Watchlist save(Watchlist watchlist) {
        return repository.save(watchlist);
    }
}
