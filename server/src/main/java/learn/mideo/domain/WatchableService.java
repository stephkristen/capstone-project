package learn.mideo.domain;

import learn.mideo.data.WatchableRepository;
import learn.mideo.model.Watchable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchableService {

    public final static int MAX_PERSONAL_RATING = 100;

    public final static int MIN_PERSONAL_RATING = 0;

    private final WatchableRepository repository;

    public WatchableService(WatchableRepository repository) {
        this.repository = repository;
    }

    public Watchable save(Watchable watchable) {
        return repository.save(watchable);
    }

    public Optional<Watchable> findWatchableById(String id) {
        return repository.findById(id);
    }

    public void addWatchable(Watchable watchable) {
        repository.save(watchable);
    }

    public Result<Watchable> updatePersonalRating(Watchable watchable) {
        Result<Watchable> result = validate(watchable);
        if (!result.isSuccess()) {
            return result;
        }

        Watchable savedWatchable = repository.findWatchableById(watchable.getId(), Watchable.class);
        if (savedWatchable == null) {
            String msg = String.format("Watchable id: %s, not found", watchable.getId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        } else if (result.isSuccess()) {
            savedWatchable.setPersonalRating(watchable.getPersonalRating());
            repository.save(savedWatchable);
        } else {
            result.addMessage("Watchable id %s was not found.", ResultType.NOT_FOUND, watchable.getId());
        }
        return result;
    }
  
    public void deleteWatchable(String id) {
          repository.deleteById(id);
    }

    private Result<Watchable> validate(Watchable watchable) {
        Result<Watchable> result = new Result<Watchable>();
        if (watchable == null) {
            result.addMessage("Watchable cannot be null.", ResultType.INVALID);
            return result;
        }

        if (watchable.getId() == null) {
            result.addMessage("Watchable id is null.", ResultType.INVALID);
        }

        if (watchable.getPersonalRating() < MIN_PERSONAL_RATING || watchable.getPersonalRating() > MAX_PERSONAL_RATING) {
            result.addMessage("The personal rating may not be less than %s or greater than or equal to %s.", ResultType.INVALID, MIN_PERSONAL_RATING, MAX_PERSONAL_RATING);
            return result;
        }

        return result;
    }
}

