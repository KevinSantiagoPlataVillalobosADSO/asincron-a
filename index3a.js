
(async () => {
    let response = await fetch('user.json')
    let user = await response.json();

    for (let i = 0; i < user.users.length; i++) {
        if(user.users[i].aprendiz === true){
            let respuestGithub = await fetch(`https://api.github.com/users/${user.users[i].user}/repos`)
            let usuarioGithub = await respuestGithub.json();
            let array = [`${user.users[i].user}`]
            usuarioGithub.forEach(element => {
                array.push(element.name)
            }); 
            console.log(array)
        }
    }
})();
