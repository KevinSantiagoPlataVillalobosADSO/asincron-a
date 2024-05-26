// Objeto original
let filtro = x => x.aprendiz === true || x.aprendiz === false; //hago que el filtro me mande todos los resultados para realizar validacion por proxy, todo esto por que todo lo usaba con la variable que guarbada todo en el filter asi que mas facil hacer que el filter mande todo a que me ponga a cambiar todo el codigo gracias por la compresion
(async() =>{
  let respose = await fetch('user.json')
  let data = await respose.json();
  let user = data.users.filter(filtro)
  let val = {
    apren : ""
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
      if (property == "nombre" && value === value.toUpperCase() && val.apren == true){
        console.log(`Cambiando ${property} a Mayusculas`)
        return target[property] = value;
      }
      else{
        console.log(`${property} no ha sido cambiado ya que solo se permiten mayusculas y aprendiz debe ser true:)`)
        return target[property] ;
      }
    }
  };

  for (let i = 0; i < user.length; i++) {
    let persona = {
      nombre : user[i].name
    }
    val.apren = user[i].aprendiz
    let proxy = new  Proxy(persona, handler);
    console.log(proxy.nombre)
    proxy.nombre = user[i].name.toUpperCase();
    console.log(proxy.nombre)
    console.log("")
  }


  // Manejador del proxy

})();

