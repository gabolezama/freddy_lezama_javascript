//Declaro variables para el formulario
let promtImput
let inputPrioridad
let inputTipoDocumento
let continuar = true
let abortar = false
let nombre, apellido, edad = 0, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion

//Declaro variables para Estadísticas
let cantidad = 1, dniCount = 0, passportCount = 0, cedulaCount = 0, normalCount = 0, urgenteCount = 0, edadAcc = 0

//Funcion para el sort
const orderData = ( a, b) => {

    return (( a > b ) ? -1 : (( a < b ) ? 1 : 0 ))
  }

//Función para validar campos tipo String
const isValidString = ( variable, flag ) =>{

    if( variable.trim() === '') return true;

    let validString = isNaN( parseInt(variable) )
    let validMail = /\S+@\S+\.\S+/.test( variable )
    switch(flag){
        case "nombre":
            nombre = validString && variable
            break
        case "apellido":
            apellido = validString && variable
            break
        case "descripcion":
            descripcion = validString && variable
            break
        case "email":
            email = validMail && variable
            break
    }
    return flag === "email" ? !validMail : !validString

}

//Función para falidar campos tipo Numérico
const isValidNumber = ( variable, flag ) =>{
    
    let validarLongSwitch = false
    let variableParsed = parseInt( variable )
    let validNumber = !isNaN( variableParsed )

    switch(flag){
        case "edad":
            edad = validNumber && variableParsed;
            estadisticas.sumaEdad(edad);
            break;
        case "tipoDocumento":
            inputTipoDocumento = validNumber && variableParsed ;
            validarLongSwitch = !validNumber ? true : seleccionUsuario( inputTipoDocumento, "tipoDocumento");
            break;
        case "numeroDocumento":
            numeroDocumento = validNumber && variableParsed;
            break;
        case "telefono":
            telefono = validNumber && variableParsed;
            break;
        case "prioridad":
            inputPrioridad = validNumber && variableParsed ;
            validarLongSwitch = !validNumber ? true : seleccionUsuario( inputPrioridad, "prioridad");
            break;
    }
    return (flag ==="tipoDocumento" || flag === "prioridad") ? validarLongSwitch : !validNumber

}

//Función par convertir la seleccion del usiario (tipo numérico) en su String correspondiente
const seleccionUsuario = (seleccion, seleccionFlag) =>{
    let fallo = false; //Si entra en el Default levanto la bandera

    if (seleccionFlag === "tipoDocumento") {
        switch (seleccion) {
            case 1:
                tipoDocumento = "DNI";
                estadisticas.dniCount++;
                break;
            case 2:
                tipoDocumento = "Pasaporte";
                estadisticas.passportCount++;
                break;
            case 3:
                tipoDocumento = "Cedula";
                estadisticas.cedulaCount++;
                break;
            default:
                fallo = true;
                tipoDocumento = ("Opcion no valida");
                break;
        }
    }else if(seleccionFlag === "prioridad"){
        switch (seleccion) {
            case 1:
                prioridad = "Normal";
                estadisticas.normalCount++;
                break;
            case 2:
                prioridad = "Urgente";
                estadisticas.urgenteCount++;
                break;
            default:
                fallo = true;
                prioridad = "Opcion no valida";
                break;
        }

    }
    return fallo;
}

//Constructor de Objeto Formulario
class FormEncuesta {

    constructor(nombre, apellido, edad, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.tipoDocumento = tipoDocumento;
        this.numeroDocumento = numeroDocumento;
        this.telefono = telefono;
        this.prioridad = prioridad;
        this.descripcion = descripcion;

    }

    show = () => {
        alert(`
            Usted completó lo siguiente:
            Nombre: ${this.nombre}
            Apellido: ${this.apellido}
            Edad: ${this.edad}
            Email: ${this.email}
            Tipo de Documento: ${this.tipoDocumento}
            Número de Documento: ${this.numeroDocumento}
            Teléfono: ${this.telefono}
            Prioridad: ${this.prioridad}
            Descripcion: ${this.descripcion}
        `)
    }
}

//Constructor de Objeto Estadísticas
function Estadisticas(cantidad, dniCount, passportCount, cedulaCount, normalCount, urgenteCount, edadAcc) {
    this.cantidad = cantidad,
    this.dniCount = dniCount,
    this.passportCount = passportCount,
    this.cedulaCount = cedulaCount,
    this.normalCount = normalCount,
    this.urgenteCount = urgenteCount,
    this.edadAcc = edadAcc
    
    this.sumaEdad = (edad) => {

        this.edadAcc = this.edadAcc + edad ;
    }

    this.show = () => {
        alert(` 
        Cantidad de Encuestas: ${this.cantidad}
        Estadísticas Promedios:
            Tipo de Documento:
                DNI: ${ (this.dniCount / this.cantidad) * 100 }%
                Pasaporte: ${  (this.passportCount / this.cantidad) * 100 }%
                Cedula: ${  (this.cedulaCount / this.cantidad) * 100 }%
            Edad: ${ this.edadAcc / this.cantidad } años
            Prioridad:
                Normal: ${this.normalCount} veces
                Urgente: ${this.urgenteCount} veces
        `)
    }
}

const arrayEncuestas = []

const estadisticas = new Estadisticas(cantidad, edad, dniCount, passportCount, cedulaCount, normalCount, urgenteCount, edadAcc)

