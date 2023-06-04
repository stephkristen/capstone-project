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
//        return ObjectMapperUtils.mapAll(service.findAll(), WatchlistDTO.class);
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<Watchlist> getWatchlistByUserId(@PathVariable("user.id") String userId) {
        return ResponseEntity.ok().body(service.findByUserId(userId));
    }
//
//    @PostMapping(value = "/save")
//    public ResponseEntity<?> save(@RequestBody WatchlistDTO watchlistDTO) {
//        service.save(ObjectMapperUtils.map(watchlistDTO, Watchlist.class));
//        return new ResponseEntity("Watchlist added successfully", HttpStatus.OK);
//    }
}
