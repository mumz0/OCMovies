export function displayModal(movieObj, elemClassName) {

    // Récupérer l'élément modal container
    const modal = document.getElementById('myModal');

    // Créer le contenu du modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal-container');

    const iconElement = document.createElement('i')
    iconElement.classList.add('fas', 'fa-sharp', 'fa-regular', 'fa-xmark');
    modalContainer.appendChild(iconElement);

    // Ajouter le titre du film au contenu du modal
    const titleElement = document.createElement('h1');
    titleElement.textContent = movieObj.title;
    modalContainer.appendChild(titleElement);

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const infosElement = document.createElement('div');
    infosElement.classList.add('movie-infos');
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    // Ajouter l'image du film au contenu du modal
    const imageElement = document.createElement('img');
    imageElement.src = movieObj.image_url;
    imageElement.alt = movieObj.title;
    imgContainer.appendChild(imageElement);

    // Ajouter le contenu du modal à la modal container
    modal.appendChild(modalContainer);

    const genreElement = document.createElement('h3');
    genreElement.textContent = `Genre: ${movieObj.genres.join(', ')}`;
    infosElement.appendChild(genreElement);

    const dateElement = document.createElement('h3');
    dateElement.textContent = `Date de parution: ${movieObj.date_published}`;
    infosElement.appendChild(dateElement);

    const ratedElement = document.createElement('h3');
    ratedElement.textContent = `Rated: ${movieObj.rated}`;
    infosElement.appendChild(ratedElement);
    
    const imdbScoreElement = document.createElement('h3');
    imdbScoreElement.textContent = `imdb score: ${movieObj.imdb_score}`;
    infosElement.appendChild(imdbScoreElement);
    
    const directorsElement = document.createElement('h3');
    directorsElement.textContent = `Réalisateur: ${movieObj.directors}`;
    infosElement.appendChild(directorsElement);

    const actorsElement = document.createElement('h3');
    actorsElement.textContent = `Acteurs: ${movieObj.actors.join(', ')}`;
    infosElement.appendChild(actorsElement);

    const durationElement = document.createElement('h3');
    durationElement.textContent = `Durée: ${movieObj.duration} min`;
    infosElement.appendChild(durationElement);

    const countriesElement = document.createElement('h3');
    countriesElement.textContent = `Pays: ${movieObj.countries}`;
    infosElement.appendChild(countriesElement);

    const boxOfficeElement = document.createElement('h3');
    if(movieObj.worldwide_gross_income == null){
        boxOfficeElement.textContent = `Resultat du box office : inconnu`;
    }
    else{
        boxOfficeElement.textContent = `Resultat du box office : ${movieObj.worldwide_gross_income}`;
    }
    infosElement.appendChild(boxOfficeElement);

    const descriptionElement = document.createElement('h3');
    descriptionElement.textContent = `Description: ${movieObj.description}`;
    infosElement.appendChild(descriptionElement);
    

    modalContent.appendChild(imgContainer);
    modalContent.appendChild(infosElement);
    modalContainer.appendChild(modalContent);
    
    // Afficher la modal
    modal.style.display = 'flex';

    // Ajouter un événement de clic sur la modal container pour la fermer
    iconElement.addEventListener('click', function() {
        // Vérifier si modalContent existe avant de le supprimer
        if (modalContainer && modalContainer.parentNode === modal) {
            modal.removeChild(modalContainer);
        }

        // Cacher la modal
        modal.style.display = 'none';

        // Supprimer la classe "active" de l'élément avec l'ID "movieImg"
        var elemToRemove = document.getElementById(elemClassName);
        if (elemToRemove) {
            elemToRemove.classList.remove("active");
        }
    });
}
