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
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.UUID;

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

        Watchlist watchlist;

//        for (int i = 0; i < 10; i++) {
//            String requestId = UUID.randomUUID().toString();
//            if (i % 2 == 0) {
//                watchlist = new Watchlist(requestId, true, USER_ID_LIST.get(RANDOM.nextInt(2)), System.currentTimeMillis());
//            } else {
//                watchlist = new Watchlist(requestId, false, USER_ID_LIST.get(RANDOM.nextInt(2)), System.currentTimeMillis());
//            }
//
//            watchlistRepository.save(transaction);
//        }

    }


    @Test
    public void findWatchlistByUserId() {
//        long now = System.currentTimeMillis();
//        String userId = USER_ID_LIST.get(RANDOM.nextInt(2));
//        List<Watchlist> resultsPage =  watchlistRepository.findBySuccessIsTrueAndCreatedLessThanEqualAndUserIdOrderByCreatedDesc(now, userId, PageRequest.of(0, 5)).getContent();
//
//        assertThat(resultsPage).isNotEmpty();
//        assertThat(resultsPage).extracting("userId").allMatch(id -> Objects.equals(id, userId));
//        assertThat(resultsPage).extracting("created").isSortedAccordingTo(Collections.reverseOrder());
//        assertThat(resultsPage).extracting("created").first().matches(createdTimeStamp -> (Long)createdTimeStamp <= now);
//        assertThat(resultsPage).extracting("success").allMatch(sucessfull -> (Boolean)sucessfull == true);
    }

    @Test
    public void findWatchlistByType() {

    }

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