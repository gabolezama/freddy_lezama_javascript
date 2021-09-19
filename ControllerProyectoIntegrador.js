//Declaro variables para el formulario
let promtImput
let inputPrioridad
let inputTipoDocumento
let continuar = true
let nombre, apellido, edad = 0, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion

//Declaro variables para Estadísticas
let cantidad = 1, dniCount = 0, passportCount = 0, cedulaCount = 0, normalCount = 0, urgenteCount = 0

//Función para validar campos tipo String
const isValidString = ( variable, flag ) =>{

    if( variable.trim() === '') return true;

    let validString = isNaN( parseInt(variable) )
    let validMail = /\S+@\S+\.\S+/.test( variable )
    switch(flag){
        case "nombre":
            encuesta.nombre = validString && variable
            break
        case "apellido":
            encuesta.apellido = validString && variable
            break
        case "descripcion":
            encuesta.descripcion = validString && variable
            break
        case "email":
            encuesta.email = validMail && variable
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
            encuesta.edad = validNumber && variableParsed;
            estadisticas.sumaEdad(edad);
            break;
        case "tipoDocumento":
            inputTipoDocumento = validNumber && variableParsed ;
            validarLongSwitch = !validNumber ? true : seleccionUsuario( inputTipoDocumento, "tipoDocumento");
            break;
        case "numeroDocumento":
            encuesta.numeroDocumento = validNumber && variableParsed;
            break;
        case "telefono":
            encuesta.telefono = validNumber && variableParsed;
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
                encuesta.tipoDocumento = "DNI";
                estadisticas.dniCount++;
                break;
            case 2:
                encuesta.tipoDocumento = "Pasaporte";
                estadisticas.passportCount++;
                break;
            case 3:
                encuesta.tipoDocumento = "Cedula";
                estadisticas.cedulaCount++;
                break;
            default:
                fallo = true;
                encuesta.tipoDocumento = ("Opcion no valida");
                break;
        }
    }else if(seleccionFlag === "prioridad"){
        switch (seleccion) {
            case 1:
                encuesta.prioridad = "Normal";
                estadisticas.normalCount++;
                break;
            case 2:
                encuesta.prioridad = "Urgente";
                estadisticas.urgenteCount++;
                break;
            default:
                fallo = true;
                encuesta.prioridad = "Opcion no valida";
                break;
        }

    }
    return fallo;
}

//Constructor de Objeto Formulario
function FormEncuesta(nombre, apellido, edad, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion) {
    this.nombre = nombre,
    this.apellido = apellido,
    this.edad = edad,
    this.email = email,
    this.tipoDocumento = tipoDocumento,
    this.numeroDocumento = numeroDocumento,
    this.telefono = telefono,
    this.prioridad = prioridad,
    this.descripcion = descripcion,

    this.show = () => {
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
function Estadisticas(cantidad, dniCount, passportCount, cedulaCount, normalCount, urgenteCount) {
    this.cantidad = cantidad,
    this.dniCount = dniCount,
    this.passportCount = passportCount,
    this.cedulaCount = cedulaCount,
    this.normalCount = normalCount,
    this.urgenteCount = urgenteCount,
    this.edadAcc = cantidad == 1 && 0
    
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

alert("ATENCION!! Si no llena los datos correctamente su turno tardará más tiempo en ser completado!!")


const estadisticas = new Estadisticas(cantidad, edad, dniCount, passportCount, cedulaCount, normalCount, urgenteCount)
const encuesta = new FormEncuesta(nombre, apellido, edad, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion)

while(continuar){
    do {
        //Se pide ingreso del nombre
        promtImput = prompt("Ingrese su nombre:")

        //si no es string valido no sale del ciclo
    } while (isValidString(promtImput, "nombre"))

    do {
        //Se pide ingreso del apellido
        promtImput = prompt("Ingrese su apellido:")

        //si no es string valido no sale del ciclo
    } while (isValidString(promtImput, "apellido"))

    do {
        //Se pide ingreso del edad
        promtImput = prompt("Ingrese su edad:")

        //si no es número valido no sale del ciclo
    } while (isValidNumber(promtImput, "edad"))

    do {
        //Se pide ingreso del email
        promtImput = prompt("Ingrese su email:")

        //si no es string valido no sale del ciclo
    } while (isValidString(promtImput, "email"))

    do {
        //Se pide ingreso de tipo documento
        promtImput = prompt("Ingrese tipo de documento: 1)DNI 2)Pasaporte 3)Cédula")

        //si no es número valido no sale del ciclo
    } while (isValidNumber(promtImput, "tipoDocumento"))

    do {
        //Se pide ingreso de número documento
        promtImput = prompt("Ingrese numero de su documento:")

        //si no es número valido no sale del ciclo
    } while (isValidNumber(promtImput, "numeroDocumento"))

    do {
        //Se pide ingreso de número teléfono
        promtImput = prompt("Ingrese su numero de telefono:")

        //si no es número valido no sale del ciclo
    } while (isValidNumber(promtImput, "telefono"))

    do {
        //Se pide ingreso de la Prioridad
        promtImput = prompt("Ingrese la prioridad de su turno: 1)Normal 2)Urgente")

        //si no es número valido no sale del ciclo
    } while (isValidNumber(promtImput, "prioridad"))

    do {
        //Se pide ingreso de descripción
        promtImput = prompt("Especifique brevemente el motivo de su turno")

        //si no es string valido no sale del ciclo
    } while (isValidString(promtImput, "descripcion"));

    encuesta.show()
    
    continuar = confirm("Desea completar otra encuesta?")
    estadisticas.cantidad = continuar? estadisticas.cantidad + 1 : estadisticas.cantidad
}

estadisticas.show()