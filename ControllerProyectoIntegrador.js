//Declaro variables para el formulario------------------------------------
let continuar = false
let edadEstadisticas = false
let toggleFlag = false
let showSurveysActive = false
let showStatsActive = false
let enviado
let selectDoc = true
let selectPrioridad = true
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
//FUNCIONES ---- FUNCIONES ---- FUNCIONES ---- FUNCIONES

//Función para cerrar Estadísticas o ENcuestas anteriores
function cerrar(string_id){
    alert(`Funcion cerrar ${string_id}`)
}

//Funcion para el sort
const orderData = (a, b) => {

    return ((a > b) ? -1 : ((a < b) ? 1 : 0))
}

//Si prevaimente se han llenado encuestas recupero las estadísticas anteriores
function showStats(){
    const recupero = JSON.parse(localStorage.Estadisticas)

    Close( toggleFlag ? 'acceptSurveys' : showSurveysActive ? 'showSurveys' : '' )

    $('#showStats').html(`
        <div id="divStats" class="container">
            <div class="col-sm-8">
                <p>Cantidad de encuestas: ${parseInt(recupero.cantidad)} </p>
                <p>Estadísticas Promedio: </p>
                <div class="row ml-4">
                    <Label>DNI: </Label>
                    <Label class="ml-2">${ (parseInt(recupero.dniCount) / parseInt(recupero.cantidad)) * 100 }%</Label>
                </div>
                <div class="row ml-4">
                    <Label>Pasaporte: </Label>
                    <Label class="ml-2">${  (parseInt(recupero.passportCount) / parseInt(recupero.cantidad)) * 100 }% </Label>
                </div>
                <div class="row ml-4">
                    <Label>Cedula: </Label>
                    <Label class="ml-2">${  (parseInt(recupero.cedulaCount) / parseInt(recupero.cantidad)) * 100 }% </Label>
                </div>
                
                <p>Edad: ${ parseInt(recupero.edad) / parseInt(recupero.cantidad) } años </p>
                
                <p>Prioridad: </p>
                <div class="row ml-4">
                    <Label>Normal: </Label>
                    <Label class="ml-2">${ parseInt(recupero.normalCount) } veces </Label> 
                </div>
                <div class="row ml-4">
                    <Label>Urgente: </Label>
                    <Label class="ml-2">${ parseInt(recupero.urgenteCount) } veces </Label> 
                </div>
                <button type="button" onclick="Close('showStats')" class="btn btn-danger ml-2">Cerrar</button>
            </div>
        </div>
    `)
    showStatsActive = true
}

