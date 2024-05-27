// Objeto original
//filtro para llamar a los aprendices en true c:(me canse de escribir lo mismo varias veces)
let filtro = x => x.aprendiz === true; 
//se crea una funcion asincrona anonima autoejecutable
(async() =>{
  //peticion al json
  let respose = await fetch('user.json')
  //se castea el archivo a json
  let data = await respose.json();
  //se crea el filtro que toma el callback de filtro
  let user = data.users.filter(filtro)
    //un objeto que define cuáles operaciones serán interceptadas y cómo redefinir dichas operaciones.
  const handler = {
    //get  que intercepta los intentos de ingresar a la propiedad
    get: function(target, property) {
      // Intercepta la operación de lectura
      //condicional que define si existe la propiedad o no
      if (property in target) {
        console.log(`Leyendo ${property}`);
        return target[property];
      } else {
        console.log(`Property ${property} does not exist`);
        //si no existe devuelve undefined
        return undefined;
      }
    },

    //captura las asignaciones de un valor 
    set: function(target, property, value){
      //usando split separamos el string por espacios
      let separate = value.split(" ");
      //si se cumple la validacion se redefinira el valor
      if (property == "nombre" && value === value.toUpperCase() && separate.length > 2){
        console.log(`Cambiando ${property} a Mayusculas`)
        //se redefine el valor 
        return target[property] = value;
      }
      else{
        //si no se cumple no se redefine la propiedad
        console.log(`${property} no ha sido cambiado ya que solo se permiten mayusculas y con mas de 2 nombres :)`)
        return target[property] ;
      }
    }
  };
  
  //bucle que recorre cada uno de los comentarios
  for (let i = 0; i < user.length; i++) {
    //se crea un objeto que va a contener la propiedad 
    let persona = {
      nombre : user[i].name
    }
    //se crea el objeto proxy que mandara el objeto target y el handler
    let proxy = new  Proxy(persona, handler);
    //se realizan llamadas al proxy 
    console.log(proxy.nombre)
    proxy.nombre = user[i].name.toUpperCase();
    console.log(proxy.nombre)
    console.log("")
  }


  // Manejador del proxy

})();//se autoejecuta la funcion

