package learn.mideo.controller;

import learn.mideo.domain.Result;
import learn.mideo.domain.WatchableService;
import learn.mideo.model.Watchable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/watchable")
public class WatchableController {

    private final WatchableService service;

    public WatchableController(WatchableService service) {
        this.service = service;
    }

    // do we need this method? Delete if not used by deadline.
    @GetMapping(value = "/watchableByImbdId/{imdbId}")
    public ResponseEntity<List<Watchable>> findWatchableByImdbId(@PathVariable("imdbId") String imdbId) {
        return ResponseEntity.ok().body(service.findWatchableByImdbId(imdbId));
    }

    @PostMapping
    public ResponseEntity<Object> addWatchable(@RequestBody Watchable watchable) {
        return ResponseEntity.ok().body(service.save(watchable));
    }

    @PutMapping(value= "/watchable/{id}")
    public ResponseEntity<>
}
