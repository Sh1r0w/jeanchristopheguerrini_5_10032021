const url = 'http://localhost:3000/api/cameras';

fetch(url)
    .then(function (data) {
        data.json().then(function (response) {
            console.log(response)
            for (let r in response) {
                document.querySelector('#listing').innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text">' + response[r].description + '</p><div class="card-price">Prix : ' + response[r].price + ' € TTC</div><a href="" class="btn btn-danger m-2" id="' + response[r]._id + '">Acheter</a><a href="" class="btn btn-danger m-2 ' + response[r]._id + '" id="productCard">En Savoir Plus</a></div></div>'
            }
        })

    const index = document.querySelector("#productCard")
    console.log(index);
        for (let r in index) {
           r.addEventListener('click', (event => {
                event.preventDefault();
                document.querySelector('.listing').classList.add('d-none');
                
            }));
        }
    
    })
/*
let cardAdd = fetch(url).then(function(addCard){
    addCard.json().then(function(data){
        addCard.responseText = data
         console.log(data)
    const index = document.querySelectorAll(".btn")
    if(addCard.ok) {
        for(let r in data) {
        index[r].addEventListener('click', (event => {
            event.preventDefault()
            document.querySelector('#listing').classList.add('d-none')
           // alert(data[r]._id)
        }))
        }
    }else {
        console.log('ne marche pas')
    }
})
})*/
