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

    public List<Watchlist> findByUserId(String userId) {
        return repository.findByUserId(userId);
    }

    public Watchlist findByType(String userId, String type) {
        return repository.findByType(userId, type);
    }

    public List<Watchlist> createWatchlists(String userId) {
        Watchlist completedMovies = new Watchlist("Completed Movies", userId);
        Watchlist completedSeries = new Watchlist("Completed Series", userId);
        Watchlist planToWatch = new Watchlist("Plan to Watch", userId);
        repository.save(completedMovies);
        repository.save(completedSeries);
        repository.save(planToWatch);

        return repository.findByUserId(userId);
    }

    public Result<Void> addWatchableToWatchlist(String watchlistId, String watchableId) {
        Optional<Watchlist> optionalWatchlist = repository.findById(watchlistId);
        Optional<Watchable> optionalWatchable = watchableRepository.findById(watchableId);

        Result<Void> result = new Result<>();

        if (optionalWatchlist.isPresent() && optionalWatchable.isPresent()) {
            Watchlist watchlist = optionalWatchlist.get();
            Watchable watchable = optionalWatchable.get();

            validate(watchlist, watchable, result);

            if (result.isSuccess()) {
                watchlist.getWatchables().add(watchable);
                repository.save(watchlist);
                result.addMessage("Watchable added to watchlist successfully", ResultType.SUCCESS);
            }
        } else {
            result.addMessage("Watchlist or Watchable not found with the given id", ResultType.NOT_FOUND);
        }

        return result;
    }


    public Result<Void> deleteWatchableFromWatchlist(String watchlistId, String watchableId) {
        Optional<Watchlist> optionalWatchlist = repository.findById(watchlistId);

        Result<Void> result = new Result<>();

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
                result.addMessage("Watchable removed from watchlist successfully", ResultType.SUCCESS);
            } else {
                result.addMessage("Watchable not found in watchlist", ResultType.NOT_FOUND);
            }
        } else {
            result.addMessage("Watchlist not found with id: " + watchlistId, ResultType.NOT_FOUND);
        }

        return result;
    }


    private void validate(Watchlist watchlist, Watchable watchable, Result<Void> result) {
        // Validate the type of watchable based on the watchlist type
        if ((watchlist.getType().equals("Completed Movies") && watchable.getType().equals("series"))
                || (watchlist.getType().equals("Completed Series") && watchable.getType().equals("movie"))) {
            result.addMessage("Cannot add a movie to the series list or a series to the movie list", ResultType.INVALID);
        }

        // Check for duplicates based on watchable ID
        boolean isDuplicate = watchlist.getWatchables().stream()
                .anyMatch(w -> w.getOverview().equals(watchable.getOverview()));

        if (isDuplicate) {
            result.addMessage("Watchable already exists in the watchlist", ResultType.INVALID);
        }
    }

}
