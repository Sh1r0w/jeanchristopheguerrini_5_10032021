const url = 'http://localhost:3000/api/cameras/';
const urlOrder = 'http://localhost:3000/api/cameras/order';
const urlId = 'http://localhost:3000/api/cameras/:_id';
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
const panierValider = document.getElementById('sendForm');

// récuprération liste des caméras et affichage / enregistrement dans le local storage
fetch(url)
    .then(function (data) {
        data.json()
            .then(function (response) {
                for (r in response) {
                    let pr = response[r].price / 100
                    let price = pr.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
                    listing.innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text text-truncate">' + response[r].description + '</p><div class="card-price">Prix : ' + price + ' TTC</div><select class="col-10" list="lensesOptions" id="lensesOptionsC' + [r] + '""></select><input type="number" name="quantite" value="1" min="1" id="choixQte' + [r] + '" class="w-25 text-center"><a href="#" class="achat btn btn-danger m-2 productCard" id="achat' + [r] + '">Acheter</a><a href="" class="btn btn-danger m-2" id="product' + [r] + '">En Savoir Plus</a></div></div>'

                    for (let i = 0; i < response[r].lenses.length; i++) {
                        let index = r
                        const indexLenses = document.getElementById('lensesOptionsC' + [r]);
                        indexLenses.innerHTML += '<option valeur="' + i + '">' + response[index].lenses[i] + '</option>';
                    }
                }

                addEvent(response);
                localStorage.setItem('catalogue', JSON.stringify(response));
            })
            //----------------------------------------------------------------- Panier -----------------------------------------
            .catch(function () {
                console.error("Erreur l26")
            })
    })

