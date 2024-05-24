
const filtrar = x => x.name === "js_asincrono";
(async () =>{
    //se realiza la peticion a user2.json
    let response = await fetch("user2.json");
    //se castea el resultado a un json que a su vez retorna una promesa
    let user = await response.json();
    //se imprime user
    console.log(user)
    //se realiza una peticion externa a una api de github la cual trae todos los repositorios publicos del user
    let respuestGithub = await fetch(`https://api.github.com/users/${user.name}/repos`)
    //se pasa el resultado a un json que retorna el archivo 
    let usuariogithub = await respuestGithub.json();
    //se realiza un ciclo foreach que recorre cada uno de los elementos buscando por la propiedad .name que imprime segun la condicional
    usuariogithub.forEach(element => {
        //se realiza una condicional que imprime element si se cumple
        if(element.name === "Analisis.github.io"){
            console.log(element)
        }
    })

})();//se auto ejecuta :)
