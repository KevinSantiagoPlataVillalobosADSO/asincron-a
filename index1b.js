
let funcion_noasync = function(){
    //se realiza una peticion al archivo user2.json
    fetch('user2.json')
    //la peticion retorna una promesa que si se cumple ejecuta el .then
    .then((user) => {
        //imprime en consola el usuario
        // console.log(user);
        //retorna el resultado
        return user.json();})
    //el .then toma lo retornado
    .then((datos) => {
        //se realiza una peticion externa a una api de github
        // console.log(datos)
        fetch(`https://api.github.com/users/${datos.name}/repos`)
        //la peticion retorna una promesa c:
        .then((usuarioGithub) => {
            //si se cumple la peticion se realiza lo siguiente
            // console.log(usuarioGithub) // se imprime todos los repositorios publicos del user
            return usuarioGithub.json();}) //se retorna todo estos resultados 
            .then((datos) => {
                //Se realiza un ciclo foreach que recorre todos los elementos de la lista con los repositorios
                datos.forEach(element => {
                    //una condicional que capta el elemento.name que contenga "Analisis.github.io"
                    if(element.name === "Analisis.github.io"){
                        //se imprime el resultado del repositorio
                        console.log(element)
                    }
                });
            })
    })   
}

funcion_noasync();