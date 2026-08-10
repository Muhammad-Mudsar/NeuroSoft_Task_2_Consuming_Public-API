// call API --This file will be responsible for communicating with API.

//Responsibilities:[Fetch data,Handle errors,Handle timeout,Return clean data,min manipulate the DOM]

/** API Layer  */

class MovieAPI {
  static async request(endpoint) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, CONFIG.REQUEST_TIMEOUT);

    try {
      const response = await fetch(`${CONFIG.BASE_URL}${endpoint}`, {
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      return await response.json();
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("Request Timeout");
      }

      throw error;
    }
  }

  static async getShows() {
    page = Number.isInteger(page) ? page : 0;
    const data = await this.request(`/shows?page=${page}`);

    return data.map((show) => this.normalize(show));
  }

  //for details pg
  static async getShow(id) {
    const show = await this.request(`/shows/${id}`);

    return this.normalize(show);
  }
  static async searchShows(query) {
    if (!query.trim()) {
      return this.getShows();
    }
    const data = await this.request(
      `/search/shows?q=${encodeURIComponent(query)}`,
    );

    return data.map((item) => this.normalize(item.show));
  }

  static normalize(show) {
    return {
      id: show.id,

      title: show.name,

      poster: show.image?.medium ?? "assets/images/no-poster.png",

      posterLarge: show.image?.original ?? "assets/images/no-poster.png",

      rating: show.rating?.average ?? "N/A",

      genres: show.genres[0] ?? [],

      year: show.premiered ? show.premiered.substring(0, 4) : "N/A",

      summary:
        show.summary ?
          show.summary.replace(/<[^>]*>/g, "")
        : "No description available.",

      language: show.language,

      runtime: show.runtime,

      status: show.status,
    };
  }
}

//getMovies(category);

//we simply call it

//MovieAPI.getMovies("action")
// MovieAPI.getMovies("comedy")
//GET /movies/search?q=batman
// GET /genres
// GET /genres/{id}/movies
