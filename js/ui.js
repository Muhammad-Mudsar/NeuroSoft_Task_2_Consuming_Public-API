// ui.js Rendering

const movieGrid = document.getElementById("moviesGrid");
const loadingIndicator = document.getElementById("loadingIndicator");
const errorState = document.getElementById("errorState");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");

function showLoading() {
  loadingIndicator.classList.remove("d-none");
}

function hideLoading() {
  loadingIndicator.classList.add("d-none");
}

function showError(message = "Failed to load movies.") {
  errorState.classList.remove("d-none");
  errorState.querySelector("p").textContent = message;
}

function hideError() {
  errorState.classList.add("d-none");
}

function showEmptyState() {
  emptyState.classList.remove("d-none");
}

function hideEmptyState() {
  emptyState.classList.add("d-none");
}

function updateResultsCount(count) {
  resultsCount.textContent = count;
}

function renderMovies(movies) {
  movieGrid.innerHTML = "";

  hideError();
  hideEmptyState();

  if (!movies.length) {
    updateResultsCount(0);
    showEmptyState();
    return;
  }

  updateResultsCount(movies.length);

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    fragment.appendChild(createMovieCard(movie));
  });

  movieGrid.appendChild(fragment);
}

function createMovieCard(movie) {
  const card = document.createElement("div");
  card.className = "movie-card";

  const poster = movie.poster || "public/img/coming1.jpg";

  const genre =
    Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre || "N/A";

  card.innerHTML = `
        <div class="movie-poster-wrapper">
            <img
                src="${movie.poster}" onerror="this.src='public/img/coming1.jpg'"
                alt="${movie.title}"
                class="movie-poster"
                loading="lazy"
            >

            <span class="movie-rating">
                ⭐ ${movie.rating}
            </span>
        </div>

        <div class="movie-content">

            <h5 class="movie-title">
                ${movie.title}
            </h5>

            <div class="movie-meta">
                <span>${movie.year}</span>
                <span>${movie.genres}</span>
            </div>

            <p class="movie-overview">
                ${movie.summary || "No description available."}
            </p>

            <button class="btn btn-primary w-100" onclick="window.location.href='details.html?id=${movie.id}'">
                View Details
            </button>

        </div>
    `;

  return card;
}
