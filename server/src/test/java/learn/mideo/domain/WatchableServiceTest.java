package learn.mideo.domain;

import learn.mideo.AppConfig;
import learn.mideo.data.MongoDBConfig;
import learn.mideo.data.WatchableRepository;
import learn.mideo.model.Watchable;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ContextConfiguration(classes = {AppConfig.class, MongoDBConfig.class})
@RunWith(SpringRunner.class)
@SpringBootTest
class WatchableServiceTest {

    @Autowired
    private WatchableService service;

    @MockBean
    private MongoTemplate mongoTemplate;

    @MockBean
    private WatchableRepository repository;

    @Test
    void shouldFindWatchableById() {
        Watchable expectedM = makeWatchableMovie();
        when(repository.findById("abc123")).thenReturn(Optional.of(expectedM));
        Optional<Watchable> actualM = service.findWatchableById("abc123");
        actualM.ifPresent(watchable -> assertEquals(expectedM.getId(), watchable.getId()));

        Watchable expectedS = makeWatchableSeries();
        when(repository.findById("def123")).thenReturn(Optional.of(expectedS));
        Optional<Watchable> actualS = service.findWatchableById("def123");
        actualS.ifPresent(watchable -> assertEquals(expectedS.getId(), watchable.getId()));
    }

    @Test
    void shouldNotFindWatchableByNonExistentId() {
        Optional<Watchable> watchable = service.findWatchableById("zzz0000000");
        assertTrue(watchable.isEmpty());
        assertNull(watchable.get());
    }

    @Test
    void shouldUpdatePersonalRating() {
        Watchable watchableMovie = makeWatchableMovie();
        watchableMovie.setPersonalRating(85);
        assertEquals(85, watchableMovie.getPersonalRating());

        Watchable watchableSeries = makeWatchableSeries();
        watchableSeries.setPersonalRating(91);
        assertEquals(91, watchableSeries.getPersonalRating());
    }

    @Test
    void shouldNotUpdateInvalidPersonalRating() {
        // above 100
        // below 0
        Watchable watchableMovie1 = makeWatchableMovie();
        watchableMovie1.setPersonalRating(105);
        assertTrue(watchableMovie1.getPersonalRating() < 100);

        Watchable watchableSeries1 = makeWatchableSeries();
        watchableSeries1.setPersonalRating(200);
        assertTrue(watchableSeries1.getPersonalRating() < 100);

        Watchable watchableMovie2 = makeWatchableMovie();
        watchableMovie2.setPersonalRating(105);
        assertTrue(watchableMovie2.getPersonalRating() > 0);

        Watchable watchableSeries2 = makeWatchableSeries();
        watchableSeries2.setPersonalRating(200);
        assertTrue(watchableSeries2.getPersonalRating() > 0);
    }

    private Watchable makeWatchableMovie() {
        Watchable watchable = new Watchable();
        watchable.setId("abc123");
        watchable.setType("movie");
        watchable.setTitle("We're Back! A Dinosaur's Story");
        watchable.setOverview(" Based on the 1987 Hudson Talbott children's book of the same name, it tells the story of four dinosaurs who travel to the present day and become intelligent by eating a special cereal invented by scientist Captain Neweyes. ");
        watchable.setImdbRating(6);
        watchable.setPersonalRating(88);
        watchable.setTrailerLink("youtube.com");
        watchable.setPosterPath(null);
        watchable.setYear(1993);
        watchable.setFirstAirYear(0);
        watchable.setLastAirYear(0);
        watchable.setGenres(null);
        watchable.setStreamingServices(null);
        watchable.setCast_members(null);
        return watchable;
    }

    private Watchable makeWatchableSeries() {
        Watchable watchable = new Watchable();
        watchable.setId("def123");
        watchable.setType("series");
        watchable.setTitle("Buffy the Vampire Slayer");
        watchable.setOverview("Teenage girl is tasked with protecting the world from the supernatural.");
        watchable.setImdbRating(8);
        watchable.setPersonalRating(100);
        watchable.setTrailerLink("youtube.com");
        watchable.setPosterPath(null);
        watchable.setYear(0);
        watchable.setFirstAirYear(1997);
        watchable.setLastAirYear(2003);
        watchable.setGenres(null);
        watchable.setStreamingServices(null);
        watchable.setCast_members(null);
        return watchable;
    }
}