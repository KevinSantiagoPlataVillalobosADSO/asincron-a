// Objeto original
//callback que funciona como filtro
let filtro = x => x.aprendiz === true; 
(async() =>{
  // peticion al json
  let respose = await fetch('user.json')
  //se castea el resultado a un json
  let data = await respose.json();
  //se llama el filtro
  let user = data.users.filter(filtro);
  //se crea un regex que determina si la palabra contiene ADSO
  const regex = /ADSO/i;
  //objeto que validara el usuario
  let val = {
    usuario : ""
  }
  //un objeto que define cuáles operaciones serán interceptadas y cómo redefinir dichas operaciones.
  const handler = {
    //get  que intercepta los intentos de ingresar a la propiedad
    get: function(target, property) {
      // Intercepta la operación de lectura
      //condicional que define si existe la propiedad o no
      if (property in target) {
        //si existe la propiedad va a devolver el valor
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
      //si cumple la validacion se redefinira el valor
      if (property == "nombre" && value === value.toUpperCase() && regex.test(val.usuario)){ 
        //se redefina la propiedad
        console.log(`Cambiando ${property} a Mayusculas`)
        return target[property] = value;
      }
      else{
        //si no se cumple la propiedad no se redefinira
        console.log(`${property} no ha sido cambiado ya que solo se permiten mayusculas y el usuario debe contener "ADSO":)`)
        return target[property] ;
      }
    }
  };
  //bucle for que recorre cada uno de los usuarios 
  for (let i = 0; i < user.length; i++) {
    // se crea un objeto que va a contener la propiedad 
    let persona = {
      nombre : user[i].name
    }
    //se pasa el valor de usuario
    let user_l = user[i].user
    //y este valor se pasa a un objeto para hacer validacion 
    val.usuario = user_l;
    console.log(`Usuario: ${val.usuario}`)
    //se crea el objeto proxy que pasa el objeto target y el handler 
    let proxy = new  Proxy(persona, handler);
    //se realizan las llamadas al proxy
    console.log(proxy.nombre)
    proxy.nombre = user[i].name.toUpperCase();
    console.log(proxy.nombre)
    console.log("")
  }


  // Manejador del proxy

})();//se autoejecuta la funcion 
