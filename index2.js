let funcion_noasync = function(){
    //se realiza una peticion al archivo user2.json
    fetch('user.json')
    //la peticion retorna una promesa que si se cumple ejecuta el .then
    .then((user) => {
        //imprime en consola el usuario
        //retorna el resultado
        return user.json();})
    //el .then toma lo retornado
    .then((datos) => {
        //se realiza una peticion externa a una api de github
        for (let i = 0; i < datos.users.length; i++) {
            if(datos.users[i].aprendiz === true){
                fetch(`https://api.github.com/users/${datos.users[i].user}`)
                //la peticion retorna una promesa c:
                .then((usuarioGithub) => {
                    //si se cumple la peticion se realiza lo siguiente
                    return usuarioGithub.json();
                }) //se retorna todo estos resultados 
                .then((data) => {
                    //se imprime en un table nombre de usuario y el avatar c:
                    console.table([data.login, data.avatar_url])
                })
            }
        }
    })   
}
funcion_noasync();