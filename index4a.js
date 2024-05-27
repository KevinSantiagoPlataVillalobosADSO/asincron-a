
//creamos una arrow fucntion que va a servir como callback para filtrar los usuarios con aprendiz true 
const filtrar = x => x.aprendiz === true;
//creamos la funcion asincrona -anonima-autoejecutable
(async () => {
    //peticion a el json
    let response = await fetch('user.json')
    //se castea a json
    let user = await response.json();
    //se filtra la informacion usando la callaback ya creada
    let data = user.users.filter(filtrar)
    //bucle que rrecore los usuarios 
    for (let i = 0; i < data.length; i++) {
        //peticion a la api de git con los repositorios
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        //se castea la informacion a json
        let usuarioGithub = await respuestGithub.json();
        //array que va a contener los repositorios dek usuario
        let array = []
        //se recorre todos los repositorios y se pushean al array
        usuarioGithub.forEach(element => {
            //se pushea el array
            array.push(element.name)
        });
        //condicional que determina si tiene menos de 5 repositorios
        if(array.length < 5){
            //se imprime el nombre del usuario con menos de 5 repositorios publicos y se imprimen los repositorios en un table
            console.log(`Repositorios del user:"${data[i].user} (tiene menos de 5)`);
            console.table(array)
        }
        //lo mismo pero va a imprimir a los que tiene mas de 5 repositorios sin imprimir los repositorios
        else if(array.length > 5){
            console.log(`${data[i].user} tiene mas de 5 repositorios publicos`)
        }
    }

})();//se autoejecuta la funcion
