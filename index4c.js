//creamos una arrow function que sirve de callback para la informacion
const filtrar = x => x.aprendiz === true;
//se crea la funcion asincrona-anomnima-autoejecutable
(async () => {
    // peticion al json
    let response = await fetch('user.json')
    // se castea la informacion a un json
    let user = await response.json();
    // se filtra la info con la callback dada
    let data = user.users.filter(filtrar)
    //se imprime data(provisional)
    console.log(data)
    // bucle que recorre todos los usuarios 
    for (let i = 0; i < data.length; i++) {
        // se hace una peticion a la api de git con la informacion de los repositorios 
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        // se castea  el archivo a un json
        let usuarioGithub = await respuestGithub.json();
        //se crea el array que va a contener los  repositorios 
        let array = []
        // bucle  foreach que recorre los elemtos que hay en usuariogithub con los repositorios publicos
        usuarioGithub.forEach(element => {
            //se pushean los repositorios al array 
            array.push(element.name)
        });
        // se ordena el array de mayor a menor usando el metodo sort 
        array.sort();
        //hacemos un console log del nombre de user y sus repositorios ordenado
        console.log(`Repositorios del user:"${data[i].user} ordenados de menor a mayor segun el nombre:`)
        console.log(array)
    }

})();//se autoejecuta la funcion
