const express = require("express");
const PORT = 80;
const app = express();

const array = [
    { id: 1, nombre: "pepe", email: "pepe@nada.com" },
    { id: 2, nombre: "hugo", email: "hugo@nada.com" },
    { id: 3, nombre: "juan", email: "juan@nada.com" }
]

function validar(vec) {
    if (vec.length == 0) {
        return "no existe"
    } else {
        return "id: " + vec[0].id + " nombre: " + vec[0].nombre + " correo: " + vec[0].email;
    }
}

app.get("/",
    function (pedido, respuesta, proximo) {

        const id = pedido.query.id
        const nombre = pedido.query.nombre

        if (nombre != undefined) {
            if (/^[A-Z]+$/i.test(nombre)) {
                respuesta.locals.control = true;
                proximo();
               // console.log("si pasa nombre" + nombre)
            } else {
               // console.log("ingresaste en Nombre numeros =>" + nombre);
                respuesta.send("ingresaste en Nombre numeros => " + nombre);
            }
        } else {
            if (id != undefined) {
                if (/^[0-9]+$/.test(id)) {
                    respuesta.locals.control = false;
                    proximo()
                   //  console.log("si pasa id" + id)
                } else {
                // console.log("ingresaste en ID letras =>" + id);
                respuesta.send("ingresaste en ID letras => " + id);
                }
            } else {
                respuesta.send("query NO reconocido");
               // console.log("query NO reconocido");
            }
        }
    },
    
    function (pedido, respuesta) {
        var vec;
        var resultado;
        const control = respuesta.locals.control;

        if (control) {
            const nombre = pedido.query.nombre
            vec = array.filter(array => array.nombre == nombre)
            resultado = validar(vec)
        } else {
            const id = pedido.query.id
            vec = array.filter(array => array.id == id)
            resultado = validar(vec)
        }
        respuesta.send(resultado);
    })

app.listen(PORT, function () { console.log("servidor escuchando el puerto " + PORT) });


/*

Usando nuestra propia validación:

Para lograr lo que nos proponemos vamos a usar una expresión regular. Puedes encontrar información de expresiones regulares en JavaScript RegExp Reference.

La expresión regular que usaremos viene dada de la siguiente forma:

/^[A-Z]+$/i
Donde:

^ indica que el patrón debe iniciar con los caracteres dentro de los corchetes

[A-Z] indica que los caracteres admitidos son letras del alfabeto

+ indica que los caracteres dentro de los corchetes se pueden repetir

$ indica que el patrón finaliza con los caracteres que están dentro de los corchetes.

i indica que validaremos letras mayúsculas y minúsculas (case-insensitive)

*/