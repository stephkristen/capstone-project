package learn.mideo.domain;

import learn.mideo.data.WatchableRepository;
import learn.mideo.data.WatchlistRepository;
import learn.mideo.data.WatchlistRepositoryTest;
import learn.mideo.model.Watchable;
import learn.mideo.model.Watchlist;
import org.junit.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes=WatchlistService.class)
class WatchlistServiceTest {

    @Autowired
    WatchlistService watchlistService;

    @MockBean
    WatchlistRepository watchlistRepository;

    @MockBean
    WatchableRepository watchableRepository;

    private String userId1 = "abc100";
    private String userId2 = "zyx200";
    private Watchlist completedMovies;
    private Watchlist completedSeries;
    private Watchlist planToWatch;
    private List<Watchlist> user1watchlists = new ArrayList<>();
    private List<Watchlist> user2watchlists = new ArrayList<>();


    @BeforeEach
    void setup() {
        Watchable interstellar = new Watchable();
        interstellar.setTitle("Interstellar");

        Watchable taken = new Watchable();
        taken.setTitle("Taken");

        Watchable rocky = new Watchable();
        taken.setTitle("Rocky");

        Watchable theOffice = new Watchable();
        theOffice.setTitle("The Office");

        Watchable newGirl = new Watchable();
        newGirl.setTitle("New Girl");

        Watchable gameOfThrones = new Watchable();
        newGirl.setTitle("Game of Thrones");

        completedMovies = new Watchlist("1", "Completed Movies", Arrays.asList(interstellar, taken), userId1);
        completedSeries = new Watchlist("2", "Completed Series", Arrays.asList(theOffice, newGirl), userId1);
        planToWatch = new Watchlist("3", "Plan to Watch", Arrays.asList(rocky, gameOfThrones), userId1);

        user1watchlists.add(completedMovies);
        user1watchlists.add(completedSeries);
    }

    @Test
    void shouldFindByUserId() {
        when(watchlistRepository.findByUserId(userId1)).thenReturn(user1watchlists);

        List<Watchlist> actual = watchlistService.findByUserId(userId1);

        assertNotNull(actual);
        assertEquals(user1watchlists, actual);
    }


    @Test
    void shouldFindByType_thenCompletedMoviesShouldBeReturned() {
        when(watchlistRepository.findByType(userId1, "Completed Movies")).thenReturn(completedMovies);
        Watchlist actual = watchlistService.findByType(userId1, "Completed Movies");

        assertNotNull(actual);
        assertEquals(actual.getUserId(), userId1);
        assertEquals(actual.getType(), "Completed Movies");
    }

    @Test
    void shouldFindByType_thenCompletedSeriesShouldBeReturned() {
        when(watchlistRepository.findByType(userId1, "Completed Series")).thenReturn(completedSeries);
        Watchlist actual = watchlistService.findByType(userId1, "Completed Series");

        assertNotNull(actual);
        assertEquals(actual.getUserId(), userId1);
        assertEquals(actual.getType(), "Completed Series");
    }

    @Test
    void shouldFindByType_thenPlanToWatchShouldBeReturned() {
        when(watchlistRepository.findByType(userId1, "Plan to Watch")).thenReturn(planToWatch);
        Watchlist actual = watchlistService.findByType(userId1, "Plan to Watch");

        assertNotNull(actual);
        assertEquals(actual.getUserId(), userId1);
        assertEquals(actual.getType(), "Plan to Watch");
    }

}