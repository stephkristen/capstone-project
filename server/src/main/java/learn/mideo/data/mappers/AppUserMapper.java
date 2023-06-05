package learn.mideo.data.mappers;

import learn.mideo.model.AppUser;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.List;

public class AppUserMapper {

    public AppUser mapDocument(Document doc) {
        String id = doc.getString("_id");
        String username = doc.getString("username");
        String passwordHash = doc.getString("password_hash");
        boolean enabled = doc.getBoolean("enabled");
        String role = doc.getString("role");
        String firstName = doc.getString("firstname");
        String lastName = doc.getString("lastname");

        return new AppUser(id, firstName, lastName, username, passwordHash, enabled, role);
    }
}
