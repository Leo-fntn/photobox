import config from "./config.js"; 

function loadPicture(idPicture){
    return fetch(config.api + "/photos/" + idPicture, {
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erreur lors de la récupération de l'image : ${response.statusText}`);
            }
        }
        )
        .catch(error => {
            console.error(`${error.message}`)
        });
}

function loadRessource(uri){
    return fetch(config.url+uri,{
            credentials: 'include'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Erreur lors de la récupération de la ressource : ${response.statusText}`);
            }
        }
        )
        .catch(error => {
            console.error(`${error.message}`)
        });
}

function postComment(photoId, commentData) {
    return fetch(`${config.api}/photos/${photoId}/comments`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf8'
        },
        body: JSON.stringify(commentData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    });
}

// export 
export default {
    loadPicture,
    loadRessource,
    postComment
}
