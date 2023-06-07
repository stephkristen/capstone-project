package learn.mideo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection="watchable")
public class Watchable {

//    @Id
    private String id;
    private String type;
    private String title;
    private String overview;
    private int imdbRating;
    private int personalRating;
    private String trailerLink;
    private String posterPath;
    private int year;
    private int firstAirYear;
    private int lastAirYear;
    private List<String> genres;
    private List<String> streamingServices;
    private List<String> cast_members;

    @PersistenceConstructor
    public Watchable() {
    }

    public Watchable(String id, String type, String title, String overview, int imdbRating, int personalRating, String trailerLink, String posterPath, int year, List<String> genres, List<String> streamingServices, List<String> cast_members) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.overview = overview;
        this.imdbRating = imdbRating;
        this.personalRating = personalRating;
        this.trailerLink = trailerLink;
        this.posterPath = posterPath;
        this.year = year;
        this.genres = genres;
        this.streamingServices = streamingServices;
        this.cast_members = cast_members;
    }

    public Watchable(String id, String type, String title, String overview, int imdbRating, int personalRating, String trailerLink, String posterPath, int firstAirYear, int lastAirYear, List<String> genres, List<String> streamingServices, List<String> cast_members) {
        this.id = id;
        this.type = type;
        this.title = title;
        this.overview = overview;
        this.imdbRating = imdbRating;
        this.personalRating = personalRating;
        this.trailerLink = trailerLink;
        this.posterPath = posterPath;
        this.firstAirYear= firstAirYear;
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

    public int getImdbRating() {
        return imdbRating;
    }

    public void setImdbRating(int imdbRating) {
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

    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getStreamingServices() {
        return streamingServices;
    }

    public void setStreamingServices(List<String> streamingServices) {
        this.streamingServices = streamingServices;
    }

    public List<String> getCast_members() {
        return cast_members;
    }

    public void setCast_members(List<String> cast_members) {
        this.cast_members = cast_members;
    }

    public int getPersonalRating() {
        return personalRating;
    }

    public void setPersonalRating(int personalRating) {
        this.personalRating = personalRating;
    }
}
