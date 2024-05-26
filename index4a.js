
const filtrar = x => x.aprendiz === true;
(async () => {
    let allarrays = [];
    let response = await fetch('user.json')
    let user = await response.json();
    let data = user.users.filter(filtrar)
    for (let i = 0; i < data.length; i++) {
        let respuestGithub = await fetch(`https://api.github.com/users/${data[i].user}/repos`)
        let usuarioGithub = await respuestGithub.json();
        let array = []
        
        usuarioGithub.forEach(element => {
            array.push(element.name)
        });

        if(array.length < 5){
            console.log(`Repositorios del user:"${data[i].user} (tiene menos de 5)`);
            console.table(array)
        }
        else if(array.length > 5){
            console.log(`${data[i].user} tiene mas de 5 repositorios publicos`)
        }
    }

})();
