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
const productPage = document.getElementById('pageProduct');
const popAlerte = document.getElementById('alerte');

// récuprération liste des caméras et affichage / enregistrement dans le local storage
fetch(url)
    .then(function (data) {
        data.json()
        .then(function (response) {
            for (r in response) {
                let pr = response[r].price /100
                let price = pr.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
                listing.innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text text-truncate">' + response[r].description + '</p><div class="card-price">Prix : ' + price + ' TTC</div><select class="col-10" list="lensesOptions" id="lensesOptionsC'+[r]+'""></select><input type="number" name="quantite" value="1" min="1" id="choixQte' + [r] + '" class="w-25 text-center"><a href="#" class="achat btn btn-danger m-2 productCard" id="achat' + [r] + '">Acheter</a><a href="" class="btn btn-danger m-2" id="product' + [r] + '">En Savoir Plus</a></div></div>'

                for (let i = 0; i < response[r].lenses.length; i++) {
                    let index = r
                    const indexLenses = document.getElementById('lensesOptionsC'+[r]);
                    indexLenses.innerHTML += '<option valeur="' + i + '">' + response[index].lenses[i] + '</option>';
                }
            }
            
            addEvent(response);
            localStorage.setItem('catalogue', JSON.stringify(response));
        })
            //----------------------------------------------------------------- Panier -----------------------------------------
         .catch(function(){
        console.error("Erreur l26")
        })
    })

function addEvent(val) {
    let p1 = new Promise((resolve, reject) =>{
        resolve(val)
    })
        p1.then(function(){
            // enregistrement dans le panier
            for (r in val) {
                let index = r
                const achat = document.getElementById('achat' + [r]);
                achat.addEventListener('click', function (e) {
                    let choixQte2 = document.getElementById('choixQte'+ index).value
                    let choixLen1 = document.getElementById('lensesOptionsC'+ index).value
                    console.log(choixQte2)
                    console.log(index)
                    let choixQte = choixQte2
                    e.preventDefault();
                    formulaire(index, choixQte2, choixLen1);
                    alertPanier(index, choixLen1)
                });
            }
        })
        .catch(function(){
            console.error('Erreur l48')
        })
        .then(function(){
            // affichage page produit
            for (r in val) {
                let index = r;
                const productPage = document.getElementById('product' + [r]);
                productPage.addEventListener('click', function (e) {
                    e.preventDefault();
                    pageProduct(index)
                })
            }
        })
        .catch(function(){
            console.error('Erreur l65')
        })
        .then(function(){
            // affichage du panier
            panierIndex.addEventListener('click', (event => {
                event.preventDefault();
                listingPanier();
            }))
        })
        .catch(function(){
            console.error('Erreur l79')
        })
        }
    
// Affichage page produit Promise

function pageProduct(val) {
    let id = document.getElementById('product' + val);
    listing.classList.add('d-none');
    listing.classList.remove('d-inline-flex');
    productPage.classList.add('d-inline-flex');
    productPage.classList.remove('d-none');

    let p1 = new Promise((resolve, reject) => {
        resolve(id)
    })
    p1.then(function () {
        
        let index = val;
        let pageHash = location.hash;
        console.log(pageHash)
        for (r in lecture) {
            location.hash = lecture[val].name;
            
            if (r === index) {
                titre.innerHTML = lecture[index].name;
                let pr = lecture[index].price /100
                let price = pr.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
                let indexProduct = "";
                indexProduct += '<div id="productImg" class="col-12 d-inline-flex position-relative justify-content-end">'
                indexProduct += '<div class=" text-left"><img src="' + lecture[index].imageUrl + '" alt="' + lecture[index].imageUrl + '" class="col-6"></div>'
                indexProduct += '<div class="col-3 flex-column text-right"><h1>' + lecture[index].name + '</h1><p>' + price + '</p><label for="lensesChoice">Choix de votre Lentilles :</label><select list="lensesOptions" id="lensesOptions" class="col-10"></select><input type="number" name="quantite" value="1" min="1" id="choixQte1' + [index] + '" class="w-25 text-center m-2"><a href="#" class="col-5 achat btn btn-danger m-2 productCard" id="achatP' + [index] + '">Acheter</a></div>'
                indexProduct += '</div>'
                indexProduct += '<div id="productDesc" class="m-5">'
                indexProduct += '<div><h3>Description du '+lecture[index].name+'</h3></div>'
                indexProduct += '<div><p>'+lecture[index].description+'</p></div>'
                indexProduct += '</div>'
                productPage.innerHTML += indexProduct;

                for (let i = 0; i < lecture[val].lenses.length; i++) {
                    const indexLenses = document.getElementById('lensesOptions');
                    console.log(indexLenses)
                    indexLenses.innerHTML += '<option valeur="' + i + '">' + lecture[val].lenses[i] + '</option>';
                }
            }
        }
    })
    .then(function(){
        for (r in lecture) {
            if(val === r){
            const achatP = document.getElementById('achatP' + val);
            console.log(achatP)
            achatP.addEventListener('click', function (e) {
                let choixQte1 = document.getElementById('choixQte1' + [val]).value
                let choixLen1 = document.getElementById('lensesOptions').value
                console.log(choixLen1)
                e.preventDefault();
                formulaire(val, choixQte1, choixLen1);
                console.log(val)
                
            });
        }
    }
    })
        .catch(function () {
            console.log('pas encore d id défini')
        });
}

// Formulaire d'enregistrement local du panier
function formulaire(val1, val2, val3) {
    let choixQte = val2
    let formulaire = {
        ref: lecture[val1]._id,
        lentille: val3,
        name: lecture[val1].name,
        price: lecture[val1].price * choixQte / 100,
        image: lecture[val1].imageUrl,
        quantite: choixQte,
    };
    qteP(formulaire);
    qte(formulaire);
}

