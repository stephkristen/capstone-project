package learn.mideo.controller;

import learn.mideo.domain.WatchlistService;
import learn.mideo.model.Watchlist;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/watchlist")
public class WatchlistController {

    private final WatchlistService service;

    public WatchlistController(WatchlistService service) {
        this.service = service;
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
//
//    @PostMapping(value = "/save")
//    public ResponseEntity<?> save(@RequestBody WatchlistDTO watchlistDTO) {
//        service.save(ObjectMapperUtils.map(watchlistDTO, Watchlist.class));
//        return new ResponseEntity("Watchlist added successfully", HttpStatus.OK);
//    }
}
