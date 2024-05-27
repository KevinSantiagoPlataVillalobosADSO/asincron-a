//creamos una arrow fucntion que va a servir como callback para filtrar los usuarios con aprendiz true 
const filtrar = x => x.aprendiz === true;
//creamos la funcion asincrona -anonima-autoejecutable
(async () => {
    //peticion al json
    let response = await fetch('user.json')
    //se castea el json
    let user = await response.json();
    //se filtra la informacion con la callback ya creada
    let data = user.users.filter(filtrar)
    //se imprime la data (provisionalmente)
    console.log(data)

    // //pequeña prueba
    
    // for (let i = 0; i < data.length; i++) {
    //     if(data[i].user.includes("K")){
    //         console.log(data[i].user)
    //     }
    // }

    //bucle que recorre toda la informacion de los usuarios que hay en data
    for (let i = 0; i < data.length; i++) {
        //peticion a la api de git con los repositorios
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        //se castea a json
        let usuarioGithub = await respuestGithub.json();
        //se crea un array que va a contener todos los repositorios del usuarios
        let array = [];
        //se imprime el nombre del usuario que tiene repositorios que tiene javascript en su nombre 
        console.log(`Repositorios del user:"${data[i].user} que contienen "JavaScript" en su nombre:`);
        //se recorre la informacion dada por la api con los repositorios
        usuarioGithub.forEach(element => {
            //condicional que determina si el repositorio contiene javascript en su nombre
            if(element.name.includes("javascript") || element.name.includes("Javascript") || element.name.includes("JavaScript")){
                //si se cumple el if se pushea el nombre del repositorio
                array.push(element.name)
            }
        });
        //se imprime el array con el nombre de los repositorios
        console.log(array)
    }

})();//se autoejecuta la funcion
