const url = 'http://localhost:3000/api/cameras';
//const url = 'https://ab-p5-api.herokuapp.com/api/cameras'
const recapPanier = document.querySelector('#recap');
const panier = document.querySelector('#panier');
const listing = document.querySelector('#listing');
const imgLocal = localStorage.getItem('img');



// récuprération liste des caméras et affichage / enregistrement dans le local storage

fetch(url)
    .then(function (data) {
        data.json().then(function (response) {
            for (r in response) {
                listing.innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text">' + response[r].description + '</p><div class="card-price">Prix : ' + response[r].price + ' € TTC</div><a href="#" class="achat btn btn-danger m-2 productCard" id="' + [r] + '">Acheter</a><a href="" class="btn btn-danger m-2 ' + response[r]._id + '">En Savoir Plus</a></div></div>'
                
                for (let i = 0; i < response.length; i++) {
                    let response_json = JSON.stringify(response[i]);
                    localStorage.setItem(+[i], response_json);
                }

// lecture des cameras pour l'enregistrement dans le panier
                const achat = document.getElementById(+[r]);
                const lecture = JSON.parse(localStorage.getItem(+[r]));
                console.log(achat);
                let q = 1;             
                document.querySelectorAll('.achat').forEach(item => {
                    item.addEventListener('click', (event => {

                    console.log(achat)
                    let itemPanier = { name: lecture.name, price: lecture.price, image: lecture.imageUrl, quantité: q++ };
                    let itemPanier_json = JSON.stringify(itemPanier);
                    localStorage.setItem('p' + [r], itemPanier_json);
                }
                ))            
        })
    }
        })
    })

const retourPanier = new Promise((resolve, reject) => {
    panier.addEventListener('click', (event => {
        event.preventDefault();
        listing.classList.add('d-none');
        listing.classList.remove('d-inline-flex');
        for (let i in localStorage) {
            const localId = JSON.parse(localStorage.getItem(+[i]))
            recapPanier.innerHTML += '<div class=""><img class="card-img-top col-2" src="' + localId.imageUrl + '"><h5 class="card-title">' + localId.name + '</h5>'
            console.log(localId.name);
            console.log(localId);
        }
    }))
})
//let adresseActuelle = window.location
//console.log(adresseActuelle);