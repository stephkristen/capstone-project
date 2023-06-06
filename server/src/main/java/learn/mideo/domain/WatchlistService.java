package learn.mideo.domain;

import learn.mideo.data.WatchlistRepository;
import learn.mideo.exception.ResourceNotFoundException;
import learn.mideo.model.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
        Optional< Watchlist > watchlist = this.repository.findById(userId);

        if (watchlist.isPresent()) {
            return watchlist.stream().collect(Collectors.toList());
        } else {
            throw new ResourceNotFoundException("Watchlist not found with id : " + userId);
        }
    }

    public Watchlist findByType(String userId, String type) {
        return repository.findByType(userId, type);
    }
}
