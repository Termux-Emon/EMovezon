// script.js

const themeToggle = document.getElementById("themeToggle");
const langSelect = document.getElementById("langSelect");
const countrySelect = document.getElementById("countrySelect");
const searchInput = document.getElementById("searchInput");
let allMovies = [];

// Theme Toggle
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    themeToggle.innerText = isLight ? "🌙 Dark Mode" : "🌞 Light Mode";
  });
}

// Dropdown Events
if (langSelect) langSelect.addEventListener("change", applyFilters);
if (countrySelect) countrySelect.addEventListener("change", applyFilters);
if (searchInput) searchInput.addEventListener("input", applyFilters);

// Fetch Languages and Countries
fetch("https://raw.githubusercontent.com/Termux-Emon/EMovezon/refs/heads/main/language.json")
  .then(res => res.json())
  .then(data => {
    if (langSelect) {
      langSelect.innerHTML = '<option value="all">🌐 All Language</option>';
    }
    if (countrySelect) {
      countrySelect.innerHTML = '<option value="all">🌍 All Country</option>';
    }
    data.languages.forEach(lang => {
      const langOption = document.createElement("option");
      langOption.value = lang.toLowerCase();
      langOption.textContent = lang;
      langSelect.appendChild(langOption);

      const countryOption = document.createElement("option");
      countryOption.value = lang.toLowerCase();
      countryOption.textContent = lang;
      countrySelect.appendChild(countryOption);
    });
  });

// Fetch Movies
fetch("https://raw.githubusercontent.com/Termux-Emon/EMovezon-Link/main/movies.json")
  .then(res => res.json())
  .then(data => {
    allMovies = data;
    applyFilters();
  });

function applyFilters() {
  const searchValue = searchInput?.value.toLowerCase() || "";
  const selectedLang = langSelect?.value || "all";
  const selectedCountry = countrySelect?.value || "all";

  const filteredMovies = allMovies.filter(movie => {
    const titleMatch = movie.title.toLowerCase().includes(searchValue);
    const langMatch = selectedLang === "all" || (movie.language && movie.language.toLowerCase() === selectedLang);
    const countryMatch = selectedCountry === "all" || (movie.country && movie.country.toLowerCase() === selectedCountry);
    return titleMatch && langMatch && countryMatch;
  });

  displayMovies(filteredMovies);
}

function displayMovies(movies) {
  const movieContainer = document.getElementById("movies");
  if (!movieContainer) return;
  movieContainer.innerHTML = "";
  movies.forEach(movie => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <div class="btn-group">
        ${movie.download?.["720"] ? `<a href="${movie.download["720"]}" download>📥 720p</a>` : ""}
        ${movie.download?.["1080"] ? `<a href="${movie.download["1080"]}" download>📥 1080p</a>` : ""}
        ${movie.trailer ? `<button onclick="window.open('${movie.trailer}', '_blank')">▶ Trailer</button>` : ""}
      </div>
    `;
    movieContainer.appendChild(card);
  });
}
