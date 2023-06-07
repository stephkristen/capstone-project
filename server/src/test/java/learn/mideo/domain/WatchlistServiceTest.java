package learn.mideo.domain;

import learn.mideo.data.WatchlistRepository;
import learn.mideo.model.Watchable;
import learn.mideo.model.Watchlist;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@ContextConfiguration({"classpath*:spring/applicationContext.xml"})
@RunWith(SpringRunner.class)
@SpringBootTest
class WatchlistServiceTest {

    @Autowired
    private WatchlistService watchlistService;

    @MockBean
    private WatchlistRepository watchlistRepository;

    private String userId1 = "abc100";
    private String userId2 = "zyx200";
    private Watchlist completedMovies;
    private Watchlist completedSeries;
    private Watchlist planToWatch;
    private final List<Watchlist> user1watchlists = new ArrayList<>();
    private final List<Watchlist> user2watchlists = new ArrayList<>();


    @Before
    public void setup() {
        Watchable interstellar = new Watchable();
        interstellar.setTitle("Interstellar");

        Watchable taken = new Watchable();
        taken.setTitle("Taken");

        Watchable theOffice = new Watchable();
        theOffice.setTitle("The Office");

        Watchable newGirl = new Watchable();
        newGirl.setTitle("New Girl");

        completedMovies = new Watchlist("1", "Completed Movies", Arrays.asList(interstellar, taken), userId1);
        completedSeries = new Watchlist("2", "Completed Series", Arrays.asList(theOffice, newGirl), userId1);

        user1watchlists.add(completedMovies);
        user1watchlists.add(completedSeries);
    }



    @Test
    public void shouldFindByUserId() {
        when(watchlistRepository.findByUserId(userId1)).thenReturn(user1watchlists);

        List<Watchlist> found = watchlistService.findByUserId(userId1);

        assertNotNull(found);
        assertEquals(user1watchlists, found);
    }

    @Test
    public void shouldNotFindUserByNonExistentId() {

    }

//    @Test
//    public void findByType_thenCompletedMoviesShouldBeReturned() {
////        Student found = studentService.findByStudentNumber(ragcrixStudentNumber);
////
////        assertNotNull(found);
////        assertEquals(ragcrix.getName(), found.getName());
////        assertEquals(ragcrix.getId(), found.getId());
//    }
//

    @Test
    public void shouldFindListOfEachType() {
        //movies
        Watchlist completedMoviesWatchlist = watchlistService.findByType(userId1,"Completed Movies");
        assertEquals("Completed Movies", completedMoviesWatchlist.getType());

        //series
        Watchlist completedSeriesWatchlist = watchlistService.findByType(userId1,"Completed Series");
        assertEquals("Completed Movies", completedSeriesWatchlist.getType());

        //plan-to-watch
    }


}