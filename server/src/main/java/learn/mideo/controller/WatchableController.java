package learn.mideo.controller;

import com.mongodb.BasicDBObject;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.internal.bulk.UpdateRequest;
import learn.mideo.domain.WatchableService;
import learn.mideo.model.Watchable;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/watchable")
public class WatchableController {

    private final WatchableService service;
    private final MongoTemplate mideoListDB;

    public WatchableController(WatchableService service, MongoTemplate mideoListDB) {
        this.service = service;
        this.mideoListDB = mideoListDB;
    }

    // do we need this method when connecting to the API? Delete if not used by deadline.
//    @GetMapping(value = "/watchableByImbdId/{imdbId}")
//    public ResponseEntity<List<Watchable>> findWatchableByImdbId(@PathVariable("imdbId") String imdbId) {
//        return ResponseEntity.ok().body(service.findWatchableByImdbId(imdbId));
//    }

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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWatchable(@PathVariable("id") String id) {
        service.deleteWatchable(id);
        return ResponseEntity.noContent().build();
    }

//    @PatchMapping(value = "/updatePersonalRating/{id}")
//    public ResponseEntity<Watchable> updateWatchablePersonalRating(
//            @PathVariable("id") String id,
//            @RequestParam(required = false) Integer personalRating
//    ) {
//        Query query = Query.query(Criteria.where("_id").is(new ObjectId(id)));
//        Update update = new Update();
//
//        if (personalRating != null) {
//            update.set("personalRating", personalRating);
//        }
//
//        UpdateResult result = mideoListDB.updateFirst(query, update, Watchable.class);
//
//        if (result.getModifiedCount() > 0) {
//            Watchable updatedWatchable = service.findWatchableById(id).orElse(null);
//            return new ResponseEntity<>(service.save(updatedWatchable), HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//@PatchMapping(value = "/updatePersonalRating/{id}")
//public ResponseEntity<Watchable> updateWatchablePersonalRating(
//        @PathVariable("id") String id,
//        @RequestParam(required = false) Integer personalRating
//) {
//    BasicDBObject query = new BasicDBObject("_id", new ObjectId(id));
//    BasicDBObject update = new BasicDBObject();
//
//    if (personalRating != null) {
//        update.put("$set", new BasicDBObject("personalRating", personalRating));
//    }
//
//    MongoDatabase database = mideoListDB.getDb();
//    MongoCollection<Document> collection = database.getCollection("watchable");
//    UpdateResult result = collection.updateOne(query, update);
//
//    if (result.getModifiedCount() > 0) {
//        Watchable updatedWatchable = service.findWatchableById(id).orElse(null);
//        return new ResponseEntity<>(service.save(updatedWatchable), HttpStatus.OK);
//    } else {
//        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//    }
//}

    @PatchMapping(value = "/updatePersonalRating/{id}")
    public ResponseEntity<Watchable> updateWatchablePersonalRating(
            @PathVariable("id") String id,
            @RequestParam(required = false) Integer personalRating
    ) {
        Document query = new Document("_id", new ObjectId(id));
        Document update = new Document();

        if (personalRating != null) {
            update.put("$set", new Document("personalRating", personalRating));
        }

        MongoDatabase database = mideoListDB.getDb();
        MongoCollection<Document> collection = database.getCollection("watchable");
        UpdateResult result = collection.updateOne(query, update);

        if (result.getModifiedCount() > 0) {
            Watchable updatedWatchable = service.findWatchableById(id).orElse(null);
            return new ResponseEntity<>(service.save(updatedWatchable), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
