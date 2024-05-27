// se crea una funcion flecha que va a servir como callbak para filtrar datos  
const filtrar = x => x.aprendiz === true;
//se crea una funcion asincrona anonima autoejecutable 
(async () => {
    //peticion al json
    let response = await fetch('user.json')
    // se castea el  archivo a json
    let user = await response.json();
    // se usa la callback para filtar el contenido
    let data = user.users.filter(filtrar)
    //se imprime el resultado
    console.log(data)

    // //otra prueba
    // for (let i = 0; i < data.length; i++) {
    //     let palabra = data[i].user;
    //     let sep = palabra.split("");
    //     if(sep.length > 5){
    //         console.log(sep);
    //     }
    // }
    // 

    //bucle for que reccore todo el contenido del filtro
    for (let i = 0; i < data.length; i++) {
        //peticion a una api de git con los repositorios publicos del usuario
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        //se castea el resultado a un json
        let usuarioGithub = await respuestGithub.json();
        // se ccrea un array  que va a contener los repositorios
        let array = [] 
        //bucle for  each que recorre la informacion con los repositorios
        usuarioGithub.forEach(element => {
            // con el metodo split separamos la cadena por letras
            let separate = element.name.split("");
            if(separate.length >5){
                //si el repositorio tiene mas de 5 letras en su  nombre se pusheara el nombre al array
                array.push(element.name)
            }
        });
        //se  imprimen el usuario y el array con los repositorios
        console.log(data[i].user)
        console.log(array)


    }

})();//se autoejecuta la funcion
