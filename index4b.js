
const filtrar = x => x.aprendiz === true;
(async () => {
    let allarrays = [];
    let response = await fetch('user.json')
    let user = await response.json();
    let data = user.users.filter(filtrar)
    console.log(data)

    // //pequeña prueba
    
    // for (let i = 0; i < data.length; i++) {
    //     if(data[i].user.includes("K")){
    //         console.log(data[i].user)
    //     }
    // }

    for (let i = 0; i < data.length; i++) {
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        let usuarioGithub = await respuestGithub.json();
        let array = []
        console.log(`Repositorios del user:"${data[i].user} que contienen "JavaScript" en su nombre:`)
        usuarioGithub.forEach(element => {
            if(element.name.includes("javascript") || element.name.includes("Javascript") || element.name.includes("JavaScript")){
                array.push(element.name)
            }
        });
        console.log(array)
    }

})();
