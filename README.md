
# MovieSite

The project was created by second-year students of Oulu University of Applied Sciences for the Web Programming Application Project course. The goal of the project was to develop a comprehensive full-stack application for movie enthusiasts. The client-side was implemented using React, and the server-side with Node. The Moviesite application allows users to explore information related to movies, read related news, create their own accounts and groups, and rate movies. The application utilizes APIs from IMDb and Finnkino. At the end of the project, the application will be released for use using the Render service.

## Group members
- Joonas Ridanpää
- Joonatan Niinimaa
- Eerik Väisänen
- Roope Ylikulju

### Demo videos
[Youtube](https://www.youtube.com/watch?v=H3Bj4Q2qrzo)

[Google Drive](https://drive.google.com/file/d/1q7ImzuhIuh4FbFIsn1qHvr80fPhqhndl/view?pli=1)

## Technology and tools
The database was created using PostgreSQL, and Postman and Visual Studio Code were used as development environments. The project's backend was implemented with Node, and the frontend with React. GitHub was utilized as the version control tool, where the application code is available. GitHub was also used for Kanban project planning.

## Deployment

1. Clone the repository to a folder your choice
2. Make sure you have Node.js installed
3. Open the terminal and type "npm i" in the server directory
4. Do the same for the client directory
5. Type "npm start" in the client directory terminal
6. Type "node app.js" in the server directory terminal
7. After this the application should be running on localhost:3000

## How the app works

From the homepage of our website (image 1), you can find popular movies, new reviews, and movie-related news. The movies on display change regularly, accompanied by background images related to the films. You can see the five latest reviews directly on the homepage, and if needed, you can find more reviews on the "Reviews" page. At the bottom of the page, you can access news sourced through Finnkino.


<img width="928" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/af0f15b6-c258-454d-bd66-cd7d4f9d60b6">

*IMAGE 1. Frontpage*

Our website allows users to register (image 2), after which they can log in (image 3) and utilize the functionalities provided by the site with their own account.

<img width="932" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/e612d4a5-65d6-4e6e-8a8c-6167aa6ee807">

*IMAGE 2. Registeration page*

<img width="923" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/f2e90a89-f0de-4c74-bc07-e667b587e338">

*IMAGE 3. Login page*

The user can submit their own reviews and view reviews submitted by other users (image 3). If desired, the user can also customize their view by filtering reviews. They have the option to delete their own review if they wish.

<img width="915" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/1af0267b-b0e3-402e-a073-0a898e57829b">

*IMAGE 4. Review page*


On the Groups page, users have the option to send join requests to groups aligned with their interests or create their own group (image 5).

<img width="923" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/b01753bb-f512-4355-8786-4abc5cbbc5b7">

*IMAGE 5. Groups page*


From the group's dedicated page, users can view movie reviews made by group members, the list of group members, and movie-related news, as well as join requests to the group (image 6). If desired, users can hide reviews and news from the top-right corner dropdown menu on the page.

<img width="960" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/bb610d53-a8f8-4417-b05d-40c4eeb42666">

*IMAGE 6. The group's dedicated page*


Users can edit their profiles from the Settings page, where they can choose a new profile picture from the available options or delete their account (image 7). This provides users with the opportunity to personalize their profiles and easily manage their account settings.

<img width="944" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/43b62011-50c6-42a5-80d5-6c9aec868707">

*IMAGE 7. Settings page*


On the Profile page, users can browse the groups they are a part of and remove selected movies from their watchlist.

<img width="944" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/70aad211-e0a6-4a56-9b81-ed450e4986fa">

*IMAGE 8. Profile page*


On the Movies page, users can browse movies using the search bar or filters of their choice.

<img width="940" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/0aea65b1-d378-4e06-ad99-e890ee81ffd3">

*IMAGE 9. Movies page*


<img width="947" alt="image" src="https://github.com/TVT22-16/MovieSite/assets/112471004/e8564ca0-f556-46de-a717-81d59dd1c2eb">

*IMAGE 10. MovieInfo

## Group's areas of responsibilities

**Joonatan Niinimaa:**
My responsibilities included the design and implementation of essential CRUD operations and endpoints, for which I utilized Postman in my testing. Additionally, I designed a group page on the website where users can browse all groups or join them, a profile page where they can check their groups, and a settings page where user can change their profile picture and provides the functionality to delete their account. These pages work in tandem with the backend to retrieve necessary information from the database.

**Eerik Väisänen:**
At the start of the project, my responsibilities included designing the frontend mockup and the UI for login and register pages. Tasks also involved handling group invitations and adding movies to the watchlist. Crucial to the role was implementing essential CRUD operations on the backend and utilizing Postman for these tasks. I made necessary database adjustments to accommodate group invitations and watchlist updates. Additionally, I implemented the feature to remove movies from the watchlist on the profile page and conducted testing for both the watchlist and group invitations.

**Joonas Ridanpää:**


**Roope Ylikulju:**
I implemented the ThemeSwitcher and Userlist for the project. Additionally, I worked on various other frontend-related tasks.