function addEvent(val) {
    let p1 = new Promise((resolve, reject) => {
        resolve(val)
    })
    p1.then(function () {
        // enregistrement dans le panier
        for (r in val) {
            let index = r
            const achat = document.getElementById('achat' + [r]);
            achat.addEventListener('click', function (e) {
                let choixQte2 = document.getElementById('choixQte' + index).value
                let choixLen1 = document.getElementById('lensesOptionsC' + index).value
                e.preventDefault();
                formulaire(index, choixQte2, choixLen1);

            });
        }
    })
        .catch(function () {
            console.error('Erreur l48')
        })
        .then(function () {
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
        .catch(function () {
            console.error('Erreur l65')
        })
        .then(function panierLook() {
            // affichage du panier
            panierIndex.addEventListener('click', (event => {
                event.preventDefault();
                listingPanier();
            }))
        })
        .catch(function () {
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
                let pr = lecture[index].price / 100
                let price = pr.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
                let indexProduct = "";
                indexProduct += '<div id="productImg" class="col-12 d-inline-flex position-relative justify-content-end">'
                indexProduct += '<div class=" text-left"><img src="' + lecture[index].imageUrl + '" alt="' + lecture[index].imageUrl + '" class="col-6"></div>'
                indexProduct += '<div class="col-3 flex-column text-right"><h1>' + lecture[index].name + '</h1><p>' + price + '</p><label for="lensesChoice">Choix de votre Lentilles :</label><select list="lensesOptions" id="lensesOptions" class="col-10"></select><input type="number" name="quantite" value="1" min="1" id="choixQte1' + [index] + '" class="w-25 text-center m-2"><a href="#" class="col-5 achat btn btn-danger m-2 productCard" id="achatP' + [index] + '">Acheter</a></div>'
                indexProduct += '</div>'
                indexProduct += '<div id="productDesc" class="m-5">'
                indexProduct += '<div><h3>Description du ' + lecture[index].name + '</h3></div>'
                indexProduct += '<div><p>' + lecture[index].description + '</p></div>'
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
        .then(function () {
            for (r in lecture) {
                if (val === r) {
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
function formulaire(ref, quantite, lentille) {
    let formulaire = {
        ref: lecture[ref]._id,
        lentille: lentille,
        quantite: quantite,
    };
    qte(formulaire, ref);
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
function qte(formulaire, alerte) {
    let lentille = formulaire.lentille;
    let ref = formulaire.ref;
    let quantite = formulaire.quantite;

    let panier = JSON.parse(localStorage.getItem('Panier'));
    let miseajour = false;

    if (panier != null) {
        for (i = 0; i < panier.length; i++) {
            if (panier[i].ref == ref && panier[i].lentille == lentille) {
                panier[i].quantite = quantite;
                miseajour = true;
                break;
            }
        }

        if (miseajour == false) {
            panier.push(formulaire);
            miseajour = true;
            alertPanier(alerte, lentille)
        }
        if (miseajour) {
            saveBasket(panier);
        }
    } else {
        addToBasket(formulaire);
        alertPanier(alerte, lentille)
    }
}

// push au panier
function addToBasket(product) {
    let basket = basketInit();
    basket.push(product);
    saveBasket(basket);
}

//affichage d'une alerte rajout au panier
function alertPanier(val, val1) {
    for (r in lecture) {
        popAlerte.innerHTML = '<div class="row z-index-3"><div class="col"><div class="alert alert-sucess alert-dismissible fade show" role="aler"><h5 class="alert-heading">Produit rajouter au panier<h5><div alert>' + lecture[val].name + ' Avec lentille de ' + val1 + '</div><button type="button" data-dismiss="alert">Continuer mes achats</button><button type="button" data-dismiss="alert" id="alertPanier">Mon Panier</button></div></div></div>';
    }
    let alertPanier = document.getElementById('alertPanier');
    alertPanier.addEventListener('click', function (e) {
        e.preventDefault();
        listingPanier()

    })
}

// sauvegarder item Panier
function saveBasket(basket) {
    localStorage.setItem('Panier', JSON.stringify(basket));
    nbArticle(nbAff);
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
            const filter = lecture.filter(item => item._id === localId[i].ref)[0]
            let id = lecture.indexOf(filter);
            let pr = lecture[id].price / 100
            let price = pr.toLocaleString('fr', { style: 'currency', currency: 'EUR' });
            let indexPanier = ' ';

            indexPanier += '<table>'
            indexPanier += '<tr>'
            indexPanier += '<td id="idTab ' + localId[i].ref + '"class="border border-dark text-center"><img class="text-left w-50" src="' + lecture[id].imageUrl + '"></td>'
            indexPanier += '<td class="border border-dark text-center">' + lecture[id].name + ' avec lentille ' + localId[i].lentille + '</td>'
            indexPanier += '<td class="border border-dark text-center"><select class="col-6 m-3" name="quantite" id="choixQteP' + [i] + '" class="w-25 text-center m-2"><option value="1"> 1 </option><option value="2"> 2 </option><option value="3"> 3 </option><option value="4"> 4 </option></select><i id="trash' + localId[i].ref + '" class="fas fa-trash-alt"></i></td>'
            indexPanier += '<td class="border border-dark text-right">' + price + '</td>'
            indexPanier += '</tr>'
            indexPanier += '</table>'
            recapPanier.innerHTML += indexPanier;


        }

    })

        //modification de quantité panier
        .then(function () {
            for (i in localId) {
                let indexModif = document.getElementById('choixQteP' + [i])
                let lentille = localId[i].lentille
                const result = lecture.filter(item => item._id === localId[i].ref)[0]
                indexModif.addEventListener('change', function (e) {
                    e.preventDefault();
                    let indexModifValue = indexModif.selectedIndex + 1
                    let id = lecture.indexOf(result);
                    formulaire(id, indexModifValue, lentille)

                })
            }

        })

        //affichage du prix avec TVA dans le panier
        .then(function prixPanier() {
            for (let r = 0; r < localId.length; r++) {
                const filter = lecture.filter(item => item._id === localId[r].ref)[0]
                let id = lecture.indexOf(filter);
                prix += Number(lecture[id].price / 100);

            }
            indexTotal.classList.remove('d-none');
            let totalPanier = ' ';
            let prixHt = prix * 0.8
            let prixHtFinal = Math.round(prixHt);
            let diffPrix = Math.round(prix - prixHtFinal);
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
            indexForm.innerHTML = '<form id="validation"><div class="col-6 d-flex flex-column"><label for="nom">Votre Nom : </label><input type="text" id="firstName" required class="formulaireClient"> <label for="prenom"> Votre Prénom:</label><input type="text" id="lastName" required class="formulaireClient"><label for="adresse">Adresse:</label><input type="text" id="address" required class="formulaireClient"><label for="ville">Ville</label><input type="text" id="city" required class="formulaireClient"><label for="email">E-mail</label><input id="email" class="" type="email" required "><input type="submit" id="validationForm"class=" m-2"></div></form>'

            const name = document.getElementById('lastName');
            const fName = document.getElementById('firstName');
            const address = document.getElementById('address');
            const city = document.getElementById('city');
            const contactEmail = document.getElementById('email');
            const allInput = document.getElementById('validation');

            allInput.addEventListener('input', function (e) {
                e.preventDefault();
                const contactEmailVal = contactEmail.value;
                const nameV = name.value
                const fNameV = fName.value
                const addressV = address.value
                const cityV = city.value
                validationForm(nameV, fNameV, addressV, cityV, contactEmailVal)
            })
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






function supp(val) {
    const result = localId.filter(item => item.ref === localId[val].ref)[0]
    let id = localId.indexOf(result);
    console.log(id)
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
            val.innerHTML = '<div>(' + nb.length + ' Article' + ((localId.length > 1) ? 's' : ' ') + ' dans votre panier)</div>'
        }).catch(
            function () {
                val.innerHTML = '<div>(Aucun article dans votre panier)</div>'
            })
};
nbArticle(nbAff);


// passage du formulaire contact au regex

function validationForm(name, fName, adress, city, mail) {
    const validationForm = document.getElementById('validationForm')
    const regexM = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/g
    const test = name + fName + adress + city
    const regex = /^([A-Za-z0-9 ,.'`-]{3,})$/g
    const regexResult = regex.test(test)
    const regexResultM = regexM.test(mail)
    let contact = {
        firstName: name,
        lastName: fName,
        address: adress,
        city: city,
        email: mail,
    }
    let p1 = new Promise((resolve, reject) => {
        resolve(contact);
    })
    p1.then(function () {
        if (regexResultM && regexResult) {
            validationForm.classList.add('btn-success')
            validationForm.classList.remove('disabled')
            validationForm.classList.remove('btn-danger')
            validationForm.setAttribute("value", "Valider la commande");

        } else {
            validationForm.classList.add('disabled')
            validationForm.classList.add('btn-danger')
            validationForm.setAttribute("value", "Caractére interdit");
        }
    })
        .then(function () {
            if (regexResultM == true && regexResult == true) {
                validationForm.addEventListener('click', function (e) {
                    e.preventDefault();
                    send(contact);
                })
            }
        })

}

//Envoi des informations à l'api

function send(contact) {
    let p1 = new Promise((resolve, reject) => {
        resolve(contact);
    })
    p1.then(function () {
        let products = []
        for (let r = 0; r < localId.length; r++) {
            let product = localId[r].ref
            products.push(product)
        }
        let info = { contact, products }

        let options = {
            method: "POST",
            body: JSON.stringify(info),
            headers: { 'Content-Type': 'application/json' }

        }
        fetch('http://localhost:3000/api/cameras/order', options)
            .then(data => {
                data.json()
                    .then(function (response) {
                        if (response) {
                            console.log(response);
                            
                            listing.classList.add('d-none');
                            productPage.classList.add('d-none');
                            productPage.classList.remove('d-inline-flex');
                            listing.classList.remove('d-inline-flex');
                            panierValider.classList.remove('d-none');
                            panierIndex.classList.add('d-none');
                            panierGlobal.classList.add('d-none');
                            indexForm.classList.remove('d-none');
                            indexTotal.classList.add('d-none');
                            indexForm.classList.add('d-none');
                            indexTotal.classList.remove('d-flex');
                           // for(r in response){
                                //console.log(response.products[r].name)
                                titre.innerHTML = 'Merci de votre Commande Mr/Mme ' + response.contact.firstName;
                                sousTitre.innerHTML = 'N° ' + response.orderId
                                panierValider.innerHTML += '<div><p>Merci de votre achat chez Orinico<p><div>'
                                panierValider.innerHTML += '<div><p>Voici le récapitulatif de votre commande<p><div>'
                                //indexForm.innerHTML += '<div><p>Produit : '+ response.products[r].name + '<p><div>'
                                panierValider.innerHTML += '<div><p>votre commande sera expédié dans les plus bref délais<p><div>'
                                panierValider.innerHTML += '<div><p> Voici les informations de livraison !<p><div>'
                                panierValider.innerHTML += '<div><p>Nom : '+ response.contact.firstName + '<p><div>'
                                panierValider.innerHTML += '<div><p>Prenom : '+ response.contact.lastName + '<p><div>'
                                panierValider.innerHTML += '<div><p>Adresse : '+ response.contact.address + '<p><div>'
                                panierValider.innerHTML += '<div><p>Email de contact : '+ response.contact.email + '<p><div>'
                          //  }
                        }
                    })
            });
    })
}
