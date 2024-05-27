
//creamos una funcion anonima - autoejecutable
(async () => {
    //hacemos la peticion a el archivo json
    let response = await fetch('user.json')
    //si se resuelve bien se castea a un json
    let user = await response.json();
    //creamos un bucle que recorre todos los usuarios que estan en "users"
    for (let i = 0; i < user.users.length; i++) {
        //creamos una condicional donde solo acepte los elementos cuyo estado de aprendiz sea true 
        if(user.users[i].aprendiz === true){
            //hacemos una peticion a la Api de git hub la cual trae los repositorios publicos
            let respuestGithub = await fetch(`https://api.github.com/users/${user.users[i].user}/repos`)
            //si se resuelve la peticion vamos a castear a json
            let usuarioGithub = await respuestGithub.json();
            //creamos un arreglo que va a contener todos los repositorios publicos
            let array = [`${user.users[i].user}`]
            //recorremos el json que contienen todos los datos de los repositorios
            usuarioGithub.forEach(element => {
                //hacemos push al array que va a guardar los repositorios del usuario
                array.push(element.name)
            }); 
            //imprimimos el array
            console.log(array)
            //cierre de condicional
        }
        //cierre de bucle 
    }
})();//se auto ejecuta la funcion c:
