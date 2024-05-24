
const filtrar = x => x.aprendiz === true;
(async () => {
    let allarrays = [];
    let response = await fetch('user.json')
    let user = await response.json();
    let data = user.users.filter(filtrar)
    console.log(data)
    for (let i = 0; i < user.users.length; i++) {
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        let usuarioGithub = await respuestGithub.json();
        let array = [`${data[i].user}`]
        usuarioGithub.forEach(element => {
            array.push(element.name)
        });
        allarrays.push(array)
        
    }
    console.log(allarrays)
})();
