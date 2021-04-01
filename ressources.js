const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/cameras');
request.send();
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        let r = response;
        console.log(r);
        for (let r in response) {
            document.querySelector('#listing').innerHTML += '<div class="col-3 p-2 m-2 card"><img class="card-img-top" src="' + response[r].imageUrl + '" alt="' + response[r].name + '"><div class="card-body"><h5 class="card-title">' + response[r].name + '</h5><p class="card-text">' + response[r].description + '</p><div class="card-price">Prix : ' + response[r].price + ' € TTC</div><a href="" class="btn btn-danger m-2" id="' + response[r]._id + '">Acheter</a><a href="" class="btn btn-danger m-2 ' + response[r]._id + '">En Savoir Plus</a></div></div>';
        }
    }
};

const url = 'http://localhost:3000/api/cameras';

let cardAdd = fetch(url).then(function(addCard){
    addCard.json().then(function(data){
        addCard.responseText = data;
         console.log(data);
    const index = document.querySelectorAll(".btn");
    if(addCard.ok) {
        for(let r in data) {
        index[r].addEventListener('click', function(event) {
            event.preventDefault();
            alert(data[r]._id);

        });
        }
    }else {
        console.log('ne marche pas');
    }
});
}); 

