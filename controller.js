let input = window.prompt("ingrese dato: ");

if (!isNaN(input)) {
    if(input.trim() ==='' || input === undefined ) input = 0

    window.alert("esto es un numero");

    let segundoOperando = 0
    let operacion = window.prompt("Multiplicar 'x' -- Sumar '+' -- Restar '-' -- Dividir '/'")
    let signoValido = (operacion.trim() === '/' || operacion.trim() === '+' || operacion.trim() === '-' || operacion.trim() === 'x')

    if (signoValido) {
        input = parseInt(input);

        segundoOperando = window.prompt("ingrese segundo operando: ")
        
        if (!isNaN(segundoOperando)) {
            let resultado = 0
            segundoOperando = parseInt(segundoOperando)

            if (operacion === '/') {
                resultado = input / segundoOperando
            } else if (operacion === '+') {
                resultado = input + segundoOperando
            } else if (operacion === '-') {
                resultado = input - segundoOperando
            } else if (operacion === 'x') {
                resultado = input * segundoOperando
            } else {
                window.alert("La operacion NO es invalida, resultado = 0")
                resultado = 0
            }

            window.alert(`EL resultado de la operacion ${input} ${operacion} ${segundoOperando} es: ${resultado} `)
            
        } else {
            window.alert("Segundo Operando NO es un numero, fin del programa")
        }
    } else {
        window.alert("La operacion NO es invalida, fin del programa")
    }
} else {
    window.alert("esto NO es un numero, fin del programa");
}

// let contraseña = window.prompt( 'ingrese contraseña:' );
// let isValidPassword = ( contraseña === 'Abc123' );

// if( isValidPassword ){ 
//     window.alert( 'Contraseña correcta' )
// }
// else{
//      window.alert( 'Contraseña incorrecta' )
//     }