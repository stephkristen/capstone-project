# Proposal

## Our team will create...

- A general series/movies watch application that features

  - personal profiles
  - list for movies/series that the user has watched
    - personal ratings for movies/series that are in your have watched list
    - personal overall average rating (for ratings you've given)
    - general list view (sortable by alphabet or rating) --cards--
      - clickable with endpoint pages that contain more details --pages--
  - list for movies/series that the user plans to watch
    - the plan is to implement this list like the have-watched list
    - possible opportunity for a different display/journey implementation
  - recommendations based on mood:
    - based on genre
  - searchable database page to find movies
    - simple search (matching words)
    - advanced search (filtering the database using checkboxes)
  - featured trailer on the landing page

  - DB Tables/Entities:
    - AppUser
    - Role
    - AppUserRole
    - Movie
    - Rating
    - Series
    - Genre
    - Streaming Service

## The user will/can...

- view a featured trailer on the landing page
- sign up
- log in
- view profile page:
  - view welcome message with their name
  - view two lists:
  - Completed-Watch List
    - add an item (a button takes them to the search page)
    - update the rating
    - remove item from list
  - Planning-to-Watch List
    - click a button that marks the item as completed
      - be taken to a form where they can rate the item and submit it
        - then, the item is removed from that list and is added to the completed list
    - remove item from list
  - add series/movies to either list
- navigate to search page
  - type in key words/title
  - narrow down/filter search by checkbox
    - by streaming service
    - rating
    - genre
    - alphabetical
    - release year
    - series
    - movie
  - view results on cards
    - poster/img, title, rating, short description
    - plus button for add

## Learning Goals:

- External API integration
- Integrate MongoDB with Spring app
  - Spring has documentation on integrating MongoDB
    - proof of concept--make sure that we can do it in the first place (working example/prototype--integrate early on)
    - https://spring.io/projects/spring-data-mongodb/
  - alternative to MongoDB: CassandraDB

## Stretch Goals:

- clickable cards in watch item search results take you to detailed page (endpoint)
- separate profile page from content activity (edit user credentials, add profile picture/choose an icon)
- recommended for you feature (conditionally rendered card or a carousel) - based on your most-watched genre
- incorporate rolodex somehow
- trivia feature
- time tracker for time spent watching what is in your have-watched list
- deployment (domain)
