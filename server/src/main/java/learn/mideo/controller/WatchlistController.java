package learn.mideo.controller;

import learn.mideo.domain.WatchlistService;
import learn.mideo.model.Watchlist;
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
        return ResponseEntity.ok().body(service.findAll());
    }

    @GetMapping(value = "/byUserId/{userId}")
    public ResponseEntity< List <Watchlist> > getWatchlistByUserId(@PathVariable("userId") String userId) {
        return ResponseEntity.ok().body(service.findByUserId(userId));
    }

    @GetMapping(value = "/byType/{userId}/{type}")
    public ResponseEntity<Watchlist> getWatchlistByType(@PathVariable("userId") String userId, @PathVariable("type") String type) {
        return ResponseEntity.ok().body(service.findByType(userId, type));
    }
//
//    @PostMapping(value = "/save")
//    public ResponseEntity<?> save(@RequestBody WatchlistDTO watchlistDTO) {
//        service.save(ObjectMapperUtils.map(watchlistDTO, Watchlist.class));
//        return new ResponseEntity("Watchlist added successfully", HttpStatus.OK);
//    }
}
