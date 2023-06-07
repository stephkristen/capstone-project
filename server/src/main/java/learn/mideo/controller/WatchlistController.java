package learn.mideo.controller;

import learn.mideo.data.WatchableRepository;
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
        return ResponseEntity.ok().body(service.findAll());
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
        return ResponseEntity.ok().body(service.findByType(userId, type));
    }

    @PostMapping("/{watchlistId}/addWatchable/{watchableId}")
    public ResponseEntity<?> addWatchableToWatchlist(@PathVariable("watchlistId") String watchlistId, @PathVariable("watchableId") String watchableId) {
        service.addWatchableToWatchlist(watchlistId, watchableId);
        return ResponseEntity.ok("Watchable added to watchlist successfully");
    }


    @DeleteMapping("/{watchlistId}/removeWatchable/{watchableId}")
    public ResponseEntity<?> removeWatchableFromWatchlist(@PathVariable("watchlistId") String watchlistId, @PathVariable("watchableId") String watchableId) {
        service.deleteWatchableFromWatchlist(watchlistId, watchableId);
        return ResponseEntity.ok("Watchable removed from watchlist successfully");
    }




//
//    @PostMapping(value = "/save")
//    public ResponseEntity<?> save(@RequestBody WatchlistDTO watchlistDTO) {
//        service.save(ObjectMapperUtils.map(watchlistDTO, Watchlist.class));
//        return new ResponseEntity("Watchlist added successfully", HttpStatus.OK);
//    }
}
