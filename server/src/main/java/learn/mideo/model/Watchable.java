package learn.mideo.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection="watchables")
public class Watchable {

    private ObjectId id;
    private String type;
    private String title;
    private String overview;
    private double imdbRating;
    private String trailerLink;
    private String posterPath;
    private int year;
    private int firstAirYear;
    private int lastAirYear;
    private List<Genre> genres;
    private List<StreamingService> streamingServices;
    private List<CastMember> cast_members;

    @PersistenceConstructor
    public Watchable(ObjectId id, String type, String title, String overview, double imdbRating, String trailerLink, String posterPath, int year, int firstAirYear, int lastAirYear, List<Genre> genres, List<StreamingService> streamingServices, List<CastMember> cast_members) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.overview = overview;
        this.imdbRating = imdbRating;
        this.trailerLink = trailerLink;
        this.posterPath = posterPath;
        this.year = year;
        this.firstAirYear = firstAirYear;
        this.lastAirYear = lastAirYear;
        this.genres = genres;
        this.streamingServices = streamingServices;
        this.cast_members = cast_members;
    }

    public Watchable(String type, String title, String overview, double imdbRating, String trailerLink, String posterPath, int year, int firstAirYear, int lastAirYear, List<Genre> genres, List<StreamingService> streamingServices, List<CastMember> cast_members) {
        this.type = type;
        this.title = title;
        this.overview = overview;
        this.imdbRating = imdbRating;
        this.trailerLink = trailerLink;
        this.posterPath = posterPath;
        this.year = year;
        this.firstAirYear = firstAirYear;
        this.lastAirYear = lastAirYear;
        this.genres = genres;
        this.streamingServices = streamingServices;
        this.cast_members = cast_members;
    }
}