// initialisation du panier
function basketInit() {
    let basket = localStorage.getItem('Panier');
    if (basket != null) {
        return JSON.parse(basket);
    } else {
        return [];
    }
}

// vérification de présence dans le panier
function qteP(formulaire) {
    let valeur1 = formulaire.quantite;
    let valeur = formulaire.ref;
    let basket = localStorage.getItem('Panier');
    if (basket != null && localStorage.getItem('Panier').indexOf(valeur) != -1 && localStorage.getItem('Panier').indexOf(valeur1) != -1) {
        console.log('deja dans le tableau')
        addToBasket(formulaire);
        setTimeout('supp(i)', 500);
    } else {
        console.log('crée un nouvelle entrée')
        addToBasket(formulaire);

    }
}

// vérification de présence dans le panier
function qte(formulaire) {
    let valeur1 = formulaire.lentille;
    let valeur = formulaire.ref;
    let basket = localStorage.getItem('Panier');
    if (basket != null && localStorage.getItem('Panier').indexOf(valeur) != -1 && localStorage.getItem('Panier').indexOf(valeur1) != -1) {
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
    //document.location.reload();
}

//affichage d'une alerte rajout au panier
function alertPanier(val, val1) {
    for(r in lecture){
    popAlerte.innerHTML = '<div class="row z-index-3"><div class="col"><div class="alert alert-sucess alert-dismissible fade show" role="aler"><h5 class="alert-heading">Produit rajouter au panier<h5><div alert>'+lecture[val].name+' Avec lentille de '+ val1+'</div><button type="button" data-dismiss="alert">Continuer mes achats</button></div></div></div>';
}
}

// Promise Panier
function saveBasket(basket) {
    localStorage.setItem('Panier', JSON.stringify(basket));

}

// affichage des produits dans le panier Promise

function listingPanier() {
    titre.innerHTML = 'Mon Panier';
    listing.classList.add('d-none');
    productPage.classList.add('d-none');
    productPage.classList.remove('d-inline-flex');
    listing.classList.remove('d-inline-flex');
    panierGlobal.classList.remove('d-none');
    panierIndex.classList.add('d-none');
    indexForm.classList.remove('d-none');
    location.hash = "panier";
    let p1 = new Promise((resolve, reject) => {
        resolve(localId);
    })
    // Affichage des articles dans le panier
    p1.then(function () {
        for (i in localId) {
            let pr = localId[i].price
            let price = pr.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
            let indexPanier = ' ';

            indexPanier += '<table>'
            indexPanier += '<tr>'
            indexPanier += '<td id="idTab ' + localId[i].ref + '"class="border border-dark text-center"><img class="text-left w-50" src="' + localId[i].image + '"></td>'
            indexPanier += '<td class="border border-dark text-center">' + localId[i].name + ' avec lentille ' +localId[i].lentille+'</td>'
            indexPanier += '<td class="border border-dark text-center"><input type="number" name="quantite" value="' + localId[i].quantite + '" min="1" id="choixQteP' + [i] + '" class="w-25 text-center m-2"><i id="trash' + localId[i].ref + '" class="fas fa-trash-alt"></i></td>'
            indexPanier += '<td class="border border-dark text-right">' + price + '</td>'
            indexPanier += '</tr>'
            indexPanier += '</table>'
            recapPanier.innerHTML += indexPanier;
        }
    })
    //modification de quantité panier
    .then(function(){
        for (i in localId){
            let index = i;
            let indexModif = document.getElementById('choixQteP' + [i])
            let indexModifValue = document.getElementById('choixQteP' + [i]).value
        let lentille = localId[i].lentille
        indexModif.addEventListener('change', function(){ 
            const result = lecture.filter(item => item.ref === localId[index].ref)[0]
            let id = lecture.indexOf(result);
            //formulaire(i, indexModifValue, lentille);
            console.log(result, indexModif.value, lentille)
            console.log(lecture)
        })
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
            let priceDif = diffPrix.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
            let priceHT = prixHtFinal.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
            let price = prix.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
            totalPanier += '<table class="col-4">'
            totalPanier += '<tr class="col-12 d-flex flex-column">'
            totalPanier += '<td class="text-right border border-dark">Total HT: ' + priceHT + '</td><td class="text-right border border-dark"> TVA 20% :' + priceDif + '</td><td class="text-right border border-dark">Prix TTC: ' + price + ' </td>'
            totalPanier += '</tr>'
            totalPanier += '</table>'
            total.innerHTML += totalPanier;
        })
        //Affichage du formulaire
        .then(function () {
            indexForm.innerHTML = '<div class="col-6 d-flex flex-column"><label for="nom">Votre Nom : </label><input type="text" id="firstName" required> <label for="prenom"> Votre Prénom:</label><input type="text" id="lastName" required><label for="adresse">Adresse:</label><input type="text" id="address" required><label for="ville">Ville</label><input type="text" id="city" required><label for="email">E-mail</label><input type="email" required><input type="submit" id="validationForm"class="btn-success"></div>'
        })
        // Suppresion d'une entrée du panier
        .then(function () {
            for (let r = 0; r < localId.length; r++) {
                let index = r
                let indexTrash = document.getElementById('trash' + localId[index].ref);
                     indexTrash.addEventListener('click', function () {
                      supp(index)
               })
            }
        })

        .catch(function () {
            panierGlobal.innerHTML = '<div class="text-center"><p>Aucun article dans votre panier</p></div>';

        });
}

function delayedPanier(val){
    console.log(val)
}

function supp(val){
        const result = localId.filter(item => item.ref === localId[val].ref)[0]
        let id = localId.indexOf(result);
        localId.splice(id, 1);
        saveBasket(localId);
        document.location.reload();
}
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




