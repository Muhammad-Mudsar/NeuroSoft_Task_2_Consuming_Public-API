const id = new URLSearchParams(window.location.search).get("id");

// ==========================================
// DETAILS PAGE
// ==========================================

document.addEventListener("DOMContentLoaded", loadShowDetails);

async function loadShowDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    showError("Invalid show id.");
    return;
  }

  try {
    //console.log(id);

    const show = await MovieAPI.getShow(id);

    //console.log(show);

    renderShow(show);
  } catch (error) {
    console.error(error);

    showError(error.message);
  }
}

function showError(message) {
  document.getElementById("loading").classList.add("d-none");

  const error = document.getElementById("error");

  error.classList.remove("d-none");

  error.querySelector(".alert").textContent = message;
}

//show render

function renderShow(show) {
  document.getElementById("loading").classList.add("d-none");

  const container = document.getElementById("detailsContainer");

  container.classList.remove("d-none");

  container.innerHTML = `

<div class="row g-5 align-items-start">

    <div class="col-lg-4">

        <img
            src="${show.posterLarge}"
            class="img-fluid rounded shadow"
            alt="${show.title}"
        >

    </div>

    <div class="col-lg-8">

        <h1 class="display-5 fw-bold mb-3">
            ${show.title}
        </h1>
         <span class="float-end"> <a href="index.html" class="btn btn-outline-light"> ← Back </a>     </span>

        <div class="mb-3">

            <span class="badge bg-warning text-dark me-2">
                ⭐ ${show.rating}
            </span>

            <span class="badge bg-primary me-2">
                ${show.year}
            </span>

            <span class="badge bg-success">
                ${show.status}
            </span>

        </div>

        <p>

            <strong>Genres:</strong>

            ${show.genres}

        </p>

        <p>

            <strong>Language:</strong>

            ${show.language}

        </p>

        <p>

            <strong>Runtime:</strong>

            ${show.runtime} minutes

            </p>
        

        <hr>

        <h4>Summary</h4>

        <p class="lead">

            ${show.summary}

        </p>

    </div>

</div>

`;
}
