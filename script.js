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
  const selectedLang = langSelect.value;
  console.log("Language changed to:", selectedLang);
  // Future: Load language specific text using i18n or dictionary
});

// Country Filter (if needed in future)
const countrySelect = document.getElementById("countrySelect");
countrySelect.addEventListener("change", () => {
  const selectedCountry = countrySelect.value;
  console.log("Filter by country:", selectedCountry);
  // Future: Filter movies by country meta
});

// Search System
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase();
  document.querySelectorAll(".card").forEach(card => {
    const title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(searchValue) ? "block" : "none";
  });
});

// Load Movies from JSON
fetch("https://raw.githubusercontent.com/Termux-Emon/EMovezon-Link/main/movies.json")
  .then(res => res.json())
  .then(data => {
    const movieContainer = document.getElementById("movies");
    movieContainer.innerHTML = "";
    data.forEach(movie => {
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
  });