//Si prevaimente se han llenado encuestas se recuperan y se muestran
function showSurveys(i) {
    const arrayRecupero = JSON.parse(localStorage.arrayEncuestas)
    arrayRecupero.sort((a, b) => orderData(a.prioridad, b.prioridad))

    const surveyRender = document.getElementById('surveyRender')

    Close( toggleFlag ? 'acceptSurveys' : showStatsActive ? 'showStats' : '' )

    if (Array.isArray(arrayRecupero) && arrayRecupero[i] !== undefined) {
        //Las encuestas con prioridad "urgente" aparecen primero

    surveyRender.innerHTML = `
            <div id="showSurveysDiv" class="container">
                <div class="row">
                    <div class="col-sm-3">
                        <Label>User</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].user}" disabled readonly><br>
                    </div>
                    <div class="col-sm-3">
                        <Label>Nombre</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].nombre}" disabled readonly><br>
                    </div>
                    <div class="col-sm-3">
                        <Label>Apellido</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].apellido}" disabled readonly><br>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <Label>Edad</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].edad}" disabled readonly><br>
                    </div>
                    <div class="col-sm-3">
                        <Label>Email</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].email}" disabled readonly><br>
                    </div>
                    <div class="col-sm-3">
                        <Label>Tipo de Documento</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].tipoDocumento}" disabled readonly><br>
                    </div>
                    
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <Label>Nro de Documento</Label> <br>
                        <input class="form-control" type="text" value=${arrayRecupero[i].numeroDocumento}" disabled readonly><br>
                    </div>
                    <div class="col-sm-3">
                        <Label>Nro de Telefono</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].telefono}" disabled readonly><br>
                    </div>
                    <div class="col-sm-3">
                        <Label>Prioridad</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].prioridad}" disabled readonly><br>
                    </div>
                </div>
                <div style="margin-left: -1rem;" class="col-sm-3">
                        <Label>Descripcion</Label> <br>
                        <input class="form-control" type="text" value="${arrayRecupero[i].descripcion}" disabled readonly><br>
                </div>
                <button type="button" onclick="showSurveys(${i+1})" class="btn btn-success">Sigiente</button>
                <button type="button" onclick="Close('showSurveys')" class="btn btn-danger ml-5">Cerrar</button>
                
            </div>
            `
    }else if(!Array.isArray(arrayRecupero) || arrayRecupero[i] === undefined || arrayRecupero[i] === null){
        i = 0
    }
    showSurveysActive = true
}
//Si el usuario quiere llenar una encuesta se renderiza el formulario
function acceptSurveys(){
    enviado = JSON.parse(localStorage.getItem('enviado'))

    if ( enviado ){
        estadisticas.cantidad++;
        localStorage.setItem('enviado', false)
    }
    console.log("cantidad", estadisticas.cantidad);
    Close( showSurveysActive ? 'showSurveys' : showStatsActive ? 'showStats' : '')

    !toggleFlag && Array.isArray(arrayFormulario) && arrayFormulario.forEach((item) => {

        const itemForm = document.createElement('div')
        itemForm.className = "mb-2 col-sm-4 itemForm"
        itemForm.id=`itemForm__${item}`

        const type = item === 'password' ? "password" : item === 'email' ? "email" : (item === 'tipoDocumento' || item === 'numeroDocumento' || item === 'telefono' || item === 'edad' || item === 'prioridad') ? "number" : "text"
        const label = item === 'user'? "usuario" : item === 'password'? "contraseña" : item === 'tipoDocumento' ? "Tipo de Documento" : item === 'numeroDocumento'? "Numero de Documento" : `${item}`

        if (item !== 'show' && item !== 'tipoDocumento' && item !== 'prioridad') {

            itemForm.innerHTML = `
            <label for="${item}__input" class="form-label" id="${item}__inputLabel">${label}</label>
            <input type=${type} onFocus="inputFocus(event.target)" onChange="inputChange(event.target)" class="form-control" id="${item}__input" placeholder="Escriba su ${label}">    
            `
            formulario.appendChild(itemForm)
        }else if(item === 'tipoDocumento' || item === 'prioridad'){

            itemForm.innerHTML = `
            <label for="${item}__input" class="form-label" id="${item}__inputLabel">${label}</label>
            <select id="${item}__input" onFocus="inputFocus(event.target)" onChange="inputChange(event.target)" class="form-select form-select-sm" aria-label=".form-select-sm example">
                <option value="" selected>${item}</option>
                ${item === 'tipoDocumento' ? 
                
                `<option value="DNI">DNI</option>
                <option value="Pasaporte">Pasaporte</option>
                <option value="Cedula">Cedula</option>`:

                `<option value="Normal">Normal</option>
                <option value="Urgente">Urgente</option>
                `}
            </select>   
            `
            formulario.appendChild(itemForm)
        }
    })
    formulario.innerHTML += !toggleFlag ? `
    <div id="formButtons">
        <button id="btnEnviar" class="btn btn-primary ml-4" type="submit" onClick="Enviar()">Enviar</button>
        <button type="button" onClick="Close('acceptSurveys')" class="btn btn-danger ml-8">Cancelar</button>
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
    //Limpio banderas de control
    edadEstadisticas = false
    selectDoc = true
    selectPrioridad = true

    //Guardo la encuesta que estoy enviando
    if(localStorage.arrayEncuestas){

        const arrayRecupero = JSON.parse(localStorage.arrayEncuestas)
        arrayRecupero.push( encuesta )
        localStorage.arrayEncuestas = JSON.stringify(arrayRecupero)
    }else{

        arrayEncuestas.push( encuesta )
        localStorage.arrayEncuestas = JSON.stringify(arrayEncuestas)
    }
    //Guardo las estadisticas nuevas
    if(localStorage.Estadisticas){
        const objetoRecupero = JSON.parse(localStorage.Estadisticas)

        estadisticas.edad += objetoRecupero.edad

        localStorage.Estadisticas = JSON.stringify(estadisticas)

    }else{
        localStorage.setItem("Estadisticas", JSON.stringify(estadisticas))
    }
    localStorage.setItem('enviado', true)
    Close('acceptSurveys')
    location.reload()
}

//Funcion general para cerrar elementos
function Close( tag ){

        if(tag === 'acceptSurveys'){
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

        }else if(tag === 'showSurveys'){
            document.getElementById('showSurveysDiv').remove()
            showSurveysActive = false
        }
        else if( tag === 'showStats'){
            document.getElementById('divStats').remove()
            showStatsActive = false
        }
        
}

//AL salir del campo se valida el valor ingresado
function inputChange(target){

    const formField = target.id.slice(0,-7)

    //Inserción del dato al objeto encuesta previa validación
    switch(target.type){
        case "text":
        case "password":
        case "email":
            encuesta[formField] = isValidString(target.value, formField) ? target.value : ''
            target.value = !isValidString(target.value, formField) ? '' : target.value
            break;
        case "number":
            encuesta[formField] = isValidNumber(target.value, formField) ? target.value : ''
            target.value = !isValidNumber(target.value, formField) ? '' : target.value
            
            if( !edadEstadisticas && formField === "edad" && target.value !== '') {
                estadisticas.edad = parseInt(target.value)
                edadEstadisticas = true
            }
            break;
        case "select-one":
            encuesta[formField] = target.value
            estadisticas.dniCount = target.value === 'DNI' ? estadisticas.dniCount+1 : estadisticas.dniCount
            estadisticas.passportCount = target.value ==='Pasaporte' ? estadisticas.passportCount+1 : estadisticas.passportCount
            estadisticas.cedulaCount = target.value === 'Cedula' ? estadisticas.cedulaCount+1 : estadisticas.cedulaCount

            estadisticas.normalCount = target.value ==='Normal' ? estadisticas.normalCount+1 : estadisticas.normalCount
            estadisticas.urgenteCount = target.value === 'Urgente' ? estadisticas.urgenteCount+1 : estadisticas.urgenteCount

            //Se deshabilitan los selects una vez que se ha seleccionado un valor
            //para evitar reingreso del campo y que se alteren de las estadísticas
            if(selectDoc && (target.value ==='DNI' || target.value ==='Pasaporte' || target.value ==='Cedula')){
                document.getElementById('tipoDocumento__input').disabled = (target.value ==='DNI' || target.value ==='Pasaporte' || target.value ==='Cedula')
                selectDoc = false
            }
            else if(selectPrioridad && (target.value ==='Normal' || target.value ==='Urgente')){
                document.getElementById('prioridad__input').disabled = (target.value ==='Normal' || target.value ==='Urgente')
                selectPrioridad = false
            }
            break;
    }
    //Recorremos los campos del formulario
    const found = Object.values(encuesta).find((valor)=>{
        return valor === ""
    })

    //Si hay algun campo vacío se deshabilita el botón enviar
    document.getElementById('btnEnviar').disabled = found !== undefined 
    console.log(encuesta)
}

//Muestra la LEYENDA según sea el campo que el usuario seleccione
function inputFocus(target){
    
    const formField = target.id.slice(0,-7)
    const leyenda = document.getElementById('leyenda')

    $('#leyenda').hover(
        function() {
            $(this).addClass("toPurple")
        },
        function() {
            $(this).removeClass("toPurple")
    })
    
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
            leyenda.innerText =`Leyenda: Tipo de Documento de Identidad: 1) DNI 2) Pasaporte 3) Cedula.`
            break;
        case 'numeroDocumento':
            leyenda.innerText =`Leyenda: Número del Documento de Identidad. Debe ser un dato puramente numérico no negativo`
            break;
        case 'telefono':
            leyenda.innerText =`Leyenda: Ingrese su número telefónico personal. Debe ser un dato puramente numérico no negativo`
            break;
        case 'prioridad':
            leyenda.innerText =`Leyenda: 1) Normal 2) Urgente.`
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

let estadisticas = new Estadisticas(1 , 0 , 0 , 0 , 0, 0 , 0)
const encuesta = new FormEncuesta('','','','','','','','','','','')

const arrayFormulario = Object.keys(encuesta)
const formulario = document.getElementById('formulario')

const splashScreen = document.getElementById("splash-screen")

$('#tituloApp').hover(
function() {
    $(this).addClass("toPurple")
},
function() {
    $(this).removeClass("toPurple")
})

//Efecto de Splash Screen
document.addEventListener('DOMContentLoaded', ()=>{
    setTimeout(()=>{
        splashScreen.className = "splash-hidden"
    }, 500)
})

//Por defecto se chequea si existen datos almacenados
if(localStorage.Estadisticas){
    const objetoRecupero = JSON.parse(localStorage.Estadisticas)
    estadisticas = new Estadisticas(objetoRecupero.cantidad, objetoRecupero.dniCount , objetoRecupero.passportCount , objetoRecupero.cedulaCount, objetoRecupero.normalCount, objetoRecupero.urgenteCount , objetoRecupero.edad)
    console.log(estadisticas);
}

//"Presentacion" despliega las opciones para el usuario
const presentacion = document.getElementById("presentacion")
presentacion.innerHTML =`
<div id="ask-surveys" class="col-sm-3">
    <button type="button" onclick="acceptSurveys()" class="btn btn-success ml-5">Desea completar una encuesta?</button>
</div>
`;

presentacion.innerHTML += ( localStorage.arrayEncuestas && localStorage.arrayEncuestas !== []) ?`
<div id="ask-surveys" class="col-sm-3 mt-3">
    <button type="button" onclick="showSurveys(0)" class="btn btn-success ml-5">Desea ver Encuestas anteriores?</button>
</div>`: 
`<div id="ask-surveys" class="col-sm-3">
<p>Lo sentimos no hay encuestas anteriores</p>
</div>
`;

presentacion.innerHTML += localStorage.Estadisticas ?`
<div id="ask-stats" class="col-sm-3 mt-3">
    <button type="button" onclick="showStats()" class="btn btn-success ml-5">Estadísticas Almacenadas</button>
</div>`:
`<div id="ask-surveys" class="col-sm-3">
<p>Lo sentimos no hay estadísticas almacenadas</p>
</div>
`;