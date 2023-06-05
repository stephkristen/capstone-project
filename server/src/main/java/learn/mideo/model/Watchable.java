package learn.mideo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection="watchables")
public class Watchable {

    @Id
    private String id;
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
    public Watchable(String id, String type, String title, String overview, double imdbRating, String trailerLink, String posterPath, int year, int firstAirYear, int lastAirYear, List<Genre> genres, List<StreamingService> streamingServices, List<CastMember> cast_members) {
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public double getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(double imdbRating) {
        this.imdbRating = imdbRating;
    }

    public String getTrailerLink() {
        return trailerLink;
    }

    public void setTrailerLink(String trailerLink) {
        this.trailerLink = trailerLink;
    }

    public String getPosterPath() {
        return posterPath;
    }

    public void setPosterPath(String posterPath) {
        this.posterPath = posterPath;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getFirstAirYear() {
        return firstAirYear;
    }

    public void setFirstAirYear(int firstAirYear) {
        this.firstAirYear = firstAirYear;
    }

    public int getLastAirYear() {
        return lastAirYear;
    }

    public void setLastAirYear(int lastAirYear) {
        this.lastAirYear = lastAirYear;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public List<StreamingService> getStreamingServices() {
        return streamingServices;
    }

    public void setStreamingServices(List<StreamingService> streamingServices) {
        this.streamingServices = streamingServices;
    }

    public List<CastMember> getCast_members() {
        return cast_members;
    }

    public void setCast_members(List<CastMember> cast_members) {
        this.cast_members = cast_members;
    }
}
