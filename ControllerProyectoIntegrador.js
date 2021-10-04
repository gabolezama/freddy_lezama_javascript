//Declaro variables para el formulario------------------------------------
let continuar = false
let edadEstadisticas = false
let toggleFlag = false
let pasoFocus = 0
let enviarEnable = false
const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()--__+.])(?=.{8,})/i
const numberRegex = /^\d*$/

//Constructor de Objeto Formulario-----------------------------------------
class FormEncuesta {

    constructor(user, password, nombre, apellido, edad, email, tipoDocumento, numeroDocumento, telefono, prioridad, descripcion){
        this.user = user;
        this.password = password;
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

//Constructor de Objeto Estadísticas---------------------------------------
class Estadisticas {

    constructor(cantidad, dniCount, passportCount, cedulaCount, normalCount, urgenteCount, edad){
        this.cantidad = cantidad;
        this.dniCount = dniCount;
        this.passportCount = passportCount;
        this.cedulaCount = cedulaCount;
        this.normalCount = normalCount;
        this.urgenteCount = urgenteCount;
        this.edad = edad;

    }

    show = () => {
        alert(` 
        Cantidad de Encuestas: ${this.cantidad}
        Estadísticas Promedios:
            Tipo de Documento:
                DNI: ${ (this.dniCount / this.cantidad) * 100 }%
                Pasaporte: ${  (this.passportCount / this.cantidad) * 100 }%
                Cedula: ${  (this.cedulaCount / this.cantidad) * 100 }%
            Edad: ${ this.edad / this.cantidad } años
            Prioridad:
                Normal: ${this.normalCount} veces
                Urgente: ${this.urgenteCount} veces
        `)
    }
}
//VALIDACIONES ---- VALIDACIONES ---- VALIDACIONES ---- VALIDACIONES

//Función para validar campos tipo String
const isValidString = ( variable, flag ) =>{

    if( variable.trim() === '') return true;

    let validString = isNaN( parseInt(variable) )
    let validMail = /\S+@\S+\.\S+/.test( variable )
    let validPassword = passRegex.test( variable )

    switch(flag){
        case "user":
            return validString
            
        case "password":
            return validPassword

        case "nombre":
            return validString

        case "apellido":
            return validString

        case "descripcion":
            return validString
        case "email":
            return validMail
    }
}

//Función para falidar campos tipo Numérico
const isValidNumber = ( variable, flag ) =>{
    let variableParsed = parseInt( variable )
    let validNumber = numberRegex.test( variableParsed )
    return validNumber
}

//Función par convertir la seleccion del usiario (tipo numérico) en su String correspondiente
const seleccionUsuario = (seleccion, seleccionFlag) =>{

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
                encuesta.prioridad = "Urgente";
                estadisticas.urgenteCount++;
                break;
        }

    }
}
//FUNCIONES ---- FUNCIONES ---- FUNCIONES ---- FUNCIONES

//Función para cerrar Estadísticas o ENcuestas anteriores
function cerrar(string_id){
    alert(`Funcion cerrar ${string_id}`)
}

//Funcion para el sort
const orderData = (a, b) => {

    return ((a > b) ? -1 : ((a < b) ? 1 : 0))
}

//Si prevaimente se han llenado enciuestas recupero las estadísticas anteriores
function showStats(){
    const recupero = JSON.parse(localStorage.Estadisticas)
    estadisticas.cantidad = parseInt(recupero.cantidad)
    estadisticas.dniCount = parseInt(recupero.dniCount)
    estadisticas.passportCount = parseInt(recupero.passportCount)
    estadisticas.cedulaCount = parseInt(recupero.cedulaCount)
    estadisticas.normalCount = parseInt(recupero.normalCount)
    estadisticas.urgenteCount = parseInt(recupero.urgenteCount)
    estadisticas.edad = parseInt(recupero.edad)

    estadisticas.show()
}

