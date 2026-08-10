document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
  bindEvents();
  await loadMovies();
  console.log("data got");
}

/**  App  */

let allMovies = [];
let filteredMovies = [];

let currentPage = 1;
const ITEMS_PER_PAGE = 20;

document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
  bindEvents();

  await loadMovies();
  //console.log(data);
}

async function loadMovies() {
  showLoading();
  hideError();

  try {
    allMovies = await MovieAPI.getShows((page = 0));
    console.log("Movies loaded:", allMovies.length);

    //console.log(allMovies);

    filteredMovies = [...allMovies];
    currentPage = 1;
    renderPaginatedMovies();
    //renderMovies(filteredMovies);

    // currentPage = page;
  } catch (error) {
    // renderMovies([]);
    showError(error.message);
    console.error("Failed to load movies:", error);
  } finally {
    hideLoading();
  }
}

function bindEvents() {
  document.querySelectorAll(".category-chip").forEach((chip) => {
    chip.addEventListener("click", async () => {
      document
        .querySelectorAll(".category-chip")
        .forEach((btn) => btn.classList.remove("active"));

      chip.classList.add("active");

      await loadMovies(chip.dataset.category);
    });
  });

  //
  const searchInput = document.getElementById("searchInput");
  // const genreFilter = document.getElementById("genreFilter");
  const yearFilter = document.getElementById("yearFilter");
  const ratingFilter = document.getElementById("ratingFilter");
  const sortBy = document.getElementById("sortBy");
  // console.log(document.getElementById("genreFilter").value);
  document.getElementById("retryBtn").addEventListener("click", loadMovies);

  //
  genreFilter.addEventListener("change", (e) => {
    state.filters.genre = e.target.value;

    applyFilters();
  });
  //

  searchInput.addEventListener("input", applyFilters);
  genreFilter.addEventListener("change", applyFilters);
  yearFilter.addEventListener("change", applyFilters);
  ratingFilter.addEventListener("change", applyFilters);
  sortBy.addEventListener("change", applyFilters);

  //
  // searchInput.addEventListener("input", filterMovies);
  searchInput.addEventListener("input", applyFilters);

  function applyFilters() {
    const search = document
      .getElementById("searchInput")
      .value.trim()
      .toLowerCase();

    const year = document.getElementById("yearFilter").value;
    const rating = document.getElementById("ratingFilter").value;
    const genre = document.getElementById("genreFilter").value;

    //aproach2
    //const { genre, year, rating, searchQuery, sortBy } = state.filters;

    filteredMovies = allMovies.filter((movie) => {
      const matchSearch = !search || movie.title.toLowerCase().includes(search);

      const matchYear = !year || String(movie.year) === year;

      const matchRating = !rating || Number(movie.rating) >= Number(rating);

      const matchGenre = !genre || movie.genres.includes(genre);

      console.log(matchGenre);

      return matchSearch && matchYear && matchRating && matchGenre;
    });

    //filteredMovies = sortMovies(filteredMovies);

    // renderMovies(filteredMovies);
    renderMovies(filteredMovies);
  }

  currentPage = 1;
}

// second
async function searchShows(query) {
  showLoading();

  try {
    if (query.trim() === "") {
      allMovies = await MovieAPI.getShows();
    } else {
      allMovies = await MovieAPI.searchShows(query);
    }

    filteredMovies = [...allMovies];

    renderMovies(filteredMovies);
  } catch (error) {
    renderMovies([]);

    showError(error.message);
  } finally {
    hideLoading();
  }
}

//debounce delay

function debounce(func, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

//sort movies data
function sortMovies(filteredMovies) {
  const sortBy = document.getElementById("sortBy").value;

  // Sorting
  filteredMovies.sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return Number(b.rating || 0) - Number(a.rating || 0);

      case "release_date":
        return Number(b.year || 0) - Number(a.year || 0);

      case "title":
        return a.title.localeCompare(b.title);

      case "popularity":
      default:
        return 0;
    }
  });

  // Restart pagination after filtering/sorting
  currentPage = 1;

  renderPaginatedMovies();
  updateActiveFilters();
}

//Add the pagination renderer
function renderPaginatedMovies() {
  const start = 0;
  const end = currentPage * ITEMS_PER_PAGE;

  const moviesToDisplay = filteredMovies.slice(start, end);

  renderMovies(moviesToDisplay);

  updateLoadMoreButton();
}

function loadMoreMovies() {
  if (currentPage * ITEMS_PER_PAGE >= filteredMovies.length) {
    return;
  }

  currentPage++;

  renderPaginatedMovies();
}

function updateLoadMoreButton() {
  const button = document.getElementById("loadMoreBtn");

  if (!button) return;

  const displayed = currentPage * ITEMS_PER_PAGE;

  button.style.display =
    displayed < filteredMovies.length ? "inline-block" : "none";
}

// display custom errors

function showError(message = "Unable to load movies. Please try again.") {
  hideLoading();

  const errorState = document.getElementById("errorState");
  const errorMessage = document.getElementById("errorMessage");

  if (!errorState) return;

  errorMessage.textContent = message;
  errorState.classList.remove("d-none");
}

//hide error
function hideError() {
  const errorState = document.getElementById("errorState");

  if (errorState) {
    errorState.classList.add("d-none");
  }
}
