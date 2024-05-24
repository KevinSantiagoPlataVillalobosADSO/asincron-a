const filtrar = x => x.aprendiz === true;
(async() => {
    let response = await fetch ('user.json')
    let user = await response.json();
    let data = user.users.filter(filtrar)
    for (let i = 0; i < data.length; i++) {
        const proxy = new Proxy(user, {
            set(target, prop, value) {
                target[prop] = value.toUpperCase();
                return true;
            },
        });
        proxy.data[i].name(data[i].name); 
    }
})