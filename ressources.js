const url = 'http://localhost:3000/api/cameras';
//const url = 'https://ab-p5-api.herokuapp.com/api/cameras'
const recapPanier = document.querySelector('#recap');
const panier = document.querySelector('#panier');
const listing = document.querySelector('#listing');
const imgLocal = localStorage.getItem('img');
const compteur = 0;

fetch(url)
    .then(function (data) {
        data.json().then(function (response) {
            for (r in response) {
                listing.innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text">' + response[r].description + '</p><div class="card-price">Prix : ' + response[r].price + ' € TTC</div><a href="#" class="btn btn-danger m-2 productCard" id="' + response[r]._id + '">Acheter</a><a href="" class="btn btn-danger m-2 ' + response[r]._id + '">En Savoir Plus</a></div></div>'
            }

            const index = document.querySelectorAll(".productCard")

            for (a in response) {
                //const idProduct = response[a]._id;
                //const addName = response[a].name;
                //const addPrice = response[a].price;
                console.log(response[a]._id, response[a].name, response[a].price)


                for (let i = 0; i < response.length; i++) {
                    index[i].addEventListener('click', (event => {
                        event.preventDefault();
                        localStorage.setItem('id' + [i], response[a]._id);
                        localStorage.setItem('name' + [i], response[a].name);
                        localStorage.setItem('price' + [i], response[a].price);
                        localStorage.setItem('img' + [i], response[a].imageUrl);
                    }));
                }
            }
        })
    })

const retourPanier = new Promise((resolve, reject) => {
    panier.addEventListener('click', (event => {
        event.preventDefault();
        listing.classList.add('d-none');
        listing.classList.remove('d-inline-flex');
        for (let i in localStorage) {
            //recapPanier.innerHTML += '<div class=""><img class="card-img-top" src="'+ imgLocal.localStorage.length +'">'
            console.log(localStorage[i]);
        }
    }))
})