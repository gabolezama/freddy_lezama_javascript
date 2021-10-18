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

//Construccion del DOM ----------- Construccion del DOM ------------------
const arrayEncuestas = []
const arrayCheck = []

let estadisticas = new Estadisticas(1 , 0 , 0 , 0 , 0, 0 , 0)
const encuesta = new FormEncuesta('','','','','','','','','','','')

const arrayFormulario = Object.keys(encuesta)
const formulario = document.getElementById('formulario')

$('#tituloApp').hover(
function() {
    $(this).addClass("toPurple")
},
function() {
    $(this).removeClass("toPurple")
})

//Efecto de Splash Screen
document.addEventListener('DOMContentLoaded', ()=>{

    $("#splash-screen").fadeIn(1000).fadeOut( 2000 )
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