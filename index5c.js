// Objeto original
let filtro = x => x.aprendiz === true; 
(async() =>{
  let respose = await fetch('user.json')
  let data = await respose.json();
  let user = data.users.filter(filtro);
  const regex = /ADSO/i;
  let val = {
    usuario : ""
  }

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
      
      if (property == "nombre" && value === value.toUpperCase() && regex.test(val.usuario)){ 
        console.log(`Cambiando ${property} a Mayusculas`)
        return target[property] = value;
      }
      else{
        console.log(`${property} no ha sido cambiado ya que solo se permiten mayusculas y el usuario debe contener "ADSO":)`)
        return target[property] ;
      }
    }
  };

  for (let i = 0; i < user.length; i++) {
    let persona = {
      nombre : user[i].name
    }
    let user_l = user[i].user
    val.usuario = user_l;
    console.log(`Usuario: ${val.usuario}`)

    let proxy = new  Proxy(persona, handler);
    console.log(proxy.nombre)
    proxy.nombre = user[i].name.toUpperCase();
    console.log(proxy.nombre)
    console.log("")
  }


  // Manejador del proxy

})();
