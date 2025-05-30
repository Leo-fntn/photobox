import photoloader from "./photoloader.js";
import ui from "./ui.js";
import gallery from "./gallery.js";
import gallery_ui from "./gallery_ui.js";
import comments from "./comments.js";

function getPicture(idPicture) {
    photoloader.loadPicture(idPicture)
        .then(picture => {
            ui.displayPicture(picture.photo);
            ui.displayCategorie(getCategorie(picture));
            ui.displayCommentaires(getCommentaires(picture));
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de l'image : ${error.message}`);
        });
}

function getCategorie(picture){
    return photoloader.loadRessource(picture.links.categorie.href)
        .then(categorie => {
            return categorie.categorie;
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de l'image : ${error.message}`);
        });
}

function getCommentaires(picture) {
    return photoloader.loadRessource(picture.links.comments.href)
        .then(comments => {
            return comments.comments;
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de l'image : ${error.message}`);
        });
}

function getGallery(url){
    gallery.load(url)
        .then(galerie => {
            gallery_ui.displayGallery(galerie);
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de la galerie : ${error.message}`);
        });
}

// getPicture(105);

// getPicture(window.location.hash ? window.location.hash.substr(1): 105);

document.querySelector('#btnLoad').addEventListener('click', function() {
    getGallery("/www/canals5/phox/api/photos/?page=1&size=10");
});

document.querySelector('#btnNext').addEventListener('click', function() {
    gallery.next()
        .then(galerie => {
            gallery_ui.displayGallery(galerie);
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de la galerie suivante : ${error.message}`);
        });
});

document.querySelector('#btnPrev').addEventListener('click', function() {
    gallery.prev()
        .then(galerie => {
            gallery_ui.displayGallery(galerie);
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de la galerie précédente : ${error.message}`);
        });
});

document.querySelector('#btnFirst').addEventListener('click', function() {
    gallery.first()
        .then(galerie => {
            gallery_ui.displayGallery(galerie);
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de la première galerie : ${error.message}`);
        });
});

document.querySelector('#btnLast').addEventListener('click', function() {
    gallery.last()
        .then(galerie => {
            gallery_ui.displayGallery(galerie);
        })
        .catch(error => {
            console.error(`Erreur lors de l'affichage de la dernière galerie : ${error.message}`);
        });
});


document.addEventListener('submit', function(e) {
    if (e.target.id === 'addCommentForm') {
        e.preventDefault();

        const photoId = e.target.dataset.photoId;

        const commentData = {
            pseudo: document.querySelector('#commentPseudo').value,
            titre: document.querySelector('#commentTitle').value,
            content: document.querySelector('#commentContent').value
        };
        
        comments.addComment(photoId, commentData);
    }
});


export default {
    getPicture
};