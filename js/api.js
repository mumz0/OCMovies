import * as utils from "./utils.js";

const title_url = "http://localhost:8000/api/v1/titles/";
const type_url = "http://localhost:8000/api/v1/genres/";
const sortByImdbScore = "sort_by=-imdb_score";
const movieType = "genre=";

let allItems = [];

export async function getBestMovie() {
    try {
        const response = await fetch(title_url + "?" + sortByImdbScore);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function getMovies(type) {
    try {
        const response = await fetch(title_url + "?" + movieType + type + "&" + sortByImdbScore + "&page_size=7");
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function getBestRankedMovies() {
    try {
        const response = await fetch(title_url + "?" + sortByImdbScore + "&page_size=7");
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}

export async function getRandomTypes() {
    try {
        const allItems = await fetchPage(type_url);

        if (allItems) {
            const result = utils.getRandomElements(allItems);
            return result;
        }
    } catch (error) {
        console.error("Une erreur est survenue lors de la récupération des genres:", error);
        throw error;
    }
}

export async function fetchPage(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        allItems = allItems.concat(data.results);

        if (data.next) {
            await fetchPage(data.next);
        }

        return allItems;
    } catch (error) {
        console.error("Error fetching page:", error);
        throw error;
    }
}

export async function getMovieDetails(id) {
    try {
        const response = await fetch(title_url + id);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
}