import photoloader from "./photoloader";

var prev;
var next;
var first;
var last;

function load(uri){
    // On charge la ressource
    return photoloader.loadRessource(uri)
        .then((ressource) => {
            // on récupère les liens vers les autres galeries : 
            prev = ressource.links.prev.href;
            next = ressource.links.next.href;
            first = ressource.links.first.href;
            last = ressource.links.last.href;
            document.querySelector('#btnFirst').disabled = false;
            document.querySelector('#btnLast').disabled = false;

            // on retire l'affichage de la photo actuelle
            document.querySelector("section#la_photo").innerHTML = '';

            // on fait des changements si on est déjà sur la première/dernière page
            switch (uri) {
                case first:
                    prev = last;
                    document.querySelector('#btnFirst').disabled = true;
                    break;
                case last:
                    next = first;
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
    if (prev) {
        return load(prev);
    }
}

function next(){
    if (next) {
        return load(next);
    }
}

function first(){
    if (first) {
        return load(first);
    }
}

function last(){
    if (last) {
        return load(last);
    }
}

export default {
    load,
    prev,
    next,
    first,
    last
}