package learn.mideo.controller;

import learn.mideo.data.WatchableRepository;
import learn.mideo.domain.Result;
import learn.mideo.domain.ResultType;
import learn.mideo.domain.WatchlistService;
import learn.mideo.exception.ResourceNotFoundException;
import learn.mideo.model.Watchable;
import learn.mideo.model.Watchlist;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService service;
    private final WatchableRepository watchableRepository;

    public WatchlistController(WatchlistService service, WatchableRepository watchableRepository) {
        this.service = service;
        this.watchableRepository = watchableRepository;
    }

    @GetMapping
    public ResponseEntity< List < Watchlist >> findAll() {
        List<Watchlist> watchlists = service.findAll();

        if (watchlists == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(watchlists, HttpStatus.OK);
    }

    @GetMapping(value = "/byUserId/{userId}")
    public ResponseEntity< List <Watchlist> > getWatchlistByUserId(@PathVariable("userId") String userId) {
        List<Watchlist> watchlists = service.findByUserId(userId);

        if (watchlists == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(watchlists, HttpStatus.OK);
    }

    @GetMapping(value = "/byType/{userId}/{type}")
    public ResponseEntity<Watchlist> getWatchlistByType(@PathVariable("userId") String userId, @PathVariable("type") String type) {
        Watchlist watchlist = service.findByType(userId, type);

        if (watchlist == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(watchlist, HttpStatus.OK);
    }

    @PostMapping("/{watchlistId}/addWatchable/{watchableId}")
    public ResponseEntity<?> addWatchableToWatchlist(@PathVariable("watchlistId") String watchlistId, @PathVariable("watchableId") String watchableId) {
        Result<Void> result = service.addWatchableToWatchlist(watchlistId, watchableId);

        if (result.isSuccess()) {
            return ResponseEntity.ok(HttpStatus.OK);
        } else if (result.getType() == ResultType.INVALID) {
            return ResponseEntity.badRequest().body(result.getMessages());
        } else if (result.getType() == ResultType.NOT_FOUND) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> createWatchlists(@PathVariable("userId") String userId) {
        try {
            List<Watchlist> watchlists = service.createWatchlists(userId);
            return ResponseEntity.ok(watchlists);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create watchlists");
        }
    }


    @DeleteMapping("/{watchlistId}/removeWatchable/{watchableId}")
    public ResponseEntity<?> removeWatchableFromWatchlist(@PathVariable("watchlistId") String watchlistId, @PathVariable("watchableId") String watchableId) {
        Result<Void> result = service.deleteWatchableFromWatchlist(watchlistId, watchableId);

        if (result.isSuccess()) {
            return ResponseEntity.ok(result.getMessages());
        } else if (result.getType() == ResultType.NOT_FOUND) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(result.getMessages());
        } else {
            return ResponseEntity.badRequest().body(result.getMessages());
        }
    }






//
//    @PostMapping(value = "/save")
//    public ResponseEntity<?> save(@RequestBody WatchlistDTO watchlistDTO) {
//        service.save(ObjectMapperUtils.map(watchlistDTO, Watchlist.class));
//        return new ResponseEntity("Watchlist added successfully", HttpStatus.OK);
//    }
}
