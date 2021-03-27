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
        console.log(response);
    }
};