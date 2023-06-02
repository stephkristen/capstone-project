package learn.mideo.data;

import learn.mideo.model.AppUser;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class AppUserRepository {

    private final MongoTemplate mongoTemplate;

    public AppUserRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public AppUser findByUsername(String username) {
        Query query = Query.query(Criteria.where("username").is(username));
        return mongoTemplate.findOne(query, AppUser.class);
    }

    public AppUser create(AppUser user) {
        return mongoTemplate.save(user);
    }

    public void update(AppUser user) {
        mongoTemplate.save(user);
    }
}
