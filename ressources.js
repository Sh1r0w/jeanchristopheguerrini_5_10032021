const url = 'http://localhost:3000/api/cameras';
//const url = 'https://ab-p5-api.herokuapp.com/api/cameras'
const recapPanier = document.querySelector('#tabPanier');
const listing = document.querySelector('#listing');
const imgLocal = localStorage.getItem('img');
const panierIndex = document.querySelector('#panier');
const titre = document.querySelector('#listecam');
const sousTitre = document.querySelector('#sousliste')
const catalogue = [];
const panier = [];
const lecture = JSON.parse(localStorage.getItem('catalogue'));
const nbAff = document.getElementById('nbArticle');
const localId = JSON.parse(localStorage.getItem('Panier'))
const total = document.getElementById('total');
const panierGlobal = document.querySelector('#recap');
const indexTotal = document.querySelector('#total');

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
                    document.location.reload();
                })
            }

            // affichage du panier
            panierIndex.addEventListener('click', (event => {
                event.preventDefault();
                listingPanier();
            }))

        })
    })

// Formulaire du panier
function formulaire(val) {
    let choixQte = document.getElementById('choixQte' + val).value
    let formulaire = {
        Ref: lecture[val]._id,
        name: lecture[val].name,
        price: lecture[val].price * choixQte / 100,
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
    titre.innerHTML = 'Mon Panier';
    listing.classList.add('d-none');
    listing.classList.remove('d-inline-flex');
    panierGlobal.classList.remove('d-none');
    panierIndex.classList.add('d-none');
    console.log(localId)
    if (localId != null) {

        for (i in localId) {

            let indexPanier = ' ';

            indexPanier += '<table>'
            indexPanier += '<tr>'
            indexPanier += '<td class="border border-dark text-center"><img class="text-left w-50" src="' + localId[i].image + '"></td>'
            indexPanier += '<td class="border border-dark text-center">' + localId[i].name + '</td>'
            indexPanier += '<td class="border border-dark text-center">' + localId[i].Quantite + '</td>'
            indexPanier += '<td class="border border-dark text-right">' + localId[i].price + ' €</td>'
            indexPanier += '</tr>'
            indexPanier += '</table>'
            recapPanier.innerHTML += indexPanier;

        }

    } else {
        panierGlobal.innerHTML = '<div class="text-center"><p>Aucun article dans votre panier</p></div>'

    }
    nbArticle(sousTitre);
    formAddress()
    totalPrice()
}


function totalPrice() {
    let prix = 0;

    if (localId != null) {
        for(let r = 0; r <  localId.length; r++){
            prix += Number(localId[r].price);
            console.log(prix)
        }
        indexTotal.classList.remove('d-none');
        let totalPanier = ' ';
        let prixHt = prix / 1.2
        let prixHtFinal = Math.round(prixHt * 100) / 100;
        totalPanier += '<table>'
        totalPanier += '<tr class="col-12 d-flex flex-column">'
        totalPanier += '<td class="text-right border border-dark">Total HT ' + prixHtFinal + '€</td><td class="text-right border border-dark"> TVA: 20%</td><td class="text-right border border-dark">Prix TTC: ' + prix + '€</td>'
        totalPanier += '</tr>'
        totalPanier += '</table>'
        total.innerHTML += totalPanier;
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

// Formulaire d'inscription pour la commande
//Affichage du formulaire

function formAddress() {
    let indexForm = document.getElementById('formulaire');
    indexForm.classList.remove('d-none');
    if (localId != null) {
        indexForm.innerHTML = '<div class="col-6 d-flex flex-column"><label for="nom">Votre Nom : </label><input type="text" id="firstName" required> <label for="prenom"> Votre Prénom:</label><input type="text" id="lastName" required><label for="adresse">Adresse:</label><input type="text" id="address" required><label for="ville">Ville</label><input type="text" id="city" required><label for="email">E-mail</label><input type="email" required><input type="submit" id="validationForm"class="btn-success"></div>'
    } else {
        indexForm.classList.add('d-none');
    }
}
//let adresseActuelle = window.location
//console.log(adresseActuelle);*/