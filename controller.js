/* function operar(){

    let input = window.prompt("ingrese dato: ");

    if (!isNaN(input)) {
        if (input.trim() === '' || input === undefined) input = 0

        window.alert("esto es un numero");

        let segundoOperando = 0
        let operacion = window.prompt("Multiplicar 'x' -- Sumar '+' -- Restar '-' -- Dividir '/'")
        let signoValido = (operacion.trim() === '/' || operacion.trim() === '+' || operacion.trim() === '-' || operacion.trim() === 'x')

        if (signoValido) {
            input = parseInt(input);

            segundoOperando = window.prompt("ingrese segundo operando: ")

            if (!isNaN(segundoOperando)) {
                if (segundoOperando.trim() === '' || segundoOperando === undefined) segundoOperando = 0
                let resultado = 0
                segundoOperando = parseInt(segundoOperando)

                if (operacion === '/') {
                    if (segundoOperando !== 0) resultado = input / segundoOperando
                    else window.alert("Cuidado!! no se puede dividir por Cero!!, fin del programa")
                } else if (operacion === '+') {
                    resultado = input + segundoOperando
                } else if (operacion === '-') {
                    resultado = input - segundoOperando
                } else {
                    resultado = input * segundoOperando
                }

                if (segundoOperando !== 0) window.alert(`EL resultado de la operacion ${input} ${operacion} ${segundoOperando} es: ${resultado} `)

            } else {
                window.alert("Segundo Operando NO es un numero, fin del programa")
            }
        } else {
            window.alert("La operacion NO es invalida, fin del programa")
        }
    } else {
        window.alert("esto NO es un numero, fin del programa");
    }
};

operar(); */
function generateFile() {
    var fso  = CreateObject("Scripting.FileSystemObject"); 
    var fh = fso.CreateTextFile("C:\Users\Freddy\Desktop\Practicas de JS\Curso JS Coder\Test.txt", true);
    fh.WriteLine("miCadenaDeTexto");
    fh.Close();
    alert("click")
}

function validateInput(target){
    console.log(target.value);
}