//Si prevaimente se han llenado encuestas se recuperan y se muestran
function showSurveys() {
    const arrayRecupero = JSON.parse(localStorage.arrayEncuestas)

    if (Array.isArray(arrayRecupero)) {
        //Las enuestas con prioridad "urgente" aparecen primero
        arrayRecupero.sort((a, b) => orderData(a.prioridad, b.prioridad))
        arrayRecupero.forEach((item, index) => {
            alert(` Recuperando datos ateriores:
                    Encuesta #${index + 1}:
                    User: ${item.user}
                    Contraseña: ${item.password}
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
            arrayEncuestas.push(oldEncuesta)
        })
    }
}

//Si el usuario desea completar una encuesta
function acceptSurveys(){
    continuar = true
    estadisticas.cantidad = continuar? estadisticas.cantidad + 1 : estadisticas.cantidad

    !toggleFlag && Array.isArray(arrayFormulario) && arrayFormulario.forEach((item) => {

        const itemForm = document.createElement('div')
        itemForm.className = "mb-2 col-sm-3"
        itemForm.id=`itemForm__${item}`

        const type = item === 'password' ? "password" : item === 'email' ? "email" : (item === 'tipoDocumento' || item === 'numeroDocumento' || item === 'telefono' || item === 'edad' || item === 'prioridad') ? "number" : "text"
        const label = item === 'user'? "usuario" : item === 'password'? "contraseña" : item === 'tipoDocumento' ? "Tipo de Documento" : item === 'numeroDocumento'? "Numero de Documento" : `${item}`
        if (item !== 'show') {

            itemForm.innerHTML = `
            <label for="exampleFormControlInput1" class="form-label" id="${item}__input">${label}</label>
            <input required type=${type} onFocus="inputFocus(event.target)" onChange="inputChange(event.target)" class="form-control" id="${item}__input" placeholder="Escriba su ${label}">    
            `
            formulario.appendChild(itemForm)
        }
    })
    formulario.innerHTML += !toggleFlag ? `
    <div id="formButtons">
        <button id="btnEnviar" class="btn btn-primary" type="submit" onClick="Enviar()">Enviar</button>
    <div>
    `: ``;

    document.getElementById("btnEnviar").disabled = true
    const leyenda = document.createElement('leyenda')
    leyenda.id = 'leyenda'
    formulario.appendChild(leyenda)

    toggleFlag = true
}

//Función para ENVIAR el formulario
function Enviar(){
    edadEstadisticas = false

    if(localStorage.arrayEncuestas){

        const arrayRecupero = JSON.parse(localStorage.arrayEncuestas)
        arrayRecupero.push( encuesta )
        localStorage.arrayEncuestas = JSON.stringify(arrayRecupero)
    }else{

        arrayEncuestas.push( encuesta )
        localStorage.arrayEncuestas = JSON.stringify(arrayEncuestas)
    }
    
    if(localStorage.Estadisticas){
        const objetoRecupero = JSON.parse(localStorage.Estadisticas)

        estadisticas.edad += objetoRecupero.edad

        localStorage.Estadisticas = JSON.stringify(estadisticas)

    }else{
        localStorage.setItem("Estadisticas", JSON.stringify(estadisticas))
    }
    estadisticas.show()
    notSurveys()
}

//Si el usuario no quiere llenar ninguna encuesta, cerramos el formulario
function notSurveys(){
    continuar = false
    estadisticas.cantidad = continuar? estadisticas.cantidad + 1 : estadisticas.cantidad
    
    toggleFlag && Array.isArray(arrayFormulario) && arrayFormulario.forEach((item) => {
        
        if (item !== 'show') {
            document.getElementById(`itemForm__${item}`).remove()
        }
    })
    document.getElementById(`formButtons`).remove()
    document.getElementById(`leyenda`).remove()
    toggleFlag = false
}

//AL salir del campo se valida el valor ingresado
function inputChange(target){
    const formField = target.id.slice(0,-7)

    switch(target.type){
        case "text":
        case "password":
        case "email":
            encuesta[formField] = isValidString(target.value, formField) ? target.value : ''
            target.value = !isValidString(target.value, formField) ? '' : target.value
            break;
        case "number":
            if(parseInt(target.value) > 0 && parseInt(target.value) < 4 && ( formField==='tipoDocumento' || formField==='prioridad' )){

                encuesta[formField] = target.value
                seleccionUsuario( parseInt(target.value) , formField)

            }else if((parseInt(target.value) <= 0 || parseInt(target.value) >= 4) &&( formField==='tipoDocumento' || formField==='prioridad' )){

                target.value = ''

            }else{
                encuesta[formField] = isValidNumber(target.value, formField) ? target.value : ''
                target.value = !isValidNumber(target.value, formField) ? '' : target.value
            }
            if( !edadEstadisticas && formField === "edad" && target.value !== '') {
                estadisticas.edad = parseInt(target.value)
                edadEstadisticas = true
            }
            break;
    }

    console.log(encuesta)
}

//Muestra la LEYENDA según sea el campo que el usuario seleccione
function inputFocus(target){
    pasoFocus++ 
    
    document.getElementById("btnEnviar").disabled = pasoFocus < 11
    
    console.log(pasoFocus, enviarEnable);
    const formField = target.id.slice(0,-7)
    const leyenda = document.getElementById('leyenda')
    console.log(leyenda);

    switch(formField){
        case 'user':
            leyenda.innerText =`Leyenda: Nickname del Usuario. Puede contener números pero NO debe ser un dato puramente numérico`
            break;
        case 'password':
            leyenda.innerText =`Leyenda: La contraseña debe ser de 8 caracteres mínimo, con 1 mayuscula y un caracter especial`
            break;
        case 'nombre':
            leyenda.innerText =`Leyenda: Nombre real de la persona. Puede contener números pero NO debe ser un dato puramente numérico`
            break;
        case 'apellido':
            leyenda.innerText =`Leyenda: Apellido de la persona. Puede contener números pero NO debe ser un dato puramente numérico`
            break;
        case 'edad':
            leyenda.innerText =`Leyenda: Edad de la persona. Debe ser un dato puramente numérico`
            break;
        case 'email':
            leyenda.innerText =`Leyenda: Correo con formato a@b.c`
            break;
        case 'tipoDocumento':
            leyenda.innerText =`Leyenda: Tipo de Documento de Identidad: 1) DNI 2) Pasaporte 3) Cedula. Debe ser un dato puramente numérico`
            break;
        case 'numeroDocumento':
            leyenda.innerText =`Leyenda: Número del Documento de Identidad. Debe ser un dato puramente numérico no negativo`
            break;
        case 'telefono':
            leyenda.innerText =`Leyenda: Ingrese su número telefónico personal. Debe ser un dato puramente numérico`
            break;
        case 'prioridad':
            leyenda.innerText =`Leyenda: 1) Normal 2) Urgente. Debe ser un dato puramente numérico`
            break;
        case 'descripcion':
            leyenda.innerText =`Leyenda: Indique brevemente la razón de su turno. Puede contener cualquier tipo de dato`
            break;
    }
}
//FIN DE FUNCIONES ---- FIN DE FUNCIONES ---- FIN DE FUNCIONES ---- FIN DE FUNCIONES

//Construccion del DOM ----------- Construccion del DOM ------------------
const arrayEncuestas = []
const arrayCheck = []

let estadisticas = new Estadisticas(0 , 0 , 0 , 0 , 0, 0 , 0)
const encuesta = new FormEncuesta('','','','','','','','','','','')

const arrayFormulario = Object.keys(encuesta)
const formulario = document.getElementById('formulario')

const splashScreen = document.getElementById("splash-screen")

document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{
        splashScreen.className = "splash-hidden"
    }, 7000)
})

if(localStorage.arrayEncuestas){
    const objetoRecupero = JSON.parse(localStorage.Estadisticas)
    estadisticas = new Estadisticas(objetoRecupero.cantidad, objetoRecupero.dniCount , objetoRecupero.passportCount , objetoRecupero.cedulaCount, objetoRecupero.normalCount, objetoRecupero.urgenteCount , objetoRecupero.edad)
}

const presentacion = document.getElementById("presentacion")
presentacion.innerHTML =`
<div id="ask-surveys" class="col-sm-3">
    <p>Desea completar una encuesta?</p>
    <button type="button" onclick="acceptSurveys()" class="btn btn-success ml-5">Si</button>
    <button type="button" onclick="notSurveys()" class="btn btn-danger ml-5">No</button>
</div>
`;

presentacion.innerHTML += ( localStorage.arrayEncuestas && localStorage.arrayEncuestas !== []) ?`
<div id="ask-surveys" class="col-sm-3">
    <p>Desea ver Encuestas anteriores?</p>
    <button type="button" onclick="showSurveys()" class="btn btn-success ml-5">Si</button>
    <button type="button" onclick="cerrar('ask-surveys')" class="btn btn-danger ml-5">No</button>
</div>`: 
`<div id="ask-surveys" class="col-sm-3">
<p>Lo sentimos no hay encuestas anteriores</p>
</div>
`;

presentacion.innerHTML += localStorage.Estadisticas ?`
<div id="ask-stats" class="col-sm-3">
    <p>Desea ver Estadísticas anteriores?</p>
    <button type="button" onclick="showStats()" class="btn btn-success ml-5" >Si</button>
    <button type="button" onclick="cerrar('ask-stats')" class="btn btn-danger ml-5">No</button>
</div>`:
`<div id="ask-surveys" class="col-sm-3">
<p>Lo sentimos no hay estadísticas almacenadas</p>
</div>
`;