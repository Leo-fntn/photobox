import photoloader from "./photoloader";
import index from "./index";

// Fonction pour ajouter un commentaire
function addComment(photoId, commentData) {
    photoloader.postComment(photoId, commentData)
        .then(response => {
            // Recharger les commentaires pour cette photo
            refreshComments(photoId);
            // Vider le formulaire
            document.getElementById('addCommentForm').reset();
        })
        .catch(error => {
            console.error('Erreur lors de l\'ajout du commentaire:', error.message);
            alert('Erreur lors de l\'ajout du commentaire');
        });
}

// Fonction pour rafraîchir les commentaires
function refreshComments(photoId) {
    index.getPicture(photoId);
}

export default {
    addComment,
    refreshComments
};