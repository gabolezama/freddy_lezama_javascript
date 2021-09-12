let nombre, apellido, edad, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion
let promtImput
let inputPrioridad
let inputTipoDocumento
let continuar = true
let cantidad = 1
let sumaEdad = 0
let dniCount = 0
let passportCount = 0
let cedulaCount = 0
let normalCount = 0
let urgenteCount = 0

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

const isValidNumber = ( variable, flag ) =>{
    console.log( variable.length, flag);
    let validarLongSwitch = false
    let variableParsed = parseInt( variable )
    let validNumber = !isNaN( variableParsed )

    switch(flag){
        case "edad":
            edad = validNumber && variableParsed;
            sumaEdad += edad
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

const seleccionUsuario = (seleccion, seleccionFlag) =>{
    let fallo = false;

    if (seleccionFlag === "tipoDocumento") {
        switch (seleccion) {
            case 1:
                tipoDocumento = "DNI";
                dniCount++;
                break;
            case 2:
                tipoDocumento = "Pasaporte";
                passportCount++;
                break;
            case 3:
                tipoDocumento = "Cedula";
                cedulaCount++;
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
                normalCount++;
                break;
            case 2:
                prioridad = "Urgente";
                urgenteCount++;
                break;
            default:
                fallo = true;
                prioridad = "Opcion no valida";
                break;
        }

    }
    return fallo;
}

alert("ATENCION!! Si no llena los datos correctamente su turno tardará más tiempo en ser completado!!")

while(continuar){
    do {

        promtImput = prompt("Ingrese su nombre:")

    } while (isValidString(promtImput, "nombre"))

    do {

        promtImput = prompt("Ingrese su apellido:")

    } while (isValidString(promtImput, "apellido"))

    do {

        promtImput = prompt("Ingrese su edad:")

    } while (isValidNumber(promtImput, "edad"))

    do {

        promtImput = prompt("Ingrese su email:")

    } while (isValidString(promtImput, "email"))

    do {

        promtImput = prompt("Ingrese tipo de documento: 1)DNI 2)Pasaporte 3)Cédula")

    } while (isValidNumber(promtImput, "tipoDocumento"))

    do {

        promtImput = prompt("Ingrese numero de su documento:")

    } while (isValidNumber(promtImput, "numeroDocumento"))

    do {

        promtImput = prompt("Ingrese su numero de telefono:")

    } while (isValidNumber(promtImput, "telefono"))

    do {

        promtImput = prompt("Ingrese la prioridad de su turno: 1)Normal 2)Urgente")

    } while (isValidNumber(promtImput, "prioridad"))

    do {

        promtImput = prompt("Especifique brevemente el motivo de su turno")

    } while (isValidString(promtImput, "descripcion"));

    alert(` Usted completó lo siguiente:
        Nombre: ${nombre}
        Apellido: ${apellido}
        Edad: ${edad}
        Email: ${email}
        Tipo de Documento: ${tipoDocumento}
        Número de Documento: ${numeroDocumento}
        Teléfono: ${telefono}
        Prioridad: ${prioridad}
        Descripcion: ${descripcion}
    `)
    
    continuar = confirm("Desea completar otra encuesta?")
    cantidad = continuar? cantidad + 1 : cantidad
}

alert(` Cantidad de Encuestas: ${cantidad}
        Estadísticas Promedios:
            Tipo de Documento:
                DNI: ${ (dniCount / cantidad) * 100 }%
                Pasaporte: ${ (passportCount / cantidad) * 100  }%
                Cedula: ${ (cedulaCount / cantidad) * 100 }%
            Edad: ${ sumaEdad / cantidad } años
            Prioridad:
                Normal: ${ normalCount } veces
                Urgente: ${ urgenteCount } veces
    `)