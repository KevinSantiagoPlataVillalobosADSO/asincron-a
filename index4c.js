
const filtrar = x => x.aprendiz === true;
(async () => {
    let allarrays = [];

    let response = await fetch('user.json')
    let user = await response.json();

    let data = user.users.filter(filtrar)
    console.log(data)

    for (let i = 0; i < data.length; i++) {

        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        let usuarioGithub = await respuestGithub.json();

        let array = [] 
        usuarioGithub.forEach(element => {
            array.push(element.name)
        });

        array.sort();
        console.log(`Repositorios del user:"${data[i].user} ordenados de menor a mayor segun el nombre:`)
        console.log(array)
    }

})();
