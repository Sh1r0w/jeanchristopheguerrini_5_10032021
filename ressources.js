const url = 'http://localhost:3000/api/cameras';
//const url = 'https://ab-p5-api.herokuapp.com/api/cameras'
const recapPanier = document.querySelector('#recap');
const listing = document.querySelector('#listing');
const imgLocal = localStorage.getItem('img');
const panierIndex = document.querySelector('#panier');
const titre = document.querySelector('#listecam');
const sousTitre = document.querySelector('#sousliste')
const catalogue = [];
const panier = [];
const lecture = JSON.parse(localStorage.getItem('catalogue'));
const nbAff = document.getElementById('nbArticle');
//const lecturePanier = JSON.parse(localStorage.getItem('panier'));

// récuprération liste des caméras et affichage / enregistrement dans le local storage
fetch(url)
    .then(function (data) {
        data.json().then(function (response) {
            for (r in response) {
                listing.innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text">' + response[r].description + '</p><div class="card-price">Prix : ' + response[r].price / 100 + ' € TTC</div><input type="number" name="quantite" value="1" min="1" id="choixQte' + [r] + '"><a href="#" class="achat btn btn-danger m-2 productCard" id="achat' + [r] + '">Acheter</a><a href="" class="btn btn-danger m-2 ' + response[r]._id + '">En Savoir Plus</a></div></div>'
            }

            // catalogue.push(JSON.stringify(response));
            localStorage.setItem('catalogue', JSON.stringify(response));

//----------------------------------------------------------------- Panier -----------------------------------------

            // enregistrement dans le panier
            for (r in response) {
                let index = r
                const achat = document.getElementById('achat' + [r]);
                achat.addEventListener('click', function () {
                    formulaire(index);
                    console.log(index)
                })
            }

            // affichage du panier
            panierIndex.addEventListener('click', (event => {
                event.preventDefault();
                listing.classList.add('d-none');
                listing.classList.remove('d-inline-flex');
                panierIndex.classList.add('d-none');
                listingPanier();
                titre.innerHTML = 'Mon Panier';
                nbArticle(sousTitre);
            }))

        })
    })

// Formulaire du panier
function formulaire(val) {
    let choixQte = document.getElementById('choixQte' + val).value
    let formulaire = {
        Ref: lecture[val]._id,
        name: lecture[val].name,
        price: lecture[val].price / 100,
        image: lecture[val].imageUrl,
        Quantite: choixQte,
    };
    qte(formulaire);
}

// initialisation du panier
function basketInit(formulaire) {
    let basket = localStorage.getItem('Panier');
    if (basket != null) {
        return JSON.parse(basket);
    } else {
        return [];
    }
}

// vérification de présence dans le panier
function qte(formulaire) {
    let valeur = formulaire.Ref;
    let basket = localStorage.getItem('Panier');
    nbBasket = parseInt(formulaire);
    if (basket != null && localStorage.getItem('Panier').indexOf(valeur) != -1) {
        console.log('deja dans le tableau')

    } else {
        console.log('crée un nouvelle entrée')
        addToBasket(formulaire);
    }
}

// push au panier
function addToBasket(product) {
    let basket = basketInit();
    basket.push(product);
    saveBasket(basket);
}

// ajout au panier
function saveBasket(basket) {
    localStorage.setItem('Panier', JSON.stringify(basket));
}

// affichage des produits dans le panier
function listingPanier() {
    const recapPanier = document.querySelector('#recap');
    const localId = JSON.parse(localStorage.getItem('Panier'))
    console.log(localId)
    if (localId != null) {
        for (i in localId) {
            recapPanier.innerHTML += '<div class=""><img class="card-img-top col-2" src="' + localId[i].image + '"><h5 class="card-title">' + localId[i].name + '</h5>'
        }
    } else {
        recapPanier.innerHTML = '<div class=""><p>Aucun article dans votre panier</p></div>'
    }
}


//affichage des articles présent dans le panier Sous Mon Panier
function nbArticle(val) {

    const nb = JSON.parse(localStorage.getItem('Panier'));
    if (nb != null) {
        val.innerHTML = '<div>(' + nb.length + ' Article(s) dans votre panier)</div>'
    } else {
    }
}
nbArticle(nbAff);



//let adresseActuelle = window.location
//console.log(adresseActuelle);*/