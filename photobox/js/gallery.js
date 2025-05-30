import photoloader from "./photoloader";

var prevGallery;
var nextGallery;
var firstGallery;
var lastGallery;


function load(uri){
    // On charge la ressource
    return photoloader.loadRessource(uri)
        .then((ressource) => {
            // on récupère les liens vers les autres galeries : 
            prevGallery = ressource.links.prev.href;
            nextGallery = ressource.links.next.href;
            firstGallery = ressource.links.first.href;
            lastGallery = ressource.links.last.href;
            document.querySelector('#btnFirst').disabled = false;
            document.querySelector('#btnLast').disabled = false;

            // on retire l'affichage de la photo actuelle
            document.querySelector("section#la_photo").innerHTML = '';

            // on fait des changements si on est déjà sur la première/dernière page
            switch (uri) {
                case firstGallery:
                    prevGallery = lastGallery;
                    document.querySelector('#btnFirst').disabled = true;
                    break;
                case lastGallery:
                    nextGallery = firstGallery;
                    document.querySelector('#btnLast').disabled = true;
                    break;
                default:
                    break;
            }

            // on récupère les promesses de chaque photo
            const promesses = ressource.photos.map((photo) => {
                link = photo.links.self.href;
                return photoloader.loadRessource(link);
            });

            // on retourne une promesse avec le tableau quand toutes les promesses sont résolues
            return Promise.all(promesses);
        })
        .then((photos) => {
            // on retourne le tableau de photos
            return photos;
        })
        .catch((error) => {
            console.error(`Erreur lors de la récupération de la ressource : ${error.message}`);
            return [];
        });
}

function prev(){
    if (prevGallery) {
        return load(prevGallery);
    }
}

function next(){
    if (nextGallery) {
        return load(nextGallery);
    }
}

function first(){
    if (firstGallery) {
        return load(firstGallery);
    }
}

function last(){
    if (lastGallery) {
        return load(lastGallery);
    }
}

export default {
    load,
    prev,
    next,
    first,
    last
}