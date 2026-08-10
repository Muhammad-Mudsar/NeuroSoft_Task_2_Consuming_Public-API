// ==========================================
// CINESCOPE - HERO CAROUSEL
// Local Images
// ==========================================

const heroSlides = [
  {
    image: "./public/img/home1.jpg",
    badge: "Featured",
    title: "Cosmic Legends",
    tagline: "An Epic Journey Through Time and Space",
    description:
      "Experience a groundbreaking sci-fi adventure that challenges the boundaries of imagination.",
    rating: "8.9",
    year: "2024",
    genres: "Action, Sci-Fi",
    runtime: "148 min",
  },

  {
    image: "./public/img/home2.jpg",
    badge: "Trending",
    title: "Beyond the Horizon",
    tagline: "Every Journey Has a Beginning",
    description:
      "A breathtaking adventure that takes you beyond everything you thought was possible.",
    rating: "8.6",
    year: "2025",
    genres: "Adventure, Drama",
    runtime: "132 min",
  },

  {
    image: "./public/img/home3.jpg",
    badge: "Top Rated",
    title: "Spider Man",
    tagline: "Trust No One",
    description:
      "A high-stakes thriller where every decision could change the course of history.",
    rating: "9.1",
    year: "2025",
    genres: "Action, Thriller",
    runtime: "126 min",
  },

  {
    image: "./public/img/home4.jpg",
    badge: "Editor's Pick",
    title: "The Last Kingdom",
    tagline: "Legends Never Die",
    description:
      "An unforgettable story of courage, loyalty, and sacrifice in a world on the edge.",
    rating: "8.8",
    year: "2024",
    genres: "Drama, Fantasy",
    runtime: "154 min",
  },
];

// ==========================================
// HERO STATE
// ==========================================

const heroState = {
  currentIndex: 0,
  autoplayTimer: null,
  progressTimer: null,
  isPaused: false,
  autoplayDuration: 6000,
};

// ==========================================
// DOM ELEMENTS
// ==========================================

const heroCarousel = document.getElementById("heroCarousel");
const heroIndicators = document.getElementById("heroIndicators");
const heroPrevBtn = document.getElementById("heroPrevBtn");
const heroNextBtn = document.getElementById("heroNextBtn");
const heroProgressBar = document.getElementById("heroProgressBar");

// ==========================================
// INITIALIZE HERO
// ==========================================

function initializeHero() {
  if (!heroCarousel || !heroIndicators) {
    console.error("Hero carousel elements not found.");
    return;
  }

  renderHeroSlides();
  createHeroIndicators();
  setupHeroControls();

  showHeroSlide(0);
  startHeroAutoplay();
}

// ==========================================
// RENDER SLIDES
// ==========================================

function renderHeroSlides() {
  heroCarousel.innerHTML = "";

  heroSlides.forEach((movie, index) => {
    const slide = document.createElement("article");

    slide.className = `hero-slide ${index === 0 ? "active" : ""}`;

    slide.dataset.index = index;

    slide.innerHTML = `

      <div
        class="hero-backdrop"
        style="background-image: url('${movie.image}')"
      ></div>

      <div class="hero-overlay"></div>
      <div class="hero-vignette"></div>

      <div class="hero-content">

        <span class="hero-badge">
          <i class="fas fa-fire me-2"></i>
          ${movie.badge}
        </span>

        <h1 class="hero-title">
          ${movie.title}
        </h1>

        <p class="hero-tagline">
          ${movie.tagline}
        </p>

        <p class="hero-description">
          ${movie.description}
        </p>

        <div class="hero-meta">

          <span class="meta-item">
            <i class="fas fa-star"></i>
            ${movie.rating}
          </span>

          <span class="meta-item">
            <i class="fas fa-calendar-alt"></i>
            ${movie.year}
          </span>

          <span class="meta-item">
            <i class="fas fa-film"></i>
            ${movie.genres}
          </span>

          <span class="meta-item">
            <i class="fas fa-clock"></i>
            ${movie.runtime}
          </span>

        </div>

        <div class="hero-buttons">

          <button
            type="button"
            class="btn btn-primary btn-lg"
          >
            <i class="fas fa-play me-2"></i>
            Watch Now
          </button>

          <button
            type="button"
            class="btn btn-outline-light btn-lg"
          >
            <i class="fas fa-info-circle me-2"></i>
            More Details
          </button>

        </div>

      </div>
    `;

    heroCarousel.appendChild(slide);
  });
}

