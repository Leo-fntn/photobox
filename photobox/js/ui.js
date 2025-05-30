import Handlebars from 'handlebars';
import config from './config.js';

function displayPicture(photo){
    // charger et compiler le template 
    const photoTemplate = document.querySelector('#photoTemplate').innerHTML;
    const template = Handlebars.compile(photoTemplate);

    photo.url.href = config.url + photo.url.href;

    // générer et insérer le fragment html
    document.querySelector("section#la_photo")
        .innerHTML = template({ photo });
}

function displayCategorie(categorie){
    categorie.then((categorie) => {
        // charger et compiler le template 
        const categorieTemplate = document.querySelector('#categorieTemplate').innerHTML;
        const template = Handlebars.compile(categorieTemplate);

        // générer et insérer le fragment html
        document.querySelector("section #la_categorie")
            .innerHTML = template({ categorie });
    });
}

function displayCommentaires(comments){
    comments.then((comments) => {
        // charger et compiler le template 
        const commentsTemplate = document.querySelector('#commentairesTemplate').innerHTML;
        const template = Handlebars.compile(commentsTemplate);

        // générer et insérer le fragment html
        document.querySelector("section #les_commentaires")
            .innerHTML = template({ comments });
    });
}


export default {
    displayPicture,
    displayCategorie,
    displayCommentaires
}