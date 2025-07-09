window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("movie-container").style.display = "block";
  }, 2000); // 2s delay
});

fetch('movies.json')
  .then(response => response.json())
  .then(data => {
    const movieDiv = document.getElementById('movies');
    data.forEach(movie => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${movie.type}</p>
        <a href="${movie.link}" download>Download Now</a>
      `;
      movieDiv.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error loading movies:", error);
  });
