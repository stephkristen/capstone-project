package learn.mideo.domain;

import learn.mideo.data.WatchlistRepository;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import static org.mockito.Mockito.when;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
class WatchlistServiceTest {

    @Autowired
    private WatchlistService watchlistService;

    @MockBean
    private WatchlistRepository watchlistRepository;

    @Before
    public void setup() {
    }


    @Test
    public void findByUserId_thenTestUser1WatchlistsShouldBeReturned() {
//        when(watchlistRepository.findByUserId(testUser1ID)).thenReturn();

//        Student found = studentService.findByStudentNumber(ragcrixStudentNumber);
//
//        assertNotNull(found);
//        assertEquals(ragcrix.getName(), found.getName());
//        assertEquals(ragcrix.getId(), found.getId());
    }

    @Test
    public void findByType_thenCompletedMoviesShouldBeReturned() {
//        Student found = studentService.findByStudentNumber(ragcrixStudentNumber);
//
//        assertNotNull(found);
//        assertEquals(ragcrix.getName(), found.getName());
//        assertEquals(ragcrix.getId(), found.getId());
    }

    @Test
    void findAll() {
    }

}