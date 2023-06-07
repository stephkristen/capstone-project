package learn.mideo.controller;

import learn.mideo.domain.Result;
import learn.mideo.domain.ResultType;
import learn.mideo.domain.WatchableService;
import learn.mideo.model.Watchable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/watchable")
public class WatchableController {

    private final WatchableService service;

    public WatchableController(WatchableService service, MongoTemplate mideoListDB) {
        this.service = service;
    }

    @GetMapping(value = "/watchableById/{id}")
    public ResponseEntity<Watchable> findWatchableById(@PathVariable("id") String id) {
        Optional<Watchable> optionalWatchable = service.findWatchableById(id);
        Watchable watchable = optionalWatchable.get();

        return new ResponseEntity<Watchable>(watchable, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> addWatchable(@RequestBody Watchable watchable) {
        return ResponseEntity.ok().body(service.save(watchable));
    }

    @PutMapping(value = "/updatePersonalRating/{id}")
    public ResponseEntity<?> updateWatchablePersonalRating(@PathVariable String id, @RequestBody Watchable watchable) {
        if (!id.equals(watchable.getId())) {
            return  new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Watchable> result = service.updatePersonalRating(watchable);
        if (!result.isSuccess()) {
            if (result.getType() == ResultType.NOT_FOUND) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404
            } else {
                return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST); // 400
            }
        }
        return new ResponseEntity<>(watchable, HttpStatus.OK); // 204
    }
  
  @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWatchable(@PathVariable("id") String id) {
        service.deleteWatchable(id);
        return ResponseEntity.noContent().build();
    }

}
