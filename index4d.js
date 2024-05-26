const filtrar = x => x.aprendiz === true;
(async () => {
    let allarrays = [];

    let response = await fetch('user.json')
    let user = await response.json();

    let data = user.users.filter(filtrar)
    console.log(data)

    // //otra prueba
    // for (let i = 0; i < data.length; i++) {
    //     let palabra = data[i].user;
    //     let sep = palabra.split("");
    //     if(sep.length > 5){
    //         console.log(sep);
    //     }
    // }

    for (let i = 0; i < data.length; i++) {

        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        let usuarioGithub = await respuestGithub.json();

        let array = [] 
        usuarioGithub.forEach(element => {
            let separate = element.name.split("");
            if(separate.length >5){
                array.push(element.name)
            }
        });
        console.log(data[i].user)
        console.log(array)


    }

})();
