/* connection au server et récupération des données caméras */
/*const camerasList = (callback) => {
const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/cameras');
request.send();
request.addEventListener('readystatechange', () => {
    if(request.readyState === 4 && request.status === 200) {
        callback(undefined, request.responseText)
    }else if(request.readyState ===4){
        callback('impossible de trouver les données', undefined)
    }
});
}

console.log();
camerasList((err, data)=> {
if(err){
    console.log(err);
}else{
    console.log(data);
}
});*/

const request = new XMLHttpRequest();
request.open('GET', 'http://localhost:3000/api/cameras');
request.send();
request.onreadystatechange = function() {
    if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        let r = response;
        console.log(r);
        for (let r in response) {
            document.querySelector('#listing').innerHTML += '<div class="card"><img class="card-img-top" src="'+response[r].imageUrl+'" alt="'+response[r].name+'"><div class="card-body"><h5 class="card-title">'+response[r].name+'</h5><p class="card-text">'+response[r].description+'</p></div></div>';
        }
    }
        
    };

