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
import java.util.Optional;

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
        interstellar.setId("0");
        interstellar.setTitle("Interstellar");

        Watchable taken = new Watchable();
        taken.setId("1");
        taken.setTitle("Taken");

        Watchable rocky = new Watchable();
        rocky.setId("2");
        rocky.setTitle("Rocky");

        Watchable theOffice = new Watchable();
        theOffice.setId("3");
        theOffice.setTitle("The Office");

        Watchable newGirl = new Watchable();
        newGirl.setId("4");
        newGirl.setTitle("New Girl");

        Watchable gameOfThrones = new Watchable();
        gameOfThrones.setId("0");
        gameOfThrones.setTitle("Game of Thrones");

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

    @Test
    void shouldAddMovieToMovieList() {
        Watchlist movieList = new Watchlist("4", "Movie List", new ArrayList<>(), userId1);
        Watchable newMovie = new Watchable();
        newMovie.setId("5");
        newMovie.setTitle("Inception");

        when(watchlistRepository.findById(movieList.getId())).thenReturn(Optional.of(movieList));
        when(watchableRepository.findById(newMovie.getId())).thenReturn(Optional.of(newMovie));

        Result<Void> result = watchlistService.addWatchableToWatchlist(movieList.getId(), newMovie.getId());

        assertTrue(result.isSuccess());
        assertEquals(1, movieList.getWatchables().size());
        assertTrue(movieList.getWatchables().contains(newMovie));
        assertEquals("Watchable added to watchlist successfully", result.getMessages().get(0));
    }

    @Test
    void shouldAddSeriesToSeriesList() {
        Watchlist seriesList = new Watchlist("5", "Series List", new ArrayList<>(), userId1);
        Watchable newSeries = new Watchable();
        newSeries.setId("6");
        newSeries.setTitle("Breaking Bad");

        when(watchlistRepository.findById(seriesList.getId())).thenReturn(Optional.of(seriesList));
        when(watchableRepository.findById(newSeries.getId())).thenReturn(Optional.of(newSeries));

        Result<Void> result = watchlistService.addWatchableToWatchlist(seriesList.getId(), newSeries.getId());

        assertTrue(result.isSuccess());
        assertEquals(1, seriesList.getWatchables().size());
        assertTrue(seriesList.getWatchables().contains(newSeries));
        assertEquals("Watchable added to watchlist successfully", result.getMessages().get(0));
    }

    @Test
    void shouldNotAddMovieToSeriesList() {
        Watchlist seriesList = new Watchlist("4", "Completed Series", new ArrayList<>(), userId1);
        Watchable newMovie = new Watchable();
        newMovie.setId("5");
        newMovie.setTitle("Inception");
        newMovie.setType("movie");

        when(watchlistRepository.findById(seriesList.getId())).thenReturn(Optional.of(seriesList));
        when(watchableRepository.findById(newMovie.getId())).thenReturn(Optional.of(newMovie));

        Result<Void> result = watchlistService.addWatchableToWatchlist(seriesList.getId(), newMovie.getId());

        assertFalse(result.isSuccess());
        assertEquals(0, seriesList.getWatchables().size());
        assertEquals("Cannot add a movie to the series list or a series to the movie list", result.getMessages().get(0));
    }

    @Test
    void shouldNotAddSeriesToMovieList() {
        Watchlist movieList = new Watchlist("5", "Completed Movies", new ArrayList<>(), userId1);
        Watchable newSeries = new Watchable();
        newSeries.setId("6");
        newSeries.setTitle("Breaking Bad");
        newSeries.setType("series");

        when(watchlistRepository.findById(movieList.getId())).thenReturn(Optional.of(movieList));
        when(watchableRepository.findById(newSeries.getId())).thenReturn(Optional.of(newSeries));

        Result<Void> result = watchlistService.addWatchableToWatchlist(movieList.getId(), newSeries.getId());

        assertFalse(result.isSuccess());
        assertEquals(0, movieList.getWatchables().size());
        assertEquals("Cannot add a movie to the series list or a series to the movie list", result.getMessages().get(0));
    }

    @Test
    void shouldNotAddDuplicateWatchable() {
        Watchlist movieList = new Watchlist("4", "Completed Movies", new ArrayList<>(), userId1);
        Watchable existingMovie = new Watchable();
        existingMovie.setId("5");
        existingMovie.setTitle("Inception");
        existingMovie.setType("movie");
        existingMovie.setOverview("Existing Movie Overview");

        movieList.getWatchables().add(existingMovie);

        when(watchlistRepository.findById(movieList.getId())).thenReturn(Optional.of(movieList));
        when(watchableRepository.findById(existingMovie.getId())).thenReturn(Optional.of(existingMovie));

        Result<Void> result = watchlistService.addWatchableToWatchlist(movieList.getId(), existingMovie.getId());

        assertFalse(result.isSuccess());
        assertEquals(1, movieList.getWatchables().size());
        assertEquals("Watchable already exists in the watchlist", result.getMessages().get(0));
    }

    @Test
    void shouldDeleteWatchable() {
        Watchlist movieList = new Watchlist("4", "Completed Movies", new ArrayList<>(), userId1);
        Watchable movieToDelete = new Watchable();
        movieToDelete.setId("5");
        movieToDelete.setTitle("Inception");
        movieToDelete.setType("movie");

        movieList.getWatchables().add(movieToDelete);

        when(watchlistRepository.findById(movieList.getId())).thenReturn(Optional.of(movieList));

        Result<Void> result = watchlistService.deleteWatchableFromWatchlist(movieList.getId(), movieToDelete.getId());

        assertTrue(result.isSuccess());
        assertEquals(0, movieList.getWatchables().size());
        assertEquals("Watchable removed from watchlist successfully", result.getMessages().get(0));
    }

    @Test
    void shouldNotDeleteWatchable() {
        Watchlist movieList = new Watchlist("4", "Completed Movies", new ArrayList<>(), userId1);
        Watchable movie = new Watchable();
        movie.setId("5");
        movie.setTitle("Inception");
        movie.setType("movie");

        when(watchlistRepository.findById(movieList.getId())).thenReturn(Optional.of(movieList));

        Result<Void> result = watchlistService.deleteWatchableFromWatchlist(movieList.getId(), movie.getId());

        assertFalse(result.isSuccess());
        assertEquals(0, movieList.getWatchables().size());
        assertEquals("Watchable not found in watchlist", result.getMessages().get(0));
    }

}