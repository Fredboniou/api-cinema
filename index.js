const movies = document.getElementById("movie");
const form = document.querySelector("form");
const input = document.querySelector("input");
const message = document.getElementById("message");
let list = [];

const fetchMovies = (movieName) => {
    fetch("https://api.themoviedb.org/3/search/movie?api_key=56bd8cfb16dcf2913f9bb1e55b8acf9a&query=" + movieName + "&language=fr-FR")
    .then(response => response.json())
    .then(movieData => list = (movieData.results));
    console.log(list);
}

const movieDisplay = () => {
    const dateDisplay = (originalDate) => {
        if (originalDate != "") {
            let [yy, mm, dd] = originalDate.split("-");
            return [dd, mm, yy].join("/");
        } else {
            return "Non renseignée";
        }
    };

    const typeMovie = (movieName) => {
        let typeArray = [];
        for (let i = 0; i < movieName.genre_ids.length; i++) {
            switch (movieName.genre_ids[i]) {
                case 28 :
                    typeArray.push("Action");
                    break;

                case 12 :
                    typeArray.push("Aventure");
                    break;

                case 16 :
                    typeArray.push("Animation");
                    break;

                case 35 :
                    typeArray.push("Comédie");
                    break;

                case 80 :
                    typeArray.push("Crime");
                    break;

                case 99 :
                    typeArray.push("Documentaire");
                    break;

                case 18 :
                    typeArray.push("Drame");
                    break;

                case 10751 :
                    typeArray.push("Familial");
                    break;

                case 14 :
                    typeArray.push("Fantastique");
                    break;

                case 36 :
                    typeArray.push("Histoire");
                    break;

                case 27 :
                    typeArray.push("Horreur");
                    break;

                case 10402 :
                    typeArray.push("Musique");
                    break;

                case 9648 :
                    typeArray.push("Mystère");
                    break;

                case 10749 :
                    typeArray.push("Romance");
                    break;

                case 878 :
                    typeArray.push("Science-Fiction");
                    break;

                case 10770 :
                    typeArray.push("Téléfilm");
                    break;

                case 53 :
                    typeArray.push("Thriller");
                    break;

                case 10759 :
                    typeArray.push("Guerre");
                    break;

                case 37 :
                    typeArray.push("Western");
                    break;
            }
        }
        return typeArray.map((type) => `${type}`).join(" / ");
    }

    if (list.length == 0 || input.value == "" || list == undefined) {
        message.remove();
        movies.innerHTML = "<h2>Aucun film ne correspond à votre recherche</h2>"
    } else {
        console.log(list);
        message.remove();
        movies.innerHTML = list.map((movie) => {
            if (movie.poster_path != null && movie.release_date != "") {
                return `
                <li class="card">
                <h2>${movie.title}</h2>
                <div class="pic">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="photo ${movie.title}">
                </div>
                <p class="type">${typeMovie(movie)}</p>
                <p class="description">${movie.overview}</p>
                <p class="average">${movie.vote_average}/10 ⭐</p>
                <p class="release">Date de sortie : ${dateDisplay(movie.release_date)}</p>
                </li>`
            } else {
                return `
                <li class="card">
                <h2>${movie.title}</h2>
                <p>Visuel indisponible</p>
                <p class="type">${typeMovie(movie)}</p>
                <p class="description">${movie.overview}</p>
                <p class="average">${movie.vote_average}/10 ⭐</p>
                <p class="release">Date de sortie : inconnue</p>
                </li>`

            }
        }).join("");
    }
}


input.addEventListener("keyup", (e) => {
    fetchMovies(e.target.value);
    movieDisplay();
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    movieDisplay();
});