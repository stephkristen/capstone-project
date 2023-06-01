# Task Plan (3 * 80-100 hours)

## Planning Hours (21hrs)

- Brainstorm (1hr)
- Proposal (3hrs)
- Wireframe (1hr)
- Wireframe Written Markdown Snapshot (2hrs)
- User Stories (5hrs)
- Database Diagram (3hrs)
- Task Plan/List (6hrs)

## Security (10hrs)

- [ ] POM file and configurations (20 min)
- [ ] Stub out classes (10 min)
  - [ ] AppConfig
  - [ ] Security: (1 hour)
    - SecurityConfig
    - AppUserService
    - JwtConverter - token
    - JwtRequestFilter - token
  - [ ] Model: (1 hour)
    - AppUser
  - [ ] Controller: (1 hour)
    - AuthController
  - [ ] Data:
    - AppUserRepository (30 min)
    - MongoDbRepository (learning goal--2 hrs per team member = 6hrs)

## Front-end Foundation--pullable base (1hr)

- [ ] React app (15-30 min of downloading)
- [ ] stub out routes, components (30 min)
  - App
  - log in page
  - sign up page
  - home page
  - navbar
  - watchable page
  - search page
  - not found
  - error

## Unauthenticated User (6hrs)

1. Log in (2hrs)

- [ ] As an unauthenticated user I can log in with my information so that I can have more functionality within the website.

  - [ ] back-end:
    - at what point to break away from security and begin front-end?
    - fake data/hard-coded repo to run code/test and then add MongoDB repo? --> Where do we want to do our learning?
  - [ ] front-end:
    - App
    - log in page

- [ ] As an unauthenticated user, if I give incorrect login information, I can see a message stating that the information is invalid so that I can adjust my login information

  - [ ] back-end:
    - double-check back-end
  - [ ] front-end:
    - error page/form
      - grab back-end validation messages to populate errors

2. Sign up (2hrs)

- [ ] As an unauthenticated user trying to sign up I can fill in my first, last, and user names, my email, and password so that I can create an account.
  - [ ] back-end:
    - AppUser
  - [ ] front-end:
    - sign up page

3. Home/NavBar (2hrs)

- As an unauthenticated user I can view the home page so that I can understand what the site has to offer and choose whether I want to sign in or sign up.

  - [ ] front-end:
    - home page
    - navbar (page end points)
    - movie trailer feature (3rd party API)

## Authenticated User (30hrs):

1. Search Page (7hrs)

- [ ] As an authenticated user I can search by keyword so that I can find a watchable item.
- [ ] As an authenticated user I can view the search page so that I can search for watchable items, read more about them, see the list status, and add any items to my lists.
  _I cannot add a series to the completed movies list and I cannot add a movie to the completed series list._
- [ ] As an authenticated user I can improve the search for an item by using various filters so that I can get a more refined search result.
- [ ] As an authenticated user I can view a message that states no records were found if the database does not contain the item I'm looking for so that I can see that that search did not yield any results and I can adjust my search criteria.

  - [ ] front-end:
    - connect to API
    - search page
      - title
      - bar
      - filters
      - connected to the API
    - search results view
      - table
        - thumbnail
        - title
        - synopsis
        - type
        - rating
        - add button
        - list status

2. Watchlist Page (14hrs)

- [ ] As an authenticated user I can view my watch list page so that I can see my watch lists: completed movies, completed series, and plan-to-watch.
- [ ] As an authenticated user I can view my alphabetized watch lists so that I can keep track of my watching history and watching plans.
- [ ] As an authenticated user I can click an add button that takes me to the search page so that I can search and add items to any of my lists.

