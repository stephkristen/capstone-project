package learn.mideo.domain;

import learn.mideo.data.WatchableRepository;
import learn.mideo.data.WatchlistRepository;
import learn.mideo.exception.ResourceNotFoundException;
import learn.mideo.model.Watchable;
import learn.mideo.model.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class WatchlistService {
    private final WatchlistRepository repository;
    private final WatchableRepository watchableRepository;

    public WatchlistService(WatchlistRepository repository, WatchableRepository watchableRepository) {
        this.repository = repository;
        this.watchableRepository = watchableRepository;
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

    public void addWatchableToWatchlist(String watchlistId, String watchableId) {
        Optional<Watchlist> optionalWatchlist = repository.findById(watchlistId);
        Optional<Watchable> optionalWatchable = watchableRepository.findById(watchableId);

        if (optionalWatchlist.isPresent() && optionalWatchable.isPresent()) {
            Watchlist watchlist = optionalWatchlist.get();
            Watchable watchable = optionalWatchable.get();
            watchlist.getWatchables().add(watchable);
            repository.save(watchlist);
        } else {
            throw new ResourceNotFoundException("Watchlist or Watchable not found with the given id");
        }
    }


    public void deleteWatchableFromWatchlist(String watchlistId, String watchableId) {
        Optional<Watchlist> optionalWatchlist = repository.findById(watchlistId);

        if (optionalWatchlist.isPresent()) {
            Watchlist watchlist = optionalWatchlist.get();
            List<Watchable> watchables = watchlist.getWatchables();

            // Find the watchable with the given ID
            Optional<Watchable> optionalWatchable = watchables.stream()
                    .filter(w -> watchableId.equals(w.getId()))
                    .findFirst();

            if (optionalWatchable.isPresent()) {
                Watchable watchable = optionalWatchable.get();
                watchables.remove(watchable);
                repository.save(watchlist);
            } else {
                throw new ResourceNotFoundException("Watchable not found in watchlist");
            }
        } else {
            throw new ResourceNotFoundException("Watchlist not found with id: " + watchlistId);
        }
    }

}
