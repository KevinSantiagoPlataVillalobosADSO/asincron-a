
//creamos una funcion que servira como callback para poder filtrar los usuarios con aprendiz true
const filtrar = x => x.aprendiz === true;
//se crea la funcion asicrona auto ejecutable
(async () => {
    //se crea el array que contendra todos los usuarios con sus repositorios
    let allarrays = [];
    //peticion al json
    let response = await fetch('user.json')
    //se castea el json
    let user = await response.json();
    //se llama el filtro el cual vamos a usar para llamar a los datos c:
    let data = user.users.filter(filtrar)
    //imprimimos la informacion del filtro (provisional)
    console.log(data)
    //bucle que recorre la informacion filtrada y almacenada en data
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i].user) 
        //peticion a la api de git con los repositorios del usuario
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        //se castea a json
        let usuarioGithub = await respuestGithub.json();
        //array que guarda los repositorios del usuario
        let array = [`${data[i].user}`]
        //for each que reccorre toda la informacion obtenida de la petecion con los repositorios
        usuarioGithub.forEach(element => {
            //se hace push al array con los repositorios
            array.push(element.name)
        });
        //se hace push al array con todos los repositorios de todos los usuarios
        allarrays.push(array)
    }
    //se imprime este array con todos lo repositorios de todos los usuarios
    console.log(allarrays)
})();
