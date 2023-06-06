package learn.mideo.domain;

import learn.mideo.data.WatchableRepository;
import learn.mideo.model.Watchable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WatchableService {

    private final WatchableRepository repository;

    private final MongoTemplate mongoTemplate;

    public WatchableService(WatchableRepository repository, MongoTemplate mongoTemplate) {
        this.repository = repository;
        this.mongoTemplate = mongoTemplate;
    }

    public Watchable save(Watchable watchable) {
        return repository.save(watchable);
    }

    public Optional<Watchable> findWatchableById(String id) {
        return repository.findById(id);
    }

//    public Result<Watchable> updatePersonalRating(Watchable watchable) {
//        Result<Watchable> result = validate(watchable);
//        if (watchable.getId().isEmpty()) {
//            return result;
//        }
//
//        if (!result.isSuccess()) {
//            return result;
//        }
//
//        if (!repository.save(watchable)) {
//            String msg = String.format("Watchable id: %s, not found", watchable.getId());
//            result.addMessage(msg, ResultType.NOT_FOUND);
//        }
//        return result;
//    }

    public Result<Watchable> updatePersonalRating(Watchable watchable) {
        Result<Watchable> result = validate(watchable);
        if (!result.isSuccess()) {
            return result;
        }

        Watchable savedWatchable = mongoTemplate.findById(watchable.getId(), Watchable.class);
//        Watchable savedWatchable = repository.findById(watchable.getId());
        if (savedWatchable == null) {
            String msg = String.format("Watchable id: %s, not found", watchable.getId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        } else {
            savedWatchable.setPersonalRating(watchable.getPersonalRating());
            mongoTemplate.save(savedWatchable);
        }
        return result;
    }

    private Result<Watchable> validate(Watchable watchable) {
        Result<Watchable> result = new Result<Watchable>();
        if (watchable == null) {
            result.addMessage("Watchable cannot be null.", ResultType.INVALID);
            return result;
        }

        if (watchable.getPersonalRating() < 0 ||watchable.getPersonalRating() > 100) {
            result.addMessage("The personal rating may not be less than 0 or greater than 100.", ResultType.INVALID);
            return result;
        }

        // check for duplicates in a list
        // create boolean isDuplicate() helper method (inspired by Week09 pets-server)
        // possibly requires creation for findAllWatchables() method

        return result;
    }

}
