
let filtro = x => x.aprendiz === true || x.aprendiz === false; //hago que el filtro me mande todos los resultados para realizar validacion por proxy, todo esto por que todo lo usaba con la variable que guarbada todo en el filter asi que mas facil hacer que el filter mande todo a que me ponga a cambiar todo el codigo gracias por la compresion

//se crea una funcion asincrona anonima autoejecutable 
(async() =>{
  //peticion al json
  let respose = await fetch('user.json')
  // se castea el archivo a un json
  let data = await respose.json();
  // se usa el filtro para guardar todo en user
  let user = data.users.filter(filtro)
  //se crea una objeto que va a contenener una propiedad para la validacion
  let val = {
    apren : ""
  }
  //un objeto que define cuáles operaciones serán interceptadas y cómo redefinir dichas operaciones.
  const handler = {
    //get  que intercepta los intentos de ingresar a la propiedad
    get: function(target, property) {
      // Intercepta la operación de lectura
      //condicional que define si existe la propiedad o no
      if (property in target) {
        console.log(`Leyendo ${property}`);
        //si existe la propiedad va a devolver el valor
        return target[property];
      } else {
        console.log(`Property ${property} does not exist`);
        //si no existe devuelve undefined
        return undefined;
      }
    },
    //captura las asignaciones de un valor 
    set: function(target, property, value){
      // si cumple la validacion se redefinira el valor
      if (property == "nombre" && value === value.toUpperCase() && val.apren == true){
        //se redefine
        console.log(`Cambiando ${property} a Mayusculas`)
        return target[property] = value;
      }
      else{
        //si no se cumple la propiedad no se redefinira 
        console.log(`${property} no ha sido cambiado ya que solo se permiten mayusculas y aprendiz debe ser true:)`)
        return target[property] ;
      }
    }
  };

  // bucle for que reccorre cada uno de los usuarios 
  for (let i = 0; i < user.length; i++) {
    // se crea un objeto que va a contener la propiedad 
    let persona = {
      nombre : user[i].name
    }
    //se pasa el valor de aprendiz si es true o false
    val.apren = user[i].aprendiz
    //se crea un objeto proxy al cual se le da el objeto persona y el handler
    let proxy = new  Proxy(persona, handler);
    //se realizan las llamadas al proxy
    console.log(proxy.nombre)
    proxy.nombre = user[i].name.toUpperCase();
    console.log(proxy.nombre)
    console.log("")
  }


  // Manejador del proxy

})();//se autoejecuta la funcion 

