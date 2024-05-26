// Objeto original
let filtro = x => x.aprendiz === true; 
(async() =>{
  let respose = await fetch('user.json')
  let data = await respose.json();
  let user = data.users.filter(filtro)
  const handler = {
    get: function(target, property) {
      // Intercepta la operación de lectura
      if (property in target) {
        console.log(`Leyendo ${property}`);
        return target[property];
      } else {
        console.log(`Property ${property} does not exist`);
        return undefined;
      }
    },

    set: function(target, property, value){
      let separate = value.split(" ");
      if (property == "nombre" && value === value.toUpperCase() && separate.length > 2){
        console.log(`Cambiando ${property} a Mayusculas`)
        return target[property] = value;
      }
      else{
        console.log(`${property} no ha sido cambiado ya que solo se permiten mayusculas y con mas de 2 nombres :)`)
        return target[property] ;
      }
    }
  };

  for (let i = 0; i < user.length; i++) {
    let persona = {
      nombre : user[i].name
    }
    let proxy = new  Proxy(persona, handler);
    console.log(proxy.nombre)
    proxy.nombre = user[i].name.toUpperCase();
    console.log(proxy.nombre)
    console.log("")
  }


  // Manejador del proxy

})();