// ==========================================
// CREATE INDICATORS
// ==========================================

function createHeroIndicators() {
  heroIndicators.innerHTML = "";

  heroSlides.forEach((_, index) => {
    const indicator = document.createElement("button");

    indicator.type = "button";
    indicator.className = "hero-indicator";

    indicator.setAttribute("aria-label", `Go to slide ${index + 1}`);

    indicator.addEventListener("click", () => {
      showHeroSlide(index);
      resetHeroAutoplay();
    });

    heroIndicators.appendChild(indicator);
  });
}

// ==========================================
// SHOW SLIDE
// ==========================================

function showHeroSlide(index) {
  if (!heroSlides.length) return;

  const slides = document.querySelectorAll(".hero-slide");

  const indicators = document.querySelectorAll(".hero-indicator");

  heroState.currentIndex = (index + heroSlides.length) % heroSlides.length;

  // Remove active state
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });

  // Activate selected slide
  const activeSlide = slides[heroState.currentIndex];

  const activeIndicator = indicators[heroState.currentIndex];

  if (activeSlide) {
    activeSlide.classList.add("active");
  }

  if (activeIndicator) {
    activeIndicator.classList.add("active");
  }

  restartProgress();
}

// ==========================================
// NEXT SLIDE
// ==========================================

function nextHeroSlide() {
  showHeroSlide(heroState.currentIndex + 1);

  resetHeroAutoplay();
}

// ==========================================
// PREVIOUS SLIDE
// ==========================================

function previousHeroSlide() {
  showHeroSlide(heroState.currentIndex - 1);

  resetHeroAutoplay();
}

// ==========================================
// CONTROLS
// ==========================================

function setupHeroControls() {
  heroPrevBtn?.addEventListener("click", previousHeroSlide);

  heroNextBtn?.addEventListener("click", nextHeroSlide);

  heroCarousel.addEventListener("mouseenter", () => {
    heroState.isPaused = true;

    stopHeroAutoplay();
  });

  heroCarousel.addEventListener("mouseleave", () => {
    heroState.isPaused = false;

    startHeroAutoplay();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      nextHeroSlide();
    }

    if (event.key === "ArrowLeft") {
      previousHeroSlide();
    }
  });
}

// ==========================================
// AUTOPLAY
// ==========================================

function startHeroAutoplay() {
  stopHeroAutoplay();

  if (heroState.isPaused) return;

  heroState.autoplayTimer = setInterval(() => {
    showHeroSlide(heroState.currentIndex + 1);
  }, heroState.autoplayDuration);
}

function stopHeroAutoplay() {
  if (heroState.autoplayTimer) {
    clearInterval(heroState.autoplayTimer);

    heroState.autoplayTimer = null;
  }
}

function resetHeroAutoplay() {
  stopHeroAutoplay();

  if (!heroState.isPaused) {
    startHeroAutoplay();
  }
}

// ==========================================
// PROGRESS BAR
// ==========================================

function restartProgress() {
  if (!heroProgressBar) return;

  heroProgressBar.style.transition = "none";
  heroProgressBar.style.width = "0%";

  // Force browser reflow
  void heroProgressBar.offsetWidth;

  heroProgressBar.style.transition = `width ${heroState.autoplayDuration}ms linear`;

  heroProgressBar.style.width = "100%";
}

// ==========================================
// IMAGE PRELOADING
// ==========================================

function preloadHeroImages() {
  heroSlides.forEach((slide) => {
    const image = new Image();

    image.src = slide.image;
  });
}

// ==========================================
// START
// ==========================================

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initializeHero();
    preloadHeroImages();
  });
} else {
  initializeHero();
  preloadHeroImages();
}