- [ ] front-end: (5hrs)
  - [ ] Render simple list without drop down menu to test connection to the findBy methods from the back-end
  - [ ] Watchlist page
    - welcome message
    - instructions (edit snippet from wireframe to be user-friendly)
    - drop down menu for lists
      - default to a Completed Watchables
      - options:
        - Completed Watchables
        - Completed Movies
        - Completed Series
        - Plan-to-Watch
    - [ ] list format
      - thumbnail
      - Personal rating
      - title
      - release year
      - genre
      - delete watchable button
      - edit watchable button
        - (modal)
        - displayed title
        - populate a rating field with the current personal rating
        - drop down menu to choose a list
          - default to whatever the current list is
        - submit
    - [ ] add button (takes user to search page)
- [ ] back-end (vertical) methods: (5hrs)
  - [ ] findWatchlistByUserId()
    - the other methods depend on this one to work
    - to display the lists in the UI, this method needs to be working and connected to the db
    - happy/unhappy path unit tests
  - [ ] findWatchlistByListType()
    - to display the lists in the UI, this method needs to be working and connected to the db
    - happy/unhappy path unit tests

1. Update from Watchlist Page (7hrs)

- [ ] As an authenticated user I can edit ratings for any items in my lists so that I can make changes as needed after reflection.
- [ ] As an authenticated user I can edit the plan-to-watch list by moving a series or movie to the right completed list so that I can keep track of my watching history and watching plans.

- [ ] front-end:
  - connect to front end button
- [ ] back-end:
  - updateWatchlistByType()
  - needed to edit the watchlists
  - happy/unhappy path unit tests

1. Delete from Watchlist Page (7hrs)

- [ ] As an authenticated user I can delete whole items from any of my lists so that I can keep track of my watching history and watching plans.
  
- [ ] front-end:
  - connect to front end button
- [ ] back-end:
  - deleteWatchlistByType()
  - needed to delete watchables from the watchlists
  - happy/unhappy path unit tests

1. Add Modal (14hrs)

- [ ] As a user I can add a watchable to a watch list so that I can keep track of my watchables:
- [ ] As an authenticated user I can click an add button on the informational page that will allow me to add that same item to any of my lists so that I can add the item with ease.
- [ ] As an authenticated user I can add an item from the search results and view a modal that pops up, so that I can begin the add process. (same add modal as previous journey)
- [ ] As an authenticated user (on the add modal) I can choose from a drop down menu which list I want to add the item to and add an optional personal rating, so that I can submit it to the appropriate list.

  - [ ] front-end: (2hrs)
    - search results
    - watchable info page
    - Modal:
      - watchable title
      - drop down menu for list selection
      - optional personal rating
      - submit button
  - [ ] back-end: (5hrs)
    - adding to local db (after calling API)
    - stub out:
      - Model:
        - Watchable
        - Genre
        - Streaming Service
        - CastMember
        - Watchlist
      - Controller:
        - WatchableController
          - addWatchable() method
      - Service:
        - WatchableService
          - addWatchable() method
          - validateWatchable() method
          - helper methods
          - happy/unhappy path unit tests
        - Repository:
          - WatchableMongoTemplateRepository
            - happy/unhappy path unit tests

6. Watchable Info Page (7hrs)

- [ ] As an authenticated user I can click on a search result item that takes me to a more detailed informational page about an item so that I can learn more if I want to.

- [ ] front-end:
  - component Watchable Info page (API)
    - add button
    - poster
    - title
    - year/year range
    - genre
    - rating
    - description/synopsis
    - youtube trailer

7. Log out (1hr)

- [ ] As an authenticated user I can log out so that I can preserve privacy and security.

- [ ] front-end:
  - confirmation modal for log out
  - connected to navbar

## Presentation Preparation (7hrs--half day Wed/Thurs)

1. Slides

   - Intro:
     - Brief description
     - About us
   - Main feature description
   - What problem does this solve?
   - Slides to match user journey
     - Demo/role-play
   - Closing:
     - ?

2. Speaking Plan

   - All three need to speak
   - Decide order of speakers and slides

3. Live Practice

   - Goal: 3x before dry run

## Polish UI (5hrs--half day Wed/Thurs)
