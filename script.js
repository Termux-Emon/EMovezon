// script.js

// Theme Toggle
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeToggle.innerText = isLight ? "🌙 Dark Mode" : "🌞 Light Mode";
});

// Language Selection
const langSelect = document.getElementById("langSelect");
langSelect.addEventListener("change", () => {
  applyFilters();
});

// Country Selection
const countrySelect = document.getElementById("countrySelect");
countrySelect.addEventListener("change", () => {
  applyFilters();
});

// Search System
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  applyFilters();
});

let allMovies = [];

// Load Movies from JSON
fetch("https://raw.githubusercontent.com/Termux-Emon/EMovezon-Link/main/movies.json")
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    applyFilters();
  });

// Populate Language & Country dropdown
fetch("https://raw.githubusercontent.com/Termux-Emon/EMovezon/refs/heads/main/language.json")
  .then(res => res.json())
  .then(data => {
    const langSelect = document.getElementById("langSelect");
    const countrySelect = document.getElementById("countrySelect");
    langSelect.innerHTML = '<option value="all">🌐 All Language</option>';
    countrySelect.innerHTML = '<option value="all">🌍 All Country</option>';
    data.languages.forEach(lang => {
      const option = document.createElement("option");
      option.value = lang.toLowerCase();
      option.textContent = lang;
      langSelect.appendChild(option);

      const cOption = document.createElement("option");
      cOption.value = lang.toLowerCase();
      cOption.textContent = lang;
      countrySelect.appendChild(cOption);
    });
  });

// Filter & Display Movies
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedLang = langSelect.value;
  const selectedCountry = countrySelect.value;

  const filtered = allMovies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchValue);
    const matchesLang = selectedLang === "all" || movie.language?.toLowerCase() === selectedLang;
    const matchesCountry = selectedCountry === "all" || movie.country?.toLowerCase() === selectedCountry;
    return matchesSearch && matchesLang && matchesCountry;
  });

  displayMovies(filtered);
}

function displayMovies(movies) {
  const movieContainer = document.getElementById("movies");
  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <div class="btn-group">
        ${movie.download["720"] ? `<a href="${movie.download["720"]}" download>📥 720p</a>` : ""}
        ${movie.download["1080"] ? `<a href="${movie.download["1080"]}" download>📥 1080p</a>` : ""}
        ${movie.trailer ? `<button onclick="window.open('${movie.trailer}', '_blank')">▶ Trailer</button>` : ""}
      </div>
    `;
    movieContainer.appendChild(div);
  });
}
