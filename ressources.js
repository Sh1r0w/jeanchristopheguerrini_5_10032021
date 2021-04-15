const url = 'http://localhost:3000/api/cameras';
//const url = 'https://ab-p5-api.herokuapp.com/api/cameras'
const recapPanier = document.querySelector('#recap');
const panier = document.querySelector('#panier');
const listing = document.querySelector('#listing');
const imgLocal = localStorage.getItem('img');

fetch(url)
    .then(function (data) {
        data.json().then(function (response) {
            for (r in response) {
                listing.innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text">' + response[r].description + '</p><div class="card-price">Prix : ' + response[r].price + ' € TTC</div><a href="#" class="achat btn btn-danger m-2 productCard" id="' + [r] + '">Acheter</a><a href="" class="btn btn-danger m-2 ' + response[r]._id +'">En Savoir Plus</a></div></div>'        
                const achat = document.getElementById(+[r]);
                for (let i = 0; i < response.length; i++) {
                    let response_json = JSON.stringify(response[i]);
                    localStorage.setItem(+[i], response_json);
                    
                }
                const lecture = JSON.parse(localStorage.getItem(+[r]));
                console.log(lecture.name);

                achat.addEventListener('click', (event => {
                    event.preventDefault()
                        let i = 0;
                        for (const p in response) {                            
                            let itemPanier = {"name":[+lecture.name]};/*[ 'name :' +response[r].name, 'image :' +response[r].imageUrl, 'prix' +response[r].price, 'quantité']*/;
                            let itemPanier_json = JSON.stringify(itemPanier);
                            localStorage.setItem('p'+[r], itemPanier_json)
                            /*if(i != 0){
                            qt = parseInt(localStorage.getItem('PanierLocal'+[i]));
                            qt++;
                            localStorage.setItem('PanierLocal'+[i], qt);
                        }*/
                        }
                       }
                ))
                
            }
        })
    })

/*const rajoutPanier = new Promise((resolve, reject) => {
    achat.addEventListener('click', (event => {
        event.preventDefault();
        for (let r in localStorage('panierLocal'))
            for(let i = 0; i < r; i++) {
                let panier_json= JSON.stringify(localStorage.setItem(+[r]+[i]));
            }
    }))
})*/



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