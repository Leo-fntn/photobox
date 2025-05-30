import index from './index.js';
import config from './config.js';

var currentImageIndex = 0;

// Fonction pour ouvrir la lightbox
function openLightbox(imageIndex) {

    // on parcourt les images pour trouver la position de l'image à partir de son id
    window.galerieImages.forEach((image, index) => {
        // == car pas le même type (number et string)
        if (image.photo.id == imageIndex) {
            currentImageIndex = index;
        }
    }
    );

    const lightbox = document.getElementById('lightbox');
    
    // Charger l'image dans la lightbox
    loadImageInLightbox(currentImageIndex);
    
    // Afficher la lightbox
    lightbox.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll
}

// Fonction pour fermer la lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Réactiver le scroll
}

// Fonction pour charger une image dans la lightbox
function loadImageInLightbox(idPhoto) {
    const imageContainer = document.getElementById('lightbox-image-container');
    
    const imageData = window.galerieImages[idPhoto];

    // Insérer l'image dans le conteneur de la lightbox
    imageContainer.innerHTML = `<img src="${config.url}${imageData.photo.url.href}"/>`;

    index.getPicture(imageData.photo.id);
}

// Navigation dans la lightbox
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % window.galerieImages.length;
    loadImageInLightbox(currentImageIndex);
}

function prevImage() {
    currentImageIndex = currentImageIndex === 0 ? window.galerieImages.length - 1 : currentImageIndex - 1;
    loadImageInLightbox(currentImageIndex);
}


// Event listeners pour la lightbox
document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
document.getElementById('lightbox-next').addEventListener('click', nextImage);
document.getElementById('lightbox-prev').addEventListener('click', prevImage);

export default {
    openLightbox,
    closeLightbox,
    loadImageInLightbox,
    nextImage,
    prevImage
};