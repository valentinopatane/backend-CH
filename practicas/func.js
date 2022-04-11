/*
1) Definir la función mostrarLista que reciba una lista de datos y muestre su contenido, si no está vacía, o de lo contrario muestre el mensaje: “lista vacía”. 
    Luego, invocarla con datos de prueba para verificar que funciona bien en ambos casos.

2) Definir una función anónima que haga lo mismo que la del punto 1, e invocarla inmediatamente, pasando una lista con 3 números como argumento.

3) Definir la función crearMultiplicador  que reciba un número y devuelva una función anónima que reciba segundo número y dé como resultado el producto de ambos. 
    Luego, a partir de la función definida, crear dos funciones duplicar y triplicar, y probarlas con diferentes valores.

*/
function mostrarLista(array) {
    if (array.length == 0){
        console.log('Lista 1 vacía')
    }else{
        console.log(`La lista 1 contiene: ${array}`)
    }
}

mostrarLista([]);
mostrarLista(['bicicleta','pan','cartón']);

(function(array){
    if (array.length == 0){
        console.log('Lista vacía')
    }else{
        console.log(`La lista 2 contiene: ${array}`)
    }
})([1,2,3]);

function crearMultiplicador(num){
    return function(num2){
        return console.log('Resultado: ' + (num * num2))
    }
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

duplicar(2);
triplicar(2);
