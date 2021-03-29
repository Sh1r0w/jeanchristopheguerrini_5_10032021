 const elt = document.querySelector(".listing");
const listing = [
    request
]

for (let retour of listing) {
    elt.innerHTML += '<div class="card"><img class="card-img-top" src="'+retour.imgUrl+'" alt="'+retour.name+'"><div class="card-body"><h5 class="card-title">'+retour.name+'</h5><p class="card-text">'+retour.description+'</p></div></div>';
}

 const { response } = require("express");

const listing = new Promise((resolve,reject) => {
    if(typeof request !== 'undefined') {
        resolve(request)
    }else{
        reject('ne fonctionne pas')
    }
});

fetch(url) .then(r => 
                for(let produits of Object.entries(r)){

                }
                    document.querySelector("#listing").innerHTML += produits.name;
 //                   
                
})
.catch(e =>{
    console.log(e);
})




 document.querySelector(".listing").innerHTML += '<div class="card"><img class="card-img-top" src="'+r[0].imgUrl+'" alt="'+r[0].name+'"><div class="card-body"><h5 class="card-title">'+r[0].name+'</h5><p class="card-text">'+r[0].description+'</p></div></div>';



function liste() {
    if (typeof request !== 'undefined') {
        let url = 'http://localhost:3000/api/cameras';
        fetch(url).then((response) => 
        response.json().then((data) =>{
            for (let produits of data) {
                let product = $produits.name;
            }
        })
        ).catch(err => console.log('erreur'));
        };
}

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/api/cameras', true);

// If specified, responseType must be empty string or "text"
xhr.responseType = 'text';

xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
//            document.querySelector('#listing').innerHTML = xhr.name;
        }
    }
};

xhr.send(null);

