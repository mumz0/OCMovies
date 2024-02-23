import * as api from "./api.js";
import * as display from "./ui/home.js";

async function loadBestMovie() {
    try {
        const data = await api.getBestMovie();
        display.bestMovie(data);
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération du meilleur film:", error);
    }
}


async function loadCarousels() {
    try {
        const BestMoviesdata = await api.getBestRankedMovies();
        if (BestMoviesdata) {
            display.carousel(BestMoviesdata, "Films les mieux notés");
        }

        const data = await api.getRandomTypes();
        if (data) {
            let type = 0;
            for (let i = 0; i < data.length; i++) {
                if (type === 3) {
                    break;
                } else {
                    const dataByType = await getMoviesByType(data[i].name);
                    if (dataByType !== null) {
                        type += 1;
                        display.carousel(dataByType, data[i].name);
                    }
                }
            }
        }
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des meilleurs films :", error);
    }
}


async function getMoviesByType(type) {
    try {
        const movies = await api.getMovies(type);
        if(movies.count >= 7){
            return movies
        } else 
        return null
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des films par type:", error);
    }
}


loadBestMovie();
loadCarousels();