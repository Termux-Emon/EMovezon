const repo = "Termux-Emon/EMovezon-Link";
const apiUrl = `https://api.github.com/repos/${repo}/contents/`;

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("movie-container").style.display = "block";
    loadMovies();
  }, 2000);
});

async function loadMovies() {
  try {
    const res = await fetch(apiUrl);
    const files = await res.json();

    const jsonFiles = files.filter(file => file.name.endsWith('.json'));
    const movieDiv = document.getElementById('movies');

    for (let file of jsonFiles) {
      const movieRes = await fetch(file.download_url);
      const movie = await movieRes.json();

      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <a href="${movie.download}" download>Download Now</a>
      `;
      movieDiv.appendChild(card);
    }
  } catch (error) {
    console.error("Error loading movies:", error);
    document.getElementById('movies').innerHTML = "<p>Failed to load movies.</p>";
  }
}