//Si prevaimente se han llenado enciuestas recupero las estadísticas anteriores
if(localStorage.Estadisticas){
    const recupero = JSON.parse(localStorage.Estadisticas)
    console.log("recupero estadisticas", recupero );
    estadisticas.cantidad = parseInt(recupero.cantidad)
    estadisticas.dniCount = parseInt(recupero.dniCount)
    estadisticas.passportCount = parseInt(recupero.passportCount)
    estadisticas.cedulaCount = parseInt(recupero.cedulaCount)
    estadisticas.normalCount = parseInt(recupero.normalCount)
    estadisticas.urgenteCount = parseInt(recupero.urgenteCount)
    estadisticas.edadAcc = parseInt(recupero.edadAcc)
}

//Si prevaimente se han llenado enciuestas se recuperan y se muestran
if(localStorage.arrayEncuestas && localStorage.arrayEncuestas.length > 0){
    
const recupero =  localStorage.arrayEncuestas
const arrayRecupero = JSON.parse(recupero)

    if(Array.isArray(arrayRecupero)){ 
        //Las enuestas con prioridad "urgente" aparecen primero
        arrayRecupero.sort((a,b) => orderData(a.prioridad, b.prioridad))

        arrayRecupero.forEach(( item, index )=>{
            alert(` Recuperando datos ateriores:
                    Encuesta #${index + 1}:
                    Nombre: ${item.nombre}
                    Apellido: ${item.apellido}
                    Edad: ${item.edad}
                    Email: ${item.email}
                    Tipo de Documento: ${item.tipoDocumento}
                    Número de Documento: ${item.numeroDocumento}
                    Teléfono: ${item.telefono}
                    Prioridad: ${item.prioridad}
                    Descripcion: ${item.descripcion}
                `)
            oldEncuesta = new FormEncuesta(item.nombre, item.apellido, item.edad, item.email, item.tipoDocumento,
                                            item.numeroDocumento, item.telefono, item.prioridad, item.descripcion)
            arrayEncuestas.push( oldEncuesta )
        })
    }

    continuar = confirm("Desea completar más encuestas?")
    estadisticas.cantidad = continuar? estadisticas.cantidad + 1 : estadisticas.cantidad
}

continuar && alert("ATENCION!! Si no llena los datos correctamente su turno tardará más tiempo en ser completado!!")

while(continuar){
    do {
        //Se pide ingreso del nombre
        promtImput = prompt("Ingrese su nombre:")

        //si no es string valido no sale del ciclo
    } while (promtImput !== null && isValidString(promtImput, "nombre"))
    if(promtImput === null){abortar = true; break;} //Si cancela el promt abortamos

    do {
        //Se pide ingreso del apellido
        promtImput = prompt("Ingrese su apellido:")

        //si no es string valido no sale del ciclo
    } while (promtImput !== null && isValidString(promtImput, "apellido"))
    if(promtImput === null){abortar = true; break;} //Si cancela el promt abortamos

    do {
        //Se pide ingreso del edad
        promtImput = prompt("Ingrese su edad:")

        //si no es número valido no sale del ciclo
    } while (promtImput !== null && isValidNumber(promtImput, "edad"))
    if(promtImput === null){abortar = true; break;} 

    do {
        //Se pide ingreso del email
        promtImput = prompt("Ingrese su email:")

        //si no es string valido no sale del ciclo
    } while (promtImput !== null && isValidString(promtImput, "email"))
    if(promtImput === null){abortar = true; break;} 

    do {
        //Se pide ingreso de tipo documento
        promtImput = prompt("Ingrese tipo de documento: 1)DNI 2)Pasaporte 3)Cédula")

        //si no es número valido no sale del ciclo
    } while (promtImput !== null && isValidNumber(promtImput, "tipoDocumento"))
    if(promtImput === null){abortar = true; break;} 

    do {
        //Se pide ingreso de número documento
        promtImput = prompt("Ingrese numero de su documento:")

        //si no es número valido no sale del ciclo
    } while (promtImput !== null && isValidNumber(promtImput, "numeroDocumento"))
    if(promtImput === null){abortar = true; break;} 

    do {
        //Se pide ingreso de número teléfono
        promtImput = prompt("Ingrese su numero de telefono:")

        //si no es número valido no sale del ciclo
    } while (promtImput !== null && isValidNumber(promtImput, "telefono"))
    if(promtImput === null){abortar = true; break;} 

    do {
        //Se pide ingreso de la Prioridad
        promtImput = prompt("Ingrese la prioridad de su turno: 1)Normal 2)Urgente")

        //si no es número valido no sale del ciclo
    } while (promtImput !== null && isValidNumber(promtImput, "prioridad"))
    if(promtImput === null){abortar = true; break;} 

    do {
        //Se pide ingreso de descripción
        promtImput = prompt("Especifique brevemente el motivo de su turno")

        //si no es string valido no sale del ciclo
    } while (promtImput !== null && isValidString(promtImput, "descripcion"))
    if(promtImput === null){abortar = true; break;} 

    const encuesta = new FormEncuesta(nombre, apellido, edad, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion)

    arrayEncuestas.push( encuesta )
    
    encuesta.show()
    
    continuar = confirm("Desea completar otra encuesta?")
    estadisticas.cantidad = continuar? estadisticas.cantidad + 1 : estadisticas.cantidad
}

if(!abortar){ 
    estadisticas.show()
    localStorage.arrayEncuestas = JSON.stringify(arrayEncuestas)
    localStorage.setItem("Estadisticas", JSON.stringify(estadisticas))

}else{  //Si algun prompt es cancelado abortamos
    abortar = false
    alert("Usted ha abortado la encuesta!! Vuelva a empezar")
}