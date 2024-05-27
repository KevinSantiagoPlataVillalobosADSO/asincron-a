//creamos una funcion asincrona-anonima-autoejecutable
(async () => {
    //creamos un array que va a contener todos lo repositorios de todos los usuarios 
    let allarrays = [];
    //hacemos una peticion al json
    let response = await fetch('user.json')
    //si se resulve casteamos a json
    let user = await response.json();
    //bucle que recorre el archivo y todo lo que hay en "users"
    for (let i = 0; i < user.users.length; i++) {
        //condicional que solo permite que aprendiz sea true
        if(user.users[i].aprendiz === true){
            //peticion a la api de github con los repositorios
            let respuestGithub = await fetch(`https://api.github.com/users/${user.users[i].user}/repos`)
            //se castea a json
            let usuarioGithub = await respuestGithub.json();
            //se crea un array que va a contener los repositorios publicos del usuario
            let array = [`${user.users[i].user}`]
            //se recorre los datos almacenados en usuariogithub que contiene los datos de los repositorios
            usuarioGithub.forEach(element => {
                //hace push de los datos al array
                array.push(element.name)
            });
            //se pushea el array al array que contiene todos los repositorios de todos lo usuarios
            allarrays.push(array)  
        }
    }
    //se imprime el array con todos los repositorios c:
    console.log(allarrays)
})();
