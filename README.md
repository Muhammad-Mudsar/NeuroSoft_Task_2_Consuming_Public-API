# CineScope

A responsive movie/show discovery web application that fetches live data from the TVMaze public API and presents it through a modern, responsive interface.

## Project Overview

CineScope allows users to browse TV shows, search titles, filter results, sort shows, and progressively display results through a clean Bootstrap-based UI.

The project is designed with a lightweight frontend architecture using separate configuration, API, UI, and application logic files.

## Tech Stack

- **HTML5** — Page structure and semantic markup
- **CSS3** — Custom styling, animations, transitions, responsive UI
- **JavaScript (ES6+)** — API integration, state management, filtering, searching, sorting, and rendering
- **Bootstrap 5.3** — Responsive layout and UI components
- **Font Awesome** — Icons
- **TVMaze API** — Live TV show data
- **Browser Local Storage** — Planned/optional persistence for favorites

## API

CineScope uses the public **TVMaze API**:

`https://api.tvmaze.com`

Primary endpoint:

`GET /shows?page={page}`

Individual show endpoint:

`GET /shows/{id}`

No API key, account, or login is required.

## Project Architecture

```text
CineScope/
│
├── index.html
├── details.html
│
├── css/
│   └── style.css
│
└── js/
    ├── config.js
    ├── api.js
    ├── ui.js
    ├── app.js
    └── details.js
```

### JavaScript Responsibilities

**config.js**

- Central application/API configuration
- Base API URL
- Request timeout
- Default settings

**api.js**

- TVMaze API communication
- Request handling
- Show data normalization
- API error handling

**app.js**

- Application initialization
- Global state
- Loading show data
- Search and filtering
- Sorting
- Pagination/display limits

**ui.js**

- Movie/show card generation
- Grid rendering
- Loading and empty states
- UI updates

**details.js**

- Reads the show ID from the URL
- Requests individual show data
- Renders the details page

## Current Features

- Live TV show data from TVMaze
- Responsive show/movie-style cards
- Search by title
- Genre filtering
- Release year filtering
- Minimum rating filtering
- Sorting by:
  - Rating
  - Release year
  - Title
  - Popularity/default order
- Client-side result pagination
- Displays 20 cards at a time
- Load More functionality
- Loading state
- Error state
- Retry functionality
- Empty search/filter state
- Missing-image fallback
- Responsive Bootstrap layout
- Animated card interactions
- Dedicated show details page

````

Filtering and sorting are performed locally after the initial API data is loaded, allowing fast interaction without repeatedly requesting the API.

## Loading & Error Handling

The application provides visible UI states instead of leaving the page blank:


## Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

Bootstrap's responsive grid is combined with custom CSS for card sizing, spacing, animations, and transitions.

## Future Improvements

- Complete and enhance the details page
- Skeleton loading cards
- Favorites with Local Storage
- Advanced genre filtering
- Improved card animations
- Accessibility improvements
- Better image fallback handling
- Additional TVMaze information such as cast, episodes, and seasons
- UI/UX refinement

## Getting Started

No backend server or database is required.

1. Clone/download the project.
2. Open the project in a code editor.
3. Open `index.html` through a local development server.
4. The application will fetch live data from TVMaze.

For best results, use VS Code with **Live Server** or another local HTTP server.

## License

This project is intended for learning and demonstration purposes. TV show data is provided by the TVMaze API.
