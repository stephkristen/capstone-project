package learn.mideo.data;

import static org.assertj.core.api.Assertions.assertThat;

import com.mongodb.WriteConcern;
import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.MongodConfig;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;
import java.io.IOException;
import java.net.UnknownHostException;
import java.util.*;

import learn.mideo.model.Watchable;
import learn.mideo.model.Watchlist;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.mongodb.repository.support.MongoRepositoryFactoryBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataMongoTest(excludeAutoConfiguration= {EmbeddedMongoAutoConfiguration.class})
@ContextConfiguration(classes = {WatchlistRepositoryTest.MongoConfiguration.class})
@EnableMongoRepositories
public class WatchlistRepositoryTest {

    static MongodExecutable executable;

    @Autowired
    private WatchlistRepository watchlistRepository;

    private final static List<String> USER_ID_LIST = Arrays.asList("b2b1f340-cba2-11e8-ad5d-873445c542a2", "bd5dd3a4-cba2-11e8-9594-3356a2e7ef10");

    private static final Random RANDOM = new Random();

    @BeforeAll
    public static void generalSetup() throws UnknownHostException, IOException {
        configureAndStartEmbbededMongo();
    }

    @BeforeEach
    public void dataSetup() {

        String id = UUID.randomUUID().toString();
        List<Watchable> movieWatchables = new ArrayList<>();
        List<Watchable> seriesWatchables = new ArrayList<>();

        Watchable watchable = new Watchable();
        watchable.setTitle("Interstellar");
        watchable.setType("movie");
        watchable.setYear(2016);

        Watchable watchable1 = new Watchable();
        watchable1.setTitle("The Office");
        watchable1.setType("series");
        watchable1.setYear(2005);

        Watchable watchable2 = new Watchable();
        watchable2.setTitle("New Girl");
        watchable2.setType("series");
        watchable2.setYear(2007);

        Watchable watchable3 = new Watchable();
        watchable3.setTitle("Gravity");
        watchable3.setType("movie");
        watchable3.setYear(2017);

        movieWatchables.add(watchable);
        seriesWatchables.add(watchable1);
        seriesWatchables.add(watchable2);
        movieWatchables.add(watchable3);

        Watchlist completedMovies = new Watchlist("Completed Movies", movieWatchables, USER_ID_LIST.get(0));
        Watchlist completedSeries = new Watchlist("Completed Series", seriesWatchables, USER_ID_LIST.get(0));

        watchlistRepository.save(completedMovies);
        watchlistRepository.save(completedSeries);

    }


    @Test
    public void findWatchlistByUserId() {
        String userId = USER_ID_LIST.get(0);
        List<Watchlist> watchlists =  watchlistRepository.findByUserId(userId);

        assertThat(watchlists).isNotEmpty();
        assertThat(watchlists).extracting("userId").allMatch(id -> Objects.equals(id, userId));
        assertThat(watchlists).extracting("type").allMatch(type -> Objects.equals(type, type));
//        assertThat(watchlists).
//        assertThat(resultsPage).extracting("created").isSortedAccordingTo(Collections.reverseOrder());
//        assertThat(resultsPage).extracting("created").first().matches(createdTimeStamp -> (Long)createdTimeStamp <= now);
//        assertThat(resultsPage).extracting("success").allMatch(sucessfull -> (Boolean)sucessfull == true);
    }

//    @Test
//    public void findWatchlistByType() {
//
//    }

    @AfterAll
    public static void tearDown() {
        executable.stop();
    }

    private static void configureAndStartEmbbededMongo() throws UnknownHostException, IOException {
        int port = 27019;

        MongodStarter starter = MongodStarter.getDefaultInstance();

        MongodConfig mongodConfig = MongodConfig.builder()
                .version(Version.Main.V4_0)
                .net(new Net(port, Network.localhostIsIPv6()))
                .build();
        ;
        executable = starter.prepare(mongodConfig);
        executable.start();
    }

    @Configuration
    static class MongoConfiguration {

        @Bean
        public MongoDatabaseFactory factory() {
            return new SimpleMongoClientDatabaseFactory("mongodb://localhost:27019/mideoListTestDB");
        }

        @Bean
        public MongoTemplate mongoTemplate(MongoDatabaseFactory mongoDbFactory) {
            MongoTemplate template = new MongoTemplate(mongoDbFactory);
            template.setWriteConcern(WriteConcern.ACKNOWLEDGED);
            return template;
        }

        @Bean
        public MongoRepositoryFactoryBean mongoFactoryRepositoryBean(MongoTemplate template) {
            MongoRepositoryFactoryBean mongoDbFactoryBean = new MongoRepositoryFactoryBean(WatchlistRepository.class);
            mongoDbFactoryBean.setMongoOperations(template);

            return mongoDbFactoryBean;
        }
    }
}






























//package learn.mideo.data;
//
//import de.flapdoodle.embed.mongo.MongodExecutable;
//import de.flapdoodle.embed.mongo.MongodStarter;
//import de.flapdoodle.embed.mongo.config.Net;
//import de.flapdoodle.embed.mongo.distribution.Version;
//import de.flapdoodle.embed.process.runtime.Network;
//import org.junit.AfterClass;
//import org.junit.BeforeClass;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.test.context.junit4.SpringRunner;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@RunWith(SpringRunner.class)
//@SpringBootTest
//class WatchlistRepositoryTest {
//
//    static MongodExecutable mongodExecutable;
//
//    @BeforeClass
//    public static void setup() throws Exception {
//        MongodStarter starter = MongodStarter.getDefaultInstance();
//        String bindIp = "localhost";
//        int port = 27019;
//        IMongodConfig mongodConfig = new MongodConfigBuilder()
//                .version(Version.Main.PRODUCTION)
//                .net(new Net(bindIp, port, Network.localhostIsIPv6()))
//                .build();
//        mongodExecutable = null;
//        try {
//            mongodExecutable = starter.prepare(mongodConfig);
//            mongodExecutable.start();
//        } catch (Exception e){
//            // log exception here
//            throw new Exception(
//                    "ERROR in mongo test configuration");
//            if (mongodExecutable != null)
//                mongodExecutable.stop();
//        }
//    }
//
//    @AfterClass
//    public static void teardown() throws Exception {
//        if (mongodExecutable != null)
//            mongodExecutable.stop();
//    }
//
////    @Autowired
////    private MongoTemplate mongoTemplate;
//
//    @Test
//    void findByUserId() {
//    }
//
//    @Test
//    void findByType() {
//    }
//}