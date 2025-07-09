const repo = "Termux-Emon/EMovezon-Link";
const apiUrl = `https://api.github.com/repos/${repo}/contents/`;
const perPage = 6;
let currentPage = 1;
let movieList = [];

const i18n = {
  en: {
    title: "🎥 Latest Movies"
  },
  bn: {
    title: "🎬 নতুন মুভি"
  },
  ms: {
    title: "🎬 File Movie Terbaru"
  },
  ar: {
    title: "🎬 أحدث الأفلام"
  }
};

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("movie-container").style.display = "block";
    loadMovies();
  }, 1200);
});

document.getElementById("langSelect").addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    el.innerText = i18n[lang][key];
  });
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderMovies();
  }
});

document.getElementById("nextPage").addEventListener("click", () => {
  const maxPage = Math.ceil(movieList.length / perPage);
  if (currentPage < maxPage) {
    currentPage++;
    renderMovies();
  }
});

async function loadMovies() {
  try {
    const res = await fetch(apiUrl);
    const files = await res.json();
    const jsonFiles = files.filter(file => file.name.endsWith(".json"));

    const promises = jsonFiles.map(file => fetch(file.download_url).then(res => res.json()));
    movieList = await Promise.all(promises);
    renderMovies();
  } catch (err) {
    console.error("Error loading movies:", err);
    document.getElementById("movies").innerHTML = "<p style='color:red;'>❌ Failed to load movies</p>";
  }
}

function renderMovies() {
  const movieDiv = document.getElementById("movies");
  movieDiv.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const currentMovies = movieList.slice(start, end);

  currentMovies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "card";

    let downloadLinks = "";
    if (typeof movie.download === "object") {
      for (const [quality, url] of Object.entries(movie.download)) {
        downloadLinks += `<a href="${url}" download>${quality}p</a> `;
      }
    } else {
      downloadLinks = `<a href="${movie.download}" download>Download</a>`;
    }

    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <div class="btn-group">${downloadLinks}</div>
    `;

    movieDiv.appendChild(card);
  });

  document.getElementById("pageNum").innerText = currentPage;
}
