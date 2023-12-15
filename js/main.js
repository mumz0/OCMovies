const url = "http://localhost:8000/api/v1/titles/";
async function getBestMovie() {
    const sortByImdbScore = "?sort_by=-imdb_score"

    try {
        const response = await fetch(url + sortByImdbScore);
        const titlesData = await response.json();
        console.log(titlesData)
        if (titlesData) {
            const dataContainer = document.getElementById('data-container');
            const firstTitle = titlesData.results[0].title;
            dataContainer.innerHTML = `<p>${firstTitle}</p>`;
        }
    } catch (error) {
        return null;
    }
}

getBestMovie();