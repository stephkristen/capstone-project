package learn.mideo.data;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public class MongoDBConfig {
    @Value("${spring.data.mongodb.host}")
    private String MONGO_DB_HOST;

    @Value(("${spring.data.mongodb.port:27019}"))
    private int MONGO_DB_PORT;

    @Value("${spring.data.mongodb.database}")
    private String MONGO_DB_NAME;

    @Bean
    public MongoTemplate mongoTemplate() {
        MongoClient mongoClient = MongoClients.create("mongodb://hostOne:27019");
//        MongoClient mongoClient = new MongoClient(MONGO_DB_HOST, MONGO_DB_PORT);
        MongoTemplate mongoTemplate = new MongoTemplate(mongoClient, MONGO_DB_NAME);
        return mongoTemplate;
    }
}
