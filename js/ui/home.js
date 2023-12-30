import * as modal from "./modal.js";
import * as api from "../api.js";

export function bestMovie(titlesData) {
    if (titlesData && titlesData.results && titlesData.results.length > 0) {
        const dataContainer = document.getElementById('best-movie-container');
        const movieInfos = document.createElement('div');
        movieInfos.className = "movie-infos";
        dataContainer.appendChild(movieInfos);

        const movieTitlePlay = document.createElement('div');
        movieTitlePlay.className = "title-and-button-container";
        movieInfos.appendChild(movieTitlePlay);

        const movieTitle = document.createElement('p');
        movieTitle.textContent = titlesData.results[0].title;
        movieTitlePlay.appendChild(movieTitle);

        const playButton = document.createElement('button');
        playButton.className = "play-button";
        playButton.textContent = "Play";
        playButton.addEventListener("click", () =>
        handleMovieImgClick(playButton, titlesData.results[0].id));
        movieTitlePlay.appendChild(playButton);

        const movieImg = document.createElement('img');
        movieImg.src = titlesData.results[0].image_url;
        movieImg.alt = "Best movie";
        movieInfos.appendChild(movieImg);
    }
}

export function carousel(data, type) {
    if (!data.results || data.results.length === 0) return;

    const dataContainer = document.getElementById('carousel-containers');
    const movie = document.createElement('div');
    movie.className = `type-container`;
    dataContainer.appendChild(movie);

    const movieTitle = document.createElement('h1');
    movieTitle.textContent = type;
    movie.appendChild(movieTitle);

    const carouselContainer = document.createElement('div');
    carouselContainer.className = "carousel-container";

    let currentItem = 0;

    const previousButton = createButton('fa-left-long', () => {
        if (currentItem > 0) {
            currentItem = updateCarousel(data, currentItem - 1, carouselData, previousButton, nextButton);
        }
    });

    const carouselData = document.createElement('div');
    carouselData.className = "carousel-data";
    carouselContainer.appendChild(previousButton);
    carouselContainer.appendChild(carouselData);

    const nextButton = createButton('fa-right-long', () => {
        if (currentItem + 4 < data.results.length) {
            currentItem = updateCarousel(data, currentItem + 1, carouselData, previousButton, nextButton);
        }
    });

    updateCarousel(data, currentItem, carouselData, previousButton, nextButton);

    movie.appendChild(carouselContainer);
    carouselContainer.appendChild(nextButton);
}

function updateCarousel(data, currentItem, container, previousButton, nextButton) {
    if (currentItem < 0) currentItem = 0;

    container.innerHTML = '';
    for (let i = currentItem; i < currentItem + 4 && i < data.results.length; i++) {
        const movieImg = createImage('movieImg', data.results[i].image_url, data.results[i].title);

        movieImg.addEventListener("click", () =>
            handleMovieImgClick(movieImg, data.results[i].id));

        container.appendChild(movieImg);
    }

    // Disable buttons based on visibility of the first and last items
    previousButton.disabled = currentItem === 0;
    nextButton.disabled = currentItem + 4 >= data.results.length;

    return currentItem;
}

async function handleMovieImgClick(elem, movieId) {
    elem.classList.add("active");
    var result = await api.getMovieDetails(movieId)
    modal.displayModal(result, elem.className);
}



function createButton(iconClass, clickHandler) {
    const iconButton = document.createElement('i');
    iconButton.classList.add('fa-sharp', 'fa-solid', iconClass);
    iconButton.style.cursor = 'pointer';
    iconButton.addEventListener('click', clickHandler);
    return iconButton;
}



function createImage(className, src, alt) {
    const image = document.createElement('img');
    image.className = className;
    image.src = src;
    image.alt = alt;
    return image;
}






