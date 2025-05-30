import config from "./config";
import index from "./index";
import lightbox from "./lightbox";

function displayGallery(gallery){
    // Créer l'élément de section
    const gallerySection = document.querySelector('section#galerie');
    gallerySection.innerHTML = ''; // Vider la section avant d'ajouter les images

    window.galerieImages = gallery;

    // Parcourir les photos
    gallery.forEach(image => {
        const img = document.createElement('img');
        img.src = config.url + image.photo.url.href;
        img.alt = image.photo.descr;
        img.dataset.photoId = image.photo.id; 
        img.addEventListener('click', function() {
            // Charger la photo dans la section dédiée
            index.getPicture(img.dataset.photoId);
            lightbox.openLightbox(img.dataset.photoId);
        });

        // Ajouter l'image à la section galerie
        gallerySection.appendChild(img);
    });

}

export default {
    displayGallery
}