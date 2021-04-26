const url = 'http://localhost:3000/api/cameras';
//const url = 'https://ab-p5-api.herokuapp.com/api/cameras'
const recapPanier = document.querySelector('#tabPanier');
const listing = document.querySelector('#listing');
const imgLocal = localStorage.getItem('img');
const panierIndex = document.querySelector('#panier');
const titre = document.querySelector('#listecam');
const mainTitre = document.querySelector('#mainTitre');
const sousTitre = document.querySelector('#sousliste')
const catalogue = [];
const panier = [];
const lecture = JSON.parse(localStorage.getItem('catalogue'));
const nbAff = document.getElementById('nbArticle');
const localId = JSON.parse(localStorage.getItem('Panier'))
const total = document.getElementById('total');
const panierGlobal = document.querySelector('#recap');
const indexTotal = document.querySelector('#total');
let prix = 0;
const indexForm = document.getElementById('formulaire');

// récuprération liste des caméras et affichage / enregistrement dans le local storage
fetch(url)
    .then(function (data) {
        data.json().then(function (response) {
            for (r in response) {
                listing.innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text">' + response[r].description + '</p><div class="card-price">Prix : ' + response[r].price / 100 + ' € TTC</div><input type="number" name="quantite" value="1" min="1" id="choixQte' + [r] + '" class="w-25"><a href="#" class="achat btn btn-danger m-2 productCard" id="achat' + [r] + '">Acheter</a><a href="" class="btn btn-danger m-2 ' + response[r]._id + '">En Savoir Plus</a></div></div>'
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
    document.location.reload();
}

//affichage d'une alerte rajout au panier
/*function alertPanier(val) {
    mainTitre.innerHTML = '<div class="row z-index-3"><div class="col"><div class="alert alert-sucess alert-dismissible fade show" role="aler"><h5 class="alert-heading">Produit rajouter au panier<h5><div alert>'+val+'</div><button type="button" data-dismiss="alert">Continuer mes achats</button></div></div></div>';
}*/

// Promise Panier
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
    
    indexForm.classList.remove('d-none');

    let p1 = new Promise((resolve, reject) => {
        resolve(localId);
    })
    // Affichage des articles dans le panier
    p1.then(function () {
        for (i in localId) {
            let pos = panier.indexOf(localId[i].Ref);
            let indexPanier = ' ';

            indexPanier += '<table>'
            indexPanier += '<tr>'
            indexPanier += '<td id="idTab ' + pos + '"class="border border-dark text-center"><img class="text-left w-50" src="' + localId[i].image + '"></td>'
            indexPanier += '<td class="border border-dark text-center">' + localId[i].name + '</td>'
            indexPanier += '<td class="border border-dark text-center">' + localId[i].Quantite + ' <i id="trash" class="fas fa-trash-alt"></i></td>'
            indexPanier += '<td class="border border-dark text-right">' + localId[i].price + ' €</td>'
            indexPanier += '</tr>'
            indexPanier += '</table>'
            recapPanier.innerHTML += indexPanier;

            console.log(pos)
            supression(pos);
        }
    })
    //affichage du prix avec TVA dans le panier
        .then(function () {
            for (let r = 0; r < localId.length; r++) {
                prix += Number(localId[r].price);
            }
            indexTotal.classList.remove('d-none');
            let totalPanier = ' ';
            let prixHt = prix * 0.8
            let prixHtFinal = Math.round(prixHt * 100) / 100;
            let diffPrix = Math.round((prix - prixHtFinal) * 100) / 100;
            totalPanier += '<table>'
            totalPanier += '<tr class="col-12 d-flex flex-column">'
            totalPanier += '<td class="text-right border border-dark">Total HT: ' + prixHtFinal + ' €</td><td class="text-right border border-dark"> TVA 20% :' + diffPrix + ' €</td><td class="text-right border border-dark">Prix TTC: ' + prix + ' €</td>'
            totalPanier += '</tr>'
            totalPanier += '</table>'
            total.innerHTML += totalPanier;
        })
        //Affichage du formulaire
        .then(function () {
            indexForm.innerHTML = '<div class="col-6 d-flex flex-column"><label for="nom">Votre Nom : </label><input type="text" id="firstName" required> <label for="prenom"> Votre Prénom:</label><input type="text" id="lastName" required><label for="adresse">Adresse:</label><input type="text" id="address" required><label for="ville">Ville</label><input type="text" id="city" required><label for="email">E-mail</label><input type="email" required><input type="submit" id="validationForm"class="btn-success"></div>'
        })
        .catch(function () {
            panierGlobal.innerHTML = '<div class="text-center"><p>Aucun article dans votre panier</p></div>';

        });
}

// Suppresion d'une entrée du panier

function supression(val1) {
    let trash = document.getElementById('trash');
    trash.addEventListener('click', function (e) {
        e.preventDefault();
        let sup = localId.splice(val1)
        console.log(val1);
    })
};


//affichage du nombre d'articles présent dans le panier 
function nbArticle(val) {
    const nb = JSON.parse(localStorage.getItem('Panier'));

    let p1 = new Promise((resolve, reject) => {
        resolve(nb);
    });

    p1.then(
        function () {
            val.innerHTML = '<div>(' + nb.length + ' Article(s) dans votre panier)</div>'
        }).catch(
            function () {
                val.innerHTML = '<div>(Aucun article dans votre panier)</div>'
            })
};
nbArticle(nbAff);

//let adresseActuelle = window.location
//console.log(adresseActuelle);*/